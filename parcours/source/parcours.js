// ===== Parcours cliquable : facturation PSE =====
// Choix retenus pour la vidéo : les variantes conseillées des maquettes.
const CHOIX={c1:'drop',c2:'auto',c3:'cpfin',c4:'date',c5:'hebdo',c6:'ecranexport',c7:'export',c8:'calend'};
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const stage=$('#stage'), app=$('#app'), capEl=$('#cap'), cur=$('#cur'), card=$('#card'), ver=$('#ver');

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
function applyWhen(root){
  $$('[data-when]',root).forEach(el=>{const [k,vals]=el.dataset.when.split('=');el.hidden=!vals.split(',').includes(CHOIX[k]);});
}
let current='';
async function show(key,html){
  const same=key===current;
  const keep=same?scroller().scrollTop:0;
  if(app.firstElementChild && !same){app.classList.add('fade');await sleep(380);}
  app.innerHTML=html; current=key;
  const ax=app.firstElementChild;
  applyWhen(ax);
  if(!ax.querySelector(':scope>.sb')) ax.classList.add('solo');
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
// garde un élément (ou un intervalle d'éléments) dans la zone lisible, au-dessus de la légende
async function ensureVisible(topEl,botEl=topEl){
  const sc=scroller(), sr=sc.getBoundingClientRect(), st=stage.getBoundingClientRect();
  const top=topEl.getBoundingClientRect().top, bot=botEl.getBoundingClientRect().bottom;
  const minTop=sr.top+12*SC, maxBot=st.bottom-150*SC;
  let d=0;
  if(bot>maxBot) d=(bot-maxBot)/SC;
  if(top-d*SC<minTop) d=(top-minTop)/SC;
  if(Math.abs(d)>1) await scrollTo(sc.scrollTop+d);
}

// ----- curseur -----
function pt(el){const s=stage.getBoundingClientRect(), r=el.getBoundingClientRect();return [(r.left+r.width/2-s.left)/SC,(r.top+r.height/2-s.top)/SC];}
function cursorAt(x,y,anim=true){if(!anim){cur.style.transition='none';}cur.style.transform=`translate(${x}px,${y}px)`;if(!anim){cur.offsetWidth;cur.style.transition='';}}
async function moveTo(el,scroll=true){
  if(scroll) await ensureVisible(el);
  if(!cur.classList.contains('on')){cursorAt(VW*0.62,VH*0.72,false);cur.classList.add('on');await sleep(150);}
  const [x,y]=pt(el); cursorAt(x,y); await sleep(950);
}
async function click(el){
  await moveTo(el);
  const [x,y]=pt(el);
  cur.classList.add('press');
  const h=document.createElement('div');h.className='halo';h.style.left=x+'px';h.style.top=y+'px';stage.appendChild(h);setTimeout(()=>h.remove(),800);
  await sleep(160); cur.classList.remove('press'); await sleep(380);
}

// ----- légende -----
async function caption(n,txt){
  capEl.classList.add('off'); await sleep(260);
  $('.n',capEl).textContent=n; $('.tx',capEl).textContent=txt;
  capEl.classList.remove('off');
}

// ----- utilitaires d'animation -----
const hide=(...els)=>els.flat().forEach(e=>e&&e.classList.add('rv','hid'));
const reveal=(...els)=>els.flat().forEach(e=>e&&e.classList.remove('hid'));
const flash=(el,c='flash')=>{el.classList.remove(c);void el.offsetWidth;el.classList.add(c);};
const btn=(root,txt)=>$$('.bt',root).find(b=>b.textContent.includes(txt));
async function type(el,text,ms=44){
  const id=RUN; el.innerHTML='';
  const t=document.createElement('span'), c=document.createElement('span'); c.className='caret'; el.append(t,c);
  for(const ch of text){check(id); t.textContent+=ch; await sleep(ms+(ch===' '?18:0)+(ch===','?160:0));}
  await sleep(250); c.remove();
}
function fmt(n){return Math.round(n).toLocaleString('fr-FR').replace(/ | /g,' ');}
async function countUp(el,ms=900){
  const txt=el.textContent, m=txt.match(/[\d\s]+/); if(!m)return;
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

// ===== Écran « Dépôt du devis », construit par niveau =====
function depotParts(ax){
  const right=$('[data-when="c1=drop"]',ax);
  const [who,box,chat,btns]=right.children;
  return {ax,docs:$$('.drop .doc',ax),drop:$('.drop',ax),right,who,box,chat,btns,
    fields:$$('.field',box),badge:$('.card-h .sbd',ax),msgAi:$('.msg.ai',chat),compose:$('.compose',chat)};
}
async function depot(level){
  const ax=await show('depot',S.depot.prop());
  const p=depotParts(ax);
  hide(p.who,p.box,p.chat,p.btns,p.badge,p.fields,p.msgAi,p.compose);
  if(level===1){p.docs.forEach(d=>d.style.display='none');}
  if(level>=2){reveal(p.who,p.box);}
  if(level>=3){reveal(p.fields,p.badge,p.chat);}
  return p;
}

// ===== Étapes =====
const STEPS=[
 {name:'Ouverture',async run(){
   showCard(`${LOGO}<div class="t">Facturer une enquête depuis la fiche chantier</div><div class="bar"></div><div class="s">Proposition pour Plein Sens Ethique</div>`);
   await depot(1); scroller().scrollTop=0;
   await sleep(3000);
 }},
 {name:'1. Claire dépose le devis',async run(){
   const p=await depot(1); hideCard();
   await caption('1 / 9','Claire dépose le devis et le mail du client dans la fiche chantier.');
   await sleep(700);
   await moveTo(p.drop);
   for(const d of p.docs){
     const sub=$('.xxs',d), orig=sub.textContent;
     sub.innerHTML='<span class="spin"></span>Lecture…';
     d.style.display=''; d.classList.add('slide-in');
     await sleep(1150);
     sub.textContent=orig; flash(d);
     await sleep(450);
   }
   await sleep(2600);
 }},
 {name:'2. Alphonse lit et propose',async run(){
   const p=await depot(2);
   await caption('2 / 9','Alphonse remplit ce qu\'il trouve et indique d\'où vient chaque information.');
   await sleep(800);
   for(let i=0;i<9;i++){
     const f=p.fields[i]; reveal(f);
     if(i<7) flash($('.srcf',f),'pflash');
     await ensureVisible(p.who,f);
     await sleep(i<7?560:850);
   }
   reveal(p.badge); flash(p.badge.parentElement.parentElement,'pflash');
   await sleep(3000);
 }},
 {name:'3. Claire complète en une phrase',async run(){
   const p=await depot(3);
   await caption('3 / 9','Il demande seulement ce qui manque.');
   await sleep(500);
   reveal(p.msgAi); await ensureVisible(p.msgAi);
   await sleep(3400);
   reveal(p.compose); await sleep(300);
   await click(p.compose);
   const ph=p.compose.firstElementChild, phTxt=ph.textContent; ph.classList.add('typed');
   await type(ph,'Le BC est BC-VS-2026-0187, dépôt sur le portail fournisseurs Varenne.');
   await sleep(400);
   await click($('.bt.pr',p.compose));
   const me=document.createElement('div'); me.className='msg me'; me.textContent='Le BC est BC-VS-2026-0187, dépôt sur le portail fournisseurs Varenne.';
   me.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:400,easing:'ease-out'});
   p.compose.before(me); ph.textContent=phTxt; ph.classList.remove('typed');
   await sleep(900);
   await ensureVisible(p.fields[6],p.fields[8]);
   const fill=[[7,'BC-VS-2026-0187'],[8,'Portail fournisseurs Varenne']];
   for(const [i,v] of fill){
     const f=p.fields[i];
     f.children[1].innerHTML=`<span class="vok">${v}</span>`;
     f.children[2].innerHTML=`${I('okc','s2')}Réponse de Claire`; f.children[2].classList.add('ok');
     f.classList.add('okrow'); flash(f);
     await sleep(900);
   }
   p.badge.className='sbd ok'; p.badge.innerHTML='<span class="d"></span>9 informations prêtes'; flash(p.badge);
   const v=$('.bt.pr',p.btns); v.innerHTML=`${I('check','s3')}Valider les 9 informations`;
   reveal(p.btns); await sleep(900);
   await click(v);
   v.classList.add('done'); v.innerHTML=`${I('check','s3')}9 informations validées`;
   await sleep(2600);
 }},
 {name:'4. Échéancier proposé',async run(){
   const ax=await show('echeancier',S.echeancier.prop()); scroller().scrollTop=0;
   await caption('4 / 9','Acompte et solde de 50 % sont proposés d\'après le devis.');
   const rows=$$('.card tbody tr',ax), jalons=rows.slice(0,3).filter(r=>!r.hidden), total=rows[rows.length-1];
   const info=$('.card>.infob',ax), note=$('.card-b>.xs.mut',ax);
   jalons.forEach(r=>r.style.display='none'); total.style.display='none'; popHide(info); hide(note);
   await sleep(900);
   for(const r of jalons){rowIn(r); await sleep(900);}
   rowIn(total); reveal(note); await sleep(700);
   popIn(info); await sleep(2600);
   const b=btn(ax,'Valider l\'échéancier');
   await click(b);
   b.classList.add('done'); b.innerHTML=`${I('check','s3')}Échéancier validé`;
   rows[0].querySelector('.pill') && flash(rows[0],'pflash');
   await sleep(1400);
   await scrollTo(scroller().scrollTop+380,1200);
   await sleep(1800);
 }},
 {name:'5. Facture d\'acompte',async run(){
   const ax=await show('acompte',S.acompte.prop()); scroller().scrollTop=0;
   await caption('5 / 9','Le chef de projet puis la finance valident avant le dépôt chez le client.');
   const sv=$$('.sv',ax).filter(s=>!s.hidden), boxT=$('.box>div',sv[0].closest('.box'));
   await sleep(2200);
   // validation du chef de projet
   const v1=$('.bt.pr',sv[1]);
   await click(v1);
   v1.parentElement.remove();
   $('.c',sv[1]).className='c ok'; $('.c',sv[1]).innerHTML=I('check','s3');
   $('.dd',sv[1]).textContent='Claire Morel · validée le 04/11/2026 à 10:14'; flash(sv[1]);
   await sleep(1500);
   // la finance prend la main
   const acct=$('.acct',ax), tx=$('.tx',acct), av=$('.av',acct);
   await moveTo(acct,false);
   tx.style.opacity=0; av.style.opacity=0; await sleep(380);
   $('.nm',tx).textContent='Fabrice Ducellier'; $('.gr',tx).textContent='Contrôle de gestion'; av.textContent='FD';
   tx.style.opacity=1; av.style.opacity=1; flash(acct,'pflash');
   await sleep(1300);
   $('.c',sv[2]).className='c cur'; $('.c',sv[2]).textContent='3';
   const bx=document.createElement('div'); bx.style.cssText='display:flex;gap:6px;margin-top:8px';
   bx.innerHTML=`<span class="bt pr xs">${I('check','s3')}Valider</span><span class="bt ol xs">Demander une modification</span>`;
   bx.animate([{opacity:0},{opacity:1}],{duration:350}); sv[2].children[1].appendChild(bx);
   await sleep(900);
   await click($('.bt.pr',bx));
   bx.remove();
   $('.c',sv[2]).className='c ok'; $('.c',sv[2]).innerHTML=I('check','s3');
   $('.dd',sv[2]).textContent='Fabrice Ducellier · validée le 04/11/2026 à 11:30'; flash(sv[2]);
   await sleep(900);
   const num=$('.inv h4 span',ax);
   num.className=''; num.style.cssText='font-weight:700;color:#111;border-radius:4px;padding:0 4px'; num.textContent='2026007'; flash(num,'pflash');
   await moveTo(num,false);
   await sleep(1600);
   $('.c',sv[3]).className='c ok'; $('.c',sv[3]).innerHTML=I('check','s3');
   $('.tt',sv[3]).textContent='Déposée sur le portail';
   $('.dd',sv[3]).textContent='04/11/2026 à 11:31 · portail fournisseurs Varenne'; flash(sv[3]);
   if(boxT) {boxT.textContent='Facture d\'acompte émise';}
   await moveTo($('.c',sv[3]),false);
   await sleep(3000);
 }},
 {name:'6. Fin de mission',async run(){
   cur.classList.remove('on');
   capEl.classList.add('off');
   showCard(`<div class="k">Sept semaines plus tard</div><div class="t">18 décembre 2026</div><div class="bar"></div><div class="s">Date de fin prévue au devis</div>`);
   await sleep(500);
   const ax=await show('solde',S.solde.prop()); scroller().scrollTop=0;
   const [left,right]=ax.firstElementChild.children;
   const chatEls=[...$('.card-b.chat',right).children].slice(0,6);
   const dateTd=$('.tw tbody tr td:nth-child(2)',right);
   dateTd.innerHTML='<s class="d1" style="text-decoration:none">18/12/2026</s> <span class="newdate" style="opacity:0">08/01/2027</span>';
   const infos=$$(':scope>.infob',right).filter(x=>!x.hidden);
   hide(left); popHide(chatEls,infos);
   await sleep(2300);
   hideCard();
   await caption('6 / 9','À la date de fin du devis, Claire répond en une phrase, Steve en copie.');
   await sleep(600);
   left.classList.remove('hid'); left.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:600,easing:'ease-out'});
   await sleep(3600);
   popIn(chatEls[0],chatEls[1]); await sleep(1600);
   const me=chatEls[3], txt=me.textContent;
   me.textContent=''; popIn(chatEls[2],me);
   await type(me,txt,40);
   await sleep(800);
   popIn(chatEls[4],chatEls[5]); await sleep(3000);
   const d1=$('.d1',dateTd), d2=$('.newdate',dateTd);
   await moveTo(dateTd.previousElementSibling,false);
   d1.style.textDecoration=''; d1.classList.add('strk','mut'); await sleep(700);
   d2.style.transition='opacity .4s'; d2.style.opacity=1; flash(d2,'pflash');
   await sleep(1500);
   popIn(infos);
   await sleep(2600);
 }},
 {name:'7. Suivi de Steve',async run(){
   const ax=await show('suivi',S.suivi.prop()); scroller().scrollTop=0;
   await caption('7 / 9','Steve voit qui appeler et pourquoi, sans fichier Excel.');
   const tiles=$$('.kpi2',ax), rows=$$('.tw tbody tr',ax);
   hide(tiles); rows.forEach(r=>r.style.display='none');
   await sleep(700);
   for(const t of tiles){reveal(t); countUp($('.v',t),700); await sleep(320);}
   await sleep(500);
   for(const r of rows){rowIn(r); await sleep(170);}
   await sleep(2200);
   const box=$$('.box',ax).find(b=>b.textContent.includes('MERIDIA · relation ADV'));
   const comp=$('.compose',box), ph=comp.firstElementChild, list=comp.parentElement;
   await click(comp);
   ph.classList.add('typed'); ph.textContent='Service achats : bon de commande signé, transmis à Julien Petit.'; flash(comp,'pflash');
   await sleep(1700);
   await click(btn(box,'Noter'));
   const n=document.createElement('div'); n.innerHTML='<span class="xs mut">04/11 · Steve · appel</span><br>Service achats : bon de commande signé, transmis à Julien Petit.';
   list.prepend(n); flash(n,'pflash'); n.style.borderRadius='6px';
   ph.classList.remove('typed'); ph.textContent='Coller un mail ou noter un appel…';
   await sleep(3400);
 }},
 {name:'8. Clôture',async run(){
   const ax=await show('compta',S.compta.prop()); scroller().scrollTop=0;
   await caption('8 / 9','Chaque mois, l\'état facturé et non facturé part au comptable.');
   const kpis=$$('.kpi',ax), rows=$$('.tw tbody tr',ax), boxes=$$('.new>div:last-child>.box',ax);
   hide(kpis,boxes); rows.forEach(r=>r.style.display='none');
   await sleep(600);
   for(const k of kpis){reveal(k); countUp($('.v',k),800); await sleep(280);}
   await sleep(500);
   for(const r of rows){rowIn(r); await sleep(220);}
   await sleep(600); reveal(boxes); await sleep(1300);
   await moveTo(btn(ax,'Export comptable de novembre'));
   await sleep(3200);
 }},
 {name:'9. Rentabilité',async run(){
   const ax=await show('reprev-today',S.reprev.today()); scroller().scrollTop=0;
   const [vt,vp]=$$('span',ver); vt.className='on'; vp.className=''; ver.hidden=false;
   { const cs0=$$('.card',ax); await ensureVisible(cs0[0],cs0[cs0.length-1]); }
   await caption('9 / 9','En novembre, octobre compte pour son réalisé.');
   const warn=$('.warnb',ax);
   await sleep(1200);
   await moveTo(warn,false); await sleep(1200);
   const cs=$$('.card',ax), old=[...$$('.mono',cs[cs.length-1])].find(e=>e.textContent.includes('54,4'));
   if(old){await moveTo(old,false);} await sleep(1400);
   await click(vp);
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
   if(v){flash(v,'pflash'); v.style.borderRadius='4px'; await moveTo(v,false);}
   $$('.mono',rp).forEach(e=>{if(e.textContent.includes('11 375'))flash(e,'pflash');});
   await sleep(4200);
 }},
 {name:'Fin',async run(){
   cur.classList.remove('on'); capEl.classList.add('off'); ver.hidden=true;
   showCard(`${LOGO}<div class="t">Maquette : données fictives, rien n'est développé à ce stade</div><div class="bar"></div>`);
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
  if(i!==0&&i!==STEPS.length-1&&i!==6) hideCard();
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
