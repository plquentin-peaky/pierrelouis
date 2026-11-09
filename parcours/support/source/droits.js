 {k:'a2',t:'Que voit un consultant du chantier dans l\'onglet Facturation ?',screen:'consultant',
  q:'Un consultant de l\'équipe n\'a aucune étape à faire : il voit la facturation de ses chantiers <b>en lecture seule</b>. Aujourd\'hui, comme chacun peut modifier tous les chantiers (choix du 11 octobre), il peut aussi modifier l\'échéancier : la cible sépare le droit de modifier la facturation de celui de modifier le chantier. Reste à décider s\'il voit les montants.',
  o:[{v:'complet',n:'Tout, en lecture seule',d:'Échéancier avec les montants, informations de facturation, factures émises avec leur numéro et leur statut. Aucun bouton, pas d\'entrée Finance dans le menu.',i:'Compris dans le lot 1 : les montants et le chiffre d\'affaires du chantier sont déjà visibles de tous.',rec:true},
     {v:'sans',n:'Tout, sans les montants',d:'Les échéances, leurs dates et leurs statuts, l\'entité facturée et les factures, sans aucun montant.',i:'1 à 2 jours de plus : masquer les montants à l\'écran et dans les règles d\'accès.'},
     {v:'masque',n:'Seulement qui suit la facturation',d:'L\'onglet Facturation est masqué. Une ligne dans « Informations » indique qui suit la facturation du chantier.',i:'Compris dans le lot 1.'}],
  why:'Vous avez choisi le 5 octobre de laisser « la vue de tous sur tout ». Le consultant sait où en est la facturation de son chantier, sans pouvoir rien y changer.'},
 {k:'a3',t:'Qui complète les informations de facturation ?',screen:'depot',
  q:'Depuis un an, c\'est l\'équipe administrative qui va chercher les informations de facturation, pas le chef de projet. Le 4 novembre, Pierre-Guillaume a décrit un chef de projet qui dépose le devis et une alerte à Stive si quelque chose manque.',
  o:[{v:'cp',n:'Le chef de projet dépose et valide ; Stive complète ce qui manque',d:'Le chef de projet dépose le devis, relit ce qu\'Alphonse a prérempli et valide. Ce qui manque (bon de commande, contact) arrive dans la liste de Stive, qui le complète.',i:'Rien de plus que le lot 1.',rec:true},
     {v:'stive',n:'Le chef de projet dépose seulement ; Stive relit et valide tout',d:'Un seul geste pour le chef de projet : déposer le devis. Stive relit les propositions d\'Alphonse et complète.',i:'Rien de plus que le lot 1 ; une étape de plus pour Stive à chaque chantier.'},
     {v:'tout',n:'Le chef de projet renseigne tout lui-même',d:'Comme le formulaire d\'aujourd\'hui, avec le préremplissage en plus.',cur:true}],
  why:'Le chef de projet connaît le devis et le client : sa relecture prend une minute et évite les allers-retours. Stive garde ce qu\'il fait déjà, aller chercher ce qui manque, mais sur une liste et non plus de mémoire.'},
 {k:'a4',t:'Que voit et que fait l\'associé de référence ?',screen:'parchantier',
  q:'L\'associé de référence est responsable du chantier avec le chef de projet.',
  o:[{v:'lecture',n:'Il lit la facturation de ses chantiers',d:'Onglet Facturation et vue « Par chantier » pour ses chantiers, en lecture. Il ne vérifie pas les factures.',rec:true},
     {v:'cp',n:'Il peut vérifier une facture en l\'absence du chef de projet',d:'Mêmes droits que le chef de projet sur ses chantiers.',i:'Petit.'}],
  why:'Une seule personne vérifie chaque facture côté chantier : on sait toujours qui doit agir.'},
/*@@FIN_ARB@@*/
// ---------- Qui voit quoi ----------
const MATRIX=(st)=>{
  const cons={complet:['read','Échéancier avec montants, informations, factures et statuts'],sans:['read','Échéancier, informations, factures et statuts, sans montants'],masque:['no','Une ligne indique qui suit la facturation']}[st.a2];
  const cp={cp:['edit','Dépose le devis, valide les informations et l\'échéancier, vérifie chaque facture'],stive:['edit','Dépose le devis et vérifie chaque facture'],tout:['edit','Renseigne les informations et l\'échéancier, vérifie chaque facture']}[st.a3];
  const ass={lecture:['read','Ses chantiers'],cp:['edit','Ses chantiers ; peut vérifier une facture']}[st.a4];
  const steveEm=st.a1==='fab'?'sans Émettre ni Avoir':'il émet ; sans Avoir';
  const fabEm=st.a1==='fab'?'Il émet et crée les avoirs':'Il crée les avoirs ; il peut émettre en relais';
  return [
   ['Consultant du chantier<span>membre de l\'équipe</span>',cons,['no','Pas d\'entrée Finance dans le menu'],['no',''],['no','Aucun']],
   ['Claire, cheffe de projet<span>chef de projet du chantier</span>',cp,['read','« Par chantier », pour ses chantiers'],['no',''],['read','Le mail de fin de mission ; un récapitulatif si une facture l\'attend']],
   ['Associé de référence',ass,['read','« Par chantier », pour ses chantiers'],['no',''],['no','Aucun']],
   ['Stive<span>facturation et relances</span>',['edit',(st.a3==='stive'?'Relit et complète les informations, ':'Complète ce qui manque, ')+'émet, note l\'envoi et le paiement'],['edit','À faire, Par chantier, Registre ; '+steveEm],['no',''],['read','Récapitulatif de la semaine ; copie des mails de fin de mission']],
   ['Fabrice<span>finance</span>',['edit','Tout'],['edit',fabEm],['edit','Il clôt le mois'],['read','Récapitulatif du jour, si une facture l\'attend']],
   ['Le comptable',['no','Pas de compte'],['no',''],['no',''],['read','Les trois fichiers du mois, envoyés par Fabrice']]
  ];
};
const MATRIX_NOTE='Le tableau suit vos réponses aux arbitrages 1 à 4. « Agit » signifie que la personne a une étape à faire ; « Lecture », qu\'elle voit sans pouvoir modifier. Un consultant qui ne travaille pas sur le chantier ne voit pas sa facturation.';

// ---------- Planning et effort ----------
const EFFORT_SUB='En jours de développement, tests compris ; la recette avec vos équipes et le branchement de la plateforme agréée ne sont pas compris. Petit : 1 à 2 jours, moyen : 3 à 5 jours, gros : 8 à 10 jours.';
const LOTS=[
 {n:'1. Première facture d\'acompte de bout en bout',d:'Réglage propre à Plein Sens Ethique ; statuts calculés ; dépôt et lecture du devis et des mails ; entité retrouvée et SIREN ; échéancier typé ; vérification par le chef de projet ; liste « À faire » ; droits de lecture des consultants et des associés ; contrôle de chaque nuit ; mails propres à Plein Sens Ethique et récapitulatifs',e:'38 à 59 j'},
 {n:'2. Suivi et fin de mission',d:'Mail de fin de mission avec trois choix et réponse en une phrase ; vue « Par chantier » ; contestation ; complément ; textes préparés par l\'IA ; date comptable des paiements',e:'12 à 21 j'},
 {n:'3. Clôture et comptable',d:'Mois figé, chantiers terminés compris ; trois fichiers pour le comptable ; reprise de la numérotation',e:'10 à 14 j'},
 {n:'Total',d:'Selon les options conseillées dans les arbitrages',e:'60 à 94 j',tot:true}
];
const HYP=[
 '<b>Un développeur qui connaît Alphonse.</b> Le lot 1 pourrait être montré sur une vraie enquête environ dix semaines après son lancement, cinq à six semaines avec deux développeurs.',
 '<b>Objectif :</b> lots 2 et 3 et branchement de la plateforme agréée terminés avant l\'été 2027, sous réserve de la date de démarrage et du choix de la plateforme.',
 '<b>Ce que vos choix font varier.</b> Fabrice seul émetteur : 8 à 10 jours de plus. Montants masqués aux consultants : 1 à 2 jours de plus. Accès du comptable : quelques jours de plus.',
 '<b>Ce qui existe déjà</b> et sera réutilisé : la génération des factures en brouillon, la numérotation à l\'émission, le PDF, les avoirs, les encaissements et la clôture du mois.'
];
