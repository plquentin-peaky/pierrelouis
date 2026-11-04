# Prompt Claude Code : parcours cliquable et vidéo de la facturation PSE (version légère)

> À coller dans une session Claude Code, sur ton ordinateur ou dans le cloud, avec le zip `Contexte_Prototype_Facturation_PSE.zip` joint. Durée visée : 30 à 45 minutes. Aucun code d'Alphonse n'est touché.

---

## Ta mission

Commence par dézipper `Contexte_Prototype_Facturation_PSE.zip` dans le dossier de travail : tu obtiens un dossier `_contexte/`.

Le fichier `_contexte/Facturation_PSE_Maquettes.html` contient déjà des reproductions fidèles des écrans d'Alphonse V2 (l'ERP de Plein Sens, sur alphonse.pleinsens.fr) : barre latérale, barre du haut, cartes, badges, tableaux. Elles sont générées par les fonctions JavaScript `shell()` et `S.<écran>.prop()` en bas du fichier.

Ta mission : **transformer ces écrans statiques en un parcours cliquable et animé**, dans un nouveau fichier HTML autonome, puis **enregistrer une vidéo** de ce parcours que j'enverrai à Pierre-Guillaume Ferré, sponsor du projet chez Plein Sens. Tu ne refais pas le design : tu reprends le CSS et les gabarits du fichier existant, et tu ajoutes le mouvement.

Le besoin de PG est résumé dans `_contexte/CR_Echange_Facturation_PSE_04-11.md`.

## Règles

1. Tu ne travailles que dans le dossier courant. Tu n'ouvres, ne clones et ne modifies aucun dépôt de code d'Alphonse, et tu ne déploies rien.
2. Données fictives uniquement, celles déjà présentes dans les maquettes (chantier VARENNE_EnqSig, Groupe Varenne Services, Claire Morel, devis PSE-2026-041 de 18 600 € HT, etc.).
3. Textes en français, libellés identiques aux maquettes. Pour les textes nouveaux : phrases courtes, pas de tiret cadratin.
4. Un seul fichier de sortie autonome : `parcours/Parcours_Facturation_PSE.html` (CSS et JS en ligne, polices Google Fonts autorisées).

## Étape facultative (5 minutes) : calibrer sur la vraie application

Si tu as accès à mon navigateur Chrome (extension Claude in Chrome), ouvre https://alphonse.pleinsens.fr dans un nouvel onglet (je suis déjà connecté). **Lecture seule** : tu regardes la fiche d'un chantier, son onglet Facturation et la page Facturation, sans rien cliquer qui modifie des données, sans rien saisir. Compare avec les maquettes (tailles de police, espacements, couleurs de la barre latérale) et note les écarts visibles. Ne fais aucune capture de données client réelles dans les fichiers produits. Si la page demande une connexion, ou si tu n'as pas accès à Chrome, saute cette étape sans me demander.

## Le parcours cliquable

Plein écran, l'application seule (pas la page éditoriale autour). Un bouton discret « Suivant » en bas à droite fait avancer d'une étape ; les touches → et ← aussi. Une touche `A` lance la lecture automatique de bout en bout. Une légende d'une phrase en bas de l'écran annonce chaque étape (fond sombre semi-transparent, police Poppins).

1. **Claire dépose le devis.** Onglet Facturation de VARENNE_EnqSig. Les 3 documents arrivent un par un dans la zone de dépôt (petite animation de glissement), avec « Lecture… » puis « Lu ».
   Légende : « Claire dépose le devis et le mail du client dans la fiche chantier. »
2. **Alphonse lit et propose.** Les 7 informations apparaissent une à une avec leur source, puis 2 lignes « À compléter ».
   Légende : « Alphonse remplit ce qu'il trouve et indique d'où vient chaque information. »
3. **Claire complète en une phrase.** Le message d'Alphonse s'affiche, puis Claire tape (frappe animée) « Le BC est BC-VS-2026-0187, dépôt sur le portail fournisseurs Varenne. » Les 2 lignes passent au vert. Clic sur « Valider les 9 informations ».
   Légende : « Il demande seulement ce qui manque. »
4. **Échéancier proposé.** L'écran « Échéancier » des maquettes, les lignes apparaissent une à une. Clic sur « Valider l'échéancier ».
   Légende : « Acompte et solde de 50 % sont proposés d'après le devis. »
5. **Facture d'acompte.** L'écran « Facture d'acompte ». Clic sur « Valider » côté chef de projet, l'étape passe au vert ; l'utilisateur affiché en haut à droite devient Fabrice Ducellier, qui valide ; le numéro 2026007 remplace « attribué à l'émission » ; la dernière étape passe à « Déposée sur le portail ».
   Légende : « Le chef de projet puis la finance valident avant le dépôt chez le client. »
6. **Fin de mission.** Transition avec un carton « 18 décembre 2026 ». L'écran « Fin de mission » : le mail apparaît, puis la réponse de Claire se tape, puis la réponse d'Alphonse, puis la date du jalon se barre et devient 08/01/2027.
   Légende : « À la date de fin du devis, Claire répond en une phrase, Steve en copie. »
7. **Suivi de Steve.** L'écran « Suivi de Steve ». Les tuiles se remplissent, puis une note d'appel est collée dans le panneau MERIDIA.
   Légende : « Steve voit qui appeler et pourquoi, sans fichier Excel. »
8. **Clôture.** L'écran « Compta ». Légende : « Chaque mois, l'état facturé et non facturé part au comptable. »
9. **Rentabilité.** L'écran « Rentabilité », version Aujourd'hui puis bascule vers Proposition (le bandeau ambre disparaît, 54,4 % devient 46,8 %).
   Légende : « En novembre, octobre compte pour son réalisé. »

Ajoute un carton d'ouverture de 3 secondes (« Facturer une enquête depuis la fiche chantier · Proposition pour Plein Sens Ethique ») et un carton de fin (« Maquette : données fictives, rien n'est développé à ce stade »). Retire les liserés pointillés « Nouveau » des maquettes pour la vidéo.

Ajoute un petit curseur visible (rond gris foncé avec halo au clic) qui se déplace vers chaque bouton avant le clic, pour que la vidéo montre où l'on clique.

## La vidéo

1. Vérifie que Node.js, ffmpeg et Playwright sont disponibles (`node -v`, `ffmpeg -version`, `node -e "require('playwright')"`). Dans une session cloud, Playwright et Chromium sont souvent déjà installés : utilise-les tels quels, ne les réinstalle pas. Sur mon ordinateur, s'il manque quelque chose, dis-le-moi et propose la commande d'installation avant de l'exécuter.
2. **Polices.** Avant d'enregistrer, vérifie dans la page que Poppins et Barlow Condensed sont bien chargées (`document.fonts.check('16px Poppins')` et `document.fonts.check('16px "Barlow Condensed"')`). Si Google Fonts n'est pas joignable, installe `@fontsource/poppins` et `@fontsource/barlow-condensed` avec npm et intègre leurs fichiers woff2 en base64 dans le HTML. Sans ces deux polices, la ressemblance avec Alphonse est perdue : ne lance pas l'enregistrement tant qu'elles ne sont pas chargées.
3. Écris `parcours/enregistrer.mjs` : il ouvre le fichier HTML en 1920 × 1080, lance la lecture automatique et enregistre avec `recordVideo`.
4. Convertis en MP4 H.264 avec ffmpeg (`-preset veryfast -crf 20`, sans son) : `parcours/Parcours_Facturation_PSE.mp4`, 2 à 3 minutes, moins de 50 Mo.
5. Écris `parcours/chapitres.txt` avec l'horodatage de chaque étape.

## Vérification avant de me rendre la main

- Ouvre le HTML dans Chrome et parcours-le une fois en entier : aucun texte coupé, aucun écran blanc, les animations s'enchaînent.
- Extrais une image de la vidéo au début de chaque étape et regarde-la : légende lisible, curseur visible, rien qui déborde.
- Envoie-moi en pièces jointes la vidéo, le HTML et `chapitres.txt`, puis dis-moi en 5 lignes maximum : durée de la vidéo et ce qui n'a pas pu être fait.

Commence par me dire en 3 lignes ce que tu vas faire, puis lance-toi sans attendre.
