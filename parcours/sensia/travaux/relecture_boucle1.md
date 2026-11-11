# Relecture indépendante, boucle 1 : vidéo « Compléter Alphonse en parlant à Sens IA »

Fichier relu : `/home/claude/pierrelouis/parcours/Projection_SensIA_Alphonse.mp4` (1920 × 1080, 25 i/s, 2 min 07).
Images extraites : `/home/claude/pierrelouis/parcours/sensia/revue/boucle1/` (127 images à 1 par seconde, plus des recadrages `z_*.jpg/png` sur les moments clés). Environ 75 images regardées en pleine résolution, dont toutes celles des transits par le MCP, des écritures dans Alphonse et des cartons.

## Verdict

**À reprendre, mais par des corrections légères** : un seul défaut bloquant (la fin de la séquence finance est coupée et en retard sur la voix), le reste se corrige par des tenues de plan, quelques libellés et des tailles de texte. Le fond, les chiffres et le ton sont bons.

## Synchronisation voix et image (relevé)

| Segment | Voix (début à fin) | Ce que montre l'image | Jugement |
|---|---|---|---|
| s01 | 0,0 à 7,4 s | Carton d'ouverture, 0 à 8,3 s | Bon |
| s02 | 8,4 à 18,8 s | Carton « Le principe » : Sens IA vers 10 s, MCP vers 12 s, Alphonse vers 14 s, bandeau « Chaque écriture est proposée, puis validée » vers 17,5 s | Très bon, chaque bloc arrive sur son mot |
| s03 | 20,3 à 25,6 s | Carton Léa, 20,2 à 27,3 s | Bon |
| s04 | 27,4 à 37,3 s | Saisie 27,5 à 29,5 s, outils 31 à 36 s, lecture par le MCP 34 à 36 s | Bon |
| s05 | 38,2 à 46,0 s | Proposition 38 à 40,5 s, question 41,5 s, tenue jusqu'à 47,7 s | Bon |
| s06 | 47,7 à 56,2 s | Réponse 48,5 s, validation 51,5 s, écritures 52,8 à 56,5 s, notification 57,3 s, coupe 59,0 s | Correct, fin un peu courte |
| s07 | 59,2 à 64,0 s | Carton Claire, 59,2 à 65,8 s | Bon |
| s08 | 65,8 à 73,3 s | Saisie 66 à 69 s, outils 70 à 74 s, lecture par le MCP 73 à 74 s | Bon |
| s09 | 74,6 à 81,8 s | Proposition de 75,5 à 84 s | Bon |
| s10 | 84,0 à 90,1 s | Validation 86 s, écritures 88 à 92,4 s, notification 92,9 s, coupe 93,4 s | **La voix finit 2,3 s avant la fin des écritures, résultat tenu 0,5 s** |
| s11 | 93,4 à 97,9 s | Carton Stive, 93,4 à 99,6 s | Bon |
| s12 | 99,7 à 108,3 s | Saisie 100 à 102 s, outil 103 à 104,5 s, facture 105 à 108,5 s, clic « Émettre » 109,2 s, numéro 111,0 s, notification 111,8 s, coupe 112,0 s | **Image en retard d'environ 3 s, résultat tenu moins d'une seconde** |
| s13 | 111,7 à 123,7 s | Carton « À retenir », points 1, 2, 3 vers 114, 116, 118 s, tenue jusqu'à 127 s | Bon |

## BLOQUANT

### B1. 01:45 à 01:52 : la facture reçoit son numéro après que la voix l'a dit, et on n'a pas le temps de le voir
- **Ce que l'on voit.** La voix dit « Stive confirme, et la facture reçoit son numéro définitif » entre 01:45 et 01:48 environ (fin de s12 à 108,3 s). À cet instant l'écran montre encore le brouillon dans Sens IA, immobile. Le clic sur « Émettre la facture » n'arrive qu'à 109,2 s, la pastille traverse le MCP de 109,8 à 110,8 s, le numéro F2026-00007 et la ligne verte apparaissent à 111,0 s, la notification « Facture F2026-00007 émise · par Stive, via Sens IA » n'est pleinement lisible qu'à 111,8 s, et le carton « À retenir » recouvre tout à 112,0 s, pendant que la voix de conclusion (s13) a déjà commencé à 111,7 s.
- **Pourquoi c'est gênant.** C'est le point d'orgue de la troisième séquence et le seul moment de la vidéo où une facture est émise, donc celui que Fabrice regardera le plus attentivement. Il dispose d'une seconde pour lire le numéro, le statut et la notification, alors que la voix parle déjà d'autre chose. Pierre-Guillaume entend une chose et en voit une autre pendant trois secondes.
- **Correction proposée.**
  1. Recaler l'action sur la voix : soit couper s12 en deux au silence entre les deux phrases (la seconde, « Stive confirme, et la facture reçoit son numéro définitif », déclenchée au moment du clic), soit, sans toucher à l'audio, raccourcir ce qui précède le clic (dans `scStive` : `sleep(3000)` ramené à 1200 environ, durée du vol de lecture 1600 ramenée à 1100, frappe un peu plus rapide) pour que le clic tombe vers 105,5 s.
  2. Ajouter une tenue de 2,5 à 3 s après l'apparition de la notification, avant le carton final, et ne lancer s13 qu'une fois le carton affiché.
  3. Remonter la notification (voir M3) : elle recouvre aujourd'hui la ligne « TOTAL 18 600 € ».

## IMPORTANT

### I1. 01:28 à 01:33 : même défaut, en plus léger, à la fin du cas 2
- **Ce que l'on voit.** La voix finit à 90,1 s (« sans qu'elle ait ouvert Alphonse ») alors que les pastilles des informations de facturation volent encore jusqu'à 92,4 s. Les champs passent au vert à 92,4 s, la notification « Échéancier et informations validés · par Claire Morel, via Sens IA » arrive à 92,9 s en recouvrant le champ « Mode d'envoi » tout juste écrit, et le carton Stive démarre à 93,4 s. La notification n'est vraiment nette que dans le fondu du carton.
- **Pourquoi c'est gênant.** Fabrice n'a pas le temps de vérifier que ce qui a été proposé est bien ce qui est arrivé dans la fiche. Pierre-Guillaume ne voit pas le « c'est fait ».
- **Correction proposée.** Tenue de 2,5 s après la notification avant le carton Stive. Faire partir les pastilles d'informations en même temps que celles de l'échéancier, ou raccourcir leur vol, pour que tout soit arrivé quand la voix se tait.

### I2. Durée totale 2 min 07, en dessous de la fourchette demandée (2 min 30 à 3 min), et les trois « résultats » sont les plans les plus courts
- **Ce que l'on voit.** Les cartons durent 6 à 8 s chacun (largement assez), alors que les trois états finaux dans Alphonse sont tenus 1,7 s (cas 1), 0,5 s (cas 2) et moins d'une seconde (finance).
- **Pourquoi c'est gênant.** Le commanditaire a explicitement demandé que la vidéo n'aille pas trop vite. Le temps est aujourd'hui dépensé sur les cartons, pas sur les preuves.
- **Correction proposée.** Aucun contenu nouveau : seulement des tenues. Environ +1,5 s à la fin du cas 1, +2,5 s à la fin du cas 2, +3 s à la fin de la séquence finance, +0,8 s sur chacun des trois transits de lecture par le MCP, +2 s sur la proposition du cas 2 (la plus dense). Cela amène la vidéo vers 2 min 20 à 2 min 25, donc toujours loin du plafond de 3 min.

### I3. 01:30 : des informations s'écrivent dans Alphonse sans avoir été montrées dans la proposition validée
- **Ce que l'on voit.** La proposition validée par Claire (01:16 à 01:24) contient quatre informations : entité facturée, bon de commande, contact, mode d'envoi. Dans Alphonse (01:32) arrivent en plus un SIREN (999 999 998), une adresse (18 rue des Tanneurs, 69007 Lyon) et une adresse de portail de dépôt.
- **Pourquoi c'est gênant.** Le message central, répété trois fois, est « rien ne s'écrit sans validation ». Fabrice verra que trois champs ont été écrits sans que Claire les ait vus. C'est exactement la crainte qu'on veut lever.
- **Correction proposée.** Ajouter une ligne à la proposition, par exemple « SIREN et adresse : 999 999 998 · 18 rue des Tanneurs, 69007 Lyon » avec la source « Devis, p. 1 », et intégrer le portail à la ligne « Mode d'envoi ». À défaut, laisser ces trois champs à « Non renseigné » dans Alphonse.

### I4. 01:06 à 01:16 : la « proposition », demandée par le commanditaire, est retrouvée mais ne sert à rien
- **Ce que l'on voit.** Claire demande « le mail du client et la proposition ». La voix et le sous-titre annoncent « le mail, le devis signé et la proposition ». La liste d'outils affiche bien « SharePoint · Documents : Varenne / Proposition d'intervention v3.docx ». Mais la réponse de Sens IA dit « J'ai lu le devis signé, le bon de commande et le mail de Nadia Lemoine », et aucune des six sources citées ne renvoie à la proposition. Le bon de commande, lui, n'a jamais été demandé ni annoncé.
- **Pourquoi c'est gênant.** Le cas d'usage demandé est « aller chercher un mail, un devis, une proposition ». Un spectateur attentif se demande à quoi a servi la proposition, et d'où sort le bon de commande.
- **Correction proposée.** Phrase de réponse : « J'ai lu le mail de Nadia Lemoine, le devis signé avec son bon de commande, et la proposition. » Et rattacher une ligne à la proposition, par exemple la source du solde : « Proposition, p. 6 (remise du rapport fin janvier) ».

### I5. 01:16 à 01:24 : montants sans mention « HT » dans la proposition de Sens IA
- **Ce que l'on voit.** « 9 300,00 € », « 9 300,00 € », « Total 18 600 € = montant du devis = montant du chantier dans Alphonse », sans unité. Côté Alphonse la colonne s'appelle « MONTANT HT », la pièce jointe indique « 18 600 € HT », et la facture présentée à Stive dit « Montant HT ».
- **Pourquoi c'est gênant.** Première question d'un responsable financier devant un montant de facturation : hors taxes ou toutes taxes ? Ici la réponse existe, mais pas à l'endroit où l'on valide.
- **Correction proposée.** « 9 300,00 € HT » sur les deux lignes et « Total 18 600 € HT » dans le bandeau vert (Sens IA et Alphonse).

### I6. 01:40 à 01:52 : vocabulaire des statuts et format du numéro de facture à faire coïncider avec ce qui a été arrêté avec Plein Sens
- **Ce que l'on voit.** Statuts de l'échéancier : « À venir », « À émettre », puis « À envoyer ». Numéro : « F2026-00007 ».
- **Pourquoi c'est gênant.** La consigne est de reprendre Alphonse tel qu'il est, et Fabrice est précis sur les statuts et les règles. D'après les notes de mission dont je dispose (arbitrages de septembre, à confirmer car l'atelier du 04/11 a pu les faire évoluer), les statuts retenus pour l'échéancier étaient « À venir », « À facturer », « Facturé », « Réglé », et les numéros de facture de Plein Sens sont de la forme « 2026109 » (année suivie du rang, sans lettre ni tiret).
- **Correction proposée.** Vérifier ces deux points dans la spécification issue de l'atelier du 04/11 et aligner les libellés de la vidéo au mot près. Si la spécification confirme les libellés de la vidéo, ne rien changer.

### I7. Les preuves écrites sont trop petites pour être lues en projection
- **Ce que l'on voit.** Dans la fenêtre active, les textes courants font 12 à 14 px à l'écran : lisibles. En revanche plusieurs textes qui portent le message font 8 à 10 px, en gris clair :
  - 00:40 et 01:16 : « rien n'est enregistré pour l'instant » sous le titre des deux propositions (c'est la matérialisation à l'écran de « rien ne s'écrit sans accord ») ;
  - 00:31 à 00:37, 01:10 à 01:14, 01:44 : les lignes de détail des outils, en caractères à chasse fixe gris (« semaine du 9 au 13 novembre · 11 événements, 5 entretiens », « Devis PSE-2026-041 signé.pdf · BC-VS-2026-0187.pdf »). Illisibles même sur image arrêtée ;
  - 01:31 et 01:51 : l'étiquette « via Sens IA » à côté de « Échéancier », et la ligne « Émise par Stive le 16/11, via Sens IA · à envoyer ou à déposer sur le portail » sous l'acompte (environ 8 px) ;
  - 00:51 : « 4 jours sur 4 jours ouvrés · 7 saisies », seul total de la proposition du cas 1.
- **Pourquoi c'est gênant.** Ce sont précisément les éléments de traçabilité et de contrôle que Fabrice cherchera. En salle, sur un écran partagé, ils n'existent pas.
- **Correction proposée.** Passer ces textes à 13 px minimum à l'écran et dans une couleur plus soutenue. Pour les lignes de détail des outils, abandonner la chasse fixe gris clair au profit du gris moyen de l'interface, en 12 à 13 px. Mettre « rien n'est enregistré pour l'instant » en pastille ambre à côté du titre de la proposition.

## MINEUR

- **M1. 00:57 à 00:59, fin du cas 1.** La notification « 7 saisies enregistrées · par Léa Martin, via Sens IA » reste 1,7 s. C'est lisible mais juste, d'autant que la barre de complétude passe au vert au même moment. Ajouter 1 à 1,5 s.
- **M2. 00:53, 01:28 et 01:50, étiquette « écriture → ... » au-dessus du MCP.** Elle déborde sur la barre latérale d'Alphonse et masque l'entrée « Occupation » (on lit « ...ation »). À 01:50 la pastille « Émettre · acompte Varenne » recouvre entièrement l'icône MCP au moment où elle la traverse. Raccourcir les libellés (« écriture → la fiche », « écriture → la facture »), ou les passer sur deux lignes centrées sur l'icône, et faire passer les pastilles juste au-dessus de l'icône plutôt que dessus.
- **M3. 01:32 et 01:51, emplacement des notifications.** En bas à droite, elles recouvrent la donnée qui vient d'être écrite (« Mode d'envoi » au cas 2, « TOTAL 18 600 € » à la séquence finance). Les placer en haut à droite de la fenêtre Alphonse, sous l'en-tête.
- **M4. 01:30 à 01:33, cadrage de la fiche après défilement.** La dernière ligne (« Adresse du portail de dépôt ») est coupée par le bas de la fenêtre, et la ligne « Déposez le devis signé (PDF) » est tranchée en haut. Ajuster le défilement de 40 px environ, ou masquer la ligne du haut.
- **M5. 01:19 contre 01:32, deux libellés pour la même valeur.** Sens IA propose « Dépôt sur le portail fournisseurs », Alphonse enregistre « Portail (dépôt en ligne) ». Écrire la même chose des deux côtés, puisque la pastille est censée transporter la valeur telle quelle.
- **M6. 00:40, proposition de feuille de temps.** Les colonnes sont LUN 9, MAR 10, JEU 12, VEN 13. Le mercredi 11 férié n'est signalé que dans la phrase au-dessus. Une colonne grisée « MER 11 férié » rendrait la lecture immédiate et ferait écho à la colonne grisée du 11 dans Alphonse.
- **M7. 01:33 à 01:40, lien entre le cas 2 et la finance.** Entre les deux séquences, l'acompte passe de « À venir » à « À émettre, vérifiée par Claire Morel le 16/11 ». La phrase qui l'explique (« Alphonse préparera la facture d'acompte le 16 novembre : il vous restera à la vérifier ») s'affiche dans la fenêtre Sens IA réduite et grisée, moins d'une seconde : personne ne la lira. La voix dit bien « déjà vérifiée par Claire », ce qui suffit pour Pierre-Guillaume. Pour Fabrice, le sous-titre du carton Stive pourrait porter l'information sans allonger : « Lundi 16 novembre : l'acompte Varenne, vérifié par Claire, est à émettre. »
- **M8. 00:34 à 00:36, 01:13 à 01:14, 01:43 à 01:44, transits de lecture.** Ils durent 1,2 à 1,6 s. On les voit, mais ils sont trois fois plus brefs que les écritures. Les allonger de 0,8 s environ, pour que « il lit, puis il écrit » soit aussi net dans les deux sens.
- **M9. 01:27 à 01:32, pastille « Maquettes pour se projeter · données fictives » en haut à droite.** Son contour perd ses bords arrondis (il ne reste que deux traits horizontaux) pendant que la fenêtre Alphonse est au premier plan dans le cas 2. Défaut de rendu à vérifier.
- **M10. 00:53 à 00:58, grille de la feuille de temps.** Le samedi 07 est en orange alors que le dimanche 08 et le mercredi 11 férié sont en gris. Si c'est fidèle à Alphonse, ne rien changer. Sinon harmoniser.

## Vérifications faites, sans anomalie

- **Dates.** Semaine du 9 au 13 novembre 2026, mercredi 11 férié et grisé, vendredi 13 mis en évidence, lundi 16 novembre pour Stive, 29/01/2027 (un vendredi) pour le solde, mail du 12/11 : tout est cohérent.
- **Chiffres du cas 1.** Proposition : HALIOS 1 + 0,5 + 0,5 + 0,5, BRENNE 0,5 + 0,5, PSE_Interne 0,5, soit 4 jours et 7 saisies. Dans Alphonse après écriture : HALIOS 3 → 5,5, BRENNE 1,5 → 2,5, PSE_Interne 0,5 → 1, total 5 → 9, « 9,0 / 9 j ouvrés écoulés », facturables 4,5 → 8,0, totaux par jour tous à 1, prévision du mois 14 j (9 + 5). Tout tombe juste.
- **Chiffres du cas 2 et de la finance.** 9 300 + 9 300 = 18 600 €, identique au devis, à la fiche et au total de l'échéancier. Acompte de 9 300,00 € HT, même bon de commande BC-VS-2026-0187 et même entité « Varenne Services SAS » de bout en bout.
- **Noms et orthographe.** « Stive » partout à l'écran, « Plein Sens Ethique » sans accent, aucun tiret cadratin ni demi-cadratin dans les sources ni dans la voix, aucune faute relevée.
- **Ton.** Aucun discours de vente, aucun prix de prestation, aucun délai. La mention « rien de ceci n'est développé à ce jour » figure sur tous les cartons.

## Ce qui fonctionne bien et qu'il ne faut pas casser

1. **Le carton « Le principe » (00:08 à 00:20).** Sens IA, le MCP, Alphonse puis la règle de validation apparaissent chacun sur le mot de la voix. Un non-technicien comprend en dix secondes ce qu'est le connecteur.
2. **L'animation d'écriture du cas 1 (00:52 à 00:57).** Les sept pastilles partent une à une du tableau de Sens IA, traversent le MCP et se posent dans la bonne case, pendant que les totaux et la barre de complétude se mettent à jour. C'est la meilleure démonstration que « la donnée passe par le MCP ».
3. **La question de précision (00:41 à 00:50).** « Rien dans votre agenda vendredi après-midi » avec trois choix, dont l'indice du document modifié à 16 h 40 : cela rend crédible le « ce qu'il ne sait pas, il le demande ».
4. **Les sources citées et le contrôle de total du cas 2 (01:16 à 01:24).** « Devis, p. 2 », « Mail du 12/11, signature », et le bandeau vert « Total = montant du devis = montant du chantier dans Alphonse » : c'est le langage de Fabrice.
5. **Les notifications signées (« par Léa Martin, via Sens IA »), la mention « Brouillon vérifié · pas encore de numéro » et « Émettre attribue le numéro définitif ».** Elles portent la traçabilité et la règle de gestion sans une phrase d'explication. Il faut seulement leur laisser le temps d'être lues.

## Résumé

Verdict : à reprendre, par corrections légères (tenues de plan, libellés, tailles de texte), sans ajout de contenu.
- BLOQUANT B1 (01:45 à 01:52) : la voix annonce le numéro définitif 3 s avant le clic, et la facture émise n'est visible qu'une seconde avant le carton final.
- IMPORTANT I1 (01:28 à 01:33) : fin du cas 2 tenue 0,5 s, voix terminée avant les écritures.
- IMPORTANT I2 : durée 2 min 07 sous la fourchette demandée, les résultats sont les plans les plus courts.
- IMPORTANT I3 (01:30) : SIREN, adresse et portail écrits dans Alphonse sans figurer dans la proposition validée.
- IMPORTANT I4 (01:06 à 01:16) : la proposition est retrouvée mais ni lue ni citée, le bon de commande apparaît sans avoir été annoncé.
- IMPORTANT I5 (01:16) : montants sans « HT » dans la proposition de Sens IA.
- IMPORTANT I6 (01:40 à 01:52) : statuts « À émettre / À envoyer » et numéro « F2026-00007 » à aligner sur la spécification de l'atelier du 04/11.
- IMPORTANT I7 : preuves écrites à 8 à 10 px, illisibles en projection.
