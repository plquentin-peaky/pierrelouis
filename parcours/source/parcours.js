// ===== Parcours cliquable v2 : facturation PSE =====
// Écrans reconstruits d'après le code d'Alphonse V2 (libellés relevés en lecture seule).
// Les ajouts de la proposition sont limités à ce qui est réalisable sur cette base.
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const stage=$('#stage'), app=$('#app'), capEl=$('#cap'), cur=$('#cur'), card=$('#card'), ver=$('#ver'), crumbEl=$('#crumb'), mapEl=$('#map');

// ----- mise à l'échelle : l'application remplit la fenêtre -----
let SC=1, VW=1600, VH=900;
function layout(){
  SC=Math.min(innerHeight/900, innerWidth/1360);
  VW=innerWidth/SC; VH=innerHeight/SC;
  stage.style.width=VW+'px'; stage.style.height=VH+'px';
  stage.style.transform=`scale(${SC})`;
}
addEventListener('resize',()=>{layout();if(typeof fitSplit==='function')fitSplit();}); layout();

// ----- minuterie annulable -----
let RUN=0;
class Cancel extends Error{}
const sleep=(ms)=>{const id=RUN;return new Promise((res,rej)=>setTimeout(()=>id===RUN?res():rej(new Cancel()),ms));};
const check=(id)=>{if(id!==RUN)throw new Cancel();};

// ----- rendu d'un écran -----
let current='';
async function show(key,html){
  const same=key===current;
  const keep=same?scroller().scrollTop:0;
  if(app.firstElementChild && !same){app.classList.add('fade');await sleep(380);}
  app.innerHTML=html; current=key;
  const ax=app.firstElementChild;
  if(ax.classList.contains('ax') && !ax.querySelector(':scope>.sb')) ax.classList.add('solo');
  scroller().scrollTop=keep;
  app.classList.remove('fade');
  const band=document.getElementById('band'); if(band) band.classList.toggle('off',!(ax.querySelector&&ax.querySelector(':scope>.sb')));
  return ax;
}
const scroller=()=>{const ax=app.firstElementChild;return ax?(ax.querySelector('main')||ax):app;};

// ----- défilement doux -----
function scrollTo(target,ms=700){
  const sc=scroller(), from=sc.scrollTop, max=sc.scrollHeight-sc.clientHeight;
  const to=Math.max(0,Math.min(max,target)); if(Math.abs(to-from)<2)return Promise.resolve();
  const id=RUN;
  return new Promise(res=>{const t0=performance.now();
    const f=(t)=>{if(id!==RUN)return res();const k=Math.min(1,(t-t0)/ms);const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;sc.scrollTop=from+(to-from)*e;k<1?requestAnimationFrame(f):res();};
    requestAnimationFrame(f);});
}
// garde un élément (ou un intervalle) dans la zone lisible, au-dessus de la légende
async function ensureVisible(topEl,botEl=topEl,ms=700){
  const sc=scroller(), sr=sc.getBoundingClientRect(), st=stage.getBoundingClientRect();
  const top=topEl.getBoundingClientRect().top, bot=botEl.getBoundingClientRect().bottom;
  const minTop=sr.top+60*SC, maxBot=st.bottom-200*SC;
  let d=0;
  if(bot>maxBot) d=(bot-maxBot)/SC;
  if(top-d*SC<minTop) d=(top-minTop)/SC;
  if(Math.abs(d)>1) await scrollTo(sc.scrollTop+d,ms);
}
async function scrollTopOf(el,offset=70){
  const sc=scroller(), sr=sc.getBoundingClientRect();
  await scrollTo(sc.scrollTop+(el.getBoundingClientRect().top-sr.top)/SC-offset,900);
}

// ----- curseur -----
function pt(el){const s=stage.getBoundingClientRect(), r=el.getBoundingClientRect();return [(r.left+r.width/2-s.left)/SC,(r.top+r.height/2-s.top)/SC];}
function cursorAt(x,y,anim=true){if(!anim){cur.style.transition='none';}cur.style.transform=`translate(${x}px,${y}px)`;if(!anim){cur.offsetWidth;cur.style.transition='';}}
function ptSide(el){const s=stage.getBoundingClientRect(), r=el.getBoundingClientRect();const w=r.width/SC;
  if(w>150) return [(r.left-s.left)/SC-18,(r.top+r.height/2-s.top)/SC];
  return pt(el);}
async function moveTo(el,scroll=true){
  if(scroll) await ensureVisible(el);
  if(!cur.classList.contains('on')){cursorAt(VW*0.62,VH*0.62,false);cur.classList.add('on');await sleep(150);}
  const [x,y]=ptSide(el); cursorAt(x,y); await sleep(950);
}
async function click(el,scroll=true){
  if(scroll) await ensureVisible(el);
  if(!cur.classList.contains('on')){cursorAt(VW*0.62,VH*0.62,false);cur.classList.add('on');await sleep(150);}
  const [x,y]=pt(el); cursorAt(x,y); await sleep(950);
  cur.classList.add('press');
  const h=document.createElement('div');h.className='halo';h.style.left=x+'px';h.style.top=y+'px';stage.appendChild(h);setTimeout(()=>h.remove(),800);
  await sleep(160); cur.classList.remove('press'); await sleep(260);
  cursorAt(x+30,y+36); await sleep(200);
}

// ----- légende, fil d'Ariane, repère -----
async function caption(n,txt){
  capEl.classList.add('off'); await sleep(260);
  $('.n',capEl).textContent=n; $('.n',capEl).style.display=n?'':'none'; $('.tx',capEl).textContent=txt;
  capEl.classList.remove('off');
}
function crumb(who,path){
  crumbEl.innerHTML=`<span class="who">${who}</span><span class="sep">·</span>`+path.join(' <span class="sep">›</span> ');
  crumbEl.classList.remove('off');
}
const STAGES=['Ouverture du chantier','Vérification','Émission et suivi','Fin de mission','Clôture du mois'];
function where(i){
  mapEl.innerHTML='<div class="h">Le parcours</div>'+STAGES.map((s,k)=>`<div class="s ${k<i?'done':k===i?'cur':''}"><i></i>${s}</div>`).join('');
  mapEl.classList.toggle('off',i<0);
}

// ----- utilitaires d'animation -----
const hide=(...els)=>els.flat().forEach(e=>e&&e.classList.add('rv','hid'));
const reveal=(...els)=>els.flat().forEach(e=>e&&e.classList.remove('hid'));
const flash=(el,c='flash')=>{el.classList.remove(c);void el.offsetWidth;el.classList.add(c);};
const btn=(root,txt)=>$$('.bt',root).find(b=>b.textContent.includes(txt));
async function type(el,text,ms=46){
  const id=RUN; el.innerHTML='';
  const t=document.createElement('span'), c=document.createElement('span'); c.className='caret'; el.append(t,c);
  for(const ch of text){check(id); t.textContent+=ch; await sleep(ms+(ch===' '?18:0)+(ch===','?160:0));}
  await sleep(250); c.remove();
}
function fmt(n){return Math.round(n).toLocaleString('fr-FR').replace(/[  ]/g,' ');}
async function countUp(el,ms=900){
  const txt=el.textContent, m=txt.match(/\d[\d\s]*/); if(!m)return;
  const target=parseInt(m[0].replace(/\s/g,''),10), pre=txt.slice(0,m.index), post=txt.slice(m.index+m[0].length).trimStart();
  const id=RUN, t0=performance.now();
  await new Promise(res=>{const f=(t)=>{if(id!==RUN)return res();const k=Math.min(1,(t-t0)/ms);const e=1-Math.pow(1-k,3);el.textContent=pre+fmt(target*e)+(post?' '+post:'');k<1?requestAnimationFrame(f):res();};requestAnimationFrame(f);});
  el.textContent=txt;
}
const popIn=(...els)=>els.flat().forEach(e=>{if(!e)return;e.style.display='';e.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:450,easing:'ease-out'});});
const popHide=(...els)=>els.flat().forEach(e=>e&&(e.style.display='none'));
const rowIn=(tr)=>{tr.style.display='';tr.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:450,easing:'ease-out'});};

// ----- carton -----
function showCard(html){card.innerHTML=html;card.classList.remove('off');}
const hideCard=()=>card.classList.add('off');
const LOGO=`<div class="logo"><b>PS</b><span>Plein Sens Ethique</span></div>`;

// ===================================================================
// Gabarits d'écran v4 : processus finance repensé pour Plein Sens Ethique
// ===================================================================
document.head.insertAdjacentHTML('beforeend',`<style>
.ax .src{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:500;color:#5B21B6;background:#F1ECFF;border-radius:999px;padding:1px 8px;white-space:nowrap;text-transform:none;letter-spacing:0}
.ax .src.ok{color:#008A43;background:var(--success-10)}
.ax .src.miss{color:var(--warning);background:#FFF7E8}
.ax .fl{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}
.ax .inp.ed{background:#fff;color:var(--fg);font-size:14px}
.ax .inp.ed.ai{border-color:#CDBDFF;background:#FBF9FF}
.ax .inp.ed.need{border-color:rgba(185,122,18,.55);background:#FFFBF2;color:var(--warning)}
.ax .inp.ed.focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(98,19,255,.15);background:#fff;color:var(--fg)}
.ax .h4{font-size:14px;font-weight:600;margin-bottom:10px}
.ax .rad{display:flex;gap:18px;font-size:13px;flex-wrap:wrap}
.ax .rad span{display:inline-flex;align-items:center;gap:6px}
.ax .rad i{width:14px;height:14px;border-radius:50%;border:1.5px solid #B5B5B5;display:inline-block}
.ax .rad i.on{border:4px solid var(--primary)}
.ax .drop2{border:1.5px dashed #CDBDFF;background:#FBF9FF;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:10px}
.ax .drop2 .docs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;min-height:48px}
.ax .ent{border:1px solid rgba(98,19,255,.25);background:#FBF9FF;border-radius:10px;padding:12px 14px;display:flex;gap:12px;align-items:center}
.ax .ent .t{font-size:13px;color:#3B0E99;flex:1}
.ax .cnts{display:flex;gap:10px;flex-wrap:wrap}
.ax .cnt{display:flex;align-items:center;gap:8px;border:1px solid var(--border);background:var(--card);border-radius:10px;padding:9px 14px;font-size:13px;font-weight:500}
.ax .cnt b{font-family:"Barlow Condensed",sans-serif;font-size:22px;line-height:1}
.ax .cnt.me{border-color:var(--primary);box-shadow:0 0 0 1px var(--primary)}
.ax .st{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:999px;font-size:12px;font-weight:500;white-space:nowrap}
.ax .st.prep{background:#FEF3C7;color:#7A5410}.ax .st.cp{background:#EDE9FE;color:#5B21B6}.ax .st.em{background:#DBEAFE;color:#1E40AF}
.ax .st.env{background:#E0F2FE;color:#075985}.ax .st.enc{background:#F1F5F9;color:#334155}.ax .st.reg{background:#D1FAE5;color:#065F46}.ax .st.con{background:#FFE4E6;color:#9F1239}.ax .st.av{background:#F3F3F3;color:#555}
.ax .late{font-size:11px;font-weight:600;color:var(--danger);background:var(--danger-10);border-radius:999px;padding:2px 8px;white-space:nowrap}
.ax .alertb{border:1px solid rgba(185,122,18,.35);background:#FFF7E8;color:#7A5410;border-radius:8px;padding:10px 14px;font-size:13px;display:flex;gap:10px;align-items:center}
.ax .grp td{background:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--mfg)}
.ax .draft{border:1px solid var(--border);border-radius:10px;background:#fff;padding:14px 16px;font-size:13px;line-height:1.55;box-shadow:0 12px 30px -16px rgba(0,0,0,.35)}
.ax .chk3{display:flex;align-items:center;gap:10px;padding:11px 0;border-top:1px solid var(--border);font-size:14px}
.ax .amt{border:1px solid var(--border);border-radius:12px;background:var(--card);padding:16px 18px}
.ax .amt .l{font-size:12px;font-weight:600;color:var(--mfg);text-transform:uppercase;letter-spacing:.06em}
.ax .amt .v{font-family:"Barlow Condensed",sans-serif;font-size:30px;font-weight:700;margin-top:4px}
.ax .amt .h{font-size:12.5px;color:var(--mfg);margin-top:2px}
.ax .file{display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:13px;background:#fff}
.split{display:grid;grid-template-columns:1fr 1fr;gap:26px;width:100%;height:100%;background:#E9EBEF;padding:104px 34px 150px;box-sizing:border-box}
.split .pane{display:flex;flex-direction:column;gap:10px;min-height:0}
.split .pl{font:700 13px "Poppins",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#4A4F57}
.split .frame{flex:1;min-height:0;overflow:hidden;border-radius:12px;box-shadow:0 18px 40px -22px rgba(0,0,0,.45);background:#fff;position:relative}
.split .frame>div{transform-origin:0 0;position:absolute;left:0;top:0}
.cmp{width:100%;height:100%;background:#FAFAFA;padding:44px 60px 150px;box-sizing:border-box;font-family:"Poppins",sans-serif;color:#0A0A0A;display:flex;flex-direction:column}
.cmp h2{font:700 40px/1.05 "Barlow Condensed",sans-serif;margin:0 0 6px}
.cmp .sub{color:#6E6E6E;font-size:15px;margin-bottom:22px}
.cmp .rows{display:grid;grid-template-columns:1fr 60px 1fr 1.25fr;gap:10px 14px;align-items:center}
.cmp .hd{font:700 13px "Poppins";letter-spacing:.12em;text-transform:uppercase;color:#6E6E6E}
.cmp .o{background:#F1F1F1;border-radius:10px;padding:11px 14px;font-size:15px;color:#555;text-decoration-color:#bbb}
.cmp .n{background:#F1ECFF;border-radius:10px;padding:11px 14px;font-size:15px;font-weight:600;color:#3B0E99}
.cmp .ar{text-align:center;color:#8A4DFF;font-size:22px}
.cmp .w{font-size:13.5px;color:#4A4F57}
.cards6{width:100%;height:100%;background:#111;padding:60px 70px 150px;box-sizing:border-box;font-family:"Poppins",sans-serif;color:#F3F3F3;display:flex;flex-direction:column}
.cards6 h2{font:700 44px/1.05 "Barlow Condensed",sans-serif;margin:0 0 28px}
.cards6 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.cards6 .c{background:#1E1E1E;border:1px solid #2E2E2E;border-radius:14px;padding:20px 22px}
.cards6 .c .p{font-weight:600;font-size:17px;color:#fff}.cards6 .c .r{font-size:12.5px;color:#9A9A9A;margin-bottom:10px}
.cards6 .c .d{font-size:15px;line-height:1.45;color:#D8D8D8}
.cards6 .c .bar{width:34px;height:3px;border-radius:9px;background:#8A4DFF;margin-bottom:12px}
.ax .inp.ed.wait{background:#FAFAFA;border-color:#E6E6E6;color:#9A9A9A}
.ax .dimm{position:absolute;inset:0;background:rgba(10,10,10,.28);z-index:15;animation:fadeIn .3s ease}
.ax .drawer{position:absolute;top:96px;right:0;max-height:calc(100% - 120px);border-radius:14px 0 0 14px;width:620px;background:#fff;box-shadow:-24px 0 60px -20px rgba(0,0,0,.45);z-index:16;display:flex;flex-direction:column;font-family:"Poppins",sans-serif;animation:drIn .45s cubic-bezier(.2,.8,.2,1)}
@keyframes drIn{from{transform:translateX(60px);opacity:0}to{transform:none;opacity:1}}
.ax .drawer .dwh{padding:20px 24px 14px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.ax .drawer .dwb{padding:14px 24px;display:flex;flex-direction:column;gap:12px;overflow:hidden;min-height:0}
.ax .drawer .dwf{padding:12px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:flex-end;align-items:center;gap:8px;background:#FBF9FF}
.ax .drawer .pdfz{background:#EEF0F3;border-radius:10px;padding:14px;display:flex;justify-content:center}
.ax .drawer .pdfz .pdf{zoom:.52}
.ax .rnote{margin-top:3px}
.ax .pop{position:absolute;right:0;top:calc(100% + 6px);width:300px;background:#fff;border:1px solid var(--border);border-radius:10px;box-shadow:0 18px 40px -16px rgba(0,0,0,.4);padding:12px 14px;z-index:8;text-align:left;font-size:13px;white-space:normal}
.ax .popo,.fopt{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--border);border-radius:8px;margin-top:6px;font-size:13px}
.ax .popo.sel,.fopt.sel{border-color:var(--primary);background:#FBF9FF}
.ax .popo i,.fopt i{width:14px;height:14px;border-radius:50%;border:1.5px solid #B5B5B5;flex:none}
.ax .popo i.on,.fopt i.on{border:4px solid var(--primary)}
.fopt{align-items:flex-start;padding:12px 14px;font-size:14px}
.fopt i{margin-top:3px}
#card .who{font:600 22px "Poppins",sans-serif;color:#CDBDFF}
#card .ph{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap;justify-content:center}
#card .ph span{font:500 14px "Poppins",sans-serif;padding:7px 14px;border-radius:999px;background:rgba(243,243,243,.08);color:rgba(243,243,243,.5)}
#card .ph span.done{color:rgba(243,243,243,.85)}
#card .ph span.on{background:#8A4DFF;color:#fff}
</style>`);

USERS.steve=['Stive','Finance · référent facturation','ST'];
USERS.lucas=['Lucas Bernard','Consultant','LB'];
const NAV_TODAY=JSON.parse(JSON.stringify(NAV));
function navToday(){NAV[2][1]=JSON.parse(JSON.stringify(NAV_TODAY[2][1]));}
function navTarget(){NAV[2][1]=[['receipt','Facturation'],['scissors','Clôture du mois']];}
const shell0=shell;
shell=function(a,u,inner,o={}){let h=shell0(a,u,inner,o);
  h=h.replace(/<div class="sec">Intégrations<\/div>[\s\S]*?Connecter MCP<\/span><\/div>/,'');
  if(u==='cp'||u==='steve'||u==='lucas') h=h.replace(/<div class="it[^"]*">(?:(?!<\/div>)[\s\S])*?<span>Clôture du mois<\/span>(?:(?!<\/div>)[\s\S])*?<\/div>/,'');
  if(u==='lucas') h=h.replace(/<span class="bdg">\d+<\/span>/,'');
  return h;};
const ST=(k,t)=>`<span class="st ${k}">${t}</span>`;

// --- Fiche chantier, onglet Facturation (cible v5) : Documents · Échéancier · Informations ---
// L'échéancier passe avant les informations ; chaque échéance porte sa facture (numéro, statut) dans la même ligne.
const DOCS4=[['#E5484D','PDF','Devis PSE-2026-041.pdf','Lu · 18 600 € HT · échéancier p. 2'],['#2B6CB0','PDF','BC-VS-2026-0187.pdf','Lu · bon de commande signé']];
function docsCard(state){
  const docs=state==='none'?'':DOCS4.map(([c,t,n,s])=>`<div class="doc"><span class="ty" style="background:${c}">${t}</span><div style="min-width:0"><div style="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</div><div class="xxs mut">${s}</div></div></div>`).join('')
   +(state==='mail'?`<div class="doc" id="mailDoc"><span class="ty" style="background:#0F766E">MAIL</span><div style="min-width:0"><div style="font-weight:500">Re : bon de commande</div><div class="xxs mut">Lu · mail du 28/10, signature</div></div></div>`:'');
  return `<div class="card" id="docs"><div class="card-h" style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding-bottom:14px"><div><div class="t">Documents</div><div class="d">Le devis signé, le bon de commande, un mail du client. Alphonse en tire l'échéancier et les informations de facturation ; rien n'est enregistré sans vous.</div></div><span class="bt gh sm">Remplir à la main</span></div>
<div class="card-b"><div class="drop2"><div class="xs" style="display:flex;align-items:center;gap:8px;color:#4A1AB8;font-weight:500">${I('up','s3')}Déposez le devis signé (PDF)<span class="mut" style="margin-left:auto;font-weight:400">Montant du chantier : 18 600 € (saisi à la création)</span></div>
<div class="docs">${docs}</div>${state==='none'?'':`<div class="xxs mut" id="docNote" style="display:flex;align-items:center;gap:6px">${I('lock','s2')}Fichiers lus puis effacés : Alphonse ne garde que les informations validées, avec la mention de leur source.</div>`}</div></div></div>`;
}
const FI=[
 ['entite','Entité','Varenne Services SAS','Devis, p. 1',1],
 ['siren','SIREN','999 999 998','Devis, p. 1'],
 ['bc','Bon de commande','BC-VS-2026-0187','Bon de commande, p. 1'],
 ['rue','N° + rue','18 rue des Tanneurs','Devis, p. 1'],
 ['cpv','Code postal + Ville','69007 Lyon','Devis, p. 1'],
 ['contact','Contact facturation','',''],
 ['envoi','Mode d\'envoi','Portail (dépôt en ligne)','Devis, p. 3'],
 ['site','Adresse du portail de dépôt','Portail fournisseurs Varenne','Devis, p. 3'],
];
function infosCard4(mode){
  const ed=mode==='edit';
  const field=([k,l,v,s,full])=>{
    const style=full?' style="grid-column:1/-1"':'';
    if(!ed){const val=mode==='saved'?(k==='contact'?'Nadia Lemoine, comptabilité fournisseurs':v):'Non renseigné';
      return `<div${style}><div class="lbl">${l}</div><div class="val">${val}</div></div>`;}
    const need=k==='contact';
    const chip=need?'<span class="src miss">À compléter</span>':`<span class="src">${I('file','s2')}${s}</span>`;
    return `<div${style} data-f="${k}"><div class="fl"><span class="lbl">${l}</span>${chip}</div><div class="inp ed ${need?'need':'ai'}" data-v="${need?'absent du devis et du bon de commande':v}">${need?'absent du devis et du bon de commande':v}</div></div>`;
  };
  const head=ed?`<span class="src" style="font-size:11.5px;padding:3px 10px">${I('spark','s2')}Prérempli par Alphonse, à vérifier</span>`:`<span class="bt ol sm">${I('pen','s3')}Modifier</span>`;
  const ent=ed?`<div class="ent" id="entBox" style="grid-column:1/-1">${I('users')}<span class="t"><b>Varenne Services SAS</b>, déjà utilisée sur 2 chantiers de Groupe Varenne Services : VARENNE_Baro2026, VARENNE_Form2026.</span><span class="bt pr xs" id="useEnt">Utiliser cette entité</span><span class="bt ol xs">C'est une autre entité</span></div>`:'';
  const frais=`<div><div class="h4">Frais de mission <span class="xs mut" style="font-weight:400">(champ existant : les frais sont-ils inclus dans le prix ou refacturés au client ?)</span></div>${ed?`<div class="rad"><span><i></i>Refacturés en plus</span><span><i></i>Refacturés en débours</span><span><i class="on"></i>Inclus dans le prix</span><span class="src">${I('file','s2')}Devis, p. 2</span></div>`:`<div class="val">${mode==='saved'?'Inclus dans le prix':'Non renseigné'}</div>`}</div>`;
  const valid=ed?`<div style="display:flex;justify-content:flex-end;gap:10px;align-items:center;border-top:1px solid var(--border);padding-top:14px" id="infoBtns"><span class="xs mut">${I('check','s3')} Un seul clic valide l'échéancier et les informations.</span><span class="bt pr sm" id="validBtn">${I('check','s3')}Valider l'échéancier et les informations</span></div>`:'';
  return `<div class="box" id="infos"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><div><div style="font-weight:600;font-size:15px">Informations de facturation</div><div class="xs mut" style="margin-top:2px">Entité facturée, bon de commande et mode d'envoi, repris sur chaque facture.</div></div>${head}</div>
  <div style="margin-top:16px;display:flex;flex-direction:column;gap:18px"><div class="g2">${ent}${FI.map(field).join('')}</div>
  ${frais}${valid}
  </div></div>`;
}
// Échéancier : une ligne par échéance ; la facture (numéro, statut) apparaît dans la ligne.
const ECH={
 a:['Acompte','Acompte à la commande (50 %)','02/11/2026','9 300,00'],
 s:['Solde','Solde à la remise du rapport (50 %)','18/12/2026','9 300,00']
};
function schedRow4(id,st,o={}){const [type,lab,date,amt]=ECH[id];
  return `<tr data-r="${id}"><td><span class="sbd neu sm">${type}</span></td><td>${lab}${o.note?`<div class="xxs mut rnote">${o.note}</div>`:''}</td><td class="num dcell">${o.date||date}</td><td class="r num">${amt}</td><td class="num fcell">${o.fac||'<span class="mut">·</span>'}</td><td class="scell">${st}</td><td class="r acell" style="white-space:nowrap">${o.act||''}${o.ro?'':`<span class="mut" style="margin-left:8px;display:inline-flex;vertical-align:middle">${I('pen','s3')}</span>`}</td></tr>`;}
function schedCard4(mode,o={}){
  let rows, total='18 600 €', extra='', sub='Les échéances de facturation du chantier. Chaque facture apparaît dans la ligne de son échéance.';
  const ro=!!o.ro;
  if(mode==='empty'){rows=`<tr><td colspan="7" class="mut" style="text-align:center;padding:18px">Aucune échéance renseignée.</td></tr>`;total='0 €';}
  else if(mode==='prop'){
    sub=`Repris du devis : la moitié à la commande, la moitié à la remise du rapport. <span class="src">${I('file','s2')}Devis, p. 2</span>`;
    rows=schedRow4('a',ST('av','À venir'))+schedRow4('s',ST('av','À venir'));
    extra=`<div class="okb" id="ctrl" style="margin-top:14px">${I('okc','s3')}<span>Total 18 600 € = montant du devis PSE-2026-041 = montant du chantier</span></div>`;}
  else if(mode==='verif'){rows=schedRow4('a',ST('cp','À vérifier'),{act:`<span class="bt pr xs" id="verifBtn">${I('eye','s3')}Vérifier</span>`,note:'Préparée par Alphonse le 02/11, à la date prévue'})+schedRow4('s',ST('av','À venir'));}
  else if(mode==='verified'){rows=schedRow4('a',ST('em','À émettre'),{note:'Vérifiée par Claire Morel le 03/11 · chez Stive'})+schedRow4('s',ST('av','À venir'));}
  else if(mode==='suivi'){rows=schedRow4('a',ST('env','Envoyée'),{fac:'<b>F2026-00007</b>',note:'Déposée sur le portail le 05/11 par Stive · échéance de paiement le 04/12',ro})+schedRow4('s',ST('av','À venir'),{ro});}
  else if(mode==='fin'){rows=schedRow4('a',ST('reg','Réglée'),{fac:'<b>F2026-00007</b>',note:'Réglée le 01/12'})+schedRow4('s',ST('av','À venir'),{note:'Fin prévue au devis : aujourd\'hui'});}
  else if(mode==='report'){rows=schedRow4('a',ST('reg','Réglée'),{fac:'<b>F2026-00007</b>',note:'Réglée le 01/12'})+schedRow4('s',ST('av','À venir'),{date:'08/01/2027',note:'Reportée par Claire Morel le 18/12 : restitution décalée par le client'});}
  return `<div class="card" id="sched"><div class="card-h"><div class="t">Échéancier</div><div class="d">${sub}</div></div>
<div class="card-b"><div class="tw"><table class="t"><thead><tr><th style="width:96px">Type</th><th>Libellé</th><th style="width:116px">Date</th><th class="r" style="width:120px">Montant HT</th><th style="width:128px">Facture</th><th style="width:130px">Statut</th><th style="width:${ro?20:120}px"></th></tr></thead><tbody>${rows}
<tr class="tot"><td colspan="3" class="xs mut" style="text-transform:uppercase;font-weight:500">Total</td><td class="r num" style="font-weight:600">${total}</td><td colspan="3"></td></tr></tbody></table></div>${extra}</div></div>`;
}
function ficheTab(o){
  return shell('Chantiers',o.user||'cp',chantierHead('Facturation')+(o.top||'')+docsCard(o.docs||'none')+schedCard4(o.sched||'empty',o)+infosCard4(o.infos||'empty')+(o.extra||''));
}

// --- Facture d'acompte en brouillon : panneau de vérification ouvert depuis l'échéancier ---
const pdf4=(num,date)=>`<div class="pdf big" id="pdf"><div style="display:flex;justify-content:space-between;gap:14px"><div style="width:130px;height:48px;border:1.5px dashed #C9C9C9;border-radius:4px;display:grid;place-items:center;font-size:9.5px;color:#8A8A8A;text-align:center;line-height:1.2">Logo Plein Sens Ethique</div><div style="border-left:1px solid #000;border-top:1px solid #000;padding:9px 12px;width:250px"><b>Varenne Services SAS</b><br>Nadia Lemoine, comptabilité fournisseurs<br>18 rue des Tanneurs<br>69007 LYON<br><span style="color:#666">SIREN 999 999 998</span></div></div>
 <div style="margin-top:18px">Commande BC-VS-2026-0187</div><div style="text-align:right">Paris, ${date}</div>
 <div style="margin-top:12px;font-size:13px">FACTURE D'ACOMPTE N° <b id="pdfNum">${num}</b></div><div style="margin-top:8px">Enquête interne suite à signalement · acompte de 50 % du devis PSE-2026-041</div>
 <div style="margin:14px 0 0 auto;width:250px"><div style="text-align:right;font-weight:700;margin-bottom:2px">EUROS</div><div style="display:flex;justify-content:space-between"><span>Montant HT :</span><span>9 300,00</span></div><div style="display:flex;justify-content:space-between"><span>TVA 20 %</span><span>1 860,00</span></div><div style="display:flex;justify-content:space-between;font-weight:700;border-top:1px solid #000"><span>Montant TTC :</span><span>11 160,00</span></div></div>
 <div style="margin-top:12px">Échéance : 30 jours après émission · Nature des opérations : prestations de services</div><div style="margin-top:4px;font-size:10px;color:#444">Pénalités de retard : 3 fois le taux d'intérêt légal · Indemnité forfaitaire pour frais de recouvrement : 40 €</div>
 <div style="margin-top:12px;border-top:1px solid #DDD;padding-top:6px;font-size:9px;color:#555;text-align:center">Plein Sens Ethique · mentions légales et IBAN reprises de vos factures actuelles</div></div>`;
const SV4=(c,cls,t,d,extra='')=>`<div class="sv"><span class="c ${cls}">${c}</span><div><div class="tt">${t}</div><div class="dd">${d}</div>${extra}</div></div>`;
function verifDrawer(){
  return `<div class="dimm" id="dimm"></div><div class="drawer" id="drawer"><div class="dwh"><div><div class="xs mut">VARENNE_EnqSig · échéance du 02/11/2026</div><div style="font-weight:600;font-size:17px;margin-top:2px">Acompte à la commande · 9 300 € HT</div></div><span id="fStat">${ST('cp','À vérifier')}</span></div>
<div class="dwf"><span class="xs mut" style="margin-right:auto">Votre avis sur cette facture :</span><span class="bt ol sm">À corriger</span><span class="bt pr sm" id="okBtn">${I('check','s3')}C'est bon</span></div>
<div class="dwb"><div class="pdfz">${pdf4('attribué à l\'émission','à la date d\'émission')}</div>
<div class="box" style="padding:12px 14px"><div class="lbl" style="margin-bottom:6px">Contrôles d'Alphonse</div>${['Montant conforme au devis et à l\'échéancier','Bon de commande cité','Entité et contact repris des informations validées'].map(t=>`<div style="display:flex;gap:8px;align-items:center;font-size:13px;margin-top:4px">${I('okc','s3')}${t}</div>`).join('')}</div>
<div class="step-v" id="fil">${SV4(I('check','s3'),'ok','Préparée par Alphonse','02/11/2026, à la date de l\'échéance')}${SV4('2','cur','Vérifiée par la cheffe de projet','Claire Morel · montant, libellé, commande')}${SV4(I('lock','s3'),'','Émise par la finance','Stive, référent facturation de l\'enquête')}</div></div>
</div>`;
}
function factureTab(){
  return ficheTab({docs:'mail',sched:'verif',infos:'saved'});
}

// --- Vue d'un consultant : onglet Facturation en lecture seule ---
// mode : 'complet' (montants visibles), 'sans' (sans montants), 'masque' (onglet masqué)
function consultantFacturation(mode){
  const tabs=mode==='masque'?['Pilotage','Informations','Frais']:['Pilotage','Informations','Facturation','Frais'];
  const on=mode==='masque'?'Informations':'Facturation';
  const head=`<div class="ph"><div><h1>VARENNE_EnqSig</h1><div class="st"><b>Enquête interne suite à signalement</b><br><span class="dot" style="background:#7C5CFF"></span>Groupe Varenne Services</div></div><div class="acts"><span class="sbd info">En cours</span></div></div>
<div class="tabs">${tabs.map(t=>`<span class="${t===on?'on':''}">${t}</span>`).join('')}</div>`;
  if(mode==='masque'){
    return shell('Chantiers','lucas',head+`<div class="box"><div style="font-weight:600;font-size:15px;margin-bottom:12px">Équipe</div><div class="g2"><div><div class="lbl">Cheffe de projet</div><div class="val">Claire Morel</div></div><div><div class="lbl">Associé de référence</div><div class="val">Pierre-Guillaume Ferré</div></div><div><div class="lbl">Consultants</div><div class="val">Lucas Bernard, Sophie Martin</div></div><div><div class="lbl">Fin prévue</div><div class="val">18/12/2026</div></div></div></div>
<div class="infob" id="consLine" style="font-size:14px;padding:14px 16px">${I('receipt','s3')}<span>La facturation de ce chantier est suivie par Claire Morel (cheffe de projet), l'associé de référence et Stive (référent facturation, rôle Finance).</span></div>`);
  }
  const m=(v)=>mode==='complet'?v:'<span class="mut">masqué</span>';
  const ro=`<div class="infob" id="consLine" style="font-size:13.5px;padding:12px 16px">${I('eye','s3')}<span><b>Lecture seule.</b> La facturation de ce chantier est suivie par Claire Morel (cheffe de projet), l'associé de référence et Stive (référent facturation, rôle Finance).</span></div>`;
  let sched=schedCard4('suivi',{ro:true}).replace(/<span class="mut" style="margin-left:8px;display:inline-flex;vertical-align:middle">[\s\S]*?<\/span>/g,'');
  if(mode!=='complet') sched=sched.replace(/<td class="r num">9 300,00<\/td>/g,`<td class="r num">${m('')}</td>`).replace('18 600 €',m(''));
  const infos=`<div class="box"><div style="font-weight:600;font-size:15px">Informations de facturation</div><div class="xs mut" style="margin-top:2px">Entité facturée, bon de commande et mode d'envoi, repris sur chaque facture.</div>
  <div class="g2" style="margin-top:16px"><div style="grid-column:1/-1"><div class="lbl">Entité</div><div class="val">Varenne Services SAS</div></div>
  <div><div class="lbl">Bon de commande</div><div class="val">BC-VS-2026-0187</div></div><div><div class="lbl">Mode d'envoi</div><div class="val">Portail (dépôt en ligne)</div></div>
  <div><div class="lbl">Contact facturation</div><div class="val">Nadia Lemoine, comptabilité fournisseurs</div></div><div><div class="lbl">Frais de mission</div><div class="val">Inclus dans le prix</div></div></div></div>`;
  return shell('Chantiers','lucas',head+ro+sched.replace('id="sched"','id="consSched"')+infos);
}
function consultantView(){return consultantFacturation('complet');}

// --- Facturation › À faire ---
function aFaire(who,date,rowsHtml,o={}){
  const cnt=o.cnt||[['À préparer',1],['À vérifier',1],['À émettre',2],['À envoyer',1],['Envoyée',1],['Contestée',1],['En retard',1]];
  return shell('Facturation',who,`
<div class="ph"><div><h1>Facturation</h1><div class="st">Au ${date} · chaque facture, son statut, son responsable</div></div></div>
<div class="tabs"><span class="on">À faire (${o.n||7})</span><span>Par chantier</span><span>Registre</span></div>
<div class="cnts">${cnt.map(([l,n])=>`<span class="cnt"><b>${n}</b>${l}</span>`).join('')}<span class="cnt me" style="margin-left:auto">${I('users','s3')}Chez moi</span></div>
${o.alert||''}
<div style="display:grid;grid-template-columns:minmax(0,1fr) ${o.side?'330px':'0px'};gap:${o.side?'18px':'0'};align-items:start">
<div class="tw"><table class="t"><thead><tr><th>Chantier</th><th>Facture</th><th class="r">Montant HT</th><th>Statut</th><th>Où en est-on</th><th></th></tr></thead><tbody>${rowsHtml}</tbody></table></div>
<div>${o.side||''}</div></div>`,{count:o.n||7,bell:2});
}
const fr=(id,ch,sub,fac,amt,st,info,act)=>`<tr data-c="${id}"><td><div class="mono" style="font-weight:500">${ch}</div><div class="xs mut">${sub}</div></td><td class="num fcell">${fac}</td><td class="r num">${amt}</td><td class="scell">${st}</td><td class="xs mut icell">${info}</td><td class="r acell" style="position:relative">${act}</td></tr>`;
const notePop=()=>`<div class="pop" id="pop"><div class="lbl" style="margin-bottom:8px">Noter l'envoi de F2026-00007</div>${[['Envoyée par mail',''],['Déposée sur le portail du client','on']].map(([t,c])=>`<div class="popo${c?' sel':''}" data-o="${c?'portail':'mail'}"><i class="${c?'on':''}"></i>${t}</div>`).join('')}<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;gap:10px"><span class="xs mut">Le 05/11/2026</span><span class="bt pr xs" id="popOk">Enregistrer</span></div></div>`;
function suiviRows(){
  return fr('V','VARENNE_EnqSig','Claire Morel','F2026-00007','9 300',ST('env','À envoyer'),'Portail fournisseurs Varenne',`<span class="bt pr xs dep">${I('check','s3')}Noter l'envoi</span>`)+
     fr('T','TALMONT_Enq','Sophie Martin','F2026-00008','4 900',ST('env','À envoyer'),'Envoi par mail',`<span class="bt ol xs">Noter l'envoi</span>`)+
     fr('O','ORLAN_EnqHar','Sophie Martin','F2026-00006','16 000',ST('env','À envoyer'),'Émise le 30/10',`<span class="bt ol xs">Noter l'envoi</span>`)+
     fr('H','HALIOS_EnqSig','Julien Petit','F2026-00004','12 000',ST('enc','Envoyée')+' <span class="late">En retard de 16 j</span>','Échéance du 20/10',`<span class="bt ol xs rap">${I('mail','s3')}Préparer le rappel</span>`)+
     fr('M','MERIDIA_EnqRPS','Sophie Martin','F2026-00005','10 500',ST('con','Contestée'),'Montant contesté, relances suspendues','');
}
const SUIVI_ALERT=`<div class="alertb" id="al">${I('alert','s3')}<span><b>BRENNE_Enq</b> : bon de commande toujours absent, chantier démarré le 06/10. La facture reste « À préparer ».</span></div>`;
const SUIVI_CNT=[['À préparer',1],['À vérifier',1],['À émettre',0],['À envoyer',3],['Envoyée',1],['Contestée',1],['En retard',1]];
const rappelDraft=()=>`<div class="lbl" style="margin-bottom:8px">Rappel préparé pour HALIOS, à envoyer depuis votre messagerie</div>Bonjour, sauf erreur de notre part, la facture F2026-00004 du 20/09/2026 (12 000 € HT, 14 400 € TTC) est arrivée à échéance le 20/10. Pourriez-vous nous indiquer sa date de règlement ? Merci beaucoup.<div style="display:flex;justify-content:flex-end;margin-top:10px"><span class="bt pr xs">Copier</span></div>`;

// --- Facturation › Par chantier ---
function parChantier(){
  const g=(n,l)=>`<tr class="grp"><td colspan="6">${n} · ${l}</td></tr>`;
  const r=(id,ch,m,re,fa,ec,badge='')=>`<tr data-c="${id}"><td><span class="mono" style="font-weight:500">${ch}</span>${badge?`<div style="margin-top:4px">${badge}</div>`:''}</td><td class="r num">${m}</td><td class="r num" style="font-weight:600;color:var(--primary)">${re}</td><td class="r num">${fa}</td><td class="xs">${ec}</td><td class="xs mut">${id==='VARENNE'?'Solde 18/12/2026':id==='HALIOS'?'Solde 15/12/2026':id==='CAPELLE'?'Solde 04/11/2026':id==='BRENNE'?'Solde 18/12/2026':id==='ORLAN'?'2e acompte 27/11/2026':id==='MERIDIA'?'Solde 11/12/2026':'Aucune'}</td></tr>`;
  return shell('Facturation','steve',`
<div class="ph"><div><h1>Facturation</h1><div class="st">Au 20/11/2026 · groupé par chef de projet</div></div></div>
<div class="tabs"><span>À faire (6)</span><span class="on">Par chantier</span><span>Registre</span></div>
<div class="tw"><table class="t"><thead><tr><th>Chantier</th><th class="r">Montant vendu</th><th class="r">Production à fin octobre</th><th class="r">Déjà facturé</th><th>Écart</th><th>Prochaine facture</th></tr></thead><tbody>
${g('Claire Morel','2 chantiers')}${r('VARENNE','VARENNE_EnqSig','18 600','2 170','9 300','<span class="sbd info sm">facturé d\'avance 7 130</span>')}${r('BRENNE','BRENNE_Enq','15 000','6 000','7 500','<span class="sbd info sm">facturé d\'avance 1 500</span>')}
${g('Julien Petit','2 chantiers')}${r('HALIOS','HALIOS_EnqSig','24 000','16 800','12 000','<span class="sbd warn sm">produit non facturé 4 800</span>')}${r('CAPELLE','CAPELLE_Enq','12 400','12 400','6 200','<span class="sbd warn sm">produit non facturé 6 200</span>',ST('cp','Solde à vérifier depuis le 04/11'))}
${g('Sophie Martin','3 chantiers')}${r('ORLAN','ORLAN_EnqHar','32 000','9 600','16 000','<span class="sbd info sm">facturé d\'avance 6 400</span>')}${r('MERIDIA','MERIDIA_EnqRPS','21 000','10 500','10 500','<span class="sbd neu sm">aligné</span>')}${r('TALMONT','TALMONT_Enq','9 800','9 800','9 800','<span class="sbd neu sm">aligné</span>')}
</tbody></table></div>`,{count:6,bell:2});
}

// --- Mail de fin de mission : il ouvre Alphonse, la réponse se donne dans Alphonse ---
const mail4=()=>`<div class="ax mailv"><div class="mtb">${I('mail')}Messagerie · Claire Morel</div>
<div class="mhd"><div class="s">[Alphonse] VARENNE_EnqSig se termine aujourd'hui</div><div><b>De</b> Alphonse · Plein Sens Ethique</div><div><b>À</b> Claire Morel &nbsp; <b>Cc</b> Stive</div><div class="mut">Vendredi 18 décembre 2026, 08:00</div></div>
<div class="mbd"><div class="mcard" id="mcard" style="padding:24px 30px">
 <div style="text-align:center;font:700 20px 'Barlow Condensed',sans-serif;letter-spacing:.06em">PLEIN SENS ETHIQUE</div>
 <h1 style="font-size:19px;color:#1f2430;margin:16px 0 10px">VARENNE_EnqSig se termine aujourd'hui</h1>
 <p style="font-size:15px;margin:0 0 12px">Bonjour Claire, la fin prévue au devis est aujourd'hui. Peut-on préparer la facture de solde de 9 300 € HT ? 21 jours saisis sur 25 prévus.</p>
 <div style="display:flex;justify-content:center;margin-top:16px"><span class="mbtn" id="openA" style="background:#1d4ed8;color:#fff">Répondre dans Alphonse</span></div>
 <p style="font-size:12.5px;color:#5b6472;margin:14px 0 0;text-align:center">Le lien ouvre la fiche du chantier. Vous y choisissez : facturer le solde, reporter ou prévoir un complément.</p>
</div></div></div>`;
function finDialog(){
  const opt=(k,t,d,on)=>`<div class="fopt${on?' sel':''}" data-o="${k}"><i class="${on?'on':''}"></i><div><div style="font-weight:600">${t}</div><div class="xs mut">${d}</div></div></div>`;
  return `<div class="ovl" id="finOvl"><div class="dlg"><div class="dh"><div class="t">VARENNE_EnqSig : la fin prévue au devis est aujourd'hui</div><div class="s">Solde à la remise du rapport · 9 300 € HT · 21 jours saisis sur 25 prévus</div></div>
<div class="db">${opt('oui','Facturer le solde maintenant','Alphonse prépare la facture ; vous la vérifiez ensuite.',false)}${opt('rep','Reporter la facture de solde','À une nouvelle date ; Stive le voit dans sa liste.',false)}<div id="repF" style="display:none;margin:-4px 0 0 34px"><div class="g2"><div><div class="lbl">Nouvelle date</div><div class="inp ed" id="repD" style="min-height:38px"></div></div><div><div class="lbl">Motif (facultatif)</div><div class="inp ed" id="repM" style="min-height:38px"></div></div></div></div>${opt('cpl','Prévoir un complément','Le client a accepté une prestation de plus ; joignez son accord.',false)}</div>
<div class="df"><span class="bt ol sm">Plus tard</span><span class="bt pr sm" id="finOk">Confirmer</span></div></div></div>`;
}

// --- Clôture du mois ---
function cloture4(){
  return shell('Clôture du mois','fin',`
<div class="ph"><div><h1>Clôture du mois</h1><div class="st">Une fois clos, les chiffres du mois ne bougent plus</div></div><div class="acts"><span class="bt ol sm">${I('cal','s3')}novembre 2026</span><span class="sbd neu" id="cutS"><span class="d"></span>Ouvert</span></div></div>
<div class="tabs"><span class="on">Vérifications</span><span>Travail réalisé et facturé</span><span>Mois clos</span></div>
<div style="display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:18px;align-items:start">
 <div class="box"><div style="font-weight:600;font-size:15px;margin-bottom:6px">Avant de clore novembre</div>
  ${['Temps saisis 3/3','Factures dues émises','Brouillons traités'].map(c=>`<div class="chk3"><span class="sbd neu sm ck" style="width:22px;justify-content:center;padding:0">·</span>${c}</div>`).join('')}</div>
 <div class="box"><div style="font-weight:600;font-size:15px">Clore le mois</div><div class="xs mut" style="margin-top:4px">Les temps de novembre passent en lecture seule et les montants ci-dessous sont figés. Un paiement reçu plus tard garde sa date réelle.</div>
  <div style="margin-top:14px"><span class="bt pr sm" id="closeBtn">${I('lock','s3')}Clore novembre</span></div></div>
</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px" id="amts">
 <div class="amt"><div class="l">Facturé en novembre</div><div class="v">27 900 €</div><div class="h">4 factures émises dans le mois</div></div>
 <div class="amt"><div class="l">Travail réalisé non facturé</div><div class="v">7 200 €</div><div class="h">à fin novembre : fait, pas encore facturé (FAE)</div></div>
 <div class="amt"><div class="l">Facturé d'avance</div><div class="v">9 016 €</div><div class="h">à fin novembre : facturé, travail à venir (PCA) · dont VARENNE 1 116 €</div></div>
</div>
<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap" id="pack"><span class="bt ol sm" id="packBtn">${I('dl','s3')}3 fichiers pour le comptable</span>
 <span class="file" style="display:none">${I('sheet','s3')}Registre des factures (format du facturier)</span><span class="file" style="display:none">${I('sheet','s3')}État figé : réalisé et facturé</span><span class="file" style="display:none">${I('file','s3')}Écritures pour votre outil comptable</span></div>`,{count:6,bell:2});
}

// --- Aujourd'hui : l'onglet vide et l'Excel ---
const xlFacturier4=()=>`<div class="xl"><div class="xt">PLS_facturier.xlsx <span>Excel</span></div><div class="rib"><span>Fichier</span><span>Accueil</span><span>Insertion</span><span>Mise en page</span><span>Formules</span><span>Données</span><span>Révision</span></div><div class="fx"><b>N108</b><i>?</i></div>
<table><colgroup><col style="width:42px"><col style="width:150px"><col style="width:170px"><col style="width:150px"><col><col style="width:96px"><col style="width:62px"><col style="width:92px"><col style="width:86px"><col style="width:84px"><col style="width:50px"><col style="width:96px"><col style="width:96px"></colgroup>
<tr><th></th><th>A</th><th>B</th><th>G</th><th>I</th><th>J</th><th>K</th><th>M</th><th>N</th><th>O</th><th>P</th><th>Q</th><th>U</th></tr>
<tr class="h"><td class="rn">1</td><td>Client</td><td>organisme</td><td>Alphonse</td><td>nom chantier</td><td>hono sans fr…</td><td>exo tva</td><td>date facture</td><td>n° facture</td><td>ttc</td><td>Payé</td><td>Date de paie…</td><td>RM</td></tr>
${[['103','CAPELLE','Capelle SA','CAPELLE_Enq','Enquête signalement · acompte','6 200','-','10/09/2026','2026002','7 440','oui','08/10/2026','Julien',0],['104','TALMONT','Talmont Industrie','TALMONT_Enq','Enquête · acompte','4 900','-','15/09/2026','2026003','5 880','oui','14/10/2026','Sophie',0],['105','HALIOS','Halios Groupe','HALIOS_EnqSig','Enquête interne · acompte','12 000','-','20/09/2026','2026004','14 400','non','','Julien',0],['106','MERIDIA','Meridia','MERIDIA_EnqRPS','Enquête RPS · acompte','10 500','-','25/09/2026','2026005','12 600','non','','Sophie',0],['107','ORLAN','Orlan','ORLAN_EnqHar','Enquête harcèlement · acompte','16 000','-','30/10/2026','2026006','19 200','non','','Sophie',0],['108','VARENNE','Varenne Services','VARENNE_EnqSig','Enquête interne · acompte','9 300','-','04/11/2026','?','11 160','non','','Claire',1]].map(r=>`<tr${r[13]?' class="y"':''}><td class="rn">${r[0]}</td>${r.slice(1,13).map((c,i)=>`<td${[5,9].includes(i+1)?' style="text-align:right"':''}>${c}</td>`).join('')}</tr>`).join('')}
${Array.from({length:9},(_,k)=>`<tr><td class="rn">${109+k}</td>${'<td></td>'.repeat(12)}</tr>`).join('')}
</table>
<div class="note">Pour savoir quoi relancer, Stive croise ce fichier, ses mails et les fiches chantier.</div>
<div class="sheets"><span>Non payé plus de 2 mois</span><span>Non payé moins de 2 mois</span><span class="on">Facturier</span><span>modele facture standard</span><span>Fichier Client</span><span>FAE</span></div></div>`;
function todaySplit(){
  navToday();
  const left=shell('Chantiers','cp',chantierHead('Facturation')+schedCard(`<tr><td colspan="5" class="mut" style="text-align:center;padding:18px">Aucun jalon renseigné.</td></tr>`,'0 €',' · L\'échéancier ne couvre pas le CA (écart : 18 600 €)')+billingInfoToday(false));
  let right=xlFacturier4();
  navTarget();
  const left2=left.replace(/>—</g,'>Non renseigné<').replace(' — repris',' : repris').replace(' — renseignées',', renseignées');
  return `<div class="split"><div class="pane"><div class="pl">Alphonse · onglet Facturation du chantier</div><div class="frame" id="fl"><div>${left2}</div></div></div><div class="pane"><div class="pl">Le facturier Excel de Stive</div><div class="frame" id="fr"><div>${right}</div></div></div></div>`;
}
function fitSplit(){$$('.split .frame').forEach(f=>{const c=f.firstElementChild;const s=f.clientWidth/1360;c.style.transform=`scale(${s})`;});}

// --- Section Finance : aujourd'hui → demain ---
const CMP=[['Revue mensuelle','Par chantier','Plus de tournée : un écart ou un solde en attente ressort tout seul.'],['À préparer','À faire','Devient des étapes : à préparer, à vérifier, à émettre, à envoyer.'],['Impayés','À faire','Devient « Envoyée », « En retard » et « Contestée ». L\'export Excel reste.'],['Facturier','Registre','Même contenu, au format du facturier de Stive.'],['Clôture › Checklist','Vérifications','Trois lignes : temps saisis, factures émises, brouillons traités.'],['Ajustements FAE/PCA','Travail réalisé et facturé','Figé à la clôture, au lieu d\'être recalculé à chaque affichage.'],['Valorisation production','Mois clos','Même public, une entrée de menu en moins.']];
const cmpScreen=()=>`<div class="cmp"><h2>La section Finance, aujourd'hui et demain</h2><div class="sub">Organisée autour de ce que chacun a à faire, pas autour des tableaux.</div>
<div class="rows"><div class="hd">Aujourd'hui</div><div></div><div class="hd">Demain</div><div class="hd">Pourquoi</div>
${CMP.map(([a,b,w])=>`<div class="o rw">${a}</div><div class="ar rw">→</div><div class="n rw">${b}</div><div class="w rw">${w}</div>`).join('')}</div></div>`;

// --- Synthèse ---
const SYN=[['Claire Morel','cheffe de projet','Dépose le devis, valide l\'échéancier, vérifie chaque facture, répond à la fin de mission dans Alphonse.'],['Stive','rôle Finance · référent facturation','Référent facturation : émet ce qui est vérifié, note l\'envoi et le paiement, relance. Une liste au lieu d\'un Excel.'],['Fabrice Ducellier','rôle Finance','Rôle Finance, comme Stive : émet, crée les avoirs, clôt le mois. Le partage entre eux est libre.'],['Lucas Bernard','consultant','Voit la facturation des chantiers, en lecture seule.'],['Associé de référence','','Mêmes droits que le chef de projet sur ses chantiers.'],['Le comptable','','Reçoit 3 fichiers par mois, aux chiffres figés.']];
const synScreen=()=>`<div class="cards6"><h2>Ce qui change pour chacun</h2><div class="g">${SYN.map(([p,r,d])=>`<div class="c"><div class="bar"></div><div class="p">${p}</div><div class="r">${r||'&nbsp;'}</div><div class="d">${d}</div></div>`).join('')}</div></div>`;

// --- Cartons de phase : où en est-on, qui agit, ce qu'on va voir ---
const PHASES=[
 ['Ouvrir le chantier','Claire Morel · cheffe de projet','Claire dépose le devis signé. Alphonse en tire l\'échéancier et les informations de facturation ; elle relit et valide d\'un clic. Stive, référent facturation de l\'enquête, peut aussi le faire à sa place.'],
 ['Vérifier la facture','Claire Morel · cheffe de projet','Le 2 novembre, date prévue de l\'acompte, Alphonse prépare la facture. Claire la vérifie depuis l\'échéancier du chantier, sans changer d\'écran.'],
 ['Émettre et suivre','Stive · rôle Finance, référent facturation','Stive émet la facture. Il l\'envoie ou la dépose sur le portail du client comme aujourd\'hui, puis note le statut dans Alphonse. Toute l\'équipe voit où en est la facture.'],
 ['Fin de mission','Le 18 décembre, fin prévue au devis','Alphonse écrit à Claire, Stive en copie. Le lien ouvre Alphonse, où elle choisit : facturer le solde, reporter ou prévoir un complément.'],
 ['Clôturer le mois','Fabrice Ducellier · rôle Finance','Une fois par mois, la finance vérifie puis clôt le mois. Les chiffres sont figés et le comptable reçoit trois fichiers.']
];
const phaseCard=(i)=>`<div class="k">Étape ${i+1} sur ${PHASES.length}</div><div class="t">${PHASES[i][0]}</div><div class="bar"></div><div class="who">${PHASES[i][1]}</div><div class="s">${PHASES[i][2]}</div><div class="ph">${PHASES.map((p,k)=>`<span class="${k<i?'done':k===i?'on':''}">${k+1}. ${p[0]}</span>`).join('')}</div>`;

// ===================================================================
// Étapes v4
// ===================================================================
const CL='Claire Morel · cheffe de projet', ST_='Stive · rôle Finance, référent facturation', FD='Fabrice Ducellier · rôle Finance';
const fichePath=(x)=>['Chantiers','VARENNE_EnqSig','Facturation'].concat(x?[x]:[]);
const N=(k)=>`${k} / 13`;
navTarget();

// Carton de phase : la page suivante se prépare derrière, puis le carton s'efface.
async function phase(i,key,html,ms=5600){
  cur.classList.remove('on'); capEl.classList.add('off'); crumbEl.classList.add('off'); where(-1);
  showCard(phaseCard(i));
  await sleep(250);
  const ax=await show(key,html); scroller().scrollTop=0;
  await sleep(ms); hideCard(); await sleep(450);
  return ax;
}

const STEPS=[
 {name:'Ouverture',async run(){
   where(-1); crumbEl.classList.add('off');
   showCard(`${LOGO}<div class="t">Facturer une enquête, de la fiche chantier au comptable</div><div class="bar"></div><div class="s">Proposition pour Plein Sens Ethique · point du 12 novembre 2026</div>`);
   await show('today',todaySplit()); fitSplit();
   await sleep(3400);
 }},
 {name:'1. Aujourd\'hui',async run(){
   const ax=await show('today',todaySplit()); fitSplit(); hideCard(); where(-1);
   crumb('Aujourd\'hui',['Alphonse et le facturier Excel']);
   await caption(N(1),'Aujourd\'hui, une facture passe par un Excel, des copier-coller et des relances de mémoire.');
   await sleep(1500);
   const y=$$('#fr tr.y td',ax)[9]||$('#fr tr.y',ax); if(y) await moveTo(y,false);
   await sleep(1800);
   const e=$$('#fl .val',ax)[0]; if(e) await moveTo(e,false);
   await sleep(3800);
 }},
 {name:'2. Claire dépose le devis',card:true,async run(){
   const ax=await phase(0,'fiche',ficheTab({docs:'two',infos:'empty',sched:'empty'}));
   crumb(CL,fichePath()); where(0);
   const docs=$$('#docs .doc',ax), note=$('#docNote',ax); docs.forEach(d=>d.style.visibility='hidden'); if(note) note.style.visibility='hidden';
   await caption(N(2),'Claire dépose le devis signé et le bon de commande dans la fiche du chantier.');
   await sleep(800);
   await moveTo($('.drop2',ax));
   for(const d of docs){const sub=$('.xxs',d),orig=sub.textContent;sub.innerHTML='<span class="spin"></span>Lecture…';d.style.visibility='';d.classList.add('slide-in');await sleep(1150);sub.textContent=orig;flash(d);await sleep(350);}
   if(note){note.style.visibility='';flash(note,'pflash');}
   await caption(N(2),'Alphonse lit les documents, puis les efface : seules les informations validées sont gardées.');
   await sleep(3200);
 }},
 {name:'3. L\'échéancier repris du devis',async run(){
   const ax=await show('fiche',ficheTab({docs:'two',infos:'empty',sched:'prop'}));
   crumb(CL,fichePath('Échéancier')); where(0);
   const rows=$$('#sched tbody tr[data-r]',ax), ctrl=$('#ctrl',ax);
   rows.forEach(r=>r.style.visibility='hidden'); ctrl.style.visibility='hidden';
   await caption(N(3),'L\'échéancier est repris du devis : ici, la moitié à la commande et la moitié à la remise du rapport.');
   await scrollTopOf($('#sched',ax),70); await sleep(600);
   const src=$('#sched .card-h .src',ax); if(src){flash(src,'pflash'); await moveTo(src,false);}
   for(const r of rows){r.style.visibility='';r.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:450,easing:'ease-out'});await sleep(900);}
   ctrl.style.visibility='';flash(ctrl,'pflash'); await sleep(1200);
   await caption(N(3),'Un autre devis, un autre échéancier : trois échéances, 30 / 40 / 30, seraient reprises de la même façon.');
   await sleep(3600);
 }},
 {name:'4. Les informations de facturation',async run(){
   const ax=await show('fiche',ficheTab({docs:'two',infos:'edit',sched:'prop'}));
   crumb(CL,fichePath('Informations de facturation')); where(0);
   const fs=$$('#infos [data-f]',ax), btns=$('#infoBtns',ax);
   // les champs restent en place : ils se remplissent un à un, sans trou dans la page
   fs.forEach(f=>{const inp=$('.inp',f),ch=$('.src',f);inp.dataset.keep=inp.innerHTML;inp.innerHTML='<span class="spin"></span>';inp.classList.add('wait');if(ch)ch.style.visibility='hidden';});
   btns.style.visibility='hidden';
   await caption(N(4),'Puis les informations de facturation : chaque champ montre sa source, l\'entité déjà connue est retrouvée.');
   await scrollTopOf($('#infos',ax),70); await sleep(500);
   await click($('#useEnt',ax),false); $('#useEnt',ax).outerHTML='<span class="sbd ok sm"><span class="d"></span>Entité existante utilisée</span>'; await sleep(500);
   for(const f of fs){const inp=$('.inp',f),ch=$('.src',f);inp.innerHTML=inp.dataset.keep;inp.classList.remove('wait');if(ch){ch.style.visibility='';flash(ch,'pflash');}await sleep(f.dataset.f==='contact'?700:330);}
   await sleep(700);
   // Claire glisse un mail : le contact se remplit
   const dz=$('#docs .docs',ax);
   await caption(N(4),'Le contact manque : Claire glisse un mail du client, Alphonse le lit dans la signature.');
   await scrollTo(0,700);
   dz.insertAdjacentHTML('beforeend',`<div class="doc slide-in" id="mailDoc"><span class="ty" style="background:#0F766E">MAIL</span><div style="min-width:0"><div style="font-weight:500">Re : bon de commande</div><div class="xxs mut"><span class="spin"></span>Lecture…</div></div></div>`);
   await moveTo($('#mailDoc',ax),false); await sleep(1100);
   $('#mailDoc .xxs',ax).textContent='Lu · mail du 28/10, signature';
   const cf=$('#infos [data-f="contact"]',ax); await scrollTopOf(cf,140); await sleep(300);
   const inp=$('.inp',cf); inp.className='inp ed focus'; await type(inp,'Nadia Lemoine, comptabilité fournisseurs',30);
   inp.className='inp ed ai'; const ch=$('.src',cf); ch.className='src'; ch.innerHTML=`${I('file','s2')}Mail du client, signature`; flash(cf);
   btns.style.visibility=''; await ensureVisible(btns); await sleep(500);
   await caption(N(4),'Claire valide l\'échéancier et les informations d\'un seul clic.');
   const v=$('#validBtn',ax); await click(v,false); v.classList.add('done'); v.innerHTML=`${I('check','s3')}Échéancier et informations validés le 26/10`;
   await sleep(2600);
 }},
 {name:'5. Claire vérifie l\'acompte',card:true,async run(){
   const ax=await phase(1,'facture',factureTab());
   crumb(CL,fichePath('Échéancier')); where(1);
   await caption(N(5),'Le 2 novembre, l\'acompte passe « À vérifier ». Claire l\'ouvre depuis l\'échéancier.');
   await scrollTopOf($('#sched',ax),70); await sleep(900);
   const row=$('#sched tr[data-r="a"]',ax); flash(row,'pflash'); await sleep(900);
   await click($('#verifBtn',ax),false);
   const root=app.firstElementChild; root.style.position='relative'; root.insertAdjacentHTML('beforeend',verifDrawer());
   await caption(N(5),'La facture s\'ouvre à côté de l\'échéancier : Claire relit, Alphonse a déjà fait trois contrôles.');
   await sleep(2600); await moveTo($('#pdf',root),false); await sleep(1600);
   await click($('#okBtn',root),false);
   const sv=$$('#fil .sv',root); $('.c',sv[1]).className='c ok'; $('.c',sv[1]).innerHTML=I('check','s3'); $('.dd',sv[1]).textContent='Claire Morel, le 03/11/2026'; flash(sv[1]);
   $('.c',sv[2]).className='c cur'; $('.c',sv[2]).textContent='3'; $('#fStat',root).innerHTML=ST('em','À émettre'); await sleep(1300);
   $('#drawer',root).remove(); $('#dimm',root).remove();
   $('.scell',row).innerHTML=ST('em','À émettre'); $('.acell',row).innerHTML=''; const n=$('.rnote',row); if(n) n.textContent='Vérifiée par Claire Morel le 03/11 · chez Stive'; flash(row,'pflash');
   await caption(N(5),'Dans l\'échéancier, l\'acompte passe « À émettre » : c\'est maintenant à Stive.');
   await sleep(3000);
 }},
 {name:'6. Stive émet',card:true,async run(){
   const rows=fr('V','VARENNE_EnqSig','Claire Morel','Acompte','9 300',ST('em','À émettre'),'Vérifiée le 03/11 par Claire Morel',`<span class="bt pr xs em">${I('send','s3')}Émettre</span>`)+
              fr('T','TALMONT_Enq','Sophie Martin','Solde','4 900',ST('em','À émettre'),'Vérifiée le 03/11 par Sophie Martin',`<span class="bt pr xs em">${I('send','s3')}Émettre</span>`);
   const side=`<div class="box" style="padding:14px 16px"><div class="lbl" style="margin-bottom:8px">Contrôles avant émission</div><div style="display:flex;gap:8px;align-items:center;font-size:13px">${I('okc','s3')}Aucun doublon détecté</div><div style="display:flex;gap:8px;align-items:center;font-size:13px;margin-top:6px">${I('okc','s3')}Montants conformes aux devis</div></div>`;
   const ax=await phase(2,'afaire-f',aFaire('steve','04/11/2026',rows,{side}));
   crumb(ST_,['Facturation','À faire']); where(2);
   await caption(N(6),'Stive émet ce que Claire a vérifié : chaque facture est validée par deux personnes.');
   await sleep(1600);
   const nums={V:'F2026-00007',T:'F2026-00008'};
   for(const id of ['V','T']){const r=$(`tr[data-c="${id}"]`,ax); await click($('.em',r),false);
     $('.fcell',r).innerHTML=`${r.querySelector('.fcell').textContent} <b>${nums[id]}</b>`; $('.scell',r).innerHTML=ST('env','À envoyer'); $('.icell',r).textContent='Émise le 04/11, numéro définitif attribué'; $('.em',r).remove(); flash(r,'pflash');
     { const cs=$$('.cnt b',ax); cs[2].textContent=String(+cs[2].textContent-1); cs[3].textContent=String(+cs[3].textContent+1); flash(cs[2].parentElement,'pflash'); }
     await sleep(900);}
   await sleep(2400);
 }},
 {name:'7. Envoi et suivi : des statuts',async run(){
   const ax=await show('afaire-s',aFaire('steve','05/11/2026',suiviRows(),{alert:SUIVI_ALERT,cnt:SUIVI_CNT})); scroller().scrollTop=0;
   crumb(ST_,['Facturation','À faire']); where(2);
   await caption(N(7),'Alphonse n\'envoie rien : Stive dépose la facture sur le portail du client, comme aujourd\'hui.');
   flash($('#al',ax)); await sleep(1800);
   const v=$('tr[data-c="V"]',ax); await click($('.dep',v),false);
   $('.acell',v).insertAdjacentHTML('beforeend',notePop()); popIn($('#pop',ax));
   await caption(N(7),'Puis il note le statut : « Déposée sur le portail », avec la date. La relance part de là.');
   await sleep(2200); await click($('#popOk',ax),false); $('#pop',ax).remove();
   $('.scell',v).innerHTML=ST('enc','Envoyée'); $('.icell',v).textContent='Déposée sur le portail le 05/11 par Stive'; $('.dep',v).remove(); flash(v,'pflash');
   { const cs=$$('.cnt b',ax); cs[3].textContent='2'; cs[4].textContent='2'; flash(cs[3].parentElement,'pflash'); flash(cs[4].parentElement,'pflash'); }
   await sleep(1400);
   await caption(N(7),'Une facture en retard ressort seule ; Alphonse prépare le rappel, que Stive envoie de sa messagerie.');
   const h=$('tr[data-c="H"]',ax); await click($('.rap',h),false);
   const d=document.createElement('div'); d.className='draft'; d.style.cssText='position:absolute;right:40px;top:478px;width:460px;z-index:5';
   d.innerHTML=rappelDraft();
   app.firstElementChild.style.position='relative'; app.firstElementChild.appendChild(d); popIn(d);
   await sleep(4200);
 }},
 {name:'8. Ce que voit l\'équipe',async run(){
   const ax=await show('consultant',consultantView()); scroller().scrollTop=0;
   $$('.sb .it',ax).forEach(it=>{if(['Facturation','Clôture du mois','Clients','Consultants','Suivi feuilles de temps','Exports','Paramètres'].includes(it.textContent.trim().replace(/\d+$/,'').trim()))it.remove();});
   $$('.sb .sec',ax).forEach(sc=>{if(['Finance','Administration'].includes(sc.textContent.trim()))sc.remove();});
   crumb('Lucas Bernard · consultant',['Chantiers','VARENNE_EnqSig','Facturation']); where(2);
   await caption(N(8),'Toute l\'équipe voit la facturation, en lecture seule : l\'échéance, sa facture et son statut, dans la même ligne.');
   await sleep(1200); const l=$('#consLine',ax); flash(l,'pflash'); await moveTo(l,false);
   await sleep(1800); const r=$('#consSched tr[data-r="a"]',ax); if(r){await ensureVisible(r); flash(r,'pflash'); await moveTo($('.fcell',r),false);} await sleep(3200);
 }},
 {name:'9. Par chantier',async run(){
   const ax=await show('parch',parChantier()); scroller().scrollTop=0;
   crumb(ST_,['Facturation','Par chantier']); where(2);
   await caption(N(9),'Production, déjà facturé, écart : l\'état de la facturation, à jour chaque jour, groupé par chef de projet.');
   const rows=$$('tbody tr',ax); rows.forEach(r=>r.style.display='none'); await sleep(400);
   for(const r of rows){rowIn(r);await sleep(140);}
   await sleep(1200); const c=$('tr[data-c="CAPELLE"]',ax); flash(c,'pflash'); await moveTo($('.st',c),false);
   await sleep(5200);
 }},
 {name:'10. Fin de mission : le mail',card:true,async run(){
   const ax=await phase(3,'mail',mail4(),5200);
   crumb(CL,['Messagerie','Mail d\'Alphonse, Stive en copie']); where(3);
   await caption(N(10),'Le jour de la fin prévue au devis, un seul mail. Il ne fait qu\'ouvrir Alphonse.');
   await sleep(2600); await moveTo($('#openA',ax),false); await sleep(800);
   await click($('#openA',ax),false); await sleep(600);
 }},
 {name:'11. La réponse dans Alphonse',async run(){
   const ax=await show('fiche-fin',ficheTab({docs:'mail',sched:'fin',infos:'saved'}));
   crumb(CL,fichePath('Fin de mission')); where(3);
   await scrollTopOf($('#sched',ax),70);
   const root=app.firstElementChild; root.style.position='relative'; root.insertAdjacentHTML('beforeend',finDialog());
   await caption(N(11),'La fiche du chantier s\'ouvre sur la question : facturer le solde, reporter, ou prévoir un complément.');
   await sleep(2600);
   const rep=$('.fopt[data-o="rep"]',root); await click(rep,false); rep.classList.add('sel'); $('i',rep).classList.add('on'); popIn($('#repF',root));
   await sleep(500); await type($('#repD',root),'08/01/2027',70); await type($('#repM',root),'Restitution décalée par le client',32);
   await sleep(600); await click($('#finOk',root),false); $('#finOvl',root).remove();
   const row=$('#sched tr[data-r="s"]',ax);
   $('.dcell',row).textContent='08/01/2027'; $('.scell',row).innerHTML=ST('av','À venir');
   const rn=$('.rnote',row); if(rn) rn.textContent='Reportée par Claire Morel le 18/12 : restitution décalée par le client'; flash(row,'pflash');
   await caption(N(11),'Le solde est reporté au 8 janvier ; Stive le voit dans sa liste. Le 8 janvier, la facture suit le même circuit.');
   await sleep(3800);
 }},
 {name:'12. Clôture du mois',card:true,async run(){
   const ax=await phase(4,'cloture',cloture4());
   crumb(FD,['Clôture du mois','Vérifications']); where(4);
   await caption(N(12),'Novembre est clos : ses chiffres ne bougent plus, et le comptable reçoit trois fichiers.');
   hide($$('#amts .amt',ax)); await sleep(500);
   for(const k of $$('.ck',ax)){k.className='sbd ok sm ck';k.textContent='✓';flash(k.parentElement);await sleep(550);}
   await click($('#closeBtn',ax)); const s=$('#cutS',ax); s.className='sbd ok'; s.innerHTML='<span class="d"></span>Clos'; flash(s,'pflash'); $('#closeBtn',ax).outerHTML='<span class="sbd ok">'+I('lock','s3')+'Novembre clos le 30/11</span>';
   for(const a of $$('#amts .amt',ax)){reveal(a);countUp($('.v',a),700);await sleep(350);}
   await sleep(1600); await click($('#packBtn',ax)); $$('#pack .file',ax).forEach((f,i)=>setTimeout(()=>popIn(f),i*300));
   await sleep(3200);
 }},
 {name:'13. La section Finance demain',async run(){
   cur.classList.remove('on'); crumbEl.classList.add('off'); where(-1);
   const ax=await show('cmp',cmpScreen());
   await caption(N(13),'Sept pages deviennent six, organisées autour de ce que chacun a à faire.');
   const rw=$$('.rw',ax); rw.forEach(e=>e.style.opacity=0); await sleep(400);
   for(let i=0;i<rw.length;i+=4){for(let k=0;k<4;k++){const e=rw[i+k];e.style.transition='opacity .4s';e.style.opacity=1;} if(rw[i]) rw[i].style.textDecoration='line-through'; await sleep(1100);}
   await sleep(5500);
 }},
 {name:'Synthèse',async run(){
   cur.classList.remove('on'); crumbEl.classList.add('off'); where(-1);
   const ax=await show('syn',synScreen());
   await caption('','Chacun n\'agit qu\'à son étape, et chaque facture a toujours un responsable.');
   const cs=$$('.cards6 .c',ax); cs.forEach(c=>c.style.opacity=0); await sleep(300);
   for(const c of cs){c.style.transition='opacity .45s, transform .45s';c.style.transform='translateY(10px)';c.style.opacity=1;requestAnimationFrame(()=>c.style.transform='none');await sleep(700);}
   await sleep(6000);
 }},
 {name:'Fin',async run(){
   cur.classList.remove('on'); capEl.classList.add('off'); ver.hidden=true; crumbEl.classList.add('off'); where(-1);
   showCard(`${LOGO}<div class="t">Maquette : données fictives. Ce parcours n'est pas encore développé ; il s'appuie sur des briques qui existent dans Alphonse</div><div class="bar"></div><div class="s">Écrans conçus à partir du code d'Alphonse, novembre 2026</div>`);
   await sleep(4500);
 }}
];

// ===== Navigation =====
let idx=-1, auto=false, autoT0=0;
window.__chapters=[]; window.__done=false;
async function play(i){
  if(i<0||i>=STEPS.length)return;
  RUN++; idx=i;
  ver.hidden=true;
  $('#ctl>span').hidden=i!==0;
  $$('.ovl').forEach(o=>o.remove());
  if(i!==0&&i!==STEPS.length-1&&!STEPS[i].card) hideCard();
  if(auto) window.__chapters.push({i,name:STEPS[i].name,t:(performance.now()-autoT0)/1000});
  try{
    await STEPS[i].run();
    if(auto){ if(i+1<STEPS.length) play(i+1); else {auto=false;window.__done=true;document.body.classList.remove('auto');} }
  }catch(e){ if(!(e instanceof Cancel)) console.error(e); }
}
function startAuto(){auto=true;document.body.classList.add('auto');window.__chapters=[];window.__done=false;autoT0=performance.now();play(0);}
window.__startAuto=startAuto; window.__play=play;
const stopAuto=()=>{auto=false;document.body.classList.remove('auto');};
$('#next').addEventListener('click',()=>{stopAuto();play(Math.min(idx+1,STEPS.length-1));});
$('#prev').addEventListener('click',()=>{stopAuto();play(Math.max(idx-1,0));});
addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'){stopAuto();play(Math.min(idx+1,STEPS.length-1));}
  else if(e.key==='ArrowLeft'){stopAuto();play(Math.max(idx-1,0));}
  else if(e.key==='a'||e.key==='A'){startAuto();}
});
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>{ if(!/[?&]noinit/.test(location.search)) play(0); });
