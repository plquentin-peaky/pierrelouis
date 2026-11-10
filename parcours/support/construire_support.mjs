// Assemble parcours/support/Support_Facturation_PSE_12-11.html : page autonome (moins de 5 Mo) pour adopt.aiorigin.io.
// Usage : node parcours/support/construire_support.mjs  (après node parcours/construire.mjs et node parcours/enregistrer.mjs)
import {readFileSync, writeFileSync, existsSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url));
const parcours=join(here,'..');
const src=(f)=>readFileSync(join(here,'source',f),'utf8');
const cut=(s,a,b)=>{const i=s.indexOf(a);const j=s.indexOf(b,i+1);if(i<0||j<0)throw new Error('Repère introuvable : '+a+' / '+b);return s.slice(i,j);};

// 1. Maquettes de base (CSS et gabarits d'écran) et gabarits v4 du parcours
const maq=readFileSync(join(parcours,'..','_contexte','Facturation_PSE_Maquettes.html'),'utf8');
const maqCss=cut(maq,'/* ===== Reproduction Alphonse','</style>');
const maqJs=cut(maq,'// ===== Icônes','// ===== Choix =====');
const pjs=readFileSync(join(parcours,'source','parcours.js'),'utf8');
const v4Js=cut(pjs,'// ===================================================================\n// Gabarits d\'écran v4','// ===================================================================\n// Étapes v4');
const gab=readFileSync(join(parcours,'source','gabarit.html'),'utf8');
const v4Css=cut(gab,'/* ===== écrans v2 =====','/* commandes */');

// 2. Vidéo : réencodée en 1280 × 720 pour tenir dans la limite de 5 Mo
const mp4=join(parcours,'Parcours_Facturation_PSE.mp4');
const small=join(here,'video_720.mp4');
if(!existsSync(small)||statSync(small).mtimeMs<statSync(mp4).mtimeMs){
  execFileSync('ffmpeg',['-y','-loglevel','error','-i',mp4,'-vf','scale=1280:720:flags=lanczos,fps=12','-c:v','libx264','-preset','slow','-tune','stillimage','-crf','32','-pix_fmt','yuv420p','-an','-movflags','+faststart',small],{stdio:'inherit'});
}
const vb64=readFileSync(small).toString('base64');

// 3. Chapitres
const chap=readFileSync(join(parcours,'chapitres.txt'),'utf8').split('\n').map(l=>l.match(/^(\d\d):(\d\d)\s+(.+)$/)).filter(Boolean)
  .filter(m=>!/^(Ouverture|Fin)$/.test(m[3]))
  .map(m=>`<li><button type="button" data-t="${(+m[1])*60+(+m[2])}"><span class="t">${m[1]}:${m[2]}</span><span>${m[3].replace(/^\d+\.\s*/,'')}</span></button></li>`).join('');

// 4. Assemblage
let out=src('page.html');
const put=(k,v)=>{if(!out.includes(k))throw new Error('Repère absent : '+k);out=out.split(k).join(v);};
put('/*@@PAGE_CSS@@*/',src('page.css'));
put('/*@@MAQ_CSS@@*/',maqCss);
put('/*@@V4_CSS@@*/',v4Css);
put('/*@@MAQ_JS@@*/','const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];\n'+maqJs);
put('/*@@V4_JS@@*/',v4Js);
put('/*@@ECRANS_JS@@*/',src('ecrans.js'));
let page=src('page.js');
let don=src('donnees.js');
const droits=src('droits.js');
const [arbDroits,reste]=droits.split('/*@@FIN_ARB@@*/');
don=don.replace('/*@@ARB_DROITS@@*/',arbDroits).replace('/*@@DROITS_EFFORT@@*/',reste);
page=page.replace('/*@@DONNEES@@*/',don);
put('/*@@PAGE_JS@@*/',page);
put('@@CHAPITRES@@',chap);
// Schéma du parcours (capture du tableau Miro, mis à jour le 10 novembre)
put('@@SCHEMA@@','data:image/webp;base64,'+readFileSync(join(parcours,'source','schema_miro_v5.webp')).toString('base64'));
// La vidéo est rangée dans un bloc de données et convertie en adresse locale au chargement (lecture et recherche fiables).
const poster=join(here,'poster.jpg');
execFileSync('ffmpeg',['-y','-loglevel','error','-ss','1.2','-i',small,'-frames:v','1','-vf','scale=960:-2','-q:v','6',poster]);
put('src="@@VIDEO@@"',`poster="data:image/jpeg;base64,${readFileSync(poster).toString('base64')}"`);
out=out.replace('</body>',`<script type="application/octet-stream" id="vdata">${vb64}</script>
<script>(function(){try{var b=atob(document.getElementById('vdata').textContent.trim());var a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);var u=URL.createObjectURL(new Blob([a],{type:'video/mp4'}));var v=document.getElementById('vid');v.src=u;}catch(e){var v=document.getElementById('vid');if(v)v.outerHTML='<p style="color:#fff;padding:24px">La vidéo ne peut pas être lue dans ce navigateur.</p>';}})();</script>
</body>`);

out=out.replace(/Steve/g,'Stive');
// 5. Contrôles
const visible=out.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
if(visible.includes('—')) throw new Error('Tiret cadratin dans le texte de la page');
const file=join(here,'Support_Facturation_PSE_12-11.html');
writeFileSync(file,out);
const mo=Buffer.byteLength(out)/1048576;
console.log('OK',mo.toFixed(2),'Mo (limite 5 Mo), vidéo',(statSync(small).size/1048576).toFixed(2),'Mo');
if(mo>4.95) throw new Error('Page trop lourde pour adopt.aiorigin.io');
