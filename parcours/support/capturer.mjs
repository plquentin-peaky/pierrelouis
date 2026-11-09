// Contrôle visuel du support : captures pleine page (bureau et mobile) et de chaque écran, erreurs de console.
// Usage : node parcours/support/capturer.mjs <dossier_sortie>
import {createRequire} from 'node:module';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const {chromium}=createRequire(import.meta.url)('playwright');
const here=dirname(fileURLToPath(import.meta.url));
const out=process.argv[2]||join(here,'captures'); mkdirSync(out,{recursive:true});
const url=pathToFileURL(join(here,'Support_Facturation_PSE_12-11.html')).href;
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const errs=[];
for(const [name,vp] of [['bureau',{width:1440,height:900}],['mobile',{width:390,height:844}]]){
  const ctx=await browser.newContext({viewport:vp,deviceScaleFactor:1});
  const page=await ctx.newPage();
  page.on('pageerror',e=>errs.push(name+': '+e.message));
  page.on('console',m=>{if(m.type()==='error')errs.push(name+' console: '+m.text());});
  await page.goto(url); await page.waitForTimeout(2500);
  await page.screenshot({path:join(out,`page_${name}.png`),fullPage:true});
  if(name==='bureau'){
    const n=await page.evaluate(()=>document.querySelectorAll('#scrNav button').length);
    for(let i=0;i<n;i++){
      await page.evaluate((i)=>document.querySelectorAll('#scrNav button')[i].click(),i);
      await page.waitForTimeout(400);
      const el=await page.$('#ecrans');
      await el.screenshot({path:join(out,`ecran_${String(i).padStart(2,'0')}.png`)});
      const hasToday=await page.evaluate(()=>!document.querySelector('#btnToday').disabled);
      if(hasToday){await page.evaluate(()=>document.querySelector('#btnToday').click());await page.waitForTimeout(400);await el.screenshot({path:join(out,`ecran_${String(i).padStart(2,'0')}_auj.png`)});}
    }
    const v=await page.evaluate(()=>{const v=document.getElementById('vid');return {src:!!v.src,ready:v.readyState};});
    console.log('Vidéo',JSON.stringify(v));
    const txt=await page.evaluate(()=>document.body.innerText);
    (await import('node:fs')).writeFileSync(join(out,'texte_page.txt'),txt);
    console.log('Tirets cadratins visibles :',(txt.match(/—/g)||[]).length);
  }
  await ctx.close();
}
await browser.close();
console.log(errs.length?'ERREURS\n'+errs.join('\n'):'Aucune erreur de page');
