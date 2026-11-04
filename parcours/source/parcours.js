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
addEventListener('resize',layout); layout();

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
async function moveTo(el,scroll=true){
  if(scroll) await ensureVisible(el);
  if(!cur.classList.contains('on')){cursorAt(VW*0.62,VH*0.62,false);cur.classList.add('on');await sleep(150);}
  const [x,y]=pt(el); cursorAt(x,y); await sleep(950);
}
async function click(el,scroll=true){
  await moveTo(el,scroll);
  const [x,y]=pt(el);
  cur.classList.add('press');
  const h=document.createElement('div');h.className='halo';h.style.left=x+'px';h.style.top=y+'px';stage.appendChild(h);setTimeout(()=>h.remove(),800);
  await sleep(160); cur.classList.remove('press'); await sleep(380);
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
const STAGES=['Dépôt du devis','Échéancier','Informations','Facture d\'acompte','Clôture du mois','Fin de mission','Suivi','Rentabilité'];
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
// Gabarits d'écran
// ===================================================================

// --- Bloc nouveau : préparer la facturation à partir du devis ---
const DOCS=[['#E5484D','PDF','Devis PSE-2026-041.pdf','Lu · 18 600 € HT · fin prévue le 18/12/2026'],['#2B6CB0','MSG','Re : Lancement de l\'enquête.msg','Lu · mail du client du 31/10'],['#5C6570','PDF','Conditions générales d\'achat.pdf','Lu · délai de paiement, dépôt sur portail']];
const prepCard=()=>`<div class="card" id="prep"><div class="card-h" style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding-bottom:14px"><div><div class="t">Préparer la facturation à partir du devis</div><div class="d">Déposez le devis et les échanges avec le client. Alphonse préremplit l'échéancier et les informations de facturation ci-dessous. Rien n'est enregistré sans vous.</div></div><span class="sbd neu" id="prepBadge"><span class="d"></span>Aucun document</span></div>
<div class="card-b"><div class="drop2"><div class="xs" style="display:flex;align-items:center;gap:8px;color:#4A1AB8;font-weight:500">${I('up','s3')}Glissez vos documents ici ou parcourez<span class="mut" style="margin-left:auto;font-weight:400">Les documents restent rattachés au chantier</span></div>
<div class="docs">${DOCS.map(([c,t,n,s])=>`<div class="doc"><span class="ty" style="background:${c}">${t}</span><div style="min-width:0"><div style="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</div><div class="xxs mut">${s}</div></div></div>`).join('')}</div></div></div></div>`;

// --- Carte « Échéancier de facturation » (BillingScheduleEditor) ---
const PILL={prevu:'<span class="pill p-av">À venir</span>',af:'<span class="pill p-af">À facturer</span>',fact:'<span class="sbd info"><span class="d"></span>Facturé</span>'};
const PROP=' <span class="src">Proposé d\'après le devis</span>';
function srow(id,label,date,amt,st,act=''){
  return `<tr data-r="${id}"><td>${label}</td><td class="num dcell">${date}</td><td class="r num">${amt}</td><td class="scell">${PILL[st]}</td><td class="r acell" style="white-space:nowrap">${act}<span class="mut" style="margin-left:8px;display:inline-flex;vertical-align:middle">${I('pen','s3')}</span></td></tr>`;
}
const BAF=`<span class="bt ol xs baf">${I('check','s3')}Bon à facturer</span>`;
function schedCardV2(o){
  // o.mode : empty | prop | valid | bon | fin
  let rows, total='18 600 €', note='', extra='';
  if(o.mode==='empty'){
    rows=`<tr><td colspan="5" class="mut" style="text-align:center;padding:18px">Aucun jalon renseigné.</td></tr>`; total='0 €'; note=' · L\'échéancier ne couvre pas le CA (écart : 18 600 €)';
  } else if(o.mode==='fin'){
    rows=srow('a','Acompte 50 % au lancement','04/11/2026','9 300,00','fact')+srow('s','Solde 50 % en fin de mission','18/12/2026','9 300,00','af');
  } else {
    const p=o.mode==='prop';
    rows=srow('a','Acompte 50 % au lancement'+(p?PROP:''),'04/11/2026','9 300,00',o.mode==='bonDone'?'af':'prevu','')+
         srow('s','Solde 50 % en fin de mission'+(p?PROP:''),'18/12/2026','9 300,00','prevu');
    if(p) extra=`<div class="ctrlb" id="ctrl">${I('okc','s3')}<span>Devis PSE-2026-041 : <b>18 600 € HT</b></span><span>CA initial du chantier : <b>18 600 €</b></span><span>Échéancier : <b>18 600 €</b></span><span class="sbd ok sm" style="margin-left:auto"><span class="d"></span>Aligné</span></div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px" id="schedBtns"><span class="bt ol sm">Modifier les jalons</span><span class="bt pr sm">${I('check','s3')}Valider l'échéancier</span></div>`;
  }
  return `<div class="card" id="sched"><div class="card-h"><div class="t">Échéancier de facturation</div><div class="d">Jalons contractuels du chantier, renseignés par le chef de projet ; l'ADV coche les jalons facturés et réglés.</div></div>
<div class="card-b"><div class="tw"><table class="t"><thead><tr><th>Libellé</th><th style="width:160px">Date</th><th class="r" style="width:150px">Montant HT</th><th style="width:150px">Statut</th><th style="width:190px"></th></tr></thead><tbody>${rows}
<tr><td colspan="5" style="padding:6px 8px"><span class="bt gh xs">${I('plus','s3')}Ajouter un jalon</span></td></tr>
<tr class="tot"><td colspan="2" class="xs mut" style="text-transform:uppercase;font-weight:500">Total</td><td class="r num" style="font-weight:600">${total}</td><td colspan="2"></td></tr></tbody></table></div>
<div class="xs mut" style="margin-top:8px">CA du chantier : 18 600 €${note}</div>${extra}</div></div>`;
}

// --- Bloc « Informations de facturation » (MissionBillingInfoCard) ---
const F=[
 ['entite','Entité','Varenne Services SAS','Devis, p. 1',1],
 ['dest','Nom personne / service destinataire','Service comptabilité fournisseurs','Mail du 31/10'],
 ['rue','N° + rue','18 rue des Tanneurs','Devis, p. 1'],
 ['comp','Complément d\'adresse','',''],
 ['cpv','Code postal + Ville','69007 Lyon','Devis, p. 1'],
 ['bc','Bon de Commande','',''],
];
const FE=[['email','Adresse e-mail','factures@varenne-services.example','Mail du 31/10'],['site','Adresse site dépose factures','','']];
function infosCard(mode){
  // mode : empty | edit | saved
  const ed=mode==='edit';
  const field=([k,l,v,s,full])=>{
    const style=full?' style="grid-column:1/-1"':'';
    if(!ed){const val=mode==='saved'?({bc:'BC-VS-2026-0187',site:'Portail fournisseurs Varenne'}[k]||v||'—'):'—';
      return `<div${style}><div class="lbl">${l}</div><div class="val"${k==='email'&&mode==='saved'?' style="color:var(--primary)"':''}>${val}</div></div>`;}
    const need=k==='bc'||k==='site';
    const chip=need?'<span class="src miss">À compléter</span>':s?`<span class="src">${I('file','s2')}${s}</span>`:'';
    return `<div${style} data-f="${k}"><div class="fl"><span class="lbl">${l}</span>${chip}</div><div class="inp ed ${need?'need':v?'ai':''}">${need?(k==='bc'?'absent des documents':'citée sans adresse dans les conditions d\'achat'):v||''}</div></div>`;
  };
  const head=ed?`<span class="src" style="font-size:11.5px;padding:3px 10px">${I('spark','s2')}Prérempli par Alphonse, à vérifier</span>`:`<span class="bt ol sm">${I('pen','s3')}Modifier</span>`;
  const condN=mode==='empty'?'0 information renseignée':ed?'2 informations proposées':'2 informations renseignées';
  const frais=ed?`<div class="rad" data-f="frais"><span><i></i>A facturer en sus</span><span><i></i>À facturer en débours (facture séparée exonérée)</span><span><i class="on"></i>Inclus</span><span class="src">${I('file','s2')}Devis, p. 2</span></div>`:`<div class="lbl">Traitement</div><div class="val">${mode==='saved'?'Inclus':'—'}</div>`;
  return `<div class="box" id="infos"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><div><div style="font-weight:600;font-size:15px">Informations de facturation</div><div class="xs mut" style="margin-top:2px">Entité facturée du référentiel du client, bon de commande et traitement des frais — repris automatiquement sur les factures générées depuis l'échéancier.</div></div>${head}</div>
  <div style="margin-top:16px;display:flex;flex-direction:column;gap:20px">
    <div><div class="xs mut" style="margin-bottom:10px">Adresse de Facturation</div><div class="g2">${F.map(field).join('')}</div></div>
    <div><div class="h4">Envoi des factures</div><div class="g2">${FE.map(field).join('')}</div></div>
    <div style="display:flex;justify-content:space-between;align-items:center;border:1px solid var(--border);border-radius:6px;padding:8px 12px" data-f="cond"><div><div style="font-size:14px;font-weight:600">Conditions de facturation de l'entité <span class="xs mut" style="font-weight:400">${condN}</span></div><div class="xs mut">Communes à tous les chantiers facturés à cette entité — renseignées par l'ADV.${ed?' Proposé : délai de paiement 45 jours, envoi par portail (conditions d\'achat, art. 6 et 7).':''}</div></div>${I('chev')}</div>
    <div class="xxs mut">Coordonnées partagées : les modifier impacte tous les chantiers rattachés à cette entité.</div>
    <div><div class="h4">Frais de mission</div>${frais}</div>
    ${ed?`<div style="display:flex;justify-content:flex-end;gap:8px" id="infoBtns"><span class="bt gh sm">Annuler</span><span class="bt pr sm">Enregistrer</span></div>`:''}
    ${mode==='saved'?`<div class="xs mut" style="display:flex;align-items:center;gap:6px">${I('okc','s3')}Prérempli depuis le devis PSE-2026-041, enregistré par Claire Morel le 04/11/2026.</div>`:''}
  </div></div>`;
}
function fiche(o){
  return shell('Chantiers',o.user||'cp',chantierHead('Facturation')+(o.prep?prepCard():'')+schedCardV2({mode:o.sched})+infosCard(o.infos));
}

// --- Page Facturation › Revue mensuelle (AdvMissionsView) ---
const RV={voir:'<span class="rv-b voir">À voir</span>',rien:'<span class="rv-b rien">Rien à facturer</span>',cree:'<span class="rv-b cree">Facture créée</span>',af:'<span class="rv-b af">À facturer (1)</span>'};
function revueRows(m){
  const nov=[
   ['HALIOS_EnqSig','Enquête interne','21 400','21 400','10 700','10 700','30/11/2026 · 10 700','voir',''],
   ['BRENNE_Enq','Enquête signalement','15 000','13 800','7 500','6 300','08/01/2027 · 7 500','rien',''],
   ['CAPELLE_Enq','Enquête signalement','14 400','2 100','7 200','-5 100','15/12/2026 · 7 200','cree',''],
   ['ORLAN_EnqHar','Enquête harcèlement','12 000','1 800','0','1 800','—','voir','red'],
   ['MERIDIA_EnqRPS','Enquête RPS','16 800','4 200','0','4 200','—','voir','amb'],
   ['TALMONT_Enq','Enquête','16 300','16 300','16 300','0','—','rien',''],
   ['VARENNE_EnqSig','Enquête interne suite à signalement','18 600','0','0','0','04/11/2026 · 9 300','af','','v'],
  ];
  if(m==='dec'){
    nov[6]=['VARENNE_EnqSig','Enquête interne suite à signalement','18 600','17 900','9 300','8 600','08/01/2027 · 9 300','rien','','v'];
  }
  return nov;
}
function revue(m,o={}){
  const rows=revueRows(m), mois=m==='dec'?'décembre 2026':'novembre 2026';
  const sum=(i)=>fmt(rows.reduce((a,r)=>a+parseInt(r[i].replace(/\s/g,''),10),0));
  const tiles=[['CA chantier',sum(2)+' €'],['Facturable',sum(3)+' €'],['Facturation',sum(4)+' €'],['Écart',sum(5)+' €'],['Adresses à compléter','2',1]];
  return shell('Facturation','steve',`
<div class="ph"><div><h1>Facturation</h1><div class="st">${m==='dec'?'15':'14'} factures émises</div></div></div>
<div class="tabs"><span class="on">Revue mensuelle</span><span>À préparer (2)</span><span>Impayés (2)</span><span>Facturier</span></div>
<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><span style="font-weight:600;font-size:14px">Tournée du mois</span><span class="bt ol sm">${I('cal','s3')}${mois}</span><span class="xs mut">Tournée du mois : ${m==='dec'?'4':'5'} / 7 chantiers vus</span><span class="bt ol sm" style="margin-left:auto" id="faeBtn">${I('dl','s3')}Export FAE</span></div>
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px" id="tiles">${tiles.map(([l,v,d])=>`<div class="kpi"><div class="l">${l}</div><div class="v num"${d?' style="color:var(--danger)"':''}>${v}</div></div>`).join('')}</div>
<div class="facets"><span class="facet">Statut : En cours (et terminés à solder)</span><span class="facet">Chef de projet</span><span class="facet">Client</span><span class="facet">Revue du mois</span><span class="facet${o.facet?' on':''}" id="facetInfos">Infos de facturation${o.facet?' : Incomplètes':''}</span><span class="srch" style="max-width:300px;height:32px;margin-left:auto">${I('search')}<span>Rechercher un chantier, un client…</span></span></div>
<div class="tw revue"><table class="t"><thead><tr><th>Chantier</th><th class="r">CA chantier</th><th class="r">Facturable</th><th class="r">Facturation</th><th class="r">Écart</th><th>Prochain jalon</th><th>Revue ${mois}</th><th></th></tr></thead><tbody>
${rows.map(r=>`<tr data-c="${r[0]}"${r[9]?' class="hl"':''}${o.facet&&!r[8]?' style="display:none"':''}><td><div style="display:flex;align-items:center;gap:6px"><span class="mono" style="font-weight:500">${r[0]}</span>${r[8]?`<span class="tri${r[8]==='amb'?' amb':''}">${I('alert','s3')}</span>`:''}</div><div class="xs mut">${r[1]}${r[8]==='red'?' · Aucune entité':r[8]==='amb'?' · Bon de commande manquant':''}</div></td><td class="r num">${r[2]}</td><td class="r num" style="font-weight:600;color:var(--primary)">${r[3]}</td><td class="r num">${r[4]}</td><td class="r num">${r[5]}</td><td class="xs num">${r[6]}</td><td>${RV[r[7]]}</td><td class="r"><span class="bt ol xs">Émettre une facture</span></td></tr>`).join('')}
</tbody></table></div>`,{count:2,bell:2});
}

// --- Assistant « Émettre une facture » (InvoiceWizard), en surimpression ---
function wizard(step){
  const head=(n,t)=>`<div class="dh"><div class="t">Émettre une facture — VARENNE_EnqSig</div><div class="s">Étape ${n} sur 3 — ${t}</div></div>`;
  if(step===1) return `<div class="dlg">${head(1,'contrôles')}<div class="db"><div class="okb">${I('okc','s3')}Coordonnées de facturation complètes.</div>
   <div class="kv"><span>Entité facturée</span><span>Varenne Services SAS</span><span>Bon de commande</span><span>BC-VS-2026-0187</span><span>Envoi</span><span>Portail fournisseurs Varenne</span><span>Bon à facturer</span><span><span class="sbd ok sm"><span class="d"></span>Claire Morel, le 04/11/2026</span></span></div></div>
   <div class="df"><span class="bt ol sm">Annuler</span><span class="bt pr sm" id="wNext">Continuer</span></div></div>`;
  if(step===2) return `<div class="dlg">${head(2,'contenu')}<div class="db">
   <div><div class="lbl" style="margin-bottom:6px">Source de la facture</div><div class="rad"><span><i class="on"></i>Jalon de l'échéancier</span><span><i></i>Montant libre</span><span><i></i>Débours de frais</span></div></div>
   <div class="kv"><span>Jalon</span><span>Acompte 50 % au lancement · 9 300,00 €</span><span>Libellé facturé</span><span>Enquête interne suite à signalement · acompte de 50 % du devis PSE-2026-041</span><span>Montant HT (honoraires)</span><span>9 300,00 €</span><span>Date de facture</span><span>04/11/2026</span><span>Type de facture</span><span>Acompte</span><span>Modèle de facture</span><span>Plein Sens Ethique</span></div></div>
   <div class="df"><span class="bt ol sm">Précédent</span><span class="bt pr sm" id="wNext">Continuer</span></div></div>`;
  if(step===3) return `<div class="dlg">${head(3,'récapitulatif')}<div class="db"><div class="kv"><span>Entité facturée</span><span>Varenne Services SAS</span><span>Numéro</span><span class="mut" id="wNum">Attribué automatiquement à l'émission</span><span>Date de facture</span><span>04/11/2026</span><span>Échéance</span><span>19/12/2026</span><span>Total HT</span><span>9 300,00 €</span><span>Total TTC</span><span style="font-weight:600">11 160,00 €</span></div></div>
   <div class="df"><span class="bt ol sm">Précédent</span><span class="bt pr sm" id="wNext">${I('send','s3')}Émettre</span></div></div>`;
  return `<div class="dlg wide" style="flex-direction:row;gap:28px;padding:26px;align-items:flex-start">
   <div style="flex:1;display:flex;flex-direction:column;gap:14px;padding-top:6px"><div class="okb" style="font-size:15px">${I('okc','s3')}<span>Facture <b>F2026-00007</b> émise.</span></div>
    <div class="xs mut" style="font-size:13px;line-height:1.6">Le jalon « Acompte 50 % au lancement » passe à « Facturé » dans la fiche chantier. Jusqu'en août 2027, le PDF est déposé sur le portail du client. Ensuite, la facture part par la plateforme agréée.</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="bt pr sm">${I('dl','s3')}Télécharger le PDF</span><span class="bt ol sm">Voir dans le Facturier</span><span class="bt ol sm">Retour à la liste</span></div></div>
   ${pdf()}</div>`;
}
const pdf=()=>`<div class="pdf" id="pdf"><div style="display:flex;justify-content:space-between;gap:14px"><div style="width:120px;height:44px;border:1.5px dashed #C9C9C9;border-radius:4px;display:grid;place-items:center;font-size:9px;color:#8A8A8A;text-align:center;line-height:1.2">Logo Plein Sens Ethique<br>à transmettre</div><div style="border-left:1px solid #000;border-top:1px solid #000;padding:8px 10px;width:200px"><b>Varenne Services SAS</b><br>Service comptabilité fournisseurs<br>18 rue des Tanneurs<br>69007 LYON</div></div>
 <div style="margin-top:18px">Réf : BC-VS-2026-0187</div><div style="text-align:right">Paris, 4/11/2026</div>
 <div style="margin-top:12px">FACTURE N° <b>F2026-00007</b></div><div style="margin-top:8px">Enquête interne suite à signalement · acompte de 50 % du devis PSE-2026-041</div>
 <div style="margin:14px 0 0 auto;width:220px"><div style="text-align:right;font-weight:700;margin-bottom:2px">EUROS</div><div style="display:flex;justify-content:space-between"><span>Montant H.T.:</span><span>9 300,00</span></div><div style="display:flex;justify-content:space-between"><span>Frais de Mission :</span><span>0,00</span></div><div style="display:flex;justify-content:space-between;font-weight:700;border-top:1px solid #000"><span>Total HT :</span><span>9 300,00</span></div><div style="display:flex;justify-content:space-between"><span>20,00% TVA</span><span>1 860,00</span></div><div style="display:flex;justify-content:space-between;font-weight:700;border-top:1px solid #000"><span>Montant T.T.C :</span><span>11 160,00</span></div></div>
 <div style="margin-top:12px">Délai de règlement : 45 jours</div>
 <div style="display:flex;justify-content:space-between;gap:12px;margin-top:12px;font-size:9px"><span style="width:45%">En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 euros</span><span style="width:45%"><b>DOMICILIATION BANCAIRE</b><br>IBAN : <span style="background:#FFF7E8;color:#8A5A0B">à transmettre par Fabrice</span></span></div>
 <div style="margin-top:12px;border-top:1px solid #DDD;padding-top:6px;font-size:8.5px;color:#555;text-align:center">Plein Sens Ethique · SAS au capital de 1 000 € · RCS Paris 109 500 470</div></div>`;

// --- Schéma du parcours : capture du tableau Miro ---
const schemaScreen=()=>`<div class="schema"><img src="@@SCHEMA_MIRO@@" alt="Schéma du parcours de facturation"></div>`;

// --- Facture au format du PDF d'Alphonse (invoice-pdf.ts) ---
const pdfDoc=(num)=>`<div class="pdf big" id="pdf"><div style="display:flex;justify-content:space-between;gap:14px"><div style="width:130px;height:48px;border:1.5px dashed #C9C9C9;border-radius:4px;display:grid;place-items:center;font-size:9.5px;color:#8A8A8A;text-align:center;line-height:1.2">Logo Plein Sens Ethique<br>à transmettre</div><div style="border-left:1px solid #000;border-top:1px solid #000;padding:9px 12px;width:240px"><b>Varenne Services SAS</b><br>Service comptabilité fournisseurs<br>18 rue des Tanneurs<br>69007 LYON</div></div>
 <div style="margin-top:20px">Réf : <span class="pdfbc">BC-VS-2026-0187</span></div><div style="text-align:right">Paris, 4/11/2026</div>
 <div style="margin-top:14px;font-size:13px">FACTURE N° <b id="pdfNum">${num}</b></div><div style="margin-top:8px">Enquête interne suite à signalement · acompte de 50 % du devis PSE-2026-041 du 30/10/2026</div>
 <div style="margin:16px 0 0 auto;width:250px"><div style="text-align:right;font-weight:700;margin-bottom:2px">EUROS</div><div style="display:flex;justify-content:space-between"><span>Montant H.T.:</span><span>9 300,00</span></div><div style="display:flex;justify-content:space-between"><span>Frais de Mission :</span><span>0,00</span></div><div style="display:flex;justify-content:space-between;font-weight:700;border-top:1px solid #000"><span>Total HT :</span><span>9 300,00</span></div><div style="display:flex;justify-content:space-between"><span>20,00% TVA</span><span>1 860,00</span></div><div style="display:flex;justify-content:space-between;font-weight:700;border-top:1px solid #000"><span>Montant T.T.C :</span><span>11 160,00</span></div></div>
 <div style="margin-top:14px">Délai de règlement : 45 jours</div>
 <div style="display:flex;justify-content:space-between;gap:12px;margin-top:14px;font-size:9.5px"><span style="width:45%">En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 euros</span><span style="width:45%"><b>DOMICILIATION BANCAIRE</b><br>IBAN : <span style="background:#FFF7E8;color:#8A5A0B">à transmettre par Fabrice</span></span></div>
 <div style="margin-top:14px;border-top:1px solid #DDD;padding-top:6px;font-size:9px;color:#555;text-align:center">Plein Sens Ethique · SAS au capital de 1 000 € · RCS Paris 109 500 470</div></div>`;

// --- Fiche chantier : la facture d'acompte et son circuit (le « fil » sur le côté) ---
const SV=(c,cls,t,d,extra='')=>`<div class="sv"><span class="c ${cls}">${c}</span><div><div class="tt">${t}</div><div class="dd">${d}</div>${extra}</div></div>`;
function factureScreen(user){
  return shell('Chantiers',user,chantierHead('Facturation')+`
<div class="infob" id="factBanner">${I('spark','s3')}<span>Le jalon « Acompte 50 % au lancement » arrive à échéance le 04/11/2026. Alphonse a préparé la facture en brouillon à partir de l'échéancier et des informations de facturation.</span></div>
<div style="display:grid;grid-template-columns:minmax(0,1fr) 400px;gap:20px;align-items:start">
 <div class="pdfwrap">${pdfDoc('BROUILLON-0012')}</div>
 <div style="display:flex;flex-direction:column;gap:14px">
  <div class="box"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font-weight:600;font-size:15px" id="factTitle">Facture d'acompte à valider</div><span class="sbd neu" id="factStatus"><span class="d"></span>Brouillon</span></div><div class="xs mut" style="margin-top:2px">Préparée depuis le jalon « Acompte 50 % au lancement ».</div>
   <div class="step-v" style="margin-top:16px" id="fil">
    ${SV(I('check','s3'),'ok','Préparée par Alphonse','04/11/2026 à 08:00 · brouillon BROUILLON-0012')}
    ${SV('2','cur','Vérification du chef de projet','Claire Morel · montant, libellé, bon de commande',`<div style="display:flex;gap:6px;margin-top:8px" class="act"><span class="bt pr xs">${I('check','s3')}Valider</span><span class="bt ol xs">Demander une modification</span></div>`)}
    ${SV(I('lock','s3'),'','Émission par la finance','Fabrice Ducellier · numéro définitif')}
    ${SV(I('send','s3'),'','Envoi au client','Mode d\'envoi : Portail (dépôt en ligne)')}
   </div></div>
  <div class="box" style="padding:14px 16px"><div class="lbl" style="margin-bottom:8px">Mentions obligatoires</div>
   ${[['ok','Adresse de facturation et bon de commande'],['ok','Délai de paiement et indemnité de 40 €'],['ok','Nature des opérations : prestations de services'],['wt','IBAN de Plein Sens Ethique'],['wt','Logo de Plein Sens Ethique'],['wt','SIREN du client (facture électronique 2027)']].map(([s,t])=>`<div style="display:flex;gap:8px;align-items:center;font-size:12.5px;padding:3px 0"><span class="sbd ${s==='ok'?'ok':'warn'} sm" style="width:20px;justify-content:center;padding:0">${s==='ok'?'✓':'!'}</span>${t}</div>`).join('')}
  </div>
 </div>
</div>`);
}

// --- Mail de fin de mission, gabarit Alphonse avec trois réponses ---
const mailScreen=()=>`<div class="ax mailv"><div class="mtb">${I('mail')}Boîte de réception · Claire Morel</div>
<div class="mhd"><div class="s">[Alphonse] VARENNE_EnqSig : le solde peut-il partir ?</div><div><b>De</b> Alphonse Plein Sens &lt;alphonse@mail.pleinsens.fr&gt;</div><div><b>À</b> Claire Morel &nbsp; <b>Cc</b> Steve</div><div class="mut">Vendredi 18 décembre 2026, 08:00</div></div>
<div class="mbd"><div class="mcard" id="mcard">
 <div style="text-align:center;font:700 22px 'Barlow Condensed',sans-serif;letter-spacing:.06em">PLEIN SENS ETHIQUE</div>
 <div style="text-align:center;color:#5b6472;font-size:12px;letter-spacing:.12em;margin-top:4px">ALPHONSE PLEIN SENS ETHIQUE</div>
 <h1 style="font-size:20px;color:#1f2430;margin:20px 0 12px">Le solde de VARENNE_EnqSig peut-il partir ?</h1>
 <p style="font-size:15px;margin:0 0 10px">Bonjour Claire,</p>
 <p style="font-size:15px;margin:0 0 14px">La fin de l'enquête pour Groupe Varenne Services était prévue au 18 décembre 2026 dans le devis. La mission est-elle terminée, réunion de restitution comprise ?</p>
 <table style="width:100%;border-collapse:collapse;border-top:1px solid #e3e6ec;border-bottom:1px solid #e3e6ec;margin:4px 0 18px">${[['Jalon','Solde 50 % en fin de mission'],['Montant','9 300,00 € HT'],['Date prévue','18/12/2026'],['Temps saisis','21,5 j sur 22 j prévus']].map(([k,v])=>`<tr><td style="padding:6px 0;font-size:13px;font-weight:700;color:#5b6472;width:150px">${k}</td><td style="padding:6px 0;font-size:14px">${v}</td></tr>`).join('')}</table>
 <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
  <span class="mbtn" style="background:#1d4ed8;color:#fff">Oui, préparer le solde</span>
  <span class="mbtn" id="mailNo" style="background:#fff;color:#1d4ed8;box-shadow:inset 0 0 0 1.5px #1d4ed8">Pas encore</span>
  <span class="mbtn" style="background:#fff;color:#1d4ed8;box-shadow:inset 0 0 0 1.5px #1d4ed8">Un complément est à prévoir</span></div>
 <p style="font-size:12px;color:#5b6472;margin:20px 0 0;text-align:center">Message automatique d'Alphonse Plein Sens. Merci de ne pas y répondre.</p>
</div></div></div>`;

// --- Clôture mensuelle (page Cut-off) ---
function clotureScreen(){
  const tiles=[['Facturé du mois','16 500 €','factures émises en novembre'],['FAE (à établir)','19 100 €','travail fait, pas encore facturé'],['PCA (à neutraliser)','1 400 €','facturé d\'avance, travail à venir'],['CA reconnu','34 200 €','ce que novembre a réellement produit']];
  const checks=['Feuilles de temps du mois complétées','Notes de frais traitées','Échéances du mois facturées','Factures brouillons émises'];
  return shell('Clôture mensuelle','fin',`
<div class="ph"><div><h1>Clôture mensuelle</h1><div class="st">Clôture comptable, FAE/PCA, export FEC</div></div><div class="acts"><span class="bt ol sm">${I('cal','s3')}novembre 2026</span><span class="sbd neu" id="cutStatus"><span class="d"></span>Ouverte</span></div></div>
<div class="tabs"><span class="on">Checklist</span><span>Ajustements FAE/PCA</span></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px" id="ctiles">${tiles.map(([l,v,h])=>`<div class="kpi2"><div class="l">${l}</div><div class="v">${v}</div><div class="h">${h}</div></div>`).join('')}</div>
<div style="display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:18px;align-items:start">
 <div class="box"><div style="font-weight:600;font-size:15px;margin-bottom:10px">Avant de figer novembre</div>
  ${checks.map(c=>`<div class="chk" style="display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid var(--border);font-size:13.5px"><span class="sbd neu sm ck" style="width:22px;justify-content:center;padding:0">·</span>${c}</div>`).join('')}
 </div>
 <div class="box"><div style="font-weight:600;font-size:15px">Figer la période</div><div class="xs mut" style="margin-top:4px">Une fois figé, les temps de novembre passent en lecture seule et aucune facture ne peut plus être datée en novembre.</div>
  <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><span class="bt pr sm" id="freezeBtn">${I('lock','s3')}Figer la période</span><span class="bt ol sm" id="fecBtn">${I('dl','s3')}Export FEC</span></div>
  <div class="xs mut" style="margin-top:12px">Le comptable reçoit l'export FEC du mois, avec l'export FAE et le facturier de la page Facturation.</div>
 </div>
</div>`,{count:2,bell:2});
}

// ===================================================================
// Étapes v3
// ===================================================================
const ficheCrumb=(who='Claire Morel · chef de projet')=>crumb(who,['Chantiers','VARENNE_EnqSig','Facturation']);
const N=(k)=>`${k} / 11`;
async function prepBadge(ax,t,c='info'){const b=$('#prepBadge',ax); if(b){b.className='sbd '+c; b.innerHTML='<span class="d"></span>'+t;}}

const STEPS=[
 {name:'Ouverture',async run(){
   where(-1); crumbEl.classList.add('off');
   showCard(`${LOGO}<div class="t">Facturer une enquête depuis la fiche chantier</div><div class="bar"></div><div class="s">Proposition pour Plein Sens Ethique</div>`);
   await show('schema',schemaScreen());
   await sleep(3200);
 }},
 {name:'Le parcours en un coup d\'œil',async run(){
   where(-1); crumbEl.classList.add('off');
   const ax=await show('schema',schemaScreen()); hideCard();
   await caption('','Le parcours en un coup d\'œil. En vert, ce qui existe déjà dans Alphonse.');
   const img=$('img',ax); img.style.transition='transform 7s ease-in-out'; img.style.transform='scale(1)';
   await sleep(400); img.style.transform='scale(1.05)';
   await sleep(7200);
 }},
 {name:'1. Aujourd\'hui : l\'onglet Facturation',async run(){
   const ax=await show('fiche-today',fiche({sched:'empty',infos:'empty'})); scroller().scrollTop=0;
   ficheCrumb(); where(-1);
   await caption(N(1),'Aujourd\'hui, l\'onglet Facturation du chantier part vide : tout se saisit à la main.');
   await sleep(1500);
   await moveTo($('#sched .xs.mut',ax));
   await sleep(1300);
   await scrollTopOf($('#infos',ax),120);
   await sleep(2400);
   await scrollTo(0,900);
 }},
 {name:'2. Claire dépose le devis',async run(){
   const ax=await show('fiche-prep',fiche({prep:1,sched:'empty',infos:'empty'})); scroller().scrollTop=0;
   ficheCrumb(); where(0);
   const prep=$('#prep',ax), docs=$$('#prep .doc',ax);
   docs.forEach(d=>d.style.visibility='hidden');
   prep.animate([{opacity:0,transform:'translateY(-10px)'},{opacity:1,transform:'none'}],{duration:600,easing:'ease-out'});
   await caption(N(2),'Nouveau : Claire dépose le devis dans la fiche chantier. Il y reste rattaché.');
   await sleep(900);
   await moveTo($('.drop2',ax));
   for(const d of docs){
     const sub=$('.xxs',d), orig=sub.textContent;
     sub.innerHTML='<span class="spin"></span>Lecture…';
     d.style.visibility=''; d.classList.add('slide-in');
     await sleep(1100); sub.textContent=orig; flash(d); await sleep(350);
   }
   prepBadge(ax,'3 documents lus'); flash($('#prepBadge',ax),'pflash');
   await sleep(2400);
 }},
 {name:'3. Échéancier proposé et contrôlé',async run(){
   const ax=await show('fiche-prep',fiche({prep:1,sched:'prop',infos:'empty'}));
   ficheCrumb(); where(1); prepBadge(ax,'3 documents lus');
   const rows=$$('#sched tbody tr[data-r]',ax), ctrl=$('#ctrl',ax), btns=$('#schedBtns',ax);
   rows.forEach(r=>r.style.display='none'); popHide(ctrl); hide(btns);
   await caption(N(3),'L\'échéancier est proposé d\'après le devis et rapproché du CA initial du chantier.');
   await ensureVisible($('#sched',ax),$('#sched .tw',ax));
   await sleep(700);
   for(const r of rows){rowIn(r);await sleep(900);}
   await sleep(400); popIn(ctrl); await ensureVisible($('#sched .card-h',ax),ctrl); await sleep(2600);
   reveal(btns); await sleep(500);
   const v=btn(btns,'Valider l\'échéancier'); await click(v);
   v.classList.add('done'); v.innerHTML=`${I('check','s3')}Échéancier validé`;
   $$('#sched .src',ax).forEach(s=>s.remove());
   await sleep(2000);
 }},
 {name:'4. Informations préremplies et complétées',async run(){
   const ax=await show('fiche-prep',fiche({prep:1,sched:'valid',infos:'edit'}));
   ficheCrumb(); where(2); prepBadge(ax,'3 documents lus');
   const infos=$('#infos',ax), fs=$$('#infos [data-f]',ax), btns=$('#infoBtns',ax);
   hide(fs,btns);
   await caption(N(4),'Alphonse préremplit le formulaire existant et cite la source de chaque champ. Pas de chat.');
   await scrollTopOf(infos,70);
   await sleep(500);
   for(const f of fs){reveal(f); const ch=$('.src',f); if(ch) flash(ch,'pflash'); await sleep(f.dataset.f==='bc'||f.dataset.f==='site'?700:420);}
   reveal(btns);
   await sleep(1600);
   await caption(N(4),'Il signale les deux manques. Claire les complète sur place, puis enregistre.');
   for(const [k,v] of [['bc','BC-VS-2026-0187'],['site','Portail fournisseurs Varenne']]){
     const f=$(`#infos [data-f="${k}"]`,ax), inp=$('.inp',f);
     await click(inp);
     inp.className='inp ed focus'; await type(inp,v,50);
     inp.className='inp ed ai'; const ch=$('.src',f); ch.className='src ok'; ch.innerHTML=`${I('check','s2')}Saisi par Claire`; flash(f);
     await sleep(500);
   }
   const save=btn($('#infoBtns',ax),'Enregistrer'); await click(save);
   const sc=scroller().scrollTop;
   app.innerHTML=fiche({prep:1,sched:'valid',infos:'saved'}); current='fiche-prep';
   const ax2=app.firstElementChild; scroller().scrollTop=sc;
   prepBadge(ax2,'Informations enregistrées','ok');
   flash($('#infos',ax2));
   await sleep(2600);
 }},
 {name:'5. Facture d\'acompte vérifiée par Claire',async run(){
   const ax=await show('facture',factureScreen('cp')); scroller().scrollTop=0;
   ficheCrumb(); where(3);
   const sv=$$('#fil .sv',ax), banner=$('#factBanner',ax);
   banner.animate([{opacity:0},{opacity:1}],{duration:500});
   await caption(N(5),'À l\'échéance du jalon, Alphonse prépare la facture en brouillon. Claire la vérifie.');
   await sleep(1600);
   await moveTo($('.pdfbc',ax),false); await sleep(1600);
   await moveTo($('#pdf .num-line',ax)||$('#pdfNum',ax),false); await sleep(1200);
   const v=$('.act .bt.pr',sv[1]); await click(v,false);
   $('.act',sv[1]).remove();
   $('.c',sv[1]).className='c ok'; $('.c',sv[1]).innerHTML=I('check','s3');
   $('.dd',sv[1]).textContent='Claire Morel · validée le 04/11/2026 à 10:14'; flash(sv[1]);
   $('.c',sv[2]).className='c cur'; $('.c',sv[2]).textContent='3';
   const st=$('#factStatus',ax); st.className='sbd info'; st.innerHTML='<span class="d"></span>Validée par le chef de projet';
   await sleep(3000);
 }},
 {name:'6. La finance émet et envoie',async run(){
   const ax=await show('facture-fin',factureScreen('fin')); scroller().scrollTop=0;
   crumb('Fabrice Ducellier · finance',['Chantiers','VARENNE_EnqSig','Facturation']); where(3);
   const sv=$$('#fil .sv',ax);
   $('.act',sv[1]).remove(); $('.c',sv[1]).className='c ok'; $('.c',sv[1]).innerHTML=I('check','s3'); $('.dd',sv[1]).textContent='Claire Morel · validée le 04/11/2026 à 10:14';
   $('.c',sv[2]).className='c cur'; $('.c',sv[2]).textContent='3';
   const st=$('#factStatus',ax); st.className='sbd info'; st.innerHTML='<span class="d"></span>Validée par le chef de projet';
   const bx=document.createElement('div'); bx.style.cssText='display:flex;gap:6px;margin-top:8px';
   bx.innerHTML=`<span class="bt pr xs">${I('send','s3')}Émettre</span><span class="bt ol xs">Demander une modification</span>`;
   sv[2].children[1].appendChild(bx);
   await caption(N(6),'Fabrice émet : le numéro définitif est attribué, puis le PDF part sur le portail du client.');
   flash($('.acct',ax),'pflash');
   await sleep(1800);
   await click($('.bt.pr',bx),false);
   bx.remove();
   $('.c',sv[2]).className='c ok'; $('.c',sv[2]).innerHTML=I('check','s3');
   $('.dd',sv[2]).textContent='Fabrice Ducellier · émise le 04/11/2026 à 11:30'; flash(sv[2]);
   const num=$('#pdfNum',ax); num.textContent='F2026-00007'; flash(num,'pflash');
   st.className='sbd info'; st.innerHTML='<span class="d"></span>Émise'; $('#factTitle',ax).textContent='Facture d\'acompte F2026-00007';
   await moveTo(num,false); await sleep(1600);
   $('.c',sv[3]).className='c cur'; $('.c',sv[3]).textContent='4';
   const bx2=document.createElement('div'); bx2.style.cssText='display:flex;gap:6px;margin-top:8px';
   bx2.innerHTML=`<span class="bt ol xs">${I('dl','s3')}PDF</span><span class="bt pr xs">${I('check','s3')}Marquer comme déposée</span>`;
   sv[3].children[1].appendChild(bx2); popIn(bx2);
   await sleep(900);
   await click($('.bt.pr',bx2),false);
   bx2.remove();
   $('.c',sv[3]).className='c ok'; $('.c',sv[3]).innerHTML=I('check','s3');
   $('.tt',sv[3]).textContent='Déposée sur le portail'; $('.dd',sv[3]).textContent='04/11/2026 à 11:32 · portail fournisseurs Varenne'; flash(sv[3]);
   st.className='sbd ok'; st.innerHTML='<span class="d"></span>Envoyée';
   await sleep(3200);
 }},
 {name:'7. Clôture de novembre',async run(){
   cur.classList.remove('on'); capEl.classList.add('off'); crumbEl.classList.add('off'); where(4);
   showCard(`<div class="k">Fin du mois</div><div class="t">30 novembre 2026</div><div class="bar"></div><div class="s">Clôture mensuelle</div>`);
   await sleep(300);
   const ax=await show('cloture',clotureScreen()); scroller().scrollTop=0;
   await sleep(1900); hideCard();
   crumb('Fabrice Ducellier · finance',['Clôture mensuelle','novembre 2026']);
   await caption(N(7),'Fin novembre, Fabrice coche la checklist et fige le mois, comme aujourd\'hui.');
   const tiles=$$('#ctiles .kpi2',ax); hide(tiles);
   await sleep(500);
   for(const t of tiles){reveal(t); countUp($('.v',t),700); await sleep(320);}
   await sleep(1400);
   for(const c of $$('.chk',ax)){const k=$('.ck',c); k.className='sbd ok sm ck'; k.textContent='✓'; flash(c); await sleep(550);}
   await sleep(500);
   const fb=$('#freezeBtn',ax); await click(fb);
   const s=$('#cutStatus',ax); s.className='sbd ok'; s.innerHTML='<span class="d"></span>Figée'; flash(s,'pflash');
   fb.className='bt ol sm'; fb.innerHTML='Rouvrir';
   await caption(N(7),'Le comptable reçoit ce qui est facturé et ce qui reste à facturer.');
   await sleep(1000);
   await click($('#fecBtn',ax));
   $('#fecBtn',ax).innerHTML=`${I('check','s3')}FEC_2026-11.txt`;
   await sleep(3000);
 }},
 {name:'8. Fin de mission',async run(){
   cur.classList.remove('on'); capEl.classList.add('off'); crumbEl.classList.add('off'); where(5);
   showCard(`<div class="k">Sept semaines après le lancement</div><div class="t">18 décembre 2026</div><div class="bar"></div><div class="s">Date de fin prévue au devis</div>`);
   await sleep(400);
   const ax=await show('mail',mailScreen());
   await sleep(2200); hideCard();
   crumb('Claire Morel',['Boîte mail','Message d\'Alphonse, Steve en copie']);
   await caption(N(8),'À la date de fin du devis, Alphonse demande à Claire si le solde peut partir. Steve est en copie.');
   $('#mcard',ax).animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:600,easing:'ease-out'});
   await sleep(4800);
   await click($('#mailNo',ax),false);
   await sleep(300);
 }},
 {name:'9. Claire décale le solde',async run(){
   const ax=await show('fiche-fin',fiche({sched:'fin',infos:'saved'})); scroller().scrollTop=0;
   ficheCrumb(); where(5);
   await caption(N(9),'« Pas encore » ouvre le jalon de solde. La synthèse est le 8 janvier : Claire décale la date.');
   const row=$('#sched tr[data-r="s"]',ax), dc=$('.dcell',row);
   await scrollTopOf($('#sched',ax),70);
   row.classList.add('hl'); flash(row,'pflash');
   dc.innerHTML='<span class="inp ed focus" style="height:30px;width:130px;display:inline-flex">18/12/2026</span>';
   await sleep(1600);
   await click($('.inp',dc));
   await type($('.inp',dc),'08/01/2027',80);
   await sleep(400);
   dc.innerHTML='<span class="newdate">08/01/2027</span>'; $('.scell',row).innerHTML=PILL.prevu; flash(row,'pflash');
   $('.acell',row).insertAdjacentHTML('afterbegin',`<span class="xs mut">modifié par Claire Morel</span>`);
   await sleep(3200);
 }},
 {name:'10. Suivi de Steve',async run(){
   const ax=await show('revue-dec',revue('dec')); scroller().scrollTop=0;
   crumb('Steve · finance',['Facturation','Revue mensuelle']); where(6);
   await caption(N(10),'Steve suit tout dans la Revue mensuelle : les jalons, les reports, les informations manquantes.');
   const tiles=$$('#tiles .kpi',ax); hide(tiles);
   await sleep(500);
   for(const t of tiles){reveal(t); countUp($('.v',t),700); await sleep(260);}
   await sleep(900);
   const v=$('tr[data-c="VARENNE_EnqSig"]',ax); await moveTo($('td:nth-child(6)',v)); flash(v,'pflash');
   await sleep(2200);
   const fc=$('#facetInfos',ax); await click(fc);
   fc.classList.add('on'); fc.textContent='Infos de facturation : Incomplètes';
   $$('.revue tbody tr',ax).forEach(r=>{if(!$('.tri',r))r.style.display='none';});
   await sleep(3400);
 }},
 {name:'11. Rentabilité',async run(){
   const ax=await show('reprev-today',S.reprev.today()); scroller().scrollTop=0;
   crumb('Claire Morel · chef de projet',['Chantiers','HALIOS_EnqSig','Pilotage']); where(7);
   const [vt,vp]=$$('span',ver); vt.className='on'; vp.className=''; ver.hidden=false;
   { const cs0=$$('.card',ax); await ensureVisible(cs0[0],cs0[cs0.length-1]); }
   await caption(N(11),'Demandé le 4 novembre : en novembre, octobre compte déjà pour son réalisé.');
   const warn=$('.warnb',ax);
   await sleep(1200);
   await moveTo(warn,false); await sleep(1400);
   await click(vp,false);
   vt.className=''; vp.className='on';
   warn.classList.add('collapse'); warn.style.maxHeight=warn.offsetHeight+'px'; void warn.offsetHeight;
   warn.style.maxHeight='0px'; warn.style.opacity=0; warn.style.marginTop='0px'; warn.style.paddingTop='0px'; warn.style.paddingBottom='0px'; warn.style.borderWidth='0px';
   await sleep(900);
   const keepTop=scroller().scrollTop;
   const ax2=await show('reprev-prop',S.reprev.prop()); scroller().scrollTop=keepTop;
   const cards=$$('.card',ax2), rp=cards[cards.length-1];
   await ensureVisible(cards[0],rp);
   const v=[...$$('.mono',rp)].find(e=>e.textContent.includes('46,8'));
   await sleep(300);
   if(v){flash(v,'pflash'); v.style.borderRadius='4px'; const ln=[...$$('.xs',rp)].pop(); if(ln) await moveTo(ln,false);}
   await sleep(4200);
 }},
 {name:'Fin',async run(){
   cur.classList.remove('on'); capEl.classList.add('off'); ver.hidden=true; crumbEl.classList.add('off'); where(-1);
   showCard(`${LOGO}<div class="t">Maquette : données fictives, rien n'est développé à ce stade</div><div class="bar"></div><div class="s">Écrans reconstruits d'après le code d'Alphonse au 4 novembre 2026</div>`);
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
  if(i!==0&&i!==STEPS.length-1&&!/Fin de mission|Clôture/.test(STEPS[i].name)) hideCard();
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
