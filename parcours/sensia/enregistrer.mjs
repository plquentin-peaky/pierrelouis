// Enregistre la vidéo (1920 × 1080) et y pose la voix off. Avec --shots : captures d'écran rapides, sans vidéo.
// Usage : NODE_PATH=/opt/npm-tools/node_modules node parcours/sensia/enregistrer.mjs [--shots] [--only=lea,claire]
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {writeFileSync, mkdirSync, rmSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const {chromium}=createRequire(import.meta.url)('playwright');
const here=dirname(fileURLToPath(import.meta.url));
const html=join(here,'Projection_SensIA_Alphonse.html');
const shots=process.argv.includes('--shots');
const only=(process.argv.find(a=>a.startsWith('--only='))||'').slice(7);
const W=1920,H=1080;
const tmp=join(here,'.video_brute'); rmSync(tmp,{recursive:true,force:true}); mkdirSync(tmp);
const shotDir=join(here,'captures'); if(shots){rmSync(shotDir,{recursive:true,force:true});mkdirSync(shotDir);}
const browser=await chromium.launch({executablePath:process.env.CHROME||undefined});
const context=await browser.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,...(shots?{}:{recordVideo:{dir:tmp,size:{width:W,height:H}}})});
const page=await context.newPage();
const t0=Date.now();
page.on('pageerror',e=>console.error('Erreur dans la page :',e.message));
page.on('console',m=>{if(m.type()==='error')console.error('console :',m.text());});
if(shots) await page.exposeFunction('__snap',async(n)=>{await page.screenshot({path:join(shotDir,n+'.png')});});
const qs=[shots?'fast':'',only?'only='+only:''].filter(Boolean).join('&');
await page.goto(pathToFileURL(html).href+(qs?'?'+qs:''));
const fonts=await page.evaluate(async()=>{
  const faces=['400 16px Poppins','500 16px Poppins','600 16px Poppins','700 16px Poppins','600 16px "Barlow Condensed"','700 16px "Barlow Condensed"','300 16px Inter','400 16px Inter','500 16px Inter','600 16px Inter'];
  await Promise.all(faces.map(f=>document.fonts.load(f,'Éé0')));await document.fonts.ready;
  return {poppins:document.fonts.check('16px Poppins'),barlow:document.fonts.check('700 16px "Barlow Condensed"'),inter:document.fonts.check('16px Inter')};
});
console.log('Polices :',fonts);
if(!fonts.poppins||!fonts.barlow||!fonts.inter){await browser.close();throw new Error('Polices non chargées');}
await page.waitForTimeout(600);
const tA=Date.now();
await page.evaluate(()=>{window.__start();});
await page.waitForFunction(()=>window.__done===true,null,{timeout:600000,polling:200});
await page.waitForTimeout(400);
const {audio,chapters,total}=await page.evaluate(()=>({audio:window.__audio,chapters:window.__chapters,total:window.__total}));
const tEnd=Date.now();
const video=shots?null:page.video();
await context.close(); await browser.close();
if(shots){console.log('Captures dans',shotDir);process.exit(0);}
const webm=await video.path();
const offset=((tA-t0)/1000).toFixed(2), dur=((tEnd-tA)/1000).toFixed(2);
const mp4=join(here,'..','Projection_SensIA_Alphonse.mp4');
const args=['-y','-loglevel','error','-ss',offset,'-i',webm];
audio.forEach(a=>args.push('-i',join(here,'audio',a.id+'.mp3')));
const fl=audio.map((a,i)=>`[${i+1}:a]adelay=${Math.round(a.t*1000)}:all=1[a${i}]`).join(';')+';'+audio.map((_,i)=>`[a${i}]`).join('')+`amix=inputs=${audio.length}:normalize=0,apad[aout]`;
args.push('-filter_complex',fl,'-map','0:v','-map','[aout]','-t',dur,'-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-r','25','-c:a','aac','-b:a','160k','-movflags','+faststart',mp4);
execFileSync('ffmpeg',args,{stdio:'inherit'});
rmSync(tmp,{recursive:true,force:true});
const mmss=(s)=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;
writeFileSync(join(here,'chapitres.txt'),'Projection Sens IA et Alphonse : chapitres\n\n'+chapters.map(c=>`${mmss(c.t)}  ${c.name}`).join('\n')+'\n\nVoix off :\n'+audio.map(a=>`${a.t.toFixed(1).padStart(6)} s  ${a.id}`).join('\n')+`\n\nDurée totale : ${mmss(+dur)}\n`);
console.log(chapters.map(c=>`${mmss(c.t)}  ${c.name}`).join('\n')); console.log('Durée',mmss(+dur),'→',mp4);
