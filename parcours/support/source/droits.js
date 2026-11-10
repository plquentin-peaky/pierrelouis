 {g:'Rôles et droits',k:'r1',t:'Qui émet les factures ?',w:'le moment où la facture reçoit son numéro définitif',screen:'emettre',
  q:'Émettre attribue le numéro définitif : la facture ne se modifie plus, elle s\'annule par un avoir. Aujourd\'hui, Stive prépare et émet les factures dans son Excel ; dans Alphonse, il n\'a qu\'un accès en lecture. Stive et Fabrice relèvent tous deux de la finance : leur partage du travail est une affaire interne, qui peut varier d\'une enquête à l\'autre.',
  o:[{v:'role',n:'Le rôle Finance, avec un référent facturation par enquête',d:'Stive et Fabrice ont le rôle Finance, qui existe déjà : chacun peut émettre, créer un avoir ou clore le mois. Chaque chantier désigne un référent facturation (Stive par défaut) : les factures arrivent dans sa liste « Chez moi », et toute personne du rôle Finance peut prendre le relais.',rec:true,i:'Le rôle existe ; seul le référent facturation, désigné sur le chantier, est à ajouter.',
      m:MX(`<div class="box" style="padding:10px 14px"><div class="field" style="grid-template-columns:150px 1fr auto"><span class="k">Référent facturation</span><span class="v">Stive · rôle Finance</span><span class="bt ol xs">Changer</span></div><div class="field" style="grid-template-columns:150px 1fr auto"><span class="k">Acompte 50 %</span><span class="v">${ST('em','À émettre')}</span><span class="xs mut">chez Stive</span></div></div>`)},
     {v:'nouveau',n:'Un nouveau rôle « Facturation » pour Stive',d:'Émettre, noter l\'envoi et le paiement, relancer ; sans avoir ni clôture, réservés au rôle Finance (Fabrice).',i:'Un rôle de plus à créer et à tenir à jour dans l\'écran des droits.',
      m:MX(`<div class="box" style="padding:10px 14px;font-size:12.5px"><div class="lbl" style="margin-bottom:6px">Écran des droits · rôles</div>${[['Consultant',''],['Associé',''],['Finance',''],['Facturation','nouveau'],['Administrateur','']].map(([r,n])=>`<div style="display:flex;justify-content:space-between;padding:4px 0;border-top:1px solid var(--border)"><span>${r}</span>${n?'<span class="sbd warn sm">à créer</span>':''}</div>`).join('')}</div>`)}],
  why:'On s\'appuie sur un rôle qui existe. La répartition entre Stive et Fabrice reste votre organisation interne et peut changer d\'une enquête à l\'autre ; le même modèle s\'étend à Plein Sens, où la finance compte plus de personnes.'},
 {g:'Rôles et droits',k:'r2',t:'Que voit un consultant ?',w:'un membre de l\'équipe, ni chef de projet ni associé',screen:'consultant',
  q:'Un consultant n\'a aucune étape à faire dans la facturation. Le 11 octobre, vous avez ouvert à tous le budget et le chiffre d\'affaires de tous les chantiers.',
  o:[{v:'tous',n:'La facturation de tous les chantiers, en lecture seule',d:'Échéancier avec les montants, chaque facture et son statut, informations de facturation. Aucun bouton, pas d\'entrée Finance dans le menu.',rec:true,
      m:echL('<b>Lecture seule.</b> Tous les chantiers.',el('Acompte 50 %','9 300,00','F2026-00007',pv('Envoyée','enc'))+el('Solde 50 %','9 300,00','',pv('À venir','av')),'18 600 €')},
     {v:'siens',n:'Ses chantiers seulement, en lecture seule',d:'Les chantiers où il fait partie de l\'équipe ; les autres restent invisibles dans l\'onglet Facturation.',
      m:echL('<b>Lecture seule.</b> Vos chantiers.',el('Acompte 50 %','9 300,00','F2026-00007',pv('Envoyée','enc'))+el('Solde 50 %','9 300,00','',pv('À venir','av')),'18 600 €')},
     {v:'sans',n:'Tous les chantiers, sans les montants',d:'Les échéances, leurs dates, les factures et leurs statuts, sans aucun montant.',i:'Les montants restent visibles ailleurs (budget, chiffre d\'affaires), ce qui rend le masquage peu utile.',
      m:echL('<b>Lecture seule.</b> Tous les chantiers.',el('Acompte 50 %','<span class="mut">masqué</span>','F2026-00007',pv('Envoyée','enc'))+el('Solde 50 %','<span class="mut">masqué</span>','',pv('À venir','av')),'<span class="mut">masqué</span>')}],
  why:'C\'est la règle que vous avez posée le 11 octobre : tout le monde voit tout. Le consultant sait où en est la facturation sans demander, sans pouvoir rien y changer.'},
 {g:'Rôles et droits',k:'r3',t:'Que fait l\'associé de référence ?',w:'responsable du chantier avec le chef de projet',screen:'verif',
  q:'L\'associé de référence porte le chantier avec le chef de projet. Dans Alphonse, il a déjà les mêmes droits que lui sur la fiche du chantier.',
  o:[{v:'cp',n:'Les mêmes droits que le chef de projet, sur ses chantiers',d:'Il peut déposer le devis, valider l\'échéancier, vérifier une facture et répondre à la fin de mission, notamment en l\'absence du chef de projet.',rec:true,
      m:MX(`<div class="box" style="padding:14px 16px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:13.5px">Acompte 50 % · 9 300 € HT</b>${pv('À vérifier','cp')}</div><div class="infob" style="margin-top:10px">${I('users','s3')}<span>Peuvent vérifier : Claire Morel (cheffe de projet) ou l'associé de référence.</span></div><div style="display:flex;gap:6px;margin-top:10px"><span class="bt pr xs">${I('check','s3')}C'est bon</span><span class="bt ol xs">À corriger</span></div></div>`)},
     {v:'lecture',n:'Il lit seulement',d:'Comme un consultant : il suit la facturation de ses chantiers sans pouvoir agir.',
      m:MX(`<div class="infob">${I('eye','s3')}<span><b>Lecture seule.</b> Associé de référence : ses 3 chantiers.</span></div>`)}],
  why:'Il remplace le chef de projet quand il est absent, sans circuit particulier : la facture à vérifier est aussi dans sa liste « Chez moi ».'},
/*@@FIN_ARB@@*/
// ---------- Qui voit quoi ----------
const ROLES=[
 ['Rôles qui existent dans Alphonse','Consultant · Associé · Finance · Administrateur. Leurs droits se règlent dans l\'écran des droits.'],
 ['Désignés sur chaque chantier','Chef de projet · associé de référence · référent facturation (à ajouter, choisi parmi le rôle Finance). Ils changent d\'un chantier à l\'autre.']
];
const MATRIX=(st)=>{
  const T=(t)=>['txt',t];
  const cons={tous:['read','Tous les chantiers : échéancier, montants, factures et statuts'],siens:['read','Ses chantiers : échéancier, montants, factures et statuts'],sans:['read','Tous les chantiers, sans les montants']}[st.r2];
  const cp=st.o1==='fin'?['edit','Vérifie chaque facture, répond à la fin de mission ; transmet le devis à la finance']:['edit','Dépose le devis, valide l\'échéancier et les informations, vérifie chaque facture, répond à la fin de mission'];
  const ass={cp:['edit','Comme le chef de projet, sur ses chantiers'],lecture:['read','Ses chantiers, en lecture']}[st.r3];
  const msgCp={recap:'Un par facture à vérifier et un en fin de mission (3 pour une enquête en 50/50), chacun ouvre Alphonse',liste:'Le mail de fin de mission',tout:'Une dizaine de messages par enquête'}[st.e3];
  const msgSt={recap:'Un récapitulatif par semaine ; copie du mail de fin de mission',liste:'Copie du mail de fin de mission',tout:'Un mail à chaque étape'}[st.e3];
  const msgFa={recap:'Un message par mois, quand le mois est prêt à être clos',liste:'Aucun',tout:'Un mail à chaque étape'}[st.e3];
  const stFiche=st.o1==='cp'?['edit','Complète ce qui manque']:['edit','Peut déposer le devis et valider ; complète ce qui manque'];
  const stFac=st.r1==='nouveau'?['edit','Émet, note l\'envoi et le paiement, relance ; sans avoir'] : ['edit','Émet, note l\'envoi et le paiement, relance ; « Chez moi » pour ses enquêtes'];
  const stClo=st.r1==='nouveau'?['no','']:['edit','Peut clore le mois'];
  return [
   ['Consultant<span>rôle Consultant</span>',cons,['no','Pas d\'entrée Finance dans le menu'],['no',''],T('Aucun')],
   ['Claire, cheffe de projet<span>désignée sur le chantier</span>',cp,['read','« Chez moi » pour ce qu\'elle doit vérifier, « Par chantier » pour ses chantiers'],['no',''],T(msgCp)],
   ['Associé de référence<span>désigné sur le chantier · rôle Associé</span>',ass,st.r3==='cp'?['read','« Chez moi » pour ce qu\'il peut vérifier, « Par chantier » pour ses chantiers']:['read','« Par chantier », pour ses chantiers'],['no',''],T('Aucun')],
   ['Stive<span>'+(st.r1==='nouveau'?'rôle Facturation':'rôle Finance')+' · référent facturation du chantier</span>',stFiche,stFac,stClo,T(msgSt)],
   ['Fabrice<span>rôle Finance</span>',['edit','Tout'],['edit',st.r1==='nouveau'?'Tout, dont les avoirs':'Tout ; prend le relais sur n\'importe quelle enquête'],['edit','Clôt le mois'],T(msgFa)],
   ['Pierre-Guillaume et les administrateurs<span>rôle Administrateur</span>',['can','Tous les droits, comme la finance'],['can','Tout'],['can','Tout'],T('Aucun')],
   ['Le comptable',['no',st.s2==='acces'?'':'Pas de compte'],['no',''],st.s2==='acces'?['read','Mois clos seulement']:['no',''],T(st.s2==='acces'?'Lecture des mois clos dans Alphonse':'Les trois fichiers du mois, envoyés par la finance')]
  ];
};
const MATRIX_NOTE='Le tableau suit vos réponses aux arbitrages. « Agit » : la personne a une étape à faire ; « Peut agir » : tous les droits, sans étape attendue ; « Lecture » : elle voit sans pouvoir modifier. Aucun mail n\'est envoyé au consultant ni à l\'associé.';
