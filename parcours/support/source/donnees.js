// ---------- Aperçus des options (composants Alphonse à taille réelle) ----------
const MX=(inner,h)=>`<div class="ax axm"${h?` style="min-height:${h}px"`:''}>${inner}</div>`;
const pv=(t,k)=>ST(k,t);
const svm=(c,cls,t,d)=>`<div class="sv"><span class="c ${cls}">${c}</span><div><div class="tt">${t}</div><div class="dd">${d}</div></div></div>`;
const filM=(emis,who='Émise par la finance',extra='')=>MX(`<div class="box" style="padding:14px 16px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:13.5px">Acompte 50 % · 9 300 € HT</b>${pv('À émettre','em')}</div><div class="step-v" style="margin-top:12px">${svm(I('check','s3'),'ok','Vérifiée par la cheffe de projet','Claire Morel, le 03/11')}${svm('3','cur',who,emis)}${svm(I('send','s3'),'','Envoyée au client','Stive')}</div>${extra}</div>`);
const echM=(rows,tot)=>MX(`<div class="tw"><table class="t" style="font-size:12.5px"><thead><tr><th>Type</th><th>Libellé</th><th>Date</th><th class="r">Montant HT</th><th>Statut</th></tr></thead><tbody>${rows}${tot?`<tr class="tot"><td colspan="3" class="xs mut" style="text-transform:uppercase">Total</td><td class="r num" style="font-weight:600">${tot}</td><td></td></tr>`:''}</tbody></table></div>`);
const er=(t,l,d,a,s)=>`<tr><td><span class="sbd neu sm">${t}</span></td><td>${l}</td><td class="num">${d}</td><td class="r num">${a}</td><td>${s}</td></tr>`;
const mailL=(items)=>MX(`<div class="box" style="padding:0;overflow:hidden"><div style="padding:9px 14px;border-bottom:1px solid var(--border);font-size:11.5px;font-weight:600;color:var(--mfg);display:flex;gap:8px;align-items:center">${I('mail','s3')}Boîte de Claire · une enquête de dix semaines</div>${items.map(([d,t,s])=>`<div style="display:grid;grid-template-columns:50px 1fr;gap:8px;padding:8px 14px;border-top:1px solid var(--border);font-size:12.5px"><span class="mut num">${d}</span><span><b style="font-weight:600">${t}</b>${s?`<span class="mut"> · ${s}</span>`:''}</span></div>`).join('')}<div style="padding:8px 14px;border-top:1px solid var(--border);font-size:12px;font-weight:600">${items.length} message${items.length>1?'s':''} en dix semaines</div></div>`);

const echL=(rows,tot)=>MX(`<div class="infob" style="margin-bottom:8px">${I('eye','s3')}<span><b>Lecture seule.</b> Suivie par Claire Morel et Stive.</span></div><div class="tw"><table class="t" style="font-size:13px"><thead><tr><th>Échéance</th><th class="r">Montant HT</th><th>Statut</th></tr></thead><tbody>${rows}<tr class="tot"><td class="xs mut" style="text-transform:uppercase">Total</td><td class="r num" style="font-weight:600">${tot}</td><td></td></tr></tbody></table></div>`);
const el=(l,a,s)=>`<tr><td>${l}</td><td class="r num">${a}</td><td>${s}</td></tr>`;

// ---------- Arbitrages ----------
const ARB=[
 {k:'a1',t:'Qui émet les factures ?',w:'le moment où la facture reçoit son numéro définitif',screen:'emettre',
  q:'Émettre attribue le numéro définitif : la facture ne se modifie plus, elle s\'annule par un avoir. Aujourd\'hui, Stive prépare et émet les factures dans son Excel ; dans Alphonse, il n\'a qu\'un accès en lecture, et aucun accès à Plein Sens Ethique.',
  o:[{v:'finance',n:'Stive, avec Fabrice en relais',d:'Stive émet ce que le chef de projet a vérifié ; Fabrice peut émettre en son absence. Les avoirs et la clôture du mois restent à Fabrice. Si les deux sont absents, la facture attend dans « À émettre ».',i:'Un profil « facturation » pour Stive : émettre, noter l\'envoi et le paiement, sans avoir ni clôture. Compris dans l\'étape 1.',rec:true,
      m:filM('facturation · numéro définitif ; Fabrice en relais','<b>Émise par Stive</b>')},
     {v:'fab',n:'Fabrice seul ; Stive prépare, envoie et relance',d:'Fabrice émet chaque facture vérifiée ; Stive prépare, envoie et relance.',i:'Même profil pour Stive, sans le droit d\'émettre. Même effort.',
      m:filM('finance · numéro définitif','<b>Émise par Fabrice Ducellier</b>')}],
  why:'Chaque facture reste validée par deux personnes, le chef de projet puis celle qui l\'émet, sans ajouter de tâche quotidienne à Fabrice : Stive garde le rôle qu\'il a déjà, avec une liste au lieu d\'un Excel.'},
 /*@@ARB_DROITS@@*/
 {k:'a5',t:'Le complément fait-il toujours l\'objet d\'une facture séparée ?',w:'quand le client accepte des entretiens ou une restitution de plus',screen:'fin',
  q:'Un complément suppose l\'accord du client et arrive souvent en fin d\'enquête.',
  o:[{v:'separe',n:'Toujours une facture séparée',d:'Le chef de projet joint l\'accord du client ; le montant du chantier est augmenté et la modification tracée.',rec:true,
      m:echM(er('Acompte','Acompte 50 %','02/11/2026','9 300,00',pv('Réglée','reg'))+er('Solde','Solde 50 %','18/12/2026','9 300,00',pv('À venir','av'))+er('Complément','Restitution CSE supplémentaire','08/01/2027','2 850,00',pv('À venir','av')),'21 450 €')},
     {v:'solde',n:'Ajouté à la facture de solde quand c\'est possible',d:'Une ligne de plus sur le solde si l\'accord arrive avant, sinon une facture séparée.',i:'Deux cas à gérer : un peu plus d\'effort, et un solde parfois retardé par l\'accord.',
      m:echM(er('Acompte','Acompte 50 %','02/11/2026','9 300,00',pv('Réglée','reg'))+er('Solde','Solde 50 % + restitution CSE supplémentaire','18/12/2026','12 150,00',pv('À venir','av')),'21 450 €')}],
  why:'Une règle unique, simple à expliquer, qui ne retarde jamais le solde.'},
 {k:'a6',t:'Combien de messages chacun reçoit-il ?',w:'le 4 novembre, Pierre-Guillaume a écarté les rafales de mails',screen:'fin',
  q:'L\'aperçu compte les messages que reçoit la cheffe de projet sur une enquête de dix semaines.',
  o:[{v:'recap',n:'Seulement quand une décision lui revient',d:'Trois messages : l\'acompte à vérifier, la fin prévue de la mission, le solde à vérifier. Stive reçoit un récapitulatif par semaine ; Fabrice, un message par mois quand le mois est prêt à être clos.',rec:true,
      m:mailL([['02/11','Acompte à vérifier','VARENNE_EnqSig'],['18/12','La mission se termine','le solde peut-il partir ?'],['08/01','Solde à vérifier','VARENNE_EnqSig']])},
     {v:'liste',n:'Le mail de fin de mission seulement',d:'Le reste se voit dans la liste « Chez moi » d\'Alphonse.',i:'Un peu moins d\'effort ; le risque est qu\'une facture attende sans que personne le voie.',
      m:mailL([['18/12','La mission se termine','le solde peut-il partir ?']])},
     {v:'tout',n:'Un mail à chaque étape',d:'Chaque passage d\'une facture d\'une personne à l\'autre envoie un mail.',i:'Simple à construire, mais c\'est la rafale que vous ne voulez pas.',
      m:mailL([['26/10','Chantier créé','informations à compléter'],['28/10','Informations validées',''],['02/11','Acompte à vérifier',''],['04/11','Acompte émis',''],['05/11','Acompte déposé',''],['04/12','Acompte réglé',''],['18/12','La mission se termine',''],['08/01','Solde à vérifier',''],['09/01','Solde émis',''],['10/01','Solde déposé','']])}],
  why:'Le seul message individuel est celui où la décision du chef de projet est indispensable. Aucun mail n\'est envoyé au consultant ni à l\'associé.'},
 {k:'a7',t:'Que devient le point mensuel de Stive avec les chefs de projet ?',w:'aujourd\'hui, une revue de tous les chantiers',screen:'parchantier',
  q:'Avec des statuts calculés, la tournée de tous les chantiers pour savoir quoi facturer devient inutile. Reste l\'échange sur ce qui bloque.',
  o:[{v:'cible',n:'Plus de tournée : Stive appelle seulement quand un chantier ressort',d:'Un écart ou un solde en attente dans « Par chantier » : Stive appelle le chef de projet concerné. À voir avec Stive.',rec:true,
      m:MX(`<div class="tw"><table class="t" style="font-size:12.5px"><thead><tr><th>Chantier</th><th class="r">Production</th><th class="r">Déjà facturé</th><th>Écart</th><th></th></tr></thead><tbody><tr><td class="mono">HALIOS_EnqSig</td><td class="r num">16 800</td><td class="r num">12 000</td><td><span class="sbd warn sm">produit non facturé 4 800</span></td><td class="r"><span class="bt ol xs">${I('phone','s3')}Julien</span></td></tr><tr><td class="mono">TALMONT_Enq</td><td class="r num">9 800</td><td class="r num">9 800</td><td><span class="sbd neu sm">aligné</span></td><td></td></tr></tbody></table></div>`)},
     {v:'garder',n:'Garder un point mensuel avec chaque chef de projet',d:'Un point court chaque mois, appuyé sur la vue « Par chantier ».',
      m:MX(`<div class="box" style="padding:12px 14px;font-size:12.5px;display:grid;gap:8px">${['Claire Morel · 2 chantiers','Julien Petit · 2 chantiers','Sophie Martin · 3 chantiers'].map(x=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span style="display:flex;align-items:center;gap:6px">${I('cal','s3')}${x}</span><span class="sbd neu sm">point du 20</span></div>`).join('')}</div>`)}],
  why:'Le temps de Stive va là où il apporte de la valeur : une conversation sur ce qui bloque, pas une revue de tout.'},
 {k:'a8',t:'Que reçoit le comptable ?',w:'aujourd\'hui, le facturier Excel qu\'il réimporte',screen:'cloture',
  q:'Le comptable n\'a pas de compte dans Alphonse.',
  o:[{v:'fichiers',n:'Trois fichiers par mois, envoyés par Fabrice',d:'Le registre des factures au format du facturier, l\'état figé du réalisé et du facturé, et un fichier d\'écritures dont le format sera convenu avec votre comptable.',rec:true,
      m:MX(`<div style="display:grid;gap:8px">${['Registre des factures (format du facturier)','État figé : réalisé et facturé','Écritures pour votre outil comptable'].map(f=>`<span class="file">${I('sheet','s3')}${f}</span>`).join('')}</div>`)},
     {v:'acces',n:'Un accès en lecture dans Alphonse',d:'Le comptable consulte lui-même les chiffres figés.',i:'Demande un compte et un profil dédiés : quelques jours de plus.',
      m:MX(`<div class="box" style="padding:12px 14px;font-size:12.5px;display:flex;align-items:center;gap:10px"><div class="av">CB</div><div><b>Cabinet comptable</b><div class="mut xs">Profil « Comptable » · lecture des mois clos</div></div></div>`)}],
  why:'Le comptable n\'a besoin que des chiffres figés ; Fabrice garde la main sur ce qui sort.'},
 {k:'a9',t:'Le schéma de facturation des enquêtes est-il confirmé ?',w:'à confirmer avec Alice',screen:'echeancier',
  q:'Nous avons retenu le schéma décrit le 4 novembre.',
  o:[{v:'oui',n:'Oui : 50 % au lancement, 50 % en fin de mission',d:'Alphonse propose ce schéma par défaut ; le chef de projet peut toujours le modifier.',rec:true,
      m:echM(er('Acompte','Acompte 50 %','02/11/2026','9 300,00',pv('À venir','av'))+er('Solde','Solde 50 %','18/12/2026','9 300,00',pv('À venir','av')),'18 600 €')},
     {v:'autre',n:'Non, il varie trop d\'une enquête à l\'autre',d:'Alphonse reprend l\'échéancier écrit dans le devis, s\'il y en a un.',i:'Lecture de l\'échéancier du devis : un peu plus d\'effort sur la lecture des documents.',
      m:echM(er('Acompte','30 % à la commande','02/11/2026','5 580,00',pv('À venir','av'))+er('Acompte','40 % aux entretiens','27/11/2026','7 440,00',pv('À venir','av'))+er('Solde','30 % à la restitution','18/12/2026','5 580,00',pv('À venir','av')),'18 600 €')}],
  why:'C\'est le schéma décrit le 4 novembre ; le chef de projet garde la main pour une enquête qui s\'en écarte.'}
];

// ---------- Informations attendues ----------
const INFOS=[
 ['Le premier numéro de facture','Et le format de numérotation de Plein Sens Ethique : nécessaire avant la première facture.'],
 ['Les mentions légales, l\'IBAN, le logo et le délai de paiement','De Plein Sens Ethique, tels qu\'ils figurent sur vos factures actuelles (« à réception de facture » sur le modèle actuel ; 30 jours dans nos maquettes).'],
 ['L\'outil comptable','Celui dans lequel le comptable importe aujourd\'hui le facturier.'],
 ['La plateforme agréée envisagée','Pour la facture électronique de 2027 ; si vous utilisez déjà un outil, nous vérifierons qu\'il est agréé.'],
 ['L\'accès de Stive à Plein Sens Ethique','Stive est salarié de Plein Sens. Il facturerait pour Plein Sens Ethique dans le cadre de la convention de prestations support, avec un compte limité à la facturation de Plein Sens Ethique : rien n\'est copié côté Plein Sens. Êtes-vous d\'accord ?'],
 ['Un devis et un bon de commande réels','Anonymisés si vous le souhaitez, pour tester la lecture des documents.']
];

/*@@DROITS_EFFORT@@*/
