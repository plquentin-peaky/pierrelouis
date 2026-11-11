// Assemble parcours/sensia/Projection_SensIA_Alphonse.html (maquettes Alphonse réutilisées + reproduction Sens IA + scènes).
// Usage : node parcours/sensia/construire.mjs
import {readFileSync, writeFileSync, readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)), parcours=join(here,'..');
const cut=(s,a,b)=>{const i=s.indexOf(a);const j=s.indexOf(b,i+1);if(i<0||j<0)throw new Error('Repère introuvable : '+a);return s.slice(i,j);};
const maq=readFileSync(join(parcours,'..','_contexte','Facturation_PSE_Maquettes.html'),'utf8');
const maqCss=cut(maq,'/* ===== Reproduction Alphonse','</style>');
const maqJs=cut(maq,'// ===== Icônes','// ===== Choix =====');
const pjs=readFileSync(join(parcours,'source','parcours.js'),'utf8');
const v4Js=cut(pjs,'// ===================================================================\n// Gabarits d\'écran v4','// ===================================================================\n// Étapes v4');
const v4Css=cut(readFileSync(join(parcours,'source','gabarit.html'),'utf8'),'/* ===== écrans v2 =====','/* commandes */');
// Polices : Poppins et Barlow Condensed intégrées (Inter est installée sur la machine d'enregistrement).
const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const gcss=execFileSync('curl',['-sSL','-A',UA,'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap'],{encoding:'utf8'});
const blocks=[...gcss.matchAll(/\/\* (latin|latin-ext) \*\/\s*(@font-face\s*\{[^}]*\})/g)].map(m=>m[2]);
let fonts='';
for(const b of blocks){const url=b.match(/url\((https:[^)]+)\)/)[1];const buf=execFileSync('curl',['-sSL',url]);fonts+=b.replace(url,'data:font/woff2;base64,'+buf.toString('base64'))+'\n';}
if(blocks.length<14) throw new Error('Polices incomplètes : '+blocks.length);
// Durées de la voix off
const DUR={};
for(const f of readdirSync(join(here,'audio')).filter(f=>/^s\d+\.mp3$/.test(f))) DUR[f.slice(0,-4)]=+execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',join(here,'audio',f)],{encoding:'utf8'});
let out=readFileSync(join(here,'source','gabarit.html'),'utf8');
const put=(k,v)=>{if(!out.includes(k))throw new Error('Repère absent : '+k);out=out.split(k).join(v);};
put('/*@@FONTS@@*/',fonts); put('/*@@MAQUETTE_CSS@@*/',maqCss); put('/*@@V4_CSS@@*/',v4Css);
put('/*@@MAQUETTE_JS@@*/',maqJs); put('/*@@V4_JS@@*/',v4Js); put('/*@@DUR@@*/{}',JSON.stringify(DUR));
put('/*@@VIDEO_JS@@*/',readFileSync(join(here,'source','video.js'),'utf8'));
out=out.replace(/Steve/g,'Stive');
const visible=out.replace(/<style[\s\S]*?<\/style>/g,'').replace(/\/\/[^\n]*\n/g,'\n');
if(visible.includes('—')) console.warn('Attention : tiret cadratin présent dans le code de la page (à vérifier à l\'écran)');
writeFileSync(join(here,'Projection_SensIA_Alphonse.html'),out);
console.log('OK',(out.length/1024).toFixed(0)+' Ko, voix',Object.values(DUR).reduce((a,b)=>a+b,0).toFixed(1)+' s',Object.keys(DUR).length,'segments');
