// Enregistre la lecture automatique du parcours en 1920 × 1080, puis produit le MP4 et les chapitres.
// Usage : node parcours/enregistrer.mjs
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {writeFileSync, mkdirSync, rmSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const {chromium}=createRequire(import.meta.url)('playwright');

const here=dirname(fileURLToPath(import.meta.url));
const html=join(here,'Parcours_Facturation_PSE.html');
const tmp=join(here,'.video_brute'); rmSync(tmp,{recursive:true,force:true}); mkdirSync(tmp);
const W=1920, H=1080;

const browser=await chromium.launch({executablePath:process.env.CHROME||undefined});
const context=await browser.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir:tmp,size:{width:W,height:H}}});
const page=await context.newPage();
const t0=Date.now();
page.on('pageerror',e=>console.error('Erreur dans la page :',e.message));
await page.goto(pathToFileURL(html).href+'?noinit');

// Polices : on charge chaque graisse et on refuse d'enregistrer sans Poppins et Barlow Condensed.
const fonts=await page.evaluate(async()=>{
  const faces=['400 16px Poppins','500 16px Poppins','600 16px Poppins','700 16px Poppins','500 16px "Barlow Condensed"','600 16px "Barlow Condensed"','700 16px "Barlow Condensed"'];
  await Promise.all(faces.map(f=>document.fonts.load(f,'Éé0')));
  await document.fonts.ready;
  return {poppins:document.fonts.check('16px Poppins'),barlow:document.fonts.check('16px "Barlow Condensed"')};
});
console.log('Polices chargées :',fonts);
if(!fonts.poppins||!fonts.barlow){await browser.close();throw new Error('Polices non chargées : enregistrement annulé');}

await page.waitForTimeout(800);
const tA=Date.now();
await page.evaluate(()=>{window.__startAuto();});
await page.waitForFunction(()=>window.__done===true,null,{timeout:600000,polling:250});
await page.waitForTimeout(300);
const chapters=await page.evaluate(()=>window.__chapters);
const tEnd=Date.now();
const video=page.video();
await context.close(); await browser.close();
const webm=await video.path();

// Conversion : on coupe le début (chargement) pour que la vidéo commence au carton d'ouverture.
const offset=((tA-t0)/1000).toFixed(2), dur=((tEnd-tA)/1000).toFixed(2);
const mp4=join(here,'Parcours_Facturation_PSE.mp4');
execFileSync('ffmpeg',['-y','-loglevel','error','-ss',offset,'-i',webm,'-t',dur,'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-an','-movflags','+faststart',mp4],{stdio:'inherit'});
rmSync(tmp,{recursive:true,force:true});

const mmss=(s)=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;
const lines=chapters.map(c=>`${mmss(c.t)}  ${c.name}`);
writeFileSync(join(here,'chapitres.txt'),'Parcours facturation PSE : chapitres de la vidéo\n\n'+lines.join('\n')+`\n\nDurée totale : ${mmss(+dur)}\n`);
console.log(lines.join('\n')); console.log('Durée',mmss(+dur),'→',mp4);
