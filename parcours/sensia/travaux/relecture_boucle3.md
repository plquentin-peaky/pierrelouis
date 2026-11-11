# Relecture indépendante, boucle 3 : vidéo « Compléter Alphonse en parlant à Sens IA »

Fichier relu : `/home/claude/pierrelouis/parcours/Projection_SensIA_Alphonse.mp4` (1920 × 1080, 25 i/s, 2 min 18,7 s).
Images extraites : `/home/claude/pierrelouis/parcours/sensia/revue/boucle3/` (139 images `f_NNN.jpg` à 1 par seconde, `f_001` = 0 s, plus des planches et recadrages `z_*`). Environ 75 images regardées en pleine résolution (tous les transits par le MCP, toutes les écritures dans Alphonse, toutes les fins de séquence), le reste sur planche (`z_reste.jpg`), et les cinq transitions carton / scène image par image à 12,5 i/s (`z_t1.jpg` à `z_t5.jpg`).

## Verdict

**Montrable en l'état.** Aucun constat bloquant ni important. Les trois points importants de la boucle 2 sont corrigés et les dernières corrections n'ont introduit aucune régression visible. Il ne reste que des détails, dont aucun ne justifie un nouvel enregistrement.

## Synchronisation voix et image (relevé de la nouvelle vidéo)

| Segment | Voix (début à fin) | Ce que montre l'image | Jugement |
|---|---|---|---|
| s01 | 0,0 à 7,4 s | Carton d'ouverture | Bon |
| s02 | 8,4 à 18,8 s | Carton « Le principe » : Sens IA 11 s, MCP 14 s, Alphonse 15 à 16 s, bandeau de validation 18 s | Très bon |
| s03 | 21,0 à 26,3 s | Carton Léa, 20 à 27 s | Bon |
| s04 | 28,1 à 38,0 s | Saisie 28 à 30 s, outils 32 à 37 s, lecture par le MCP 34,5 à 36,5 s | Bon |
| s05 | 38,9 à 46,7 s | Proposition 39 à 41 s, question 43 s, tenue jusqu'à 48 s | Bon |
| s06 | 48,4 à 56,9 s | Réponse 49 à 50 s, clic 52 s, écritures 53 à 57 s, notification 58 s, carton à 60,3 s | Bon |
| s07 | 61,4 à 66,2 s | Carton Claire, 60,3 à 67,5 s | Bon |
| s08 | 68,0 à 75,6 s | Saisie 68 à 71 s, outils 72 à 77 s, lecture par le MCP 75 à 77 s | Bon |
| s09 | 77,6 à 84,8 s | Proposition lisible de 78 à 88 s | Bon |
| s10 | 87,0 à 93,1 s | Clic 88 s, échéancier écrit 92 s, informations 93,5 à 95,5 s, notification 96 s, carton à 100,3 s | Bon (les informations finissent d'arriver 2,4 s après la fin de la voix, voir m2) |
| s11 | 100,8 à 105,3 s | Carton Stive, 100,3 à 107 s | Bon |
| s12 | 110,3 à 118,9 s | Lecture par le MCP 110,5 à 112 s, facture affichée 112,2 s, clic 115,6 s, pastille 116 à 118 s, numéro 118,6 s, tenue jusqu'à 123 s | Bon : le clic tombe sur « Stive confirme », le numéro sur « numéro définitif » |
| s13 | 122,9 à 134,9 s | Carton « À retenir », points 1, 2, 3 vers 124, 127, 130 s, tenue jusqu'à 138,7 s | Bon |

Silences de la voix : 4,5 s après le cas 1, 7,7 s après le cas 2, 5,0 s entre s11 et s12. Il se passe chaque fois quelque chose à l'image (fin d'écriture, notification, carton, frappe).

## État des constats de la boucle 2

| Constat | État | Vérification sur les images |
|---|---|---|
| **N1** écran du personnage suivant visible avant son carton | **Corrigé** | `z_t1.jpg` (59,6 à 61,6 s) : le carton Claire monte en fondu par-dessus l'écran de Léa, intact (son nom, son sous-titre, sa notification) ; aucun « Bonjour, Claire. » avant le carton. `z_t3.jpg` (99,0 à 101,4 s) : même chose pour Stive. `z_t2.jpg`, `z_t4.jpg` : à la sortie du carton, la nouvelle scène apparaît déjà en place, sans saut. `z_t5.jpg` : fin de la séquence finance propre. |
| **N2** pastille « Rien n'est enregistré pour l'instant » après enregistrement | **Corrigé** | `f_059` (cas 1) et `f_097`, `f_099` (cas 2), recadrage `z_c99_head.png` : la pastille devient verte « Enregistré dans Alphonse », en accord avec le bouton vert. Reste, au cas 2 seulement, le sous-titre « Proposition à valider » sous le titre de la carte (voir m1). |
| **N3** facture lisible 2,3 s seulement | **Corrigé** | `z_fact.jpg` : carte complète à 112,2 s. `z_clic.jpg` : curseur sur le bouton à 115,0 s, clic à 115,6 s. Soit 3,4 s de lecture, et le clic reste sur « Stive confirme ». |
| **I5 / M3** « HT » côté Alphonse | **Corrigé pour l'essentiel** | `z_c99_total.png` : « Total 18 600 € HT = montant du devis PSE-2026-041 = montant du chantier ». Restent sans « HT » la pastille de lecture « VARENNE_EnqSig · 18 600 € » (`f_077`) et « Montant du chantier : 18 600 € (saisi à la création) » (`z_c93_docs.png`). Voir m4. |
| **I7 / M1** mentions de règle en petit gris | **Inchangé** | `f_113` : « Brouillon vérifié · pas encore de numéro », « Émettre attribue le numéro définitif. ». `f_079` : « Vous pouvez corriger avant de valider. ». `f_044` : sous-lignes des réponses. Lisibles sur image arrêtée, pas en lecture continue sur écran partagé. Voir m3. |
| **M2** phrase de clôture de Sens IA illisible | **Inchangé, accepté** | `f_059`, `f_099`, `f_120` : texte à 7 px dans la fenêtre réduite. La notification d'Alphonse porte l'information. |
| **M2 (boucle 1)** pastilles sur l'icône MCP | **Inchangé, accepté** | `f_036`, `f_057`, `f_095` : c'est le sens de l'animation. |
| **M4** bulle de Claire coupée | **Corrigé** | `f_079`, `z_c79_top.png` : plus de texte tranché. Il subsiste un filet bleu de 2 px sous la barre de la fenêtre (bord bas de la bulle), imperceptible en lecture. |
| **M5** étiquette « ← lecture » qui mord sur les fenêtres | **Inchangé** | `f_036`, `f_077`, `f_112` : environ 4 px de chaque côté. Voir m5. |
| **M6** sous-titre de l'échéancier différent entre Claire et Stive | **Inchangé** | `f_099` contre `f_119`. Voir m6. |
| **M7** « Adresse du portail » qui était un nom | **Corrigé** | `f_079`, `f_099`, `f_120` : « fournisseurs.varenne-services.example » des deux côtés (adresse fictive volontaire). Dans la proposition Sens IA, l'adresse se coupe après « varenne- » (voir m7). |

## Relecture neuve (à la place de Pierre-Guillaume, une seule fois, sur écran partagé)

### BLOQUANT

Aucun.

### IMPORTANT

Aucun. Rien ne mérite un nouvel enregistrement.

### MINEUR (par ordre de priorité ; à ne traiter que si un enregistrement est refait pour une autre raison)

- **m1. 01:36 à 01:40 : « Proposition à valider » reste sous le titre de la carte après validation (cas 2).** La ligne 377 de `video.js` passe la pastille au vert mais ne touche pas au `<small>` de la ligne 337. Illisible à l'écran (7 px, fenêtre réduite, `z_c99_head.png`), donc sans effet en séance ; seul un arrêt sur image agrandi le montrerait. Correction : au même endroit, `$('#prop .kh small').textContent='Proposition validée'`. Sans risque (texte seul, aucune incidence sur la durée ni la mise en page).
- **m2. 01:33 à 01:36 : les informations de facturation finissent d'arriver 2,4 s après la fin de la phrase « arrivent dans la fiche du chantier ».** Pas gênant : l'échéancier est déjà écrit à 92 s, pendant la phrase, et l'œil suit les pastilles. Ne pas y toucher : le corriger demanderait de recaler la voix, donc risqué pour un gain nul.
- **m3. Mentions de règle en petit gris (reste de I7).** 01:52 « Brouillon vérifié · pas encore de numéro » et « Émettre attribue le numéro définitif. » ; 01:18 « Vous pouvez corriger avant de valider. ». La voix dit l'essentiel (« déjà vérifiée », « numéro définitif »), donc rien ne manque à la compréhension. Correction possible : 13 px en gris moyen. Risque faible mais réel (retour à la ligne possible dans le pied de carte, à vérifier sur image).
- **m4. « HT » absent à deux endroits côté Alphonse.** 01:16 pastille « VARENNE_EnqSig · 18 600 € » (ligne 323, et détail d'outil ligne 321) ; 01:32 « Montant du chantier : 18 600 € ». La colonne « MONTANT HT » et le bandeau « 18 600 € HT » lèvent l'ambiguïté. Ajouter « HT » : sans risque pour la mention de la fiche, risque faible pour la pastille (elle s'élargit de 25 px).
- **m5. 00:35, 01:16, 01:51 : l'étiquette « ← lecture » mord de 4 px sur le bord des deux fenêtres.** Invisible en lecture. Réduire sa largeur de 10 px : sans risque.
- **m6. Sous-titre de l'échéancier différent entre Claire (« Repris du devis… », avec bandeau de total) et Stive (« Les échéances de facturation du chantier… », sans bandeau).** Personne ne le relèvera. À laisser.
- **m7. 01:18 à 01:28 : dans la proposition, l'adresse du portail se coupe en « fournisseurs.varenne- / services.example ».** Purement esthétique. Correction : `white-space:nowrap` sur l'adresse (elle passe alors entière à la ligne) : sans risque.

### Vérifications faites, sans anomalie

- **Régressions.** Aucune : pastilles vertes cohérentes avec les boutons, transitions sans saut, notifications en place, rien de coupé ni de recouvert, contour de la mention « Maquettes pour se projeter · données fictives » intact partout.
- **Dates.** Semaine du 9 au 13 novembre 2026, mercredi 11 férié (grisé dans la proposition, vide dans Alphonse), vendredi 13, mail du 12/11, acompte au 16/11/2026, Stive le lundi 16 (« vérifiée ce matin », « Claire Morel, le 16/11 », « Émise par Stive le 16/11 »), solde au 29/01/2027.
- **Chiffres du cas 1.** 4 jours, 7 saisies. Dans Alphonse : HALIOS 3 vers 5,5, BRENNE 1,5 vers 2,5, PSE_Interne 0,5 vers 1, total 5 vers 9, « 9,0 / 9 j ouvrés écoulés », facturables 4,5 vers 8,0, tous les jours à 1.
- **Chiffres du cas 2 et de la finance.** 9 300 + 9 300 = 18 600 € HT sur la proposition, l'échéancier, la facture. Même devis PSE-2026-041, même bon de commande BC-VS-2026-0187, même SIREN, même adresse, même contact d'un écran à l'autre. Statuts « À venir », « À émettre », « À envoyer » avec F2026-00007 (volontaires).
- **Noms, orthographe, ton.** « Stive » partout, « Plein Sens Ethique » sans accent, aucun tiret cadratin vu à l'écran, aucune faute relevée. Aucun discours de vente, aucun prix de prestation, aucun délai ; « rien de ceci n'est développé à ce jour » sur tous les cartons. Rien qui puisse être mal pris.
- **Durée et rythme.** 2 min 18,7 s. Cartons tenus 6 à 7 s, proposition du cas 2 lisible 10 s, facture de Stive 3,4 s avant le clic, résultats tenus 2 s (cas 1), 4,3 s (cas 2), 4,4 s (finance), carton final 3,8 s après la voix.

## Ce qui fonctionne bien et qu'il ne faut pas casser

1. **Le carton « Le principe » (00:08 à 00:20)**, calé mot pour mot sur la voix.
2. **Les transitions carton / scène**, désormais en fondu propre dans les deux sens : c'était le dernier endroit qui ressemblait à un défaut technique.
3. **La proposition du cas 2 (01:18 à 01:28)** : chaque ligne avec sa source, le total contrôlé, dix secondes pour la lire.
4. **La règle de validation rendue visible** : pastille ambre « Rien n'est enregistré pour l'instant » qui passe au vert « Enregistré dans Alphonse » au moment de l'écriture.
5. **La séquence finance (01:52 à 02:03)** : le temps de lire la facture, le clic sur « Stive confirme », le numéro sur « numéro définitif », puis quatre secondes sur F2026-00007 et « À envoyer ».

## Résumé

Verdict : montrable en l'état, aucun bloquant, aucun important.
- N1 (écran suivant avant le carton) : corrigé, les cinq transitions vérifiées image par image.
- N2 (pastille contradictoire après enregistrement) : corrigé aux deux cas ; reste « Proposition à valider » en sous-titre au cas 2, illisible à l'écran.
- N3 (facture trop brève) : corrigé, 3,4 s de lecture, synchronisation conservée.
- I5 / M3 (« HT ») : bandeau Alphonse corrigé, deux mentions secondaires encore sans « HT ».
- M4 (bulle coupée) et M7 (adresse du portail) : corrigés. I7 / M1, M2, M5, M6 : inchangés, sans gêne en séance.
- Aucune régression introduite par les dernières corrections. Dates, chiffres, noms et statuts cohérents de bout en bout.
- Reste sept mineurs, tous facultatifs ; sans risque : m1, m5, m7 et le « HT » de la fiche ; à ne pas toucher : m2 et m6.
- Durée 2 min 18,7 s.
