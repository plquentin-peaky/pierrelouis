G='#adf0c7';Y='#fff6b6';O='#f8d3af'
lanes=[('lcp','Chef de projet<br>(ou associé de référence)',230,'#f4f2fd'),('lal','Alphonse',510,'#f7f7f7'),('lfi','Finance<br>(rôle Finance : Stive, Fabrice)',790,'#f4f2fd'),('lcl','Client',1070,'#f7f7f7'),('lco','Comptable et<br>plateforme agréée',1350,'#f4f2fd')]
W=3600
out=[]
a=out.append
a(f'<g id="fr" transform="translate(3520,0)" data-frame="1 bis. Le parcours cible au 10 novembre : qui fait quoi, quand">')
a(f'<rect data-type="frame" x="0" y="0" width="{W}" height="1760" fill="#ffffff" data-title="1 bis. Le parcours cible au 10 novembre : qui fait quoi, quand" />')
a('<textArea id="tt" x="32" y="30" width="2500" font-family="noto_sans" font-size="56" font-weight="bold" fill="#1a1a1a">Facturer une enquête Plein Sens Ethique dans Alphonse : le parcours cible</textArea>')
a('<textArea id="st" x="34" y="112" width="2500" font-family="noto_sans" font-size="24" fill="#555555">Mis à jour le 10 novembre 2026, après les retours du 9 novembre. Remplace le parcours du cadre 1.</textArea>')
for i,(t,c,tc) in enumerate([('Existe déjà',G,'#067429'),('À adapter',Y,'#af7e04'),('À créer',O,'#9b4a08')]):
    a(f'<rect id="lg{i}" x="{2700+i*290}" y="44" width="260" height="64" rx="12" fill="{c}" stroke="none" data-content="{t}" data-text-color="{tc}" data-font-family="noto_sans" data-font-size="22" data-font-weight="bold" />')
heads=[(300,'1 · Ouverture du chantier'),(1060,'2 · Date de l\'échéance'),(1420,'3 · Émission et suivi'),(2500,'4 · Fin prévue au devis'),(3240,'5 · Chaque mois')]
for i,(x,t) in enumerate(heads):
    a(f'<textArea id="h{i}" x="{x}" y="168" width="{700 if i in (0,2) else 360}" font-family="noto_sans" font-size="30" font-weight="bold" fill="#1a1a1a">{t}</textArea>')
for (id_,t,y,bg) in lanes:
    a(f'<rect id="{id_}" x="32" y="{y}" width="220" height="260" rx="12" fill="#dedaff" stroke="none" data-content="{t}" data-text-color="#6631d7" data-font-family="noto_sans" data-font-size="21" data-font-weight="bold" />')
    a(f'<rect id="{id_}b" x="264" y="{y}" width="{W-264-32}" height="260" fill="{bg}" stroke="none" />')
LY={'cp':230,'al':510,'fi':790,'cl':1070,'co':1350}
cards=[
 ('a1','cp',300,'Dépose le devis signé et le bon de commande',O),
 ('a2','al',300,'Lit le devis : propose l\'échéancier écrit au devis et les informations, avec leur source. Ne garde pas le document',O),
 ('a3','cp',680,'Relit l\'échéancier, puis les informations ; valide en un clic',Y),
 ('a4','fi',680,'Ou le fait à la place du chef de projet, et complète ce qui manque',Y),
 ('b1','al',1060,'À la date prévue, prépare la facture en brouillon',G),
 ('b2','cp',1420,'Vérifie la facture depuis l\'échéancier : c\'est bon, ou à corriger',O),
 ('c1','fi',1420,'Relit la facture, puis l\'émet : numéro définitif, PDF Plein Sens Ethique',G),
 ('c2','fi',1780,'Envoie par mail ou dépose sur le portail du client, puis note le statut',Y),
 ('c3','cl',1780,'Reçoit la facture et la paie',G),
 ('c4','al',1780,'Calcule le retard, signale ce qui manque, prépare le texte de relance',Y),
 ('c5','fi',2140,'Note le paiement ; relance depuis sa messagerie si besoin',Y),
 ('d1','al',2500,'Mail au chef de projet, référent facturation en copie : « oui » confirmé d\'un clic, ou lien vers Alphonse',O),
 ('d2','cp',2860,'« Oui » depuis le mail ; reporter ou prévoir un complément dans Alphonse. Le référent voit la réponse dans sa liste',O),
 ('d3','al',2860,'Prépare la facture de solde : même circuit que l\'acompte',G),
 ('e1','fi',3240,'Vérifie, puis clôt le mois : les chiffres sont figés',Y),
 ('e2','co',3240,'Le comptable reçoit trois fichiers',Y),
 ('f1','co',1060,'Dès septembre 2027 : la plateforme agréée transmet la facture et ses statuts',O),
]
for (id_,l,x,t,c) in cards:
    fs=18 if len(t)>70 else 20
    a(f'<rect id="{id_}" x="{x}" y="{LY[l]+50}" width="300" height="160" rx="12" fill="{c}" stroke="none" data-content="{t}" data-text-color="#1a1a1a" data-font-family="noto_sans" data-font-size="{fs}" />')
a('<textArea id="ft" x="34" y="1640" width="3500" font-family="noto_sans" font-size="22" fill="#333333"><b>À retenir.</b> Toute l\'équipe voit la facturation de tous les chantiers, en lecture ; seuls le chef de projet, l\'associé de référence et le rôle Finance agissent. Alphonse n\'envoie pas les factures : la finance les envoie ou les dépose comme aujourd\'hui, puis note le statut. Un lien dans un mail ouvre Alphonse : la décision se prend dans Alphonse, jamais d\'un simple clic dans le mail. Le référent facturation de chaque enquête est une personne du rôle Finance, qui peut changer d\'une enquête à l\'autre.</textArea>')
conns=[('a1','a2','bottom','top','',''),('a2','a3','right','left','',''),('a3','b1','right','left','validé',''),('a4','a3','top','bottom','ou','5,5'),('b1','b2','right','left','',''),('b2','c1','bottom','top','c\'est bon',''),('c1','c2','right','left','',''),('c2','c3','bottom','top','',''),('c3','c5','right','bottom','paiement',''),('c4','c5','right','top','retard',''),('c1','f1','left','top','dès 09/2027','5,5'),('d1','d2','right','left','',''),('d2','d3','bottom','top','solde',''),('d3','e1','right','top','',''),('e1','e2','bottom','top','','')]
for i,(s,e,ss,es,lab,da) in enumerate(conns):
    extra=(f' data-content="{lab}"' if lab else '')+(f' stroke-dasharray="{da}"' if da else '')
    a(f'<line id="k{i}" x1="0" y1="0" x2="1" y2="1" data-start="{s}" data-end="{e}" stroke="#313131" stroke-width="2" data-arrow="end" data-shape="elbowed" data-start-side="{ss}" data-end-side="{es}"{extra} />')
a('</g>')
open('new.svg','w').write('<svg xmlns="http://www.w3.org/2000/svg">\n'+'\n'.join(out)+'\n</svg>')
