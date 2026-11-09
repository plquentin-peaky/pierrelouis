// ---------- Arbitrages ----------
const ARB=[
 {k:'a1',t:'Qui émet les factures ?',screen:'emettre',
  q:'Émettre attribue le numéro définitif : la facture ne se modifie plus, elle s\'annule par un avoir. Aujourd\'hui, Stive prépare et émet les factures. Stive et Fabrice ont le même profil « finance » dans Alphonse.',
  o:[{v:'finance',n:'La finance : Stive au quotidien, Fabrice en relais',d:'Stive émet ce que le chef de projet a vérifié ; Fabrice peut émettre en son absence. Les avoirs et la clôture du mois restent à Fabrice.',i:'Rien à construire de plus : c\'est l\'option la plus légère.',rec:true,cur:true},
     {v:'fab',n:'Fabrice seul, avec une délégation possible à Stive',d:'Fabrice émet chaque facture vérifiée ; il peut déléguer à Stive en son absence.',i:'Demande une liste nominative d\'émetteurs propre à Plein Sens Ethique : 8 à 10 jours de plus sur le lot 1.'}],
  why:'Chaque facture reste validée par deux personnes, le chef de projet puis la finance, sans ajouter d\'étape à Fabrice : Stive garde le rôle qu\'il a déjà, avec une liste au lieu d\'un Excel.'},
 /*@@ARB_DROITS@@*/
 {k:'a5',t:'Le complément fait-il toujours l\'objet d\'une facture séparée ?',screen:'fin',
  q:'Un complément suppose l\'accord du client et arrive souvent en fin d\'enquête.',
  o:[{v:'separe',n:'Toujours une facture séparée',d:'Le chef de projet joint l\'accord du client ; le montant du chantier est augmenté et la modification tracée.',rec:true},
     {v:'solde',n:'Ajouté à la facture de solde quand c\'est possible',d:'Une ligne de plus sur le solde si l\'accord arrive avant, sinon une facture séparée.',i:'Deux cas à gérer : un peu plus d\'effort, et un solde parfois retardé par l\'accord.'}],
  why:'Une règle unique, simple à expliquer, qui ne retarde jamais le solde.'},
 {k:'a6',t:'Quels messages Alphonse envoie-t-il ?',screen:'fin',
  q:'Le 4 novembre, Pierre-Guillaume a écarté les rafales de mails automatiques, qu\'on finit par ne plus lire.',
  o:[{v:'recap',n:'Le mail de fin de mission, et un récapitulatif seulement s\'il y a quelque chose à faire',d:'Chaque personne reçoit au plus un récapitulatif par jour, uniquement si une facture l\'attend. Stive reçoit le sien chaque semaine pour les informations manquantes.',rec:true},
     {v:'liste',n:'Le mail de fin de mission seulement',d:'Pas de récapitulatif : chacun consulte sa liste « Chez moi » dans Alphonse.',i:'Un peu moins d\'effort ; le risque est qu\'une facture attende sans que personne le voie.'},
     {v:'tout',n:'Un mail à chaque étape',d:'Chaque passage d\'une facture d\'une personne à l\'autre envoie un mail.',i:'Simple à construire, mais c\'est la rafale que vous ne voulez pas.'}],
  why:'Le seul message individuel est celui où la décision du chef de projet est indispensable. Le reste se regroupe.'},
 {k:'a7',t:'Garde-t-on le point mensuel de Stive avec chaque chef de projet ?',screen:'parchantier',
  q:'Avec des statuts calculés, la tournée pour savoir quoi facturer devient inutile. Reste l\'échange sur ce qui bloque.',
  o:[{v:'garder',n:'Oui, en s\'appuyant sur la vue « Par chantier »',d:'Un point court, sur les seuls chantiers où le réalisé et le facturé s\'écartent. À voir avec Stive.',rec:true},
     {v:'supprimer',n:'Non, la liste et le mail de fin de mission suffisent',d:'Stive appelle au cas par cas, quand un chantier ressort.'}],
  why:'C\'est le moment où Stive apporte de la valeur : une conversation, pas une saisie.'},
 {k:'a8',t:'Que reçoit le comptable ?',screen:'cloture',
  q:'Aujourd\'hui, il reçoit le facturier Excel et le réimporte.',
  o:[{v:'fichiers',n:'Trois fichiers par mois, envoyés par Fabrice',d:'Le registre des factures au format du facturier, l\'état figé du réalisé et du facturé, les écritures de ventes et d\'inventaire au format FEC.',rec:true},
     {v:'acces',n:'Un accès en lecture dans Alphonse',d:'Le comptable consulte lui-même les chiffres figés.',i:'Demande un compte et un profil dédiés : quelques jours de plus.'}],
  why:'Le comptable n\'a besoin que des chiffres figés ; Fabrice garde la main sur ce qui sort.'},
 {k:'a9',t:'Le schéma de facturation des enquêtes est-il confirmé ?',screen:'echeancier',
  q:'Nous avons retenu le schéma décrit le 4 novembre, à confirmer avec Alice.',
  o:[{v:'oui',n:'Oui : 50 % au lancement, 50 % en fin de mission, complément éventuel',d:'Alphonse propose ce schéma par défaut ; le chef de projet peut toujours le modifier.',rec:true},
     {v:'autre',n:'Non, il varie trop d\'une enquête à l\'autre',d:'Alphonse reprend alors l\'échéancier écrit dans le devis, s\'il y en a un.',i:'Lecture de l\'échéancier du devis : un peu plus d\'effort sur la lecture des documents.'}]}
];

// ---------- Informations attendues ----------
const INFOS=[
 ['L\'outil comptable','Celui dans lequel le comptable importe aujourd\'hui le facturier.'],
 ['La plateforme agréée envisagée','Pour la facture électronique de 2027 ; si vous utilisez déjà un outil, nous vérifierons qu\'il est agréé.'],
 ['Le premier numéro de facture','Et le format de numérotation souhaité pour Plein Sens Ethique.'],
 ['Les mentions légales, l\'IBAN et le logo','De Plein Sens Ethique, tels qu\'ils figurent sur vos factures actuelles.'],
 ['L\'accès de Stive à Plein Sens Ethique','Stive travaille pour Plein Sens ; nous lui ouvrons un accès limité à la facturation de Plein Sens Ethique, si vous en êtes d\'accord.'],
 ['Un devis et un bon de commande réels','Anonymisés si vous le souhaitez, pour tester la lecture des documents.']
];

/*@@DROITS_EFFORT@@*/
