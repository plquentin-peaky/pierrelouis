// ---------- Aperçus des options (composants Alphonse à taille réelle) ----------
const MX=(inner,h)=>`<div class="ax axm"${h?` style="min-height:${h}px"`:''}>${inner}</div>`;
const pv=(t,k)=>ST(k,t);
const echM=(rows,tot,head='')=>MX(`${head}<div class="tw"><table class="t" style="font-size:12.5px"><thead><tr><th>Type</th><th>Libellé</th><th>Date</th><th class="r">Montant HT</th><th>Statut</th></tr></thead><tbody>${rows}${tot?`<tr class="tot"><td colspan="3" class="xs mut" style="text-transform:uppercase">Total</td><td class="r num" style="font-weight:600">${tot}</td><td></td></tr>`:''}</tbody></table></div>`);
const er=(t,l,d,a,s)=>`<tr><td><span class="sbd neu sm">${t}</span></td><td>${l}</td><td class="num">${d}</td><td class="r num">${a}</td><td>${s}</td></tr>`;
const mailL=(items)=>MX(`<div class="box" style="padding:0;overflow:hidden"><div style="padding:9px 14px;border-bottom:1px solid var(--border);font-size:11.5px;font-weight:600;color:var(--mfg);display:flex;gap:8px;align-items:center">${I('mail','s3')}Boîte de Claire · une enquête de dix semaines</div>${items.map(([d,t,s])=>`<div style="display:grid;grid-template-columns:50px 1fr;gap:8px;padding:8px 14px;border-top:1px solid var(--border);font-size:12.5px"><span class="mut num">${d}</span><span><b style="font-weight:600">${t}</b>${s?`<span class="mut"> · ${s}</span>`:''}</span></div>`).join('')}<div style="padding:8px 14px;border-top:1px solid var(--border);font-size:12px;font-weight:600">${items.length} message${items.length>1?'s':''} en dix semaines</div></div>`);
const echL=(banner,rows,tot)=>MX(`<div class="infob" style="margin-bottom:8px">${I('eye','s3')}<span>${banner}</span></div><div class="tw"><table class="t" style="font-size:13px"><thead><tr><th>Échéance</th><th class="r">Montant HT</th><th>Facture</th><th>Statut</th></tr></thead><tbody>${rows}<tr class="tot"><td class="xs mut" style="text-transform:uppercase">Total</td><td class="r num" style="font-weight:600">${tot}</td><td></td><td></td></tr></tbody></table></div>`);
const el=(l,a,f,s)=>`<tr><td>${l}</td><td class="r num">${a}</td><td class="num">${f}</td><td>${s}</td></tr>`;
const fld=(rows,btn)=>MX(`<div class="box" style="padding:6px 14px">${rows.map(([k,v,s])=>`<div class="field" style="grid-template-columns:120px 1fr auto"><span class="k">${k}</span><span class="v">${v}</span>${s||''}</div>`).join('')}${btn?`<div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:8px 0">${btn}</div>`:''}</div>`);
const blk=(t,on)=>`<div style="border:1px solid ${on?'var(--primary)':'var(--border)'};background:${on?'#FBF9FF':'#fff'};border-radius:8px;padding:10px 12px;font-size:12.5px;font-weight:600">${t}</div>`;
const tabsM=(blocks)=>MX(`<div class="tabs" style="margin-bottom:10px"><span>Pilotage</span><span>Informations</span><span class="on">Facturation</span><span>Frais</span></div><div style="display:grid;gap:8px">${blocks.join('')}</div>`);

// ---------- Arbitrages (regroupés par moment du parcours) ----------
const ARB=[
 {g:'Ouverture du chantier',k:'o1',t:'Qui dépose le devis et valide l\'échéancier ?',w:'à l\'ouverture de chaque chantier',screen:'depot',
  q:'Le 4 novembre, Pierre-Guillaume a décrit un chef de projet qui dépose le devis. Depuis un an, c\'est pourtant l\'équipe administrative qui rassemble les informations de facturation. Les deux façons de faire peuvent coexister, enquête par enquête.',
  o:[{v:'dual',n:'Le chef de projet ou le référent facturation, au choix',d:'Le premier des deux qui dépose le devis relit et valide ; l\'autre le voit dans la fiche. Ce qui manque arrive dans la liste du référent facturation, qui le complète.',rec:true,
      m:fld([['Échéancier','2 échéances','<span class="src">Devis, p. 2</span>'],['Entité','Varenne Services SAS','<span class="src">Devis, p. 1</span>'],['Peuvent valider','Claire Morel (cheffe de projet) ou Stive (référent facturation)','']],`<span class="bt pr xs">${I('check','s3')}Valider l'échéancier et les informations</span>`)},
     {v:'cp',n:'Le chef de projet seul ; la finance complète ce qui manque',d:'Le chef de projet dépose le devis, relit et valide. Ce qui manque arrive dans la liste du référent facturation.',
      m:fld([['Échéancier','2 échéances','<span class="src">Devis, p. 2</span>'],['Entité','Varenne Services SAS','<span class="src">Devis, p. 1</span>'],['Contact','<span class="miss">À compléter</span>','<span class="srcf">dans la liste de Stive</span>']],`<span class="bt pr xs">${I('check','s3')}Valider · Claire</span>`)},
     {v:'fin',n:'La finance seule ; le chef de projet transmet le devis',d:'Le chef de projet envoie le devis au référent facturation, qui le dépose, relit et valide.',tag:'PROCHE D\'AUJOURD\'HUI',
      m:fld([['Échéancier','2 échéances','<span class="src">Devis, p. 2</span>'],['Entité','Varenne Services SAS','<span class="src">Devis, p. 1</span>'],['Déposé par','Stive, devis reçu de Claire','']],`<span class="bt pr xs">${I('check','s3')}Valider · Stive</span>`)}],
  why:'Chaque enquête s\'organise comme elle le veut, sans règle unique à imposer : utile aujourd\'hui, et indispensable demain si le modèle s\'étend à Plein Sens, avec plus de chefs de projet et plus de personnes dans la finance.'},
 {g:'Ouverture du chantier',k:'o2',t:'Quel échéancier Alphonse propose-t-il ?',w:'toutes les enquêtes ne sont pas en 50/50',screen:'echeancier',
  q:'L\'échéancier figure dans le devis signé : pourcentages, dates ou étapes (commande, entretiens, remise du rapport). Alphonse peut le reprendre tel qu\'il est écrit.',
  o:[{v:'devis',n:'Celui écrit dans le devis ; sinon, le chef de projet le saisit',d:'Alphonse reprend les échéances du devis, quelles qu\'elles soient, et cite la page. Varenne est en 50/50 ; ce devis-ci est en 30/40/30. Un devis sans échéancier laisse le tableau vide, à remplir à la main.',rec:true,
      m:echM(er('Acompte','30 % à la commande','02/11/2026','5 580,00',pv('À venir','av'))+er('Acompte','40 % à la fin des entretiens','27/11/2026','7 440,00',pv('À venir','av'))+er('Solde','30 % à la remise du rapport','18/12/2026','5 580,00',pv('À venir','av')),'18 600 €',`<div class="xs mut" style="margin-bottom:8px">Exemple : un autre devis, en trois échéances <span class="src">Devis PSE-2026-044, p. 2</span></div>`)},
     {v:'type',n:'Celui du devis ; sinon, un échéancier type que vous fixez',d:'Par exemple 50 % à la commande et 50 % à la fin prévue, modifiable dans les paramètres et sur chaque chantier.',i:'Une règle de plus à tenir à jour dans les paramètres.',
      m:echM(er('Acompte','50 % à la commande','02/11/2026','9 300,00',pv('À venir','av'))+er('Solde','50 % à la fin prévue','18/12/2026','9 300,00',pv('À venir','av')),'18 600 €',`<div class="xs mut" style="margin-bottom:8px">Aucun échéancier dans le devis : <span class="src">Échéancier type</span></div>`)},
     {v:'main',n:'Toujours saisi à la main par le chef de projet',d:'Comme aujourd\'hui : le devis ne sert qu\'aux informations de facturation.',tag:'ACTUEL',
      m:echM(`<tr><td colspan="5" class="mut" style="text-align:center;padding:14px">Aucune échéance renseignée. <span class="bt ol xs" style="margin-left:8px">Ajouter une échéance</span></td></tr>`,'0 €')}],
  why:'Le devis signé fait foi : le reprendre tel quel évite les écarts entre ce qui est vendu et ce qui est facturé, sans imposer un schéma unique aux enquêtes.'},
 {g:'Ouverture du chantier',k:'o3',t:'Que devient le devis une fois lu ?',w:'Alphonse n\'en a besoin que le temps de la lecture',screen:'depot',
  q:'Pour préremplir l\'échéancier et les informations, Alphonse lit le devis, le bon de commande et, si besoin, un mail du client. Faut-il ensuite garder ces fichiers dans Alphonse ?',
  o:[{v:'efface',n:'Lu puis effacé : seules les informations validées restent',d:'Chaque information garde la mention de sa source (« devis du 26/10, p. 1 »). Les fichiers restent là où vous les rangez aujourd\'hui.',rec:true,
      m:MX(`<div class="doc" style="margin-bottom:8px"><span class="ty" style="background:#E5484D">PDF</span><div><div style="font-weight:500">Devis PSE-2026-041.pdf</div><div class="xxs mut">Lu le 26/10 par Alphonse, puis effacé</div></div></div><div class="field" style="grid-template-columns:110px 1fr auto"><span class="k">Entité</span><span class="v">Varenne Services SAS</span><span class="src">Devis du 26/10, p. 1</span></div>`)},
     {v:'garde',n:'Conservés dans la fiche du chantier',d:'Un bloc « Documents » dans l\'onglet Facturation, consultable et téléchargeable par l\'équipe du chantier.',i:'Demande un espace de stockage et des règles de conservation : le devis contient des données du client.',
      m:MX(`<div class="lbl" style="margin-bottom:6px">Documents du chantier</div>${['Devis PSE-2026-041.pdf · déposé le 26/10 par Claire','BC-VS-2026-0187.pdf · déposé le 26/10 par Claire'].map(x=>`<div class="doc" style="margin-bottom:6px"><span class="ty" style="background:#2B6CB0">PDF</span><div style="flex:1">${x}</div>${I('dl','s3')}</div>`).join('')}`)}],
  why:'Les documents contractuels ont déjà leur place chez vous. Alphonse n\'a pas à devenir un second classement, ni à conserver des données du client dont il n\'a plus besoin.'},
 {g:'Ouverture du chantier',k:'o4',t:'Dans quel ordre l\'onglet Facturation se présente-t-il ?',w:'ce que chacun voit en premier',screen:'echeancier',
  q:'L\'onglet Facturation du chantier regroupe l\'échéancier (avec chaque facture et son statut) et les informations de facturation (entité, bon de commande, mode d\'envoi).',
  o:[{v:'ech',n:'L\'échéancier d\'abord, puis les informations',d:'On voit d\'abord quand on facture, combien et où en est chaque facture.',rec:true,
      m:tabsM([blk('Échéancier : échéances, factures et statuts',true),blk('Informations de facturation',false)])},
     {v:'info',n:'Les informations d\'abord, puis l\'échéancier',d:'L\'ordre d\'aujourd\'hui dans Alphonse.',tag:'ACTUEL',
      m:tabsM([blk('Informations de facturation',false),blk('Échéancier : échéances, factures et statuts',true)])}],
  why:'L\'échéancier est ce que tout le monde vient consulter ; les informations de facturation ne se relisent qu\'à l\'ouverture du chantier ou quand elles changent.'},

 /*@@ARB_DROITS@@*/

 {g:'Émission, envoi et messages',k:'e1',t:'Alphonse envoie-t-il les factures ?',w:'par mail au client, ou par dépôt sur son portail',screen:'suivi',
  q:'Aujourd\'hui, Stive envoie chaque facture par mail ou la dépose sur le portail fournisseurs du client. En septembre 2027, la plateforme agréée prendra le relais pour l\'émission électronique.',
  o:[{v:'statut',n:'Non : la finance envoie ou dépose, puis note le statut',d:'En un clic : « envoyée par mail » ou « déposée sur le portail », avec la date. Le retard et le texte de relance en découlent.',rec:true,
      m:MX(`<div class="pop" style="position:static;width:auto;box-shadow:none"><div class="lbl" style="margin-bottom:6px">Noter l'envoi de F2026-00007</div><div class="popo"><i></i>Envoyée par mail</div><div class="popo sel"><i class="on"></i>Déposée sur le portail du client</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span class="xs mut">Le 05/11/2026</span><span class="bt pr xs">Enregistrer</span></div></div>`)},
     {v:'mail',n:'Alphonse envoie la facture par mail au contact facturation',d:'Le dépôt sur les portails reste manuel, avec le même statut à noter.',i:'Un envoi de plus à construire, alors que la plateforme agréée changera l\'envoi en 2027.',
      m:MX(`<div class="box" style="padding:12px 14px;font-size:12.5px"><div class="lbl" style="margin-bottom:6px">Envoyer F2026-00007</div><div><b>À</b> Nadia Lemoine, comptabilité fournisseurs</div><div class="mut" style="margin:4px 0 8px">Facture d'acompte VARENNE_EnqSig · PDF joint</div><div style="display:flex;justify-content:flex-end"><span class="bt pr xs">${I('send','s3')}Envoyer</span></div></div>`)}],
  why:'Les portails des clients sont tous différents et l\'envoi changera en 2027 : noter un statut suffit pour suivre chaque facture, sans construire ce qui deviendra inutile.'},
 {g:'Émission, envoi et messages',k:'e2',t:'Le complément fait-il toujours l\'objet d\'une facture séparée ?',w:'quand le client accepte des entretiens ou une restitution de plus',screen:'finA',
  q:'Un complément suppose l\'accord du client et arrive souvent en fin d\'enquête.',
  o:[{v:'separe',n:'Toujours une facture séparée',d:'Le chef de projet joint l\'accord du client ; le montant du chantier est augmenté et la modification tracée.',rec:true,
      m:echM(er('Acompte','50 % à la commande','02/11/2026','9 300,00',pv('Réglée','reg'))+er('Solde','50 % à la remise du rapport','18/12/2026','9 300,00',pv('À venir','av'))+er('Complément','Restitution CSE supplémentaire','08/01/2027','2 850,00',pv('À venir','av')),'21 450 €')},
     {v:'solde',n:'Ajouté à la facture de solde quand c\'est possible',d:'Une ligne de plus sur le solde si l\'accord arrive avant, sinon une facture séparée.',i:'Deux cas à gérer, et un solde parfois retardé par l\'accord.',
      m:echM(er('Acompte','50 % à la commande','02/11/2026','9 300,00',pv('Réglée','reg'))+er('Solde','Solde + restitution CSE supplémentaire','18/12/2026','12 150,00',pv('À venir','av')),'21 450 €')}],
  why:'Une règle unique, simple à expliquer, qui ne retarde jamais le solde.'},
 {g:'Émission, envoi et messages',k:'e3',t:'Combien de messages chacun reçoit-il ?',w:'le 4 novembre, Pierre-Guillaume a écarté les rafales de mails',screen:'fin',
  q:'L\'aperçu compte les messages que reçoit la cheffe de projet sur une enquête de dix semaines. Chaque mail ne fait qu\'ouvrir Alphonse : la décision se prend dans Alphonse, jamais d\'un clic dans le mail.',
  o:[{v:'recap',n:'Seulement quand une décision lui revient',d:'Un message par facture à vérifier, plus un à la fin prévue de la mission : trois pour une enquête en deux échéances. Le référent facturation reçoit un récapitulatif par semaine ; la finance, un message par mois quand le mois est prêt à être clos.',rec:true,
      m:mailL([['02/11','Acompte à vérifier','VARENNE_EnqSig'],['18/12','La mission se termine','le solde peut-il partir ?'],['08/01','Solde à vérifier (reporté au 08/01)','VARENNE_EnqSig']])},
     {v:'liste',n:'Le mail de fin de mission seulement',d:'Le reste se voit dans la liste « Chez moi » d\'Alphonse.',i:'Le risque est qu\'une facture attende sans que personne le voie.',
      m:mailL([['18/12','La mission se termine','le solde peut-il partir ?']])},
     {v:'tout',n:'Un mail à chaque étape',d:'Chaque passage d\'une facture d\'une personne à l\'autre envoie un mail.',i:'Simple à construire, mais c\'est la rafale que vous ne voulez pas.',
      m:mailL([['26/10','Chantier créé','informations à compléter'],['26/10','Échéancier validé',''],['02/11','Acompte à vérifier',''],['04/11','Acompte émis',''],['05/11','Acompte déposé',''],['01/12','Acompte réglé',''],['18/12','La mission se termine',''],['08/01','Solde à vérifier',''],['09/01','Solde émis',''],['10/01','Solde déposé','']])}],
  why:'Le seul message individuel est celui où la décision du chef de projet est indispensable. Aucun mail n\'est envoyé au consultant ni à l\'associé.'},

 {g:'Suivi et clôture',k:'s1',t:'Que devient le point mensuel de Stive avec les chefs de projet ?',w:'aujourd\'hui, une revue de tous les chantiers',screen:'parchantier',
  q:'Avec des statuts à jour, la tournée de tous les chantiers pour savoir quoi facturer devient inutile. Reste l\'échange sur ce qui bloque.',
  o:[{v:'cible',n:'Plus de tournée : Stive appelle seulement quand un chantier ressort',d:'Un écart ou un solde en attente dans « Par chantier » : Stive appelle le chef de projet concerné. Option à valider avec Stive.',rec:true,
      m:MX(`<div class="tw"><table class="t" style="font-size:12.5px"><thead><tr><th>Chantier</th><th class="r">Production</th><th class="r">Déjà facturé</th><th>Écart</th><th></th></tr></thead><tbody><tr><td class="mono">HALIOS_EnqSig</td><td class="r num">16 800</td><td class="r num">12 000</td><td><span class="sbd warn sm">produit non facturé 4 800</span></td><td class="r"><span class="bt ol xs">${I('phone','s3')}Julien</span></td></tr><tr><td class="mono">TALMONT_Enq</td><td class="r num">9 800</td><td class="r num">9 800</td><td><span class="sbd neu sm">aligné</span></td><td></td></tr></tbody></table></div>`)},
     {v:'garder',n:'Garder un point mensuel avec chaque chef de projet',d:'Un point court chaque mois, appuyé sur la vue « Par chantier ».',tag:'ACTUEL',
      m:MX(`<div class="box" style="padding:12px 14px;font-size:12.5px;display:grid;gap:8px">${['Claire Morel · 2 chantiers','Julien Petit · 2 chantiers','Sophie Martin · 3 chantiers'].map(x=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span style="display:flex;align-items:center;gap:6px">${I('cal','s3')}${x}</span><span class="sbd neu sm">point du 20</span></div>`).join('')}</div>`)}],
  why:'Le temps de Stive va là où il apporte de la valeur : une conversation sur ce qui bloque, pas une revue de tout.'},
 {g:'Suivi et clôture',k:'s2',t:'Que reçoit le comptable ?',w:'aujourd\'hui, le facturier Excel qu\'il réimporte',screen:'cloture',
  q:'Le comptable n\'a pas de compte dans Alphonse.',
  o:[{v:'fichiers',n:'Trois fichiers par mois, envoyés par la finance',d:'Le registre des factures au format du facturier, l\'état figé du réalisé et du facturé, et un fichier d\'écritures dont le format sera convenu avec votre comptable.',rec:true,
      m:MX(`<div style="display:grid;gap:8px">${['Registre des factures (format du facturier)','État figé : réalisé et facturé','Écritures pour votre outil comptable'].map(f=>`<span class="file">${I('sheet','s3')}${f}</span>`).join('')}</div>`)},
     {v:'acces',n:'Un accès en lecture dans Alphonse',d:'Le comptable consulte lui-même les chiffres figés.',i:'Demande un compte et un rôle dédiés.',
      m:MX(`<div class="box" style="padding:12px 14px;font-size:12.5px;display:flex;align-items:center;gap:10px"><div class="av">CB</div><div><b>Cabinet comptable</b><div class="mut xs">Rôle « Comptable » · lecture des mois clos</div></div></div>`)}],
  why:'Le comptable n\'a besoin que des chiffres figés ; la finance garde la main sur ce qui sort.'}
];

// ---------- Informations attendues ----------
const INFOS=[
 ['Le premier numéro de facture','Et le format de numérotation de Plein Sens Ethique : nécessaire avant la première facture.'],
 ['Les mentions légales, l\'IBAN, le logo et le délai de paiement','De Plein Sens Ethique, tels qu\'ils figurent sur vos factures actuelles (« à réception de facture » sur le modèle actuel ; 30 jours dans nos maquettes).'],
 ['L\'outil comptable','Celui dans lequel le comptable importe aujourd\'hui le facturier.'],
 ['La plateforme agréée envisagée','Pour la facture électronique de 2027 ; si vous utilisez déjà un outil, nous vérifierons qu\'il est agréé.'],
 ['L\'accès de Stive à Plein Sens Ethique','Stive est salarié de Plein Sens. Il aurait le rôle Finance dans Plein Sens Ethique au titre de la convention de prestations support, à compléter si la facturation n\'y figure pas. Rien n\'est copié côté Plein Sens. Êtes-vous d\'accord ?'],
 ['Les droits actuels des rôles','Nous relirons avec vous l\'écran des droits de Plein Sens Ethique (rôles Consultant et Associé) pour l\'aligner sur vos choix.'],
 ['Deux ou trois devis réels','Anonymisés si vous le souhaitez, dont un avec un échéancier autre que 50/50, pour tester la lecture des documents.']
];

/*@@DROITS_EFFORT@@*/
