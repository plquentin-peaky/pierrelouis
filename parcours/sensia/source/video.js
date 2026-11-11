// Projection « compléter Alphonse depuis Sens IA » : scènes et animation.
// Les durées de la voix off (DUR) pilotent le rythme : chaque scène dure au moins le temps de sa phrase.
const stage=$('#stage'), winL=$('#winL'), winR=$('#winR'), mcp=$('#mcp'), siaIn=$('#siaIn'), alpIn=$('#alpIn');
const capEl=$('#cap'), cur=$('#cur'), card=$('#card'), who=$('#who'), mdir=$('#mdir'), atoast=$('#atoast');
const Q=new URLSearchParams(location.search);
const SPEED=Q.has('fast')?0.02:1; if(SPEED<1) document.body.classList.add('fast');
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms*SPEED));
const T=()=>performance.now();
let T0=0; window.__audio=[]; window.__chapters=[]; window.__done=false;
const snap=async(n)=>{ if(window.__snap){ await new Promise(r=>setTimeout(r,SPEED<1?450:0)); await window.__snap(n);} };

// ---------- icônes Sens IA (tracés lucide) ----------
const LP={
 sparkles:'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>',
 brain:'<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>',
 video:'<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
 briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="6" width="20" height="14" rx="2"/>',
 grad:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
 layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
 zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
 store:'<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20v2a3 3 0 0 1-6 0 3 3 0 0 1-8 0 3 3 0 0 1-6 0Z"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', plus:'<path d="M5 12h14M12 5v14"/>',
 mic:'<path d="M12 19v3M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
 plug:'<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
 calclock:'<path d="M16 2v4M8 2v4M3 10h5M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><circle cx="16" cy="16" r="6"/><path d="M17.5 17.5 16 16.3V14"/>',
 arrowr:'<path d="M5 12h14M12 5l7 7-7 7"/>', chevd:'<path d="m6 9 6 6 6-6"/>', chevr:'<path d="m9 18 6-6-6-6"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',
 mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
 file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
 cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 msgs:'<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
 send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
 lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
 pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
 ext:'<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
 receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8H8M16 12H8M13 16H8"/>'
};
const L=(n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${LP[n]||''}</svg>`;

// ---------- mise en page des deux fenêtres ----------
const GEO={L:[1060,684],R:[684,1060],M:[872,872]};
const SIA_W=1160, ALP_W=1280, VPH=784;
function focus(m){
  const [wl,wr]=GEO[m];
  winL.style.left='40px'; winL.style.width=wl+'px';
  mcp.style.left=(40+wl)+'px';
  winR.style.left=(40+wl+96)+'px'; winR.style.width=wr+'px';
  const sl=wl/SIA_W, sr=wr/ALP_W;
  siaIn.style.transform=`scale(${sl})`; siaIn.style.width=SIA_W+'px'; siaIn.style.height=(VPH/sl)+'px';
  alpIn.style.transform=`scale(${sr})`; alpIn.style.width=ALP_W+'px'; alpIn.style.height=(VPH/sr)+'px';
  winL.classList.toggle('act',m==='L'); winR.classList.toggle('act',m==='R');
  winL.classList.toggle('dim',m==='R'); winR.classList.toggle('dim',m==='L');
}
async function focusTo(m){focus(m);await sleep(980);}
function noAnim(fn){[winL,winR,mcp,siaIn,alpIn].forEach(e=>e.style.transition='none');fn();void stage.offsetWidth;[winL,winR,mcp,siaIn,alpIn].forEach(e=>e.style.transition='');}

// ---------- utilitaires ----------
function cap(t){ if(!t){capEl.classList.add('off');return;} capEl.firstElementChild.innerHTML=t; capEl.classList.remove('off'); }
function center(el){const r=el.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];}
function cursorAt(x,y,anim=true){ if(!anim)cur.style.transition='none'; cur.style.transform=`translate(${x}px,${y}px)`; if(!anim){void cur.offsetWidth;cur.style.transition='';} }
async function click(el){
  const [x,y]=center(el); cur.classList.add('on'); cursorAt(x,y); await sleep(760);
  const h=document.createElement('div'); h.className='halo'; h.style.left=x+'px'; h.style.top=y+'px'; stage.appendChild(h); setTimeout(()=>h.remove(),700);
  await sleep(240);
}
const hideCur=()=>cur.classList.remove('on');
async function say(id,fn,tail=350){
  window.__audio.push({id,t:(T()-T0)/1000});
  const need=(DUR[id]||3)*1000+tail;
  const t=T(); if(fn) await fn();
  if(SPEED<1) return; const left=need-(T()-t); if(left>0) await sleep(left);
}
function chapter(name){window.__chapters.push({name,t:(T()-T0)/1000});}
function showCard(html){card.innerHTML=html;card.classList.remove('off');}
async function hideCard(){card.classList.add('off');await sleep(650);}
const rvIn=async(sel,ms=0)=>{await sleep(ms);const e=typeof sel==='string'?$(sel,card):sel;e&&e.classList.add('in');};

// donnée en transit : une pastille part de `from`, passe par le connecteur MCP, arrive sur `to`
async function fly(from,to,label,o={}){
  const [x1,y1]=center(from), [x3,y3]=center(to), [x2,y2]=center($('.pill',mcp));
  const c=document.createElement('div'); c.className='chip'+(o.read?' read':''); c.textContent=label; stage.appendChild(c);
  const w=c.offsetWidth/2, h=c.offsetHeight/2; const P=(x,y,s=1,op=1)=>({transform:`translate(${x-w}px,${y-h}px) scale(${s})`,opacity:op});
  const d=(o.dur||1150)*SPEED;
  const a=c.animate([{...P(x1,y1,.6,0),offset:0},{...P(x1,y1,1,1),offset:.12},{...P(x2,y2,1.06,1),offset:.5,easing:'ease-in-out'},{...P(x3,y3,1,1),offset:.9},{...P(x3,y3,.5,0),offset:1}],{duration:Math.max(d,30),easing:'ease-in-out',fill:'forwards'});
  await a.finished; c.remove();
}
function mcpDir(d,txt){ mcp.classList.remove('l','r'); if(d){mcp.classList.add(d); mdir.innerHTML=txt; mdir.classList.add('on');} else mdir.classList.remove('on'); }
function toast(html){atoast.innerHTML=`<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>${html}</span>`;atoast.classList.add('on');}
const toastOff=()=>atoast.classList.remove('on');

// ---------- Sens IA ----------
const PEOPLE={
 lea:{n:'Léa Martin',f:'Léa',r:'consultante',i:'LM',convs:['Feuille de temps de la semaine','Grille d\'analyse Brenne','Synthèse des entretiens Halios','Trame d\'entretien managers','Compte rendu atelier du 10/11']},
 claire:{n:'Claire Morel',f:'Claire',r:'cheffe de projet',i:'CM',convs:['Facturation Varenne','Note de cadrage Varenne','Planning des entretiens','Relecture du rapport Halios','Brief du matin']},
 stive:{n:'Stive',f:'Stive',r:'finance, référent facturation',i:'ST',convs:['Factures à émettre','Relances de la semaine','Point clôture d\'octobre','Brief du matin']}
};
function siaShell(p){
  const u=PEOPLE[p];
  return `<div class="sia"><div class="rail"><div class="lg">PS</div><div class="ri">${L('search')}</div>
   <div class="ri on">${L('sparkles')}</div><div class="ri">${L('brain')}</div><div class="ri">${L('video')}</div><div class="ri">${L('briefcase')}</div><div class="ri">${L('grad')}</div>
   <div class="me">${u.f[0]}</div></div>
  <div class="convs"><div class="hd">
    <div class="mode"><span class="on">${L('layers','s3')}Cowork</span><span>${L('zap','s3')}Chat</span></div>
    <div class="newr"><span class="ibtn">${L('menu')}</span><span class="obtn">${L('plus','s4')}Nouvelle tâche</span></div>
    <div class="gbtn">${L('store','s4')}Explorer les agents</div>
    <div class="sinp">${L('search','s4')}Rechercher...</div>
    <div class="flt"><span class="on">Tout</span><span>Cowork</span><span>Chat</span></div>
  </div><div class="cl">${u.convs.map((c,i)=>`<div class="${i===0?'on':''}" ${i===0?'id="conv0" style="display:none"':''}>${c}</div>`).join('')}</div></div>
  <div class="chat"><div class="msgs" id="msgs"><div class="hello" id="hello"><h2>Bonjour, ${u.f}.</h2></div><div class="mw" id="mw"></div></div>
   <div class="comp"><div class="cbox"><div class="ta" id="ta">Posez votre question à Sens IA…  (Maj+Entrée pour aller à la ligne)</div>
    <div class="bar"><span class="bi">${L('plus','s4')}</span><span class="bi">${L('mic','s4')}</span><span class="bi">${L('plug','s4')}</span><span class="bi">${L('calclock','s4')}</span>
     <span class="sel"><i class="lg2"></i>Avancé${L('chevd','s2')}</span><span class="sel">${L('briefcase','s3')}Projet${L('chevd','s2')}</span>
     <span class="snd dis" id="snd">${L('arrowr','s4')}</span></div></div></div></div></div>`;
}
const PH='Posez votre question à Sens IA…  (Maj+Entrée pour aller à la ligne)';
function down(){const m=$('#msgs');m.scrollTo({top:m.scrollHeight,behavior:SPEED<1?'auto':'smooth'});}
function add(html){const mw=$('#mw');const d=document.createElement('div');d.innerHTML=html;const el=d.firstElementChild;el.classList.add('pin');mw.appendChild(el);down();return el;}
async function ask(text,ms=20){
  const ta=$('#ta'), snd=$('#snd'); ta.classList.add('t'); ta.innerHTML='<span class="caret"></span>';
  let s=''; for(const ch of text){s+=ch;ta.innerHTML=s.replace(/</g,'&lt;')+'<span class="caret"></span>';await sleep(ms);}
  snd.classList.remove('dis'); await sleep(250); await click(snd);
  const h=$('#hello'); if(h){h.remove();} const c0=$('#conv0'); if(c0)c0.style.display='';
  ta.classList.remove('t'); ta.textContent=PH; snd.classList.add('dis');
  add(`<div class="u"><p>${text}</p></div>`); hideCur(); await sleep(350);
}
// groupe d'outils, comme dans Sens IA (« Utilise n outils », puis « Utilisé n outils »)
function toolGroup(n){return add(`<div class="a"><div class="tg"><div class="sum"><span class="lbl">Utilise ${n} outils</span>${L('chevd','s2')}</div><div class="lst"></div></div></div>`);}
async function tool(g,icon,name,line,o={}){
  const lst=$('.lst',g); const d=document.createElement('div'); d.className='tl pin';
  d.innerHTML=`<div class="r1"><span class="sp"></span><span>${name}…</span>${o.mcp?'<em>MCP</em>':''}</div><div class="r2"></div>`; lst.appendChild(d); down();
  if(o.during) await o.during(d); else await sleep(o.ms||850);
  d.innerHTML=`<div class="r1">${L(icon,'s3')}<span>${name}</span>${o.mcp?'<em>MCP</em>':''}<small>${o.t||'1,2 s'}</small></div><div class="r2">${line}</div>`;
  await sleep(200); return d;
}
function toolsDone(g,n){const lst=$('.lst',g);const d=document.createElement('div');d.className='tl';d.innerHTML=`<div class="ok">${L('check','s2')}Terminé</div>`;lst.appendChild(d);$('.lbl',g).textContent=`Utilisé ${n} outils`;}
function askCard(html){const cb=$('.cbox');cb.style.display='none';const d=document.createElement('div');d.innerHTML=html;const el=d.firstElementChild;el.classList.add('pin');el.style.cssText='max-width:896px;margin:0 auto 4px';cb.parentElement.insertBefore(el,cb);down();return el;}
function toolsFold(g){$('.lst',g).style.display='none';$('.sum svg',g).outerHTML=L('chevr','s2');}

// ---------- Alphonse : feuille de temps ----------
USERS.lea=['Léa Martin','Consultante Senior','LM'];
const DAYS=[[2,'L'],[3,'M'],[4,'M'],[5,'J'],[6,'V'],[7,'S'],[8,'D'],[9,'L'],[10,'M'],[11,'M'],[12,'J'],[13,'V']];
const CRA=[
 {sec:'Chantiers vendus'},
 {k:'hal',n:'HALIOS_EnqSig',c:'Halios Mutuelle',prev:'9',v:{2:1,3:.5,5:1,6:.5}},
 {k:'bre',n:'BRENNE_Enq',c:'Brenne Habitat',prev:'5',v:{3:.5,4:1}},
 {sec:'Chantiers internes'},
 {k:'int',n:'PSE_Interne',c:'Vie du cabinet',prev:'·',v:{6:.5}}
];
const fmtD=(x)=>x===0?'':String(x).replace('.',',');
function cellHtml(k,d,v){
  if(d===8||d===11) return `<span class="cc off">${LP.lock?`<svg viewBox="0 0 24 24">${LP.lock}</svg>`:''}</span>`;
  return `<span class="cc ${v===1?'f':v?'h':''} ${d===7?'sat':''}" data-c="${k}-${d}">${v?fmtD(v):'0'}</span>`;
}
function craPage(){
  const head=DAYS.map(([d,l])=>`<th class="${d===7?'am':''} ${d===13?'td':''}"><div class="dn">${String(d).padStart(2,'0')}</div><div class="dl">${l}</div></th>`).join('');
  const rows=CRA.map(r=>{
    if(r.sec) return `<tr class="sec"><td colspan="${DAYS.length+3}">${r.sec}</td></tr>`;
    const tot=Object.values(r.v).reduce((a,b)=>a+b,0);
    return `<tr data-row="${r.k}"><td class="l"><b>${r.n}</b><small>${r.c}</small></td><td class="s">${r.prev}</td><td class="s re" data-re="${r.k}">${fmtD(tot)}</td>${DAYS.map(([d])=>`<td class="${d===13?'td':''}">${cellHtml(r.k,d,r.v[d]||0)}</td>`).join('')}</tr>`;
  }).join('');
  const tot=DAYS.map(([d])=>{const s=CRA.reduce((a,r)=>a+((r.v&&r.v[d])||0),0);return `<td class="${d===13?'td':''}" data-t="${d}">${s?`<span class="${s===1?'tok':''}">${fmtD(s)}</span>`:'<span style="color:#C9C9C9">·</span>'}</td>`;}).join('');
  const inner=`<div><div class="eyb">Mon activité</div><div class="ph" style="border-bottom:none;padding-bottom:0"><div><h1>Feuille de temps</h1><div class="st">Saisie à la décimale de journée · raccourcis ⌨︎ disponibles</div></div></div></div>
  <div class="cband"><div class="r1"><span class="xs mut" style="font-size:12px;color:var(--mfg)">Enregistré</span><div class="mn"><span style="color:var(--mfg)">‹</span>novembre 2026<span style="font-size:12px;color:var(--mfg)">⌄</span><span style="color:var(--mfg)">›</span></div><span style="font-size:12px;color:var(--mfg)">Prévision du mois : 14 j</span></div>
   <div class="r2"><span style="font-weight:500;color:var(--mfg)">Complétude</span><div class="pg"><i id="pg" style="width:55.6%"></i></div><span><b id="cpl">5,0</b><span style="color:var(--mfg)"> / 9 j ouvrés écoulés</span></span><span style="color:var(--mfg)">·</span><span><b id="fac">4,5</b> <span style="color:var(--mfg)">facturables</span></span><span style="color:var(--mfg)">·</span><span><b id="tm">5,0</b> <span style="color:var(--mfg)">total mois</span></span></div></div>
  <div class="cgrid"><table class="cra"><colgroup><col style="width:256px"><col style="width:68px"><col style="width:68px">${DAYS.map(()=>'<col>').join('')}</colgroup>
   <thead><tr><th class="l">Chantier / Activité</th><th class="s">Prévision<br><span style="opacity:.6">(mois)</span></th><th class="s re">Réalisé<br><span style="opacity:.6">(mois)</span></th>${head}</tr></thead>
   <tbody>${rows}<tr class="tot"><td class="l">Total jour</td><td></td><td class="s re" id="gtot" style="font-weight:600;color:var(--fg)">5</td>${tot}</tr></tbody></table></div>`;
  let h=shell('Mes feuilles de temps','lea',inner,{bell:0});
  h=h.replace(/<div class="sec">Finance<\/div>[\s\S]*?(?=<\/div><\/aside>)/,'').replace(/<div class="it[^"]*">(?:(?!<\/div>)[\s\S])*?<span>Clients<\/span><\/div>/,'').replace(/<span class="bdg">\d+<\/span>/,'');
  return h;
}
function setCell(k,d,v){
  const c=$(`[data-c="${k}-${d}"]`,alpIn); c.textContent=fmtD(v); c.classList.remove('h','f'); c.classList.add(v===1?'f':'h','pop'); setTimeout(()=>c.classList.remove('pop'),420*SPEED+30);
  const r=CRA.find(x=>x.k===k); r.v[d]=v;
  const tot=Object.values(r.v).reduce((a,b)=>a+b,0); const re=$(`[data-re="${k}"]`,alpIn); re.textContent=fmtD(tot); re.classList.remove('flashp'); void re.offsetWidth; re.classList.add('flashp');
  const s=CRA.reduce((a,x)=>a+((x.v&&x.v[d])||0),0); $(`[data-t="${d}"]`,alpIn).innerHTML=`<span class="${s===1?'tok':''}">${fmtD(s)}</span>`;
  const g=CRA.reduce((a,x)=>a+(x.v?Object.values(x.v).reduce((p,q)=>p+q,0):0),0); $('#gtot',alpIn).textContent=fmtD(g);
  const f=CRA.filter(x=>x.k&&x.k!=='int').reduce((a,x)=>a+Object.values(x.v).reduce((p,q)=>p+q,0),0);
  $('#cpl',alpIn).textContent=g.toFixed(1).replace('.',','); $('#tm',alpIn).textContent=g.toFixed(1).replace('.',','); $('#fac',alpIn).textContent=f.toFixed(1).replace('.',',');
  const pg=$('#pg',alpIn); pg.style.width=Math.min(100,g/9*100)+'%'; if(g>=9){pg.style.background='#00B85A';$('#cpl',alpIn).style.color='#008A43';}
}

// ---------- Alphonse : fiche chantier, onglet Facturation ----------
ECH.a[2]='16/11/2026'; ECH.s[2]='29/01/2027';
const VIA=`<span class="viasia">${L('sparkles','s2')}via Sens IA</span>`;
function ficheEmpty(user='cp'){return ficheTab({user,docs:'none',sched:'empty',infos:'empty'});}
function swap(sel,html){const old=$(sel,alpIn);const d=document.createElement('div');d.innerHTML=html;const n=d.firstElementChild;old.replaceWith(n);return n;}
async function mainScroll(y){const m=$('main',alpIn);m.scrollTo({top:y,behavior:SPEED<1?'auto':'smooth'});await sleep(700);}

// ---------- cartons ----------
const PLUG=`<svg viewBox="0 0 24 24"><path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>`;
const FOOT=`<div class="foot">Maquettes pour se projeter · données fictives · rien de ceci n'est développé à ce jour</div>`;
function persona(k,cas,title,sub){const u=PEOPLE[k];return `<div class="k">${cas}</div><div class="pav">${u.i}</div><div class="t">${u.n}, ${u.r}</div><div class="bar"></div><div class="s">${title}</div>${sub?`<div class="s" style="font-size:20px;color:rgba(243,243,243,.6);margin-top:-6px">${sub}</div>`:''}${FOOT}`;}
function setWho(k,cas){const u=PEOPLE[k];who.innerHTML=`<span class="cas">${cas}</span><div class="avx">${u.i}</div><div><div class="n">${u.n}</div><div class="r">${u.r}</div></div>`;}

// =====================================================================
// Scènes
// =====================================================================
async function scOpen(){
  chapter('Ouverture');
  showCard(`<div class="k">Alphonse et Sens IA · et demain ?</div><div class="t">Compléter Alphonse<br>en parlant à Sens IA</div><div class="bar"></div><div class="s">Deux cas d'usage pour se projeter : la feuille de temps d'une consultante, la facturation d'un chantier.</div>${FOOT}`);
  await snap('01-ouverture');
  await say('s01',null,500);
}
async function scPrinciple(){
  chapter('Le principe');
  showCard(`<div class="k">Le principe</div>
  <div class="prin">
   <div class="bx rv" id="b1"><div class="h"><i style="background:#7C83FF"></i>Sens IA</div><div class="d">On lui parle. Il a déjà accès à ce que la personne a connecté.</div><div class="l"><span>Agenda</span><span>Mails</span><span>Teams</span><span>SharePoint</span><span>Réunions</span></div></div>
   <div class="lk rv" id="b2"><div class="ar">il lit et il écrit</div><div class="pl">${PLUG}<b>MCP</b></div><div class="ar">le connecteur</div></div>
   <div class="bx rv" id="b3"><div class="h"><i style="background:#8A4DFF"></i>Alphonse</div><div class="d">La référence du cabinet. Ses règles et ses droits ne changent pas.</div><div class="l"><span>Feuilles de temps</span><span>Chantiers</span><span>Facturation</span></div></div>
  </div>
  <div class="lockl rv" id="b4"><svg viewBox="0 0 24 24">${LP.lock}</svg>Chaque écriture est proposée, puis validée par la personne.</div>${FOOT}`);
  await say('s02',async()=>{
    await rvIn('#b1',900); await rvIn('#b2',2500); await rvIn('#b3',2300); await rvIn('#b4',2300);
    await snap('02-principe');
  },700);
}

// ----- Cas 1 : Léa, feuille de temps -----
async function scLea(){
  chapter('Cas 1 : la feuille de temps');
  showCard(persona('lea','Cas d\'usage 1','Vendredi soir : remplir sa feuille de temps, sans la ressaisir.'));
  // préparation des fenêtres derrière le carton
  setWho('lea','Cas 1'); siaIn.innerHTML=siaShell('lea'); alpIn.innerHTML=craPage(); noAnim(()=>focus('L')); toastOff(); mcpDir(null); cap('');
  await snap('03-carton-lea');
  await say('s03',null,500);
  await hideCard();

  // s04 : la demande, puis la relecture de la semaine
  cap('Léa demande. <b>Sens IA</b> relit sa semaine et lit ses chantiers dans <b>Alphonse</b>.');
  let g;
  await say('s04',async()=>{
    await sleep(300);
    await ask('Remplis ma feuille de temps de cette semaine.',24);
    g=toolGroup(4);
    await tool(g,'cal','Outlook · Agenda','semaine du 9 au 13 novembre · 11 événements, 5 entretiens',{ms:900,t:'1,4 s'});
    await tool(g,'mail','Outlook · Mails','14 échanges · Halios, Brenne Habitat',{ms:800,t:'1,1 s'});
    await tool(g,'msgs','Sens IA · Conversations de la semaine','« Grille d\'analyse Brenne », « Synthèse des entretiens Halios »',{ms:800,t:'0,6 s'});
    await tool(g,'plug','Alphonse · Mes chantiers et ma feuille de temps','HALIOS_EnqSig · BRENNE_Enq · PSE_Interne · semaine non saisie',{mcp:true,t:'0,9 s',during:async(d)=>{
      mcpDir('l','← lecture <small>mes chantiers</small>');
      const dst=$('.r1',d);
      await Promise.all(['hal','bre','int'].map(async(k,i)=>{await sleep(i*230);await fly($(`[data-row="${k}"] td.l`,alpIn),dst,CRA.find(r=>r.k===k).n,{read:true,dur:1150});}));
      mcpDir(null);
    }});
    toolsDone(g,4);
    await snap('04-lea-outils');
  },300);

  // s05 : la proposition et la question
  cap('<b>Sens IA</b> propose, source à l\'appui, et demande ce qu\'il ne sait pas.');
  let prop,q;
  await say('s05',async()=>{
    toolsFold(g);
    add(`<div class="a"><p>Voici ce que je propose pour la semaine du 9 au 13 novembre. Le mercredi 11 est férié.</p></div>`);
    await sleep(500);
    const row=(k,ch,det,src,vals)=>`<tr data-p="${k}"><td><b style="font-weight:600">${ch}</b><div class="sub">${det}</div><div style="margin-top:3px">${src.map(s=>`<span class="srcc">${s}</span>`).join(' ')}</div></td>${vals.map((v,i)=>`<td class="c" data-pv="${k}-${[9,10,12,13][i]}">${v}</td>`).join('')}</tr>`;
    prop=add(`<div class="kd" id="prop"><div class="kh"><span class="ic">${L('cal','s4')}</span><div><b>Proposition de feuille de temps</b><small>Semaine du 9 au 13 novembre · rien n'est enregistré pour l'instant</small></div></div>
     <div class="kb" style="padding-top:6px"><table class="pt"><thead><tr><th>Chantier</th><th class="c">Lun 9</th><th class="c">Mar 10</th><th class="c">Jeu 12</th><th class="c">Ven 13</th></tr></thead><tbody>
      ${row('hal','HALIOS_EnqSig','5 entretiens, atelier de restitution',[L('cal','s2')+'Agenda',L('mail','s2')+'Mails'],['1','0,5','0,5','<span class="warnc" id="q13">?</span>'])}
      ${row('bre','BRENNE_Enq','Réunion de lancement, analyse documentaire',[L('cal','s2')+'Agenda',L('msgs','s2')+'Conversation Sens IA'],['','0,5','0,5',''])}
      ${row('int','PSE_Interne','Séminaire d\'équipe, vendredi matin',[L('cal','s2')+'Agenda'],['','','','0,5'])}
     </tbody></table></div></div>`);
    await sleep(Math.max(600,(DUR.s05*1000)-4600));
    q=askCard(`<div class="kd" id="qcard"><div class="kh"><span class="ic">${L('msgs','s4')}</span><div><b>L'agent a besoin de précisions</b><small>Question 1 sur 1</small></div><span style="margin-left:auto;color:var(--mfg)">${L('x','s4')}</span></div><div class="prog"><i style="width:100%"></i></div>
     <div class="kb"><div style="font-size:14px;font-weight:500"><span class="bdgq">Vendredi après-midi</span>Rien dans votre agenda vendredi après-midi. Sur quel chantier avez-vous travaillé ?</div>
      <div class="opt" id="o1"><span class="rd"></span><div><b>HALIOS_EnqSig</b><small>Rédaction du rapport (document modifié vendredi à 16 h 40)</small></div></div>
      <div class="opt" id="o2"><span class="rd"></span><div><b>BRENNE_Enq</b><small>Préparation des entretiens</small></div></div>
      <div class="opt dash"><span class="rd"></span><div><b>Autre</b><small>Précisez ci-dessous</small></div></div></div>
     <div class="kf"><span style="display:flex;align-items:center;gap:6px">${L('sparkles','s3')}Dernière question avant envoi à l'agent</span><span class="btn p" id="qsend" style="opacity:.5">${L('send','s3')}Envoyer mes réponses</span></div></div>`);
    await sleep(900);
    await snap('05-lea-proposition');
  },300);

  // s06 : Léa précise, valide, Alphonse se remplit
  cap('Léa précise, puis valide : sa feuille de temps <b>Alphonse</b> se remplit.');
  await say('s06',async()=>{
    await click($('#o1')); $('#o1').classList.add('on'); $('#qsend').style.opacity='1'; await sleep(250);
    await click($('#qsend')); q.remove(); $('.cbox').style.display='';
    const c13=$('[data-pv="hal-13"]'); c13.innerHTML='0,5'; c13.classList.add('flashp');
    const kf=document.createElement('div'); kf.className='kf pin'; kf.innerHTML=`<span><b style="color:var(--fg)">4 jours</b> sur 4 jours ouvrés · 7 saisies</span><span style="display:flex;gap:8px"><span class="btn o">${L('pen','s3')}Modifier</span><span class="btn p" id="okBtn">${L('check','s3')}Enregistrer dans Alphonse</span></span>`;
    prop.appendChild(kf); down(); await sleep(550);
    await click($('#okBtn')); $('#okBtn').innerHTML=`<span class="sp" style="border-color:rgba(255,255,255,.35);border-top-color:#fff"></span>Enregistrement…`; hideCur();
    await snap('06-lea-validation');
    await focusTo('R');
    mcpDir('r','écriture → <small>7 saisies</small>');
    const W=[['hal',9,1],['hal',10,.5],['bre',10,.5],['hal',12,.5],['bre',12,.5],['hal',13,.5],['int',13,.5]];
    await Promise.all(W.map(async([k,d,v],i)=>{await sleep(i*260);await fly($(`[data-pv="${k}-${d}"]`),$(`[data-c="${k}-${d}"]`,alpIn),fmtD(v)+' j',{dur:1200});setCell(k,d,v);}));
    mcpDir(null);
    $('#okBtn').classList.add('done'); $('#okBtn').innerHTML=`${L('check','s3')}Enregistré dans Alphonse`;
    toast('7 saisies enregistrées <small>· par Léa Martin, via Sens IA</small>');
    add(`<div class="a"><p>C'est enregistré : 4 jours sur la semaine du 9 au 13 novembre. Votre mois est complet à ce jour.</p></div>`);
    await snap('07-lea-alphonse');
  },1900);
}

// ----- Cas 2 : Claire, facturation -----
async function scClaire(){
  chapter('Cas 2 : la facturation d\'un chantier');
  showCard(persona('claire','Cas d\'usage 2','Le client vient de signer : ouvrir la facturation du chantier, sans ressaisir le devis.'));
  setWho('claire','Cas 2'); siaIn.innerHTML=siaShell('claire'); alpIn.innerHTML=ficheEmpty('cp'); noAnim(()=>focus('L')); toastOff(); mcpDir(null); cap('');
  await snap('08-carton-claire');
  await say('s07',null,600);
  await hideCard();

  cap('Claire demande. <b>Sens IA</b> retrouve le mail, le devis signé et la proposition.');
  let g;
  await say('s08',async()=>{
    await sleep(300);
    await ask('Le devis Varenne est signé. Retrouve le mail du client et la proposition, puis prépare la facturation dans Alphonse.',15);
    g=toolGroup(4);
    await tool(g,'mail','Outlook · Mails','« Bon pour accord » · N. Lemoine, Varenne Services · 12/11 · 2 pièces jointes',{ms:800,t:'1,3 s'});
    await tool(g,'file','Pièces jointes','Devis PSE-2026-041 signé.pdf · BC-VS-2026-0187.pdf',{ms:750,t:'2,1 s'});
    await tool(g,'folder','SharePoint · Documents','Varenne / Proposition d\'intervention v3.docx',{ms:750,t:'0,9 s'});
    await tool(g,'plug','Alphonse · Fiche du chantier','VARENNE_EnqSig · 18 600 € · facturation à préparer',{mcp:true,t:'0,8 s',during:async(d)=>{
      mcpDir('l','← lecture <small>la fiche du chantier</small>');
      await fly($('.ph h1',alpIn),$('.r1',d),'VARENNE_EnqSig · 18 600 €',{read:true,dur:1250});
      mcpDir(null);
    }});
    toolsDone(g,4);
    await snap('09-claire-outils');
  },300);

  cap('<b>Sens IA</b> propose l\'échéancier et les informations, page à l\'appui.');
  let prop;
  await say('s09',async()=>{
    toolsFold(g);
    add(`<div class="a"><p>J'ai lu le devis signé, le bon de commande et le mail de Nadia Lemoine. Voici ce que je propose d'enregistrer dans la fiche du chantier.</p></div>`);
    await sleep(450);
    const sc=(t)=>`<span class="srcc">${L('file','s2')}${t}</span>`;
    prop=add(`<div class="kd" id="prop"><div class="kh"><span class="ic">${L('receipt','s4')}</span><div><b>Facturation de VARENNE_EnqSig</b><small>Proposition · rien n'est enregistré pour l'instant</small></div></div>
     <div class="kb" style="padding-top:8px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--mfg);margin-bottom:2px">Échéancier</div>
      <table class="pt"><tbody>
       <tr id="pe1"><td><b style="font-weight:600">Acompte</b> à la commande (50 %)</td><td>16/11/2026</td><td class="c" style="text-align:right">9 300,00 €</td><td style="text-align:right">${sc('Devis, p. 2')}</td></tr>
       <tr id="pe2"><td><b style="font-weight:600">Solde</b> à la remise du rapport (50 %)</td><td>29/01/2027</td><td class="c" style="text-align:right">9 300,00 €</td><td style="text-align:right">${sc('Devis, p. 2')}</td></tr>
      </tbody></table>
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--mfg);margin:12px 0 2px">Informations de facturation</div>
      <table class="pt"><tbody>
       <tr id="pi1"><td class="sub" style="width:170px">Entité facturée</td><td><b style="font-weight:600">Varenne Services SAS</b></td><td style="text-align:right">${sc('Devis, p. 1')}</td></tr>
       <tr id="pi2"><td class="sub">Bon de commande</td><td><b style="font-weight:600">BC-VS-2026-0187</b></td><td style="text-align:right">${sc('Bon de commande, p. 1')}</td></tr>
       <tr id="pi3"><td class="sub">Contact facturation</td><td><b style="font-weight:600">Nadia Lemoine</b>, comptabilité fournisseurs</td><td style="text-align:right"><span class="srcc">${L('mail','s2')}Mail du 12/11, signature</span></td></tr>
       <tr id="pi4"><td class="sub">Mode d'envoi</td><td><b style="font-weight:600">Dépôt sur le portail fournisseurs</b></td><td style="text-align:right">${sc('Devis, p. 3')}</td></tr>
      </tbody></table>
      <div class="okl">${L('check','s3')}Total 18 600 € = montant du devis = montant du chantier dans Alphonse</div>
     </div>
     <div class="kf"><span>Vous pouvez corriger avant de valider.</span><span style="display:flex;gap:8px"><span class="btn o">${L('pen','s3')}Modifier</span><span class="btn p" id="okBtn">${L('check','s3')}Valider et enregistrer dans Alphonse</span></span></div></div>`);
    await sleep(700);
    await snap('10-claire-proposition');
  },500);

  cap('Claire valide : la fiche du chantier est à jour dans <b>Alphonse</b>.');
  await say('s10',async()=>{
    await sleep(500);
    await click($('#okBtn')); $('#okBtn').innerHTML=`<span class="sp" style="border-color:rgba(255,255,255,.35);border-top-color:#fff"></span>Enregistrement…`; hideCur();
    await focusTo('R');
    mcpDir('r','écriture → <small>échéancier et informations</small>');
    const tgtS=$('#sched tbody',alpIn);
    await Promise.all([['#pe1','Acompte · 9 300 €'],['#pe2','Solde · 9 300 €']].map(async([s,l],i)=>{await sleep(i*300);await fly($(s),tgtS,l,{dur:1250});}));
    const sch=swap('#sched',schedCard4('prop')); $('.card-h .t',sch).insertAdjacentHTML('beforeend',' '+VIA);
    $$('tbody tr[data-r]',sch).forEach(tr=>tr.classList.add('flashg'));
    swap('#docs',docsCard('ok'));
    await sleep(500);
    await mainScroll(330);
    const tgtI=$('#infos',alpIn);
    await Promise.all([['#pi1','Varenne Services SAS'],['#pi2','BC-VS-2026-0187'],['#pi3','Nadia Lemoine'],['#pi4','Dépôt sur le portail']].map(async([s,l],i)=>{await sleep(i*230);await fly($(s),tgtI,l,{dur:1200});}));
    const inf=swap('#infos',infosCard4('saved')); $$('.val',inf).forEach(v=>v.classList.add('flashg'));
    mcpDir(null);
    $('#okBtn').classList.add('done'); $('#okBtn').innerHTML=`${L('check','s3')}Enregistré dans Alphonse`;
    toast('Échéancier et informations validés <small>· par Claire Morel, via Sens IA</small>');
    add(`<div class="a"><p>C'est enregistré. Alphonse préparera la facture d'acompte le 16 novembre : il vous restera à la vérifier.</p></div>`);
    await snap('11-claire-alphonse');
  },2000);
}

// ----- Côté finance : Stive -----
async function scStive(){
  chapter('Et côté finance');
  showCard(persona('stive','Et côté finance','Lundi 16 novembre : que faut-il émettre cette semaine ?'));
  setWho('stive','Finance'); siaIn.innerHTML=siaShell('stive');
  alpIn.innerHTML=ficheTab({user:'steve',docs:'ok',sched:'verified',infos:'saved'}).replace('le 03/11','le 16/11');
  $('main',alpIn).scrollTop=0; noAnim(()=>focus('L')); toastOff(); mcpDir(null); cap('');
  $('#sched .card-h .t',alpIn).insertAdjacentHTML('beforeend',' '+VIA);
  await snap('12-carton-stive');
  await say('s11',null,500);
  await hideCard();

  cap('Stive relit la facture dans <b>Sens IA</b> et confirme : elle est émise dans <b>Alphonse</b>.');
  await say('s12',async()=>{
    await sleep(200);
    await ask('Qu\'est-ce que je dois émettre cette semaine ?',22);
    const g=toolGroup(1); $('.lbl',g).textContent='Utilise 1 outil';
    await tool(g,'plug','Alphonse · Factures à émettre','1 facture · VARENNE_EnqSig, acompte, vérifiée par Claire Morel',{mcp:true,t:'0,7 s',during:async(d)=>{
      mcpDir('l','← lecture <small>les factures à émettre</small>');
      await fly($('#sched tr[data-r="a"]',alpIn),$('.r1',d),'Acompte Varenne · à émettre',{read:true,dur:1200});
      mcpDir(null);
    }});
    $('.lbl',g).textContent='Utilisé 1 outil';
    add(`<div class="a"><p>Une facture est à émettre. Claire Morel l'a vérifiée ce matin.</p></div>`);
    const inv=add(`<div class="kd" id="inv"><div class="kh"><span class="ic">${L('receipt','s4')}</span><div><b>Facture d'acompte · VARENNE_EnqSig</b><small>Brouillon vérifié · pas encore de numéro</small></div></div>
     <div class="kb"><div class="inv">
       <div class="ir"><span>Client facturé</span><b>Varenne Services SAS</b></div>
       <div class="ir"><span>Objet</span><b>Acompte à la commande (50 %)</b></div>
       <div class="ir"><span>Bon de commande</span><b>BC-VS-2026-0187</b></div>
       <div class="ir"><span>Montant HT</span><b>9 300,00 €</b></div>
       <div class="ir"><span>Vérifiée par</span><b>Claire Morel, le 16/11</b></div></div>
      <div class="okl">${L('check','s3')}Aucun doublon détecté · informations de facturation complètes</div></div>
     <div class="kf"><span>Émettre attribue le numéro définitif : la facture ne se modifie plus.</span><span style="display:flex;gap:8px"><span class="btn o">${L('ext','s3')}Ouvrir dans Alphonse</span><span class="btn p" id="emBtn">${L('check','s3')}Émettre la facture</span></span></div></div>`);
    await sleep(1500);
    await snap('13-stive-facture');
    await click($('#emBtn')); $('#emBtn').innerHTML=`<span class="sp" style="border-color:rgba(255,255,255,.35);border-top-color:#fff"></span>Émission…`; hideCur();
    await focusTo('R');
    mcpDir('r','écriture → <small>émission de la facture</small>');
    const tr=$('#sched tr[data-r="a"]',alpIn);
    await fly($('#emBtn'),tr,'Émettre · acompte Varenne',{dur:1300});
    const d=document.createElement('tbody'); d.innerHTML=schedRow4('a',ST('env','À envoyer'),{fac:'<b>F2026-00007</b>',note:'Émise par Stive le 16/11, via Sens IA · à envoyer ou à déposer sur le portail'});
    const n=d.firstElementChild; tr.replaceWith(n); n.classList.add('flashg');
    mcpDir(null);
    $('#emBtn').classList.add('done'); $('#emBtn').innerHTML=`${L('check','s3')}Facture F2026-00007 émise`;
    toast('Facture F2026-00007 émise <small>· par Stive, via Sens IA</small>');
    add(`<div class="a"><p>C'est fait : la facture porte le numéro F2026-00007. Il reste à la déposer sur le portail du client.</p></div>`);
    await snap('14-stive-alphonse');
  },2000);
}

async function scEnd(){
  chapter('À retenir');
  showCard(`<div class="k">À retenir</div><div class="t">On parle à Sens IA,<br>Alphonse reste la référence</div><div class="bar"></div>
  <div class="keep"><div class="rv" id="k1"><i>1</i>La personne demande ; Sens IA va chercher l'information là où elle est.</div>
  <div class="rv" id="k2"><i>2</i>Rien ne s'écrit dans Alphonse sans sa validation.</div>
  <div class="rv" id="k3"><i>3</i>Chacun agit avec ses propres droits, et chaque écriture est tracée.</div></div>${FOOT}`);
  cap('');
  await say('s13',async()=>{ await rvIn('#k1',700); await rvIn('#k2',3300); await rvIn('#k3',2200); await snap('15-fin'); },1600);
}

const SCENES={open:scOpen,principle:scPrinciple,lea:scLea,claire:scClaire,stive:scStive,end:scEnd};
async function run(){
  T0=T(); window.__done=false; window.__audio=[]; window.__chapters=[];
  const only=Q.get('only');
  for(const [k,f] of Object.entries(SCENES)){ if(only&&!only.split(',').includes(k)) continue; await f(); }
  window.__total=(T()-T0)/1000; window.__done=true;
}
window.__start=run;
noAnim(()=>focus('L'));
showCard('');
