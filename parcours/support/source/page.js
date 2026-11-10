// ===== Logique de la page support =====
(function(){
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

// ---------- Données ----------
const LIFE=[
 ['À venir','av','Personne','attend la date prévue',''],
 ['À préparer','prep','Référent facturation','une information manque (bon de commande, contact) : il la complète','auto'],
 ['À vérifier','cp','Chef de projet','vérifie la facture préparée','auto'],
 ['À émettre','em','Finance','émet : numéro définitif','auto'],
 ['À envoyer','env','Finance','envoie ou dépose, comme aujourd\'hui','auto'],
 ['Envoyée','enc','Finance','suit le paiement, relance','note'],
 ['Réglée','reg','Personne','','note']
];
const LIFE_SIDE=[
 ['En retard','con','Finance','La date de paiement est dépassée : la facture ressort d\'elle-même et Alphonse prépare le texte de relance.','auto'],
 ['Contestée','con','Finance','Le client refuse la facture : la finance note le motif, les relances s\'arrêtent.','note'],
 ['Annulée par un avoir','av','Finance','Seul le rôle Finance crée un avoir ; l\'échéance revient « À vérifier ».','note']
];
const PILL={av:'background:#F3F3F3;color:#555',prep:'background:#FEF3C7;color:#7A5410',cp:'background:#EDE9FE;color:#5B21B6',em:'background:#DBEAFE;color:#1E40AF',env:'background:#E0F2FE;color:#075985',enc:'background:#F1F5F9;color:#334155',reg:'background:#D1FAE5;color:#065F46',con:'background:#FFE4E6;color:#9F1239'};

/*@@DONNEES@@*/

// ---------- État des réponses ----------
const KEY='pse-facturation-12-11-v2';
const REC={}; ARB.forEach(a=>{REC[a.k]=a.o.find(o=>o.rec).v;});
let state={...REC}, notes='';
try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.state){state={...state,...s.state};notes=s.notes||'';}}catch(e){}
let SUBS=[];
const store=()=>{try{localStorage.setItem(KEY,JSON.stringify({state,notes}));}catch(e){}};
const save=()=>{store();SUBS.forEach(f=>{try{f();}catch(e){}});};
const consMode=()=>state.r2==='sans'?'sans':'complet';
window.__consMode=consMode();

// ---------- Vie d'une facture ----------
const pill=(t,k)=>`<span class="pill" style="${PILL[k]}">${t}</span>`;
const how=(h)=>h==='auto'?'<span class="how auto">se met à jour seul</span>':h==='note'?'<span class="how note">noté par la finance</span>':'';
qs('#life').innerHTML=LIFE.map(([t,k,w,a,h])=>`<div class="lf">${pill(t,k)}${how(h)}<div class="who">${w}</div>${a?`<div class="in">${a}</div>`:''}</div>`).join('');
qs('#life').insertAdjacentHTML('afterend',`<div class="life-side">${LIFE_SIDE.map(([t,k,w,d,h])=>`<div class="lf">${pill(t,k)}${how(h)}<div class="who">${w}</div><div class="in" style="flex:1;min-width:220px">${d}</div></div>`).join('')}</div>`);

// ---------- Matrice des droits ----------
function renderMatrix(){
  const C={edit:'Agit',can:'Peut agir',read:'Lecture',no:'Non'};
  const cell=([k,d])=>k==='txt'?`<span class="cell-t">${d}</span>`:`<span class="cell ${k}">${C[k]}</span>${d?`<span class="cell-d">${d}</span>`:''}`;
  const rows=MATRIX(state);
  qs('#mx').innerHTML=`<thead><tr><th>Personne</th><th>Fiche chantier, onglet Facturation</th><th>Facturation : À faire, Par chantier, Registre</th><th>Clôture du mois</th><th>Messages reçus</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map(c=>`<td>${cell(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  qs('#mxNote').innerHTML=MATRIX_NOTE;
}

// ---------- Rôles ----------
qs('#roles').innerHTML=ROLES.map(([t,d])=>`<div><b>${t}</b><span>${d}</span></div>`).join('');

// ---------- Arbitrages ----------
function renderArb(){
  qs('#arb').innerHTML=ARB.map((a,i)=>`${(i===0||ARB[i-1].g!==a.g)?`<h3 class="arb-g">${a.g}</h3>`:''}<div class="arb" id="arb-${a.k}"><div class="arb-h"><span class="n">${i+1}.</span><h3>${a.t}</h3>${a.w?`<span class="ital">${a.w}</span>`:''}</div><p class="arb-q">${a.q}</p>
  <div class="opts${a.o.length>2?' three':''}" role="radiogroup" aria-label="${esc(a.t).replace(/"/g,'')}">${a.o.map(o=>`<button type="button" class="opt" role="radio" data-k="${a.k}" data-v="${o.v}" aria-checked="${state[a.k]===o.v}"><span class="opt-top"><span class="radio"></span><span class="opt-name">${o.n}</span>${o.rec?'<span class="tag rec">CONSEILLÉ</span>':o.cur?'<span class="tag">ACTUEL</span>':o.tag?`<span class="tag">${o.tag}</span>`:''}</span>${o.m?`<span class="opt-prev"><span class="mini-w"><span class="mini-in">${o.m}</span></span></span>`:''}<span class="opt-desc">${o.d}</span>${o.i?`<span class="opt-imp">${o.i}</span>`:''}</button>`).join('')}</div>
  ${a.why?`<div class="arb-why"><b>Pourquoi nous conseillons cette option.</b> ${a.why}</div>`:''}${a.screen?`<div class="arb-link"><a href="#ecrans" data-go="${a.screen}">Voir l'écran concerné dans le parcours</a></div>`:''}</div>`).join('');
  qsa('#arb .opt').forEach(b=>b.addEventListener('click',()=>{state[b.dataset.k]=b.dataset.v;save();sync();}));
  qsa('#arb [data-go]').forEach(l=>l.addEventListener('click',()=>{go(SCREENS.findIndex(s=>s.id===l.dataset.go),'prop');}));
  qs('#infosG').innerHTML=INFOS.map(([t,d])=>`<div><b>${t}</b><span>${d}</span></div>`).join('');
  requestAnimationFrame(fitMini);
}
function fitMini(){
  qsa('.mini-w').forEach(w=>{const inr=w.firstElementChild;const W=w.closest('#arb-r2')?420:w.closest('.opts.three')?460:640;inr.style.width=W+'px';const s=Math.min(1,w.clientWidth/W);inr.style.transform=`scale(${s})`;w.style.height=Math.ceil(inr.offsetHeight*s)+'px';});
}
addEventListener('resize',()=>fitMini());
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>fitMini());
function sync(){
  qsa('#arb .opt').forEach(b=>b.setAttribute('aria-checked',state[b.dataset.k]===b.dataset.v));
  qs('#recapT').innerHTML=ARB.map((a,i)=>{const o=a.o.find(x=>x.v===state[a.k]);return `<tr><td>${i+1}. ${a.t}</td><td>${o.n}${o.rec?' <span class="tag rec" style="font-size:8.5px">CONSEILLÉ</span>':''}</td></tr>`;}).join('');
  window.__consMode=consMode();
  renderMatrix();
  if(SCREENS[cur]&&SCREENS[cur].dyn) render();
}
qs('#remarques').value=notes;
qs('#remarques').addEventListener('input',e=>{notes=e.target.value;save();});
const toast=(t)=>{const el=qs('#toast');el.textContent=t;setTimeout(()=>{el.textContent='';},2600);};
qs('#btnReset').addEventListener('click',()=>{state={...REC};save();sync();toast('Options conseillées rétablies');});
qs('#btnCopy').addEventListener('click',()=>{
  const txt='Facturation des enquêtes de Plein Sens Ethique dans Alphonse : nos réponses avant le point du 12 novembre\n\n'+ARB.map((a,i)=>`${i+1}. ${a.t} : ${a.o.find(x=>x.v===state[a.k]).n}`).join('\n')+(notes.trim()?`\n\nRemarques :\n${notes.trim()}`:'');
  const fb=()=>{const ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;left:-9999px';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy');}catch(e){}document.body.removeChild(ta);toast(ok?'Réponses copiées : collez-les dans un mail':'Copie impossible : sélectionnez le tableau à la main');};
  try{navigator.clipboard.writeText(txt).then(()=>toast('Réponses copiées : collez-les dans un mail'),fb);}catch(e){fb();}
});

// ---------- Réponses enregistrées par adopt.aiorigin.io (mode adaptateur) ----------
// Ouvert seul, le fichier garde ses réponses dans le navigateur. Sur adopt, chaque lecteur
// identifié par son email voit ses réponses enregistrées en ligne, consultables par AI Origin.
if(window.AIOriginSave&&typeof window.AIOriginSave.register==='function'){
  window.AIOriginSave.register({
    schemaVersion:1,
    getState(){return {v:1,choix:{...state},reponses:ARB.map((a,i)=>`${i+1}. ${a.t} : ${a.o.find(x=>x.v===state[a.k]).n}`),remarques:notes};},
    applyState(s){
      if(!s||s.v!==1||typeof s.choix!=='object'||!s.choix)return;
      const n={...REC}; ARB.forEach(a=>{const v=s.choix[a.k]; if(a.o.some(o=>o.v===v)) n[a.k]=v;});
      state=n; notes=typeof s.remarques==='string'?s.remarques:''; qs('#remarques').value=notes; store(); sync();
    },
    subscribe(cb){SUBS.push(cb);return()=>{SUBS=SUBS.filter(f=>f!==cb);};}
  });
}

// ---------- Écrans ----------
const scaler=qs('#scaler'), stage=qs('#stage'), inner=qs('#stageInner');
let cur=0, ver='prop';
qs('#scrNav').innerHTML=SCREENS.map((s,i)=>`<button type="button" role="tab" data-i="${i}" aria-selected="false"><span class="n">${i===0?'0':i}</span>${ETAPES[s.etape]}</button>`).join('');
qsa('#scrNav button').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.i,'prop')));
function fit(){
  const W=1360, avail=stage.clientWidth||W; const s=Math.min(1,avail/W);
  scaler.style.transform=`scale(${s})`;
  const ch=scaler.firstElementChild; inner.style.height=(ch?Math.ceil(ch.offsetHeight*s):0)+'px';
  qsa('.split .frame',scaler).forEach(f=>{const c=f.firstElementChild;if(c){const k=f.clientWidth/1360;c.style.transform=`scale(${k})`;}});
}
function render(){
  const s=SCREENS[cur]; const v=(ver==='today'&&s.today)?'today':'prop';
  navTarget();
  let h; try{h=v==='today'?s.today():s.html();}catch(e){console.error(e);h='<div style="padding:40px">Écran indisponible</div>';}
  navTarget();
  scaler.innerHTML=h;
  const root=scaler.firstElementChild;
  if(v==='prop'&&s.after) try{s.after(root);}catch(e){console.error(e);}
  if(s.id==='consultant'&&v==='prop'){
    const ban=root.querySelector('#consLine span');if(ban&&state.r2==='siens')ban.innerHTML='<b>Lecture seule.</b> Vous voyez la facturation des chantiers où vous êtes dans l\'équipe. Celle-ci est suivie par Claire Morel (cheffe de projet) et Stive (référent facturation, rôle Finance).';
    qsa('.sb .it',root).forEach(it=>{if(['Facturation','Clôture du mois','Clients','Consultants','Suivi feuilles de temps','Exports','Paramètres'].includes(it.textContent.trim().replace(/\d+$/,'').trim()))it.remove();});
    qsa('.sb .sec',root).forEach(sc=>{if(['Finance','Administration'].includes(sc.textContent.trim()))sc.remove();});
  }
  if(v==='today'){const t=document.createElement('div');t.className='today-tag';t.textContent='Aujourd\'hui · '+(s.todayLabel||'ce qui existe');root.style.position='relative';root.appendChild(t);}
  // aucun tiret cadratin dans les écrans
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode())){if(n.nodeValue.includes('—'))n.nodeValue=n.nodeValue.replace(/\s?—\s?/g,(m)=>m.trim()===m?'Non renseigné':', ').replace(/^, |, $/g,'');}
  qs('#scrWho').innerHTML=esc(s.who); qs('#scrTitle').textContent=s.title;
  qsa('#scrNav button').forEach((b,i)=>b.setAttribute('aria-selected',i===cur));
  qs('#btnToday').disabled=!s.today; qs('#segVer').hidden=!s.today;
  qsa('#segVer button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
  const caps=v==='today'?[[ 'Ce que montre l\'écran',[s.todayLabel?`${s.todayLabel}, tel qu'il est utilisé aujourd'hui (données fictives).`:'Ce qui existe aujourd\'hui (données fictives).']],['À comparer',['Basculez sur « Demain » pour voir ce que la proposition change.']]]:s.caps;
  qs('#caption').innerHTML=caps.map(([h,items])=>`<div><span class="eyebrow">${h}</span><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('');
  qs('#nextS').textContent=cur<SCREENS.length-1?'Écran suivant →':'Revenir au début';
  requestAnimationFrame(()=>{fit();requestAnimationFrame(fit);});
}
function go(i,v){cur=(i+SCREENS.length)%SCREENS.length;ver=v||ver;render();}
qs('#nextS').addEventListener('click',()=>go(cur+1,'prop'));
qs('#prevS').addEventListener('click',()=>go(cur-1,'prop'));
qsa('#segVer button').forEach(b=>b.addEventListener('click',()=>{if(b.disabled)return;ver=b.dataset.v;render();}));
function setFull(on){stage.classList.toggle('full',on);qs('#btnFull').textContent=on?'Quitter le plein écran':'Plein écran';document.body.style.overflow=on?'hidden':'';requestAnimationFrame(fit);}
qs('#btnFull').addEventListener('click',()=>setFull(!stage.classList.contains('full')));
document.addEventListener('keydown',e=>{
  if(e.target.closest&&e.target.closest('input,textarea,video'))return;
  const r=qs('#ecrans').getBoundingClientRect(); const visible=stage.classList.contains('full')||(r.top<innerHeight*0.6&&r.bottom>innerHeight*0.3);
  if(e.key==='Escape'&&stage.classList.contains('full'))setFull(false);
  else if(visible&&e.key==='ArrowRight'){e.preventDefault();go(cur+1,'prop');}
  else if(visible&&e.key==='ArrowLeft'){e.preventDefault();go(cur-1,'prop');}
});
addEventListener('resize',fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);

// ---------- Vidéo ----------
const vid=qs('#vid');
qsa('#chap button').forEach(b=>b.addEventListener('click',()=>{try{vid.currentTime=+b.dataset.t;vid.play();}catch(e){}}));
const CH=qsa('#chap button').map(b=>+b.dataset.t);
if(vid) vid.addEventListener('timeupdate',()=>{const t=vid.currentTime;let k=0;CH.forEach((c,i)=>{if(t>=c-0.2)k=i;});qsa('#chap button').forEach((b,i)=>b.classList.toggle('on',i===k));});

// ---------- Schéma du parcours : agrandir ----------
const zb=qs('#schemaZoom'), zo=qs('#zoomOvl');
if(zb&&zo){zb.addEventListener('click',()=>{zo.hidden=false;document.body.style.overflow='hidden';});
  zo.addEventListener('click',e=>{if(e.target.closest('.zimg'))return;zo.hidden=true;document.body.style.overflow='';});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!zo.hidden){zo.hidden=true;document.body.style.overflow='';}});}

// ---------- Sommaire actif ----------
const secs=qsa('.toc a').map(a=>qs(a.getAttribute('href'))).filter(Boolean);
addEventListener('scroll',()=>{let k=-1;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<120)k=i;});qsa('.toc a').forEach((a,i)=>a.classList.toggle('on',i===k));},{passive:true});

// Liens internes : la page est servie dans un cadre (srcdoc) sur adopt.aiorigin.io ;
// un lien « #ancre » y rechargerait l'application hôte. On fait défiler la page nous-mêmes.
document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a[href^="#"]');
  if(!a)return;
  e.preventDefault();
  const id=a.getAttribute('href');
  const t=id.length>1&&qs(id);
  if(t)t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
});

renderArb(); sync(); render();
})();
