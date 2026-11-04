// Assemble parcours/Parcours_Facturation_PSE.html à partir des maquettes et du moteur de parcours.
// Usage : node parcours/construire.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url));
const maq=readFileSync(join(here,'..','_contexte','Facturation_PSE_Maquettes.html'),'utf8');

const cssStart=maq.indexOf('/* ===== Reproduction Alphonse');
const css=maq.slice(cssStart, maq.indexOf('</style>',cssStart));
const jsStart=maq.indexOf('// ===== Icônes');
const js=maq.slice(jsStart, maq.indexOf('// ===== Choix =====',jsStart));
if(cssStart<0||jsStart<0) throw new Error('Repères introuvables dans les maquettes');

// Polices Google intégrées en base64 (latin et latin-ext) pour un fichier autonome hors ligne.
const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const gcss=execFileSync('curl',['-sSL','-A',UA,'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&display=swap'],{encoding:'utf8'});
const blocks=[...gcss.matchAll(/\/\* (latin|latin-ext) \*\/\s*(@font-face\s*\{[^}]*\})/g)].map(m=>m[2]);
let fonts='';
for(const b of blocks){
  const url=b.match(/url\((https:[^)]+)\)/)[1];
  const buf=execFileSync('curl',['-sSL',url]);
  fonts+=b.replace(url,'data:font/woff2;base64,'+buf.toString('base64'))+'\n';
}
if(blocks.length<14) throw new Error('Polices incomplètes : '+blocks.length);

let out=readFileSync(join(here,'source','gabarit.html'),'utf8');
const put=(k,v)=>{out=out.split(k).join(v)};
put('/*@@FONTS@@*/',fonts);
put('/*@@MAQUETTE_CSS@@*/',css);
put('/*@@MAQUETTE_JS@@*/',js);
put('/*@@PARCOURS_JS@@*/',readFileSync(join(here,'source','parcours.js'),'utf8'));
put('@@SCHEMA_MIRO@@','data:image/webp;base64,'+readFileSync(join(here,'source','schema_miro.webp')).toString('base64'));
writeFileSync(join(here,'Parcours_Facturation_PSE.html'),out);
console.log('OK', (out.length/1024).toFixed(0)+' Ko,', blocks.length, 'polices');
