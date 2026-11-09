// ===== Écrans du support : états figés des scènes du parcours v4 =====
// S'appuie sur les gabarits de parcours.js (ficheTab, factureTab, aFaire, parChantier, mail4, cloture4, todaySplit, cmpScreen).

// --- Liste des écrans ---
const ETAPES=['Aujourd\'hui','Dépôt du devis','Échéancier','Vérification','Émission','Envoi et suivi','Consultant','Par chantier','Fin de mission','Clôture','Section Finance'];

const SCREENS=[
 {id:'today',etape:0,who:'Aujourd\'hui',title:'Aujourd\'hui : un onglet Facturation vide et le facturier Excel de Stive',
  html:()=>todaySplit(),solo:true,
  caps:[['Ce que montre l\'écran',['En haut, l\'onglet Facturation d\'un chantier dans Alphonse, tel qu\'il existe : un échéancier vide et, plus bas, un formulaire à remplir champ par champ.','En bas, le facturier Excel tenu par Stive, une ligne par facture.']],
        ['Ce qui coince',['Le chef de projet ressaisit ce qui figure déjà dans son devis.','Stive recopie, numérote et relance de mémoire ; « facturé » dépend d\'une case cochée.','Pour savoir quoi facturer, il faut faire la tournée des chefs de projet.']]]},
 {id:'depot',etape:1,who:'Claire Morel · cheffe de projet',title:'Claire dépose le devis : Alphonse préremplit les informations de facturation et cite ses sources',
  html:()=>ficheTab({docs:'two',infos:'edit',sched:'empty'}),
  today:()=>{navToday();const h=S.depot.today();navTarget();return h.replace(/>—</g,'>Non renseigné<');},
  after:(r)=>{const u=r.querySelector('#useEnt');if(u)u.outerHTML='<span class="sbd ok sm"><span class="d"></span>Entité existante utilisée</span>';},
  caps:[['Ce que montre l\'écran',['Le devis signé et le bon de commande, déposés dans la fiche du chantier.','Le formulaire existant, prérempli : chaque champ indique sa source (« Devis, p. 1 »). L\'entité déjà connue est retrouvée.','Le seul manque, le contact facturation, est signalé. Claire glisse le mail du client : le contact est lu dans la signature.']],
        ['Ce qui change',['Claire relit et valide au lieu de ressaisir.','Rien n\'est enregistré tant qu\'elle n\'a pas cliqué « Valider ces informations ».','Sans devis, « Remplir à la main » garde le formulaire d\'aujourd\'hui.']]]},
 {id:'echeancier',etape:2,who:'Claire Morel · cheffe de projet',title:'L\'échéancier 50/50 est proposé et rapproché du montant du chantier',
  html:()=>ficheTab({docs:'mail',infos:'saved',sched:'prop'}),
  caps:[['Ce que montre l\'écran',['Les informations validées, puis l\'échéancier proposé : acompte de 50 % au lancement, solde de 50 % à la fin prévue au devis.','Un contrôle vert : le total égale le devis et le montant du chantier.']],
        ['Ce qui change',['Le schéma des enquêtes n\'est plus ressaisi à chaque chantier.','Chaque échéance a un type (acompte, solde, complément), utile pour la facture électronique.','La date du solde sert ensuite au mail de fin de mission.']]]},
 {id:'facture',etape:3,who:'Claire Morel · cheffe de projet',title:'À la date prévue, la facture d\'acompte est prête : Claire la vérifie',
  html:()=>factureTab(),
  today:()=>S.acompte.today(),todayLabel:'Le modèle de facture Excel',
  caps:[['Ce que montre l\'écran',['La facture d\'acompte en brouillon, préparée par Alphonse le jour de l\'échéance, et son fil : préparée, vérifiée par la cheffe de projet, émise par la finance (Stive), déposée.','Deux boutons pour Claire : « C\'est bon » ou « À corriger », avec un motif.']],
        ['Ce qui change',['Personne ne recopie la facture : elle reprend la fiche validée.','Le numéro définitif n\'est attribué qu\'à l\'émission, par la finance.','À chaque instant, on sait qui doit agir.']]]},
 {id:'emettre',etape:4,who:'Stive · facturation et relances',title:'Stive émet ce que la cheffe de projet a vérifié',
  html:()=>aFaire('steve','04/11/2026',
     fr('V','VARENNE_EnqSig','Claire Morel','Acompte','9 300',ST('em','À émettre'),'Vérifiée le 03/11 par Claire Morel',`<span class="bt pr xs">${I('send','s3')}Émettre</span>`)+
     fr('T','TALMONT_Enq','Sophie Martin','Solde','4 900',ST('em','À émettre'),'Vérifiée le 03/11 par Sophie Martin',`<span class="bt pr xs">${I('send','s3')}Émettre</span>`),
     {side:`<div class="box" style="padding:14px 16px"><div class="lbl" style="margin-bottom:8px">Contrôles avant émission</div><div style="display:flex;gap:8px;align-items:center;font-size:13px">${I('okc','s3')}Aucun doublon détecté</div><div style="display:flex;gap:8px;align-items:center;font-size:13px;margin-top:6px">${I('okc','s3')}Montants conformes aux devis</div></div>`}),
  caps:[['Ce que montre l\'écran',['La liste « À faire » de Stive, filtrée sur « Chez moi » : les factures vérifiées par les chefs de projet, prêtes à émettre.','Les compteurs du haut montrent où en sont toutes les factures, étape par étape.']],
        ['Ce qui change',['Chaque facture est validée par deux personnes avant de partir.','« Émettre » attribue le numéro définitif et la date du jour : la facture ne se modifie plus, elle s\'annule par un avoir.']]]},
 {id:'steve',etape:5,who:'Stive · facturation et relances',title:'Le lendemain, Stive voit quoi déposer, quoi relancer et qui appeler, sans Excel',
  html:()=>aFaire('steve','05/11/2026',
     fr('V','VARENNE_EnqSig','Claire Morel','F2026-00007','9 300',ST('env','À envoyer'),'Portail fournisseurs Varenne',`<span class="bt pr xs">${I('send','s3')}Déposer sur le portail</span>`)+
     fr('T','TALMONT_Enq','Sophie Martin','F2026-00008','4 900',ST('env','À envoyer'),'Envoi par mail',`<span class="bt ol xs">Envoyer</span>`)+
     fr('O','ORLAN_EnqHar','Sophie Martin','F2026-00006','16 000',ST('env','À envoyer'),'Émise le 30/10',`<span class="bt ol xs">Envoyer</span>`)+
     fr('H','HALIOS_EnqSig','Julien Petit','F2026-00004','12 000',ST('enc','À encaisser')+' <span class="late">En retard de 16 j</span>','Échéance du 20/10',`<span class="bt ol xs">${I('mail','s3')}Préparer le rappel</span>`)+
     fr('M','MERIDIA_EnqRPS','Sophie Martin','F2026-00005','10 500',ST('con','Contestée'),'Montant contesté, relances suspendues',''),
     {alert:`<div class="alertb">${I('alert','s3')}<span><b>BRENNE_Enq</b> : bon de commande manquant, chantier créé il y a 7 jours. La facture reste « À préparer ».</span></div>`,cnt:[['À préparer',1],['Chez le chef de projet',1],['À émettre',0],['À envoyer',3],['À encaisser',1],['Contestée',1]]}),
  after:(r)=>{const d=document.createElement('div');d.className='draft';d.style.cssText='position:absolute;right:40px;top:520px;width:460px;z-index:5';
     d.innerHTML=`<div class="lbl" style="margin-bottom:8px">Rappel préparé pour HALIOS, à envoyer depuis votre messagerie</div>Bonjour, sauf erreur de notre part, la facture F2026-00004 du 20/09/2026 (12 000 € HT, 14 400 € TTC) est arrivée à échéance le 20/10. Pourriez-vous nous indiquer sa date de règlement ? Merci beaucoup.<div style="display:flex;justify-content:flex-end;margin-top:10px"><span class="bt pr xs">Copier</span></div>`;
     r.style.position='relative';r.appendChild(d);},
  today:()=>xlFacturier4(),todayLabel:'Le facturier Excel',
  caps:[['Ce que montre l\'écran',['La même liste « À faire », côté Stive : les factures à envoyer, une facture en retard, une contestée, et l\'alerte d\'un chantier démarré sans bon de commande.','Pour une relance, Alphonse prépare le texte ; Stive l\'envoie depuis sa messagerie.']],
        ['Ce qui change',['Plus de facturier à tenir : le registre se remplit tout seul, l\'export au format du facturier reste disponible.','Stive passe du temps sur ce qui bloque : appeler le bon interlocuteur.','Écran à construire avec Stive : nous le lui présenterons avant de le figer.']]]},
 {id:'consultant',etape:6,who:'Lucas Bernard · consultant du chantier',title:'Un consultant du chantier voit sa facturation en lecture seule',
  html:()=>consultantFacturation(window.__consMode||'complet'),dyn:true,
  caps:[['Ce que montre l\'écran',['Lucas, consultant de l\'équipe, ouvre l\'onglet Facturation : échéancier, informations de facturation et factures émises avec leur statut.','Aucun bouton : tout est en lecture seule. Le bandeau dit qui suit la facturation.']],
        ['Ce qui change',['Le consultant sait où en est la facturation de son chantier sans demander.','Les montants affichés dépendent de l\'arbitrage n° 2, plus bas : l\'écran suit votre choix.']]]},
 {id:'parchantier',etape:7,who:'Stive, Fabrice, chefs de projet',title:'Par chantier : production, déjà facturé et écart, l\'état de la facturation tenu à jour chaque jour',
  html:()=>parChantier(),
  caps:[['Ce que montre l\'écran',['Chaque chantier, groupé par chef de projet : montant, production à fin octobre, déjà facturé, écart et prochaine échéance.','Un solde qui attend chez le chef de projet depuis le 4 novembre ressort.']],
        ['Ce qui change',['C\'est l\'état de la facturation de Fabrice, sans retraitement Excel : les trois colonnes production, déjà facturé, écart, exportables à tout moment.','Le facturé vient des factures émises, et seulement d\'elles. La production est un calcul : jours saisis ÷ jours prévus × montant du chantier.','Le point de Stive avec chaque chef de projet part de cette vue (arbitrage n° 7).']]]},
 {id:'fin',etape:8,who:'Claire Morel · cheffe de projet',title:'À la fin prévue, un seul mail : Claire répond en un clic ou en une phrase',
  html:()=>mail4(),solo:true,
  after:(r)=>{const rp=r.querySelector('#reply');if(rp){rp.textContent='Pas encore, la restitution est reportée au 8 janvier.';rp.style.borderColor='#1d4ed8';}const p=r.querySelector('#propo');if(p)p.style.display='';},
  today:()=>S.solde.today(),todayLabel:'Aujourd\'hui',
  caps:[['Ce que montre l\'écran',['Le mail reçu le jour de la fin prévue au devis, Stive en copie, avec les jours saisis et prévus.','Trois réponses en un clic, ou une phrase : Alphonse propose la nouvelle date, Claire confirme.']],
        ['Ce qui change',['Personne n\'a à se souvenir de facturer le solde.','Le report est tracé, Stive le voit dans sa liste. Un complément se déclare au même endroit.']]]},
 {id:'cloture',etape:9,who:'Fabrice Ducellier · finance',title:'Fabrice clôt le mois : les chiffres sont figés et le comptable reçoit trois fichiers',
  html:()=>cloture4(),
  after:(r)=>{r.querySelectorAll('.ck').forEach(k=>{k.className='sbd ok sm ck';k.textContent='✓';});r.querySelectorAll('#pack .file').forEach(f=>f.style.display='');},
  today:()=>S.compta.today(),todayLabel:'L\'onglet FAE de l\'Excel',
  caps:[['Ce que montre l\'écran',['Trois vérifications au vert : temps saisis, factures dues émises, brouillons traités.','Les trois montants du mois : facturé, travail réalisé non facturé, facturé d\'avance. Puis les trois fichiers pour le comptable.']],
        ['Ce qui change',['Les montants sont calculés par des formules et figés à la clôture : ils ne bougent plus.','Le comptable n\'a pas de compte : Fabrice lui transmet les trois fichiers.']]]},
 {id:'finance',etape:10,who:'La section Finance',title:'La section Finance : sept pages deviennent six, rangées par ce que chacun a à faire',
  html:()=>cmpScreen(),solo:true,
  caps:[['Ce que montre l\'écran',['À gauche, les pages Finance d\'aujourd\'hui ; à droite, ce qu\'elles deviennent, et pourquoi.']],
        ['Ce qui change',['Deux entrées : Facturation (À faire, Par chantier, Registre) et Clôture du mois (Vérifications, Travail réalisé et facturé, Mois clos).','Ces changements ne concernent que Plein Sens Ethique : Plein Sens ne change pas.']]]}
];
