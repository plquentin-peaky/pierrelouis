 {k:'a2',t:'Que voit un consultant du chantier dans l\'onglet Facturation ?',w:'un membre de l\'équipe, ni chef de projet ni associé',screen:'consultant',
  q:'Un consultant de l\'équipe n\'a aucune étape à faire : il voit la facturation de ses chantiers en lecture seule, sans pouvoir rien y changer. Reste à décider s\'il voit les montants. Si vous préférez que chacun voie la facturation de tous les chantiers, c\'est un simple réglage.',
  o:[{v:'complet',n:'Tout, en lecture seule',d:'Échéancier avec les montants, informations de facturation, factures émises avec leur numéro et leur statut. Aucun bouton, pas d\'entrée Finance dans le menu.',i:'Compris dans l\'étape 1.',rec:true,
      m:echL(el('Acompte 50 %','9 300,00',pv('À encaisser','enc'))+el('Solde 50 %','9 300,00',pv('À venir','av')),'18 600 €')},
     {v:'sans',n:'Tout, sans les montants',d:'Les échéances, leurs dates et leurs statuts, l\'entité facturée et les factures, sans aucun montant.',i:'1 à 2 jours de plus : masquer les montants à l\'écran et dans les règles d\'accès.',
      m:echL(el('Acompte 50 %','<span class="mut">masqué</span>',pv('À encaisser','enc'))+el('Solde 50 %','<span class="mut">masqué</span>',pv('À venir','av')),'<span class="mut">masqué</span>')},
     {v:'masque',n:'Seulement qui suit la facturation',d:'L\'onglet Facturation est masqué. Une ligne dans « Informations » indique qui suit la facturation du chantier.',i:'Compris dans l\'étape 1.',
      m:MX(`<div class="tabs" style="margin-bottom:10px"><span>Pilotage</span><span class="on">Informations</span><span>Frais</span></div><div class="infob">${I('receipt','s3')}<span>La facturation de ce chantier est suivie par Claire Morel (cheffe de projet) et Stive (facturation et relances).</span></div>`)}],
  why:'L\'arbitrage du 11 octobre ouvre le budget et le chiffre d\'affaires des chantiers à l\'équipe : masquer les montants ici n\'apporterait rien. Le consultant sait où en est la facturation de son chantier, sans pouvoir rien y changer.'},
 {k:'a3',t:'Qui complète les informations de facturation ?',w:'entité, bon de commande, contact, mode d\'envoi',screen:'depot',
  q:'Depuis un an, c\'est l\'équipe administrative qui va chercher les informations de facturation, pas le chef de projet. Le 4 novembre, Pierre-Guillaume a décrit un chef de projet qui dépose le devis, et une alerte à Stive si quelque chose manque.',
  o:[{v:'cp',n:'Le chef de projet dépose et valide ; Stive complète ce qui manque',d:'Le chef de projet dépose le devis, relit ce qu\'Alphonse a prérempli et valide. Ce qui manque arrive dans la liste de Stive, qui le complète.',rec:true,
      m:MX(`<div class="box" style="padding:6px 14px">${[['Entité','Varenne Services SAS','<span class="src">Devis, p. 1</span>'],['Bon de commande','BC-VS-2026-0187','<span class="src">Bon de commande, p. 1</span>'],['Contact facturation','<span class="miss">À compléter</span>','<span class="srcf">dans la liste de Stive</span>']].map(([k,v,s])=>`<div class="field" style="grid-template-columns:120px 1fr auto"><span class="k">${k}</span><span class="v">${v}</span>${s}</div>`).join('')}<div style="display:flex;justify-content:flex-end;padding:8px 0"><span class="bt pr xs">${I('check','s3')}Valider · Claire</span></div></div>`)},
     {v:'stive',n:'Le chef de projet dépose seulement ; Stive relit et complète tout',d:'Un seul geste pour le chef de projet : déposer le devis. Stive relit les propositions d\'Alphonse et complète.',i:'Une étape de plus pour Stive à chaque chantier.',
      m:MX(`<div class="box" style="padding:6px 14px">${[['Entité','Varenne Services SAS'],['Bon de commande','BC-VS-2026-0187'],['Contact facturation','<span class="miss">À compléter</span>']].map(([k,v])=>`<div class="field" style="grid-template-columns:120px 1fr auto"><span class="k">${k}</span><span class="v">${v}</span><span class="src">Proposé par Alphonse</span></div>`).join('')}<div style="display:flex;justify-content:flex-end;padding:8px 0"><span class="bt pr xs">${I('check','s3')}Valider · Stive</span></div></div>`)},
     {v:'tout',n:'Le chef de projet renseigne tout lui-même',d:'Comme l\'écran d\'aujourd\'hui, avec le préremplissage en plus.',tag:'ACTUEL + IA',
      m:MX(`<div class="box" style="padding:6px 14px">${[['Entité','Varenne Services SAS'],['Bon de commande','BC-VS-2026-0187'],['Contact facturation','<span class="miss">Claire le cherche</span>']].map(([k,v])=>`<div class="field" style="grid-template-columns:120px 1fr auto"><span class="k">${k}</span><span class="v">${v}</span><span class="src">Proposé par Alphonse</span></div>`).join('')}<div style="display:flex;justify-content:flex-end;padding:8px 0"><span class="bt pr xs">${I('check','s3')}Valider · Claire</span></div></div>`)}],
  why:'Le chef de projet connaît le devis et le client : sa relecture prend une minute et évite les allers-retours. Stive garde ce qu\'il fait déjà, aller chercher ce qui manque, mais sur une liste et non plus de mémoire.'},
 {k:'a4',t:'Que voit et que fait l\'associé de référence ?',w:'responsable du chantier avec le chef de projet',screen:'parchantier',
  q:'L\'associé de référence suit ses chantiers ; Pierre-Guillaume et les administrateurs voient tout.',
  o:[{v:'lecture',n:'Il lit la facturation de ses chantiers',d:'Onglet Facturation et vue « Par chantier » pour ses chantiers, en lecture. Il ne vérifie pas les factures.',rec:true,
      m:MX(`<div class="infob" style="margin-bottom:8px">${I('eye','s3')}<span><b>Lecture seule.</b> Associé de référence : ses 3 chantiers.</span></div><div class="tw"><table class="t" style="font-size:12.5px"><thead><tr><th>Chantier</th><th class="r">Production</th><th class="r">Déjà facturé</th><th>Écart</th></tr></thead><tbody><tr><td class="mono">VARENNE_EnqSig</td><td class="r num">2 170</td><td class="r num">9 300</td><td><span class="sbd info sm">facturé d'avance 7 130</span></td></tr><tr><td class="mono">BRENNE_Enq</td><td class="r num">6 000</td><td class="r num">7 500</td><td><span class="sbd info sm">facturé d'avance 1 500</span></td></tr><tr><td class="mono">TALMONT_Enq</td><td class="r num">9 800</td><td class="r num">9 800</td><td><span class="sbd neu sm">aligné</span></td></tr></tbody></table></div>`)},
     {v:'cp',n:'Il peut vérifier une facture en l\'absence du chef de projet',d:'Mêmes droits que le chef de projet sur ses chantiers.',i:'1 à 2 jours de plus.',
      m:MX(`<div class="box" style="padding:14px 16px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:13.5px">Acompte 50 % · 9 300 € HT</b>${pv('Chez le chef de projet','cp')}</div><div class="infob" style="margin-top:10px">${I('users','s3')}<span>Claire Morel est absente : l'associé de référence peut vérifier.</span></div><div style="display:flex;gap:6px;margin-top:10px"><span class="bt pr xs">${I('check','s3')}C'est bon</span><span class="bt ol xs">À corriger</span></div></div>`)}],
  why:'Une seule personne vérifie chaque facture côté chantier : on sait toujours qui doit agir. Si le chef de projet est absent, la facture attend chez lui ; Stive le voit dans sa liste et appelle l\'associé.'},
/*@@FIN_ARB@@*/
// ---------- Qui voit quoi ----------
const MATRIX=(st)=>{
  const T=(t)=>['txt',t];
  const cons={complet:['read','Échéancier avec montants, informations, factures et statuts'],sans:['read','Échéancier, informations, factures et statuts, sans montants'],masque:['no','Une ligne indique qui suit la facturation']}[st.a2];
  const cp={cp:['edit','Dépose le devis, valide les informations et l\'échéancier, vérifie chaque facture'],stive:['edit','Dépose le devis et vérifie chaque facture'],tout:['edit','Renseigne les informations et l\'échéancier, vérifie chaque facture']}[st.a3];
  const ass={lecture:['read','Ses chantiers'],cp:['edit','Ses chantiers ; peut vérifier une facture']}[st.a4];
  const msgCp={recap:'3 messages par enquête',liste:'Le mail de fin de mission',tout:'Une dizaine de messages par enquête'}[st.a6];
  const msgSt={recap:'Un récapitulatif par semaine ; copie des mails de fin de mission',liste:'Copie des mails de fin de mission',tout:'Un mail à chaque étape'}[st.a6];
  const msgFa={recap:'Un message par mois, quand le mois est prêt à être clos',liste:'Aucun',tout:'Un mail à chaque étape'}[st.a6];
  const steveEm=st.a1==='fab'?'sans émettre ni avoir':'il émet ; sans avoir';
  const fabEm=st.a1==='fab'?'Il émet et crée les avoirs':'Il crée les avoirs ; il peut émettre en relais';
  return [
   ['Consultant du chantier<span>membre de l\'équipe</span>',cons,['no','Pas d\'entrée Finance dans le menu'],['no',''],T('Aucun')],
   ['Claire, cheffe de projet<span>chef de projet du chantier</span>',cp,['read','« Chez moi » pour ce qu\'elle doit vérifier, « Par chantier » pour ses chantiers'],['no',''],T(msgCp)],
   ['Associé de référence',ass,['read','« Par chantier », pour ses chantiers'],['no',''],T('Aucun')],
   ['Stive<span>facturation et relances</span>',['edit',(st.a3==='stive'?'Relit et complète les informations, ':'Complète ce qui manque, ')+'émet, note l\'envoi et le paiement'],['edit','À faire, Par chantier, Registre ; '+steveEm],['no',''],T(msgSt)],
   ['Fabrice<span>finance</span>',['edit','Tout'],['edit',fabEm],['edit','Il clôt le mois'],T(msgFa)],
   ['Pierre-Guillaume et les administrateurs',['read','Tous les chantiers'],['read','Tout'],['read','Mois clos'],T('Aucun')],
   ['Le comptable',['no','Pas de compte'],['no',''],['no',''],T('Les trois fichiers du mois, envoyés par Fabrice')]
  ];
};
const MATRIX_NOTE='Le tableau suit vos réponses aux arbitrages. « Agit » signifie que la personne a une étape à faire ; « Lecture », qu\'elle voit sans pouvoir modifier. Un consultant qui ne travaille pas sur le chantier ne voit pas sa facturation. Aucun mail n\'est envoyé au consultant ni à l\'associé.';

// ---------- Planning et effort ----------
const EFFORT_SUB='Quatre étapes, chacune utile seule et décidée séparément. En jours de développement, tests compris ; la recette avec vos équipes et le branchement de la plateforme agréée ne sont pas compris.';
const LOTS=[
 {n:'1. Une vraie facture d\'acompte depuis le devis',d:'Dépôt et lecture du devis, du bon de commande et des mails ; informations préremplies avec leur source ; échéancier acompte, solde, complément ; facture préparée puis vérifiée par le chef de projet ; émission par Stive avec son profil « facturation » ; lecture seule pour les consultants et les associés ; numérotation de Plein Sens Ethique ; registre exportable au format du facturier',e:'22 à 36 j'},
 {n:'2. Stive sans Excel',d:'Statuts calculés ; liste « À faire » et filtre « Chez moi » ; contrôle de chaque nuit ; entité retrouvée et SIREN ; mails propres à Plein Sens Ethique et récapitulatifs',e:'18 à 28 j'},
 {n:'3. Fin de mission et suivi',d:'Mail de fin de mission avec trois choix et réponse en une phrase ; vue « Par chantier » ; contestation ; complément ; textes préparés par l\'IA ; date de prise en compte des paiements dans le mois ouvert',e:'12 à 21 j'},
 {n:'4. Clôture et comptable',d:'Mois figé, chantiers terminés compris ; trois fichiers pour le comptable',e:'9 à 12 j'},
 {n:'Les quatre étapes, si vous les décidez toutes',d:'Selon les options conseillées dans les arbitrages',e:'61 à 97 j',tot:true}
];
const HYP=[
 '<b>L\'étape 1 sur une vraie enquête</b> six à huit semaines après votre accord, avec un développeur qui connaît Alphonse. Chaque étape suivante est décidée séparément ; le coût de chaque étape vous est présenté jeudi.',
 '<b>À la fin de l\'étape 1</b>, Claire dépose le devis et valide ; quand l\'acompte est prêt, elle le vérifie dans la fiche du chantier ; Stive l\'émet depuis la page Facturation actuelle, et le registre remplace le facturier. Jusqu\'aux étapes suivantes, Stive prévient lui-même Claire qu\'un acompte l\'attend, repère les relances dans le registre, et pense au solde comme aujourd\'hui. Les messages à Claire et la liste « Chez moi » arrivent à l\'étape 2, le mail de fin de mission à l\'étape 3.',
 '<b>Dès l\'étape 1</b>, le registre des factures émises dans Alphonse s\'exporte au format du facturier : c\'est lui qui part chez le comptable jusqu\'à l\'étape 4, et Stive n\'a plus de facturier à tenir.',
 '<b>Ce que vos choix font varier.</b> Montants masqués aux consultants : 1 à 2 jours de plus. Associé qui vérifie : 1 à 2 jours. Accès du comptable : quelques jours.',
 '<b>Ce qui existe déjà</b> et sera réutilisé : la génération des factures en brouillon, la numérotation à l\'émission, le PDF, les avoirs, les encaissements et la clôture du mois. Objectif, si les quatre étapes sont décidées d\'ici fin janvier : tout terminé, plateforme agréée comprise, avant l\'été 2027.'
];
