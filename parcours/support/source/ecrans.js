// ===== Écrans du support : états figés des scènes du parcours v4 =====
// S'appuie sur les gabarits de parcours.js (ficheTab, factureTab, aFaire, parChantier, mail4, cloture4, todaySplit, cmpScreen).

// --- Aujourd'hui : l'onglet FAE du classeur, fin octobre (chiffres alignés sur le facturier et sur « Par chantier ») ---
function faeToday(){
  const rows=[['VARENNE_EnqSig','Enquête interne','18 600','2 170','0','2 170'],['BRENNE_Enq','Enquête signalement','15 000','6 000','0','6 000'],['HALIOS_EnqSig','Enquête interne','24 000','16 800','12 000','4 800'],['CAPELLE_Enq','Enquête signalement','12 400','12 400','6 200','6 200'],['ORLAN_EnqHar','Enquête harcèlement','32 000','9 600','16 000','-6 400'],['MERIDIA_EnqRPS','Enquête RPS','21 000','10 500','10 500','0'],['TALMONT_Enq','Enquête','9 800','9 800','4 900','4 900']];
  return `<div class="xl"><div class="xt">PLS_facturier.xlsx <span>Excel</span></div><div class="rib"><span>Fichier</span><span>Accueil</span><span>Insertion</span><span>Mise en page</span><span>Formules</span><span>Données</span></div><div class="fx"><b>F9</b><i>=D9-E9</i></div>
<table><colgroup><col style="width:42px"><col style="width:200px"><col><col style="width:150px"><col style="width:150px"><col style="width:150px"><col style="width:150px"></colgroup>
<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr>
<tr class="h"><td class="rn">1</td><td>Alphonse</td><td>nom chantier</td><td>CA chantier</td><td>production à date</td><td>facturé à date</td><td>FAE</td></tr>
${rows.map((r,i)=>`<tr><td class="rn">${i+2}</td>${r.map((c,j)=>`<td${j>1?' style="text-align:right"':''}>${c}</td>`).join('')}</tr>`).join('')}
<tr><td class="rn">9</td><td style="font-weight:700">TOTAL</td><td></td><td style="text-align:right;font-weight:700">132 800</td><td style="text-align:right;font-weight:700">67 270</td><td style="text-align:right;font-weight:700">49 600</td><td style="text-align:right;font-weight:700">17 670</td></tr>
${Array.from({length:7},(_,k)=>`<tr><td class="rn">${10+k}</td>${'<td></td>'.repeat(6)}</tr>`).join('')}
</table>
<div class="note">Production reprise d'Alphonse, facturé repris du facturier. Une seule colonne mélange le produit non facturé et le facturé d'avance (ORLAN). L'onglet part chez le comptable chaque fin de mois, avec le facturier.</div>
<div class="sheets"><span>Non payé plus de 2 mois</span><span>Non payé moins de 2 mois</span><span>Facturier</span><span>modele facture standard</span><span>Fichier Client</span><span class="on">FAE</span></div></div>`;
}

// --- Liste des écrans ---
const ETAPES=['Aujourd\'hui','Dépôt du devis','Échéancier','Informations','Vérification','Émission','Envoi et suivi','L\'équipe','Par chantier','Mail de fin','Réponse','Clôture','Section Finance'];
const addTo=(r,html)=>{r.style.position='relative';r.insertAdjacentHTML('beforeend',html);};

const SCREENS=[
 {id:'today',etape:0,who:'Aujourd\'hui',title:'Aujourd\'hui : un onglet Facturation vide et le facturier Excel de Stive',
  html:()=>todaySplit(),solo:true,
  caps:[['Ce que montre l\'écran',['À gauche, l\'onglet Facturation d\'un chantier dans Alphonse, tel qu\'il existe : un échéancier vide et un formulaire à remplir champ par champ.','À droite, le facturier Excel tenu par Stive, une ligne par facture.']],
        ['Ce qui coince',['Le chef de projet ressaisit ce qui figure déjà dans son devis.','Stive recopie, numérote et relance de mémoire.','Pour savoir quoi facturer, il faut faire la tournée des chefs de projet.']]]},
 {id:'depot',etape:1,who:'Claire Morel · cheffe de projet (ou Stive, référent facturation)',title:'Claire dépose le devis : Alphonse le lit, puis l\'efface',
  html:()=>ficheTab({docs:'two',infos:'empty',sched:'empty'}),
  today:()=>{navToday();const h=S.depot.today();navTarget();return h.replace(/>—</g,'>Non renseigné<');},
  caps:[['Ce que montre l\'écran',['Le devis signé et le bon de commande, déposés dans la fiche du chantier, et lus par Alphonse.','Une mention rappelle que les fichiers sont effacés après lecture (arbitrage n° 3).']],
        ['Ce qui change',['Selon l\'arbitrage n° 1, le dépôt peut être fait par le chef de projet ou par le référent facturation.','Sans devis, « Remplir à la main » garde le formulaire d\'aujourd\'hui.']]]},
 {id:'echeancier',etape:2,who:'Claire Morel · cheffe de projet',title:'L\'échéancier est repris tel qu\'il est écrit dans le devis',
  html:()=>ficheTab({docs:'two',infos:'empty',sched:'prop'}),
  caps:[['Ce que montre l\'écran',['L\'échéancier passe avant les informations de facturation (arbitrage n° 4).','Ici, le devis prévoit la moitié à la commande et la moitié à la remise du rapport : Alphonse reprend ces deux échéances et cite la page du devis.','Un contrôle vert : le total égale le devis et le montant du chantier.']],
        ['Ce qui change',['Un autre devis, un autre échéancier : 30 / 40 / 30, ou trois dates fixes, sont repris de la même façon (arbitrage n° 2).','Chaque échéance a un type (acompte, solde, complément), utile pour la facture électronique, et la date du solde sert au mail de fin de mission.']]]},
 {id:'infos',etape:3,who:'Claire Morel · cheffe de projet',title:'Puis les informations de facturation, avec leur source ; un seul clic valide le tout',
  html:()=>ficheTab({docs:'mail',infos:'edit',sched:'prop'}),
  after:(r)=>{const u=r.querySelector('#useEnt');if(u)u.outerHTML='<span class="sbd ok sm"><span class="d"></span>Entité existante utilisée</span>';const c=r.querySelector('[data-f="contact"]');if(c){c.querySelector('.inp').className='inp ed ai';c.querySelector('.inp').textContent='Nadia Lemoine, comptabilité fournisseurs';const s=c.querySelector('.src');s.className='src';s.textContent='Mail du client, signature';}},
  caps:[['Ce que montre l\'écran',['Le formulaire existant, prérempli : chaque champ indique sa source. L\'entité déjà connue est retrouvée.','Le contact manquait : Claire a glissé un mail du client, Alphonse l\'a lu dans la signature.','« Frais de mission » est le champ qui existe déjà : frais inclus dans le prix ou refacturés au client.']],
        ['Ce qui change',['Claire relit et valide au lieu de ressaisir, en un seul clic pour l\'échéancier et les informations.','Rien n\'est enregistré tant que ce clic n\'est pas fait.']]]},
 {id:'verif',etape:4,who:'Claire Morel · cheffe de projet (ou l\'associé de référence)',title:'À la date prévue, Claire vérifie l\'acompte sans quitter l\'échéancier',
  html:()=>factureTab(),after:(r)=>addTo(r,verifDrawer()),
  today:()=>S.acompte.today(),todayLabel:'Le modèle de facture Excel',
  caps:[['Ce que montre l\'écran',['L\'échéancier du chantier : l\'acompte est « À vérifier » depuis le 2 novembre, date prévue au devis.','Le bouton « Vérifier » ouvre la facture préparée à côté de l\'échéancier, avec trois contrôles faits par Alphonse.']],
        ['Ce qui change',['Personne ne recopie la facture : elle reprend l\'échéancier et les informations validées.','Il n\'y a qu\'un endroit à regarder : la facture apparaît dans la ligne de son échéance, avec son numéro et son statut.','Le numéro définitif n\'est attribué qu\'à l\'émission, par la finance.']]]},
 {id:'emettre',etape:5,who:'Stive · rôle Finance, référent facturation',title:'La finance émet ce que la cheffe de projet a vérifié',
  html:()=>aFaire('steve','04/11/2026',
     fr('V','VARENNE_EnqSig','Claire Morel','Acompte','9 300',ST('em','À émettre'),'Vérifiée le 03/11 par Claire Morel',`<span class="bt pr xs">${I('send','s3')}Émettre</span>`)+
     fr('T','TALMONT_Enq','Sophie Martin','Solde','4 900',ST('em','À émettre'),'Vérifiée le 03/11 par Sophie Martin',`<span class="bt pr xs">${I('send','s3')}Émettre</span>`),
     {side:`<div class="box" style="padding:14px 16px"><div class="lbl" style="margin-bottom:8px">Contrôles avant émission</div><div style="display:flex;gap:8px;align-items:center;font-size:13px">${I('okc','s3')}Aucun doublon détecté</div><div style="display:flex;gap:8px;align-items:center;font-size:13px;margin-top:6px">${I('okc','s3')}Montants conformes aux devis</div></div>`}),
  caps:[['Ce que montre l\'écran',['La liste « À faire » de Stive, filtrée sur « Chez moi » : les factures des enquêtes dont il est le référent, vérifiées et prêtes à émettre.','Les compteurs du haut montrent où en sont toutes les factures, étape par étape.']],
        ['Ce qui change',['Chaque facture est validée par deux personnes avant de partir.','« Émettre » attribue le numéro définitif et la date du jour : la facture ne se modifie plus, elle s\'annule par un avoir.','Toute personne du rôle Finance, Fabrice compris, peut prendre le relais (arbitrage n° 5).']]]},
 {id:'suivi',etape:6,who:'Stive · rôle Finance, référent facturation',title:'Envoi, dépôt, paiement : Stive les fait comme aujourd\'hui, et note le statut',
  html:()=>aFaire('steve','05/11/2026',suiviRows(),{alert:SUIVI_ALERT,cnt:SUIVI_CNT}),
  after:(r)=>{const c=r.querySelector('tr[data-c="V"] .acell');if(c)c.insertAdjacentHTML('beforeend',notePop());},
  today:()=>xlFacturier4(),todayLabel:'Le facturier Excel',
  caps:[['Ce que montre l\'écran',['Stive a déposé la facture sur le portail du client, comme aujourd\'hui. Il le note en un clic : « déposée sur le portail », avec la date.','Plus bas, une facture en retard ressort d\'elle-même, une autre est contestée, et un chantier démarré sans bon de commande est signalé.']],
        ['Ce qui change',['Alphonse n\'envoie rien et ne dépose rien (arbitrage n° 8) : il suit des statuts.','« À vérifier », « À émettre », « À envoyer » et « En retard » se mettent à jour seuls ; « Envoyée », « Réglée » et « Contestée » sont notés par la finance.','Pour une relance, Alphonse prépare le texte ; Stive l\'envoie depuis sa messagerie. Écran à construire avec Stive.']]]},
 {id:'consultant',etape:7,who:'Lucas Bernard · consultant',title:'Toute l\'équipe voit la facturation, en lecture seule',
  html:()=>consultantFacturation(window.__consMode||'complet'),dyn:true,
  caps:[['Ce que montre l\'écran',['Lucas, consultant, ouvre l\'onglet Facturation : l\'échéancier, chaque facture avec son numéro et son statut, puis les informations de facturation.','Aucun bouton. Le bandeau dit qui suit la facturation du chantier.']],
        ['Ce qui change',['Le consultant sait où en est la facturation sans demander.','Ce qu\'il voit suit l\'arbitrage n° 6 : l\'écran change avec votre choix.']]]},
 {id:'parchantier',etape:8,who:'Finance, chefs de projet, associés',title:'Par chantier : production, déjà facturé et écart, l\'état de la facturation tenu à jour chaque jour',
  html:()=>parChantier(),
  caps:[['Ce que montre l\'écran',['Chaque chantier, groupé par chef de projet : montant, production à fin octobre, déjà facturé, écart et prochaine facture.','Un solde qui attend la vérification depuis le 4 novembre ressort.']],
        ['Ce qui change',['C\'est l\'état de la facturation de Fabrice, sans retraitement Excel : production, déjà facturé et écart, exportables à tout moment.','Le facturé vient des factures émises, et seulement d\'elles. La production reprend le calcul de la valorisation qui existe déjà dans Alphonse, figé à la fin de chaque mois. Aucune IA n\'intervient.','Stive part de cette vue pour appeler le chef de projet d\'un chantier qui ressort (arbitrage n° 11).']]]},
 {id:'fin',etape:9,who:'Claire Morel · cheffe de projet',title:'À la fin prévue au devis, un mail : son lien ouvre Alphonse',
  html:()=>mail4(),solo:true,
  caps:[['Ce que montre l\'écran',['Le mail reçu le jour de la fin prévue au devis, le référent facturation en copie, avec les jours saisis et prévus.','Un seul bouton : « Répondre dans Alphonse ».']],
        ['Ce qui est réaliste',['Alphonse envoie déjà des mails ; un lien qui ouvre la bonne fiche est simple à faire.','Une réponse donnée d\'un clic dans le mail, ou en répondant au mail, n\'est pas retenue : les messageries d\'entreprise ouvrent les liens pour les analyser, ce qui pourrait déclencher une décision à votre insu.']]]},
 {id:'finA',etape:10,who:'Claire Morel · cheffe de projet',title:'Dans Alphonse, Claire choisit : facturer le solde, reporter ou prévoir un complément',
  html:()=>ficheTab({docs:'mail',sched:'fin',infos:'saved'}),
  after:(r)=>{addTo(r,finDialog());const o=r.querySelector('.fopt[data-o="rep"]');if(o){o.classList.add('sel');o.querySelector('i').classList.add('on');}const f=r.querySelector('#repF');if(f)f.style.display='';const d=r.querySelector('#repD');if(d)d.textContent='08/01/2027';const m=r.querySelector('#repM');if(m)m.textContent='Restitution décalée par le client';},
  today:()=>S.solde.today().replace('03/11/2026','04/11/2026').replace('<span class="sbd ok"><span class="d"></span>Réglé</span>','<span class="sbd info"><span class="d"></span>Facturé</span>'),todayLabel:'Pas de rappel',
  caps:[['Ce que montre l\'écran',['La fiche du chantier, ouverte depuis le mail, avec la question posée en fenêtre : facturer le solde maintenant, le reporter à une date, ou prévoir un complément.','Claire reporte au 8 janvier, avec un motif.']],
        ['Ce qui change',['Personne n\'a à se souvenir de facturer le solde.','Le report est tracé dans l\'échéancier ; le référent facturation le voit dans sa liste. Le 8 janvier, la facture suit le même circuit que l\'acompte.','Un complément se déclare au même endroit, avec l\'accord du client (arbitrage n° 9).']]]},
 {id:'cloture',etape:11,who:'Fabrice Ducellier · rôle Finance',title:'La finance clôt le mois : les chiffres sont figés et le comptable reçoit trois fichiers',
  html:()=>cloture4(),
  after:(r)=>{r.querySelectorAll('.ck').forEach(k=>{k.className='sbd ok sm ck';k.textContent='✓';});r.querySelectorAll('#pack .file').forEach(f=>f.style.display='');},
  today:()=>faeToday(),todayLabel:'L\'onglet FAE de l\'Excel, fin octobre',
  caps:[['Ce que montre l\'écran',['Trois vérifications au vert : temps saisis, factures dues émises, brouillons traités.','Les trois montants du mois : facturé, travail réalisé non facturé, facturé d\'avance. Puis les trois fichiers pour le comptable.']],
        ['Ce qui change',['Les montants sont calculés par des formules et figés à la clôture : ils ne bougent plus.','Le comptable n\'a pas de compte : la finance lui transmet les trois fichiers (arbitrage n° 12).']]]},
 {id:'finance',etape:12,who:'Pour Fabrice',title:'Pour Fabrice : où retrouver les pages Finance d\'aujourd\'hui',
  html:()=>cmpScreen(),solo:true,
  caps:[['Ce que montre l\'écran',['À gauche, les pages Finance d\'aujourd\'hui ; à droite, ce qu\'elles deviennent, et pourquoi.']],
        ['Ce qui change',['Deux entrées : Facturation (À faire, Par chantier, Registre) et Clôture du mois (Vérifications, Travail réalisé et facturé, Mois clos).','Ces changements ne concernent que Plein Sens Ethique : Plein Sens ne change pas.']]]}
];
