# F1 : recette finale avant envoi (Plein Sens Ethique)

Périmètre relu : 14 images fournies (t002 à t160), plus 10 images supplémentaires extraites de la vidéo pour couvrir le chapitre 9 « Par chantier » (absent du lot fourni) et les transitions (x22, x36, x95, x100, x110, x122, x138, x145, x164, dans `scratchpad/recette_zoom/`, avec les zooms `t008_excel.png` et `t008_left.png`). Document : `Proposition_Facturation_PSE.md` (158 lignes). Chapitres : `chapitres.txt` (19 lignes). Aucun fichier du livrable n'a été modifié.

Ce qui est conforme : VARENNE_EnqSig, devis PSE-2026-041, 18 600 € HT, acompte et solde de 9 300 € (TTC 11 160 €), F2026-00007, 27 900 / 7 200 / 9 016 € (le PCA VARENNE de 1 116 € est juste : 11 j sur 25 × 18 600 = 8 184 € réalisés), report au 08/01/2027, Claire Morel, Steve, Fabrice Ducellier, Lucas Bernard, Julien Petit, Sophie Martin. Le total des 27 900 € se retrouve (VARENNE 9 300 + BRENNE 7 500 + CAPELLE 6 200 + TALMONT 4 900, soit 4 factures). Les totaux du planning sont justes (46-69 + 12-21 + 10-14 = 68-104 ; 57 + 16 + 12 = 85), tout comme les jours de la semaine (vendredi 18/12/2026) et les horodatages des chapitres (durée réelle 2:46). Le document ne contient aucun tiret cadratin, aucun nom d'agent, aucune mention « proposition A/B » et aucun chemin de fichier hors annexe.

---

## Bloquant

1. **Mentions légales inventées pour le client, sur sa propre facture** (image t055, pied de la facture maquette).
   Actuel : « Plein Sens Ethique · SAS au capital de 1 000 € · RCS Paris 109 500 470 »
   Corrigé : « Plein Sens Ethique · [forme juridique, capital, RCS : à reprendre de vos factures] »
   Motif : un capital et un RCS faux sur la raison sociale réelle du client. Fabrice les verra immédiatement.

2. **Affirmation réglementaire incomplète** (document, ligne 100).
   Actuel : « L'émission électronique sera obligatoire pour Plein Sens Ethique au 1er septembre 2027. »
   Corrigé : « Pour une PME comme Plein Sens Ethique, l'émission de factures électroniques devient obligatoire le 1er septembre 2027 ; la réception l'est déjà depuis le 1er septembre 2026. Calendrier à confirmer avec votre expert-comptable selon la taille de l'entreprise. »
   Motif : la réception est obligatoire depuis septembre 2026, et la date d'émission dépend de la catégorie de l'entreprise (2026 pour une ETI). Telle quelle, la phrase engage AI Origin sur un point de droit.

3. **Le facturier Excel (« Aujourd'hui ») contredit le reste de la vidéo et le document : numéros, montants, chefs de projet** (image t008, comparée à t075, t088 et x95 ; document lignes 104 et 116).
   - Numéros : l'Excel numérote 2026010 à 2026014 en octobre, sans 2026013. Alphonse numérote ensuite F2026-00004 (20/09), F2026-00006 (30/10), F2026-00007 et F2026-00008 (novembre). La numérotation recule et saute un numéro, alors que la ligne 104 promet « une séquence continue par année » et que le lot 3 prévoit une « reprise de la numérotation ».
   - Montants : HALIOS_EnqSig a un acompte de 10 700 € HT, payé le 28/10, dans l'Excel, mais 12 000 € HT, impayé et « en retard de 16 j », dans t088 et x95. TALMONT_Enq a un acompte et un solde de 8 150 € HT dans l'Excel, mais un solde de 4 900 € pour un montant de 9 800 € dans t075, t088 et x95. BRENNE a un acompte facturé le 06/10 dans l'Excel, mais t088 dit que le chantier a été « créé il y a 7 jours » au 05/11.
   - Chefs de projet : la colonne RM met TALMONT chez Claire et BRENNE chez Sophie, alors que x95 et t075 mettent TALMONT chez Sophie Martin et BRENNE chez Claire Morel.
   Corrigé : refaire les lignes 104 à 108 de l'Excel avec les données de la suite :
   `HALIOS | Halios Groupe | HALIOS_EnqSig | Enquête interne, acompte | 12 000 | 20/09/2026 | 2026004 | 14 400 | non | Julien`
   `MERIDIA | … | MERIDIA_EnqRPS | Enquête RPS, acompte | 10 500 | [date] | 2026005 | 12 600 | non | Sophie`
   `ORLAN | … | ORLAN_EnqHar | Enquête, acompte | 16 000 | 30/10/2026 | 2026006 | 19 200 | non | Sophie`
   `VARENNE | Varenne Services | VARENNE_EnqSig | Enquête interne, acompte | 9 300 | 04/11/2026 | ? | 11 160 | non | Claire`
   La suite reprend alors le compteur sans trou (F2026-00007, puis F2026-00008).

4. **Compteurs de la liste « À faire » faux** (images t075 et t088).
   - t088 (Steve, 05/11) : les pastilles affichent 1 + 1 + 0 + 2 + 3 + 1 = **8**, mais l'onglet indique « À faire (7) ». Corrigé : « À faire (8) », ou « 2 À encaisser ».
   - t075 (Fabrice, 04/11, filtre « Chez moi ») : la pastille dit « 2 À émettre », mais la liste ne montre qu'une facture à émettre (TALMONT). Elle montre en plus VARENNE « À envoyer », qui revient à Steve et ne devrait pas apparaître dans « Chez moi » pour Fabrice. Pastille « 1 À envoyer » au 04/11 alors qu'ORLAN F2026-00006, émise le 30/10, est encore à envoyer le 05/11 (t088). Corrigé : « 1 À émettre » et « 2 À envoyer » (total 7 inchangé), et retirer VARENNE de la vue « Chez moi » de Fabrice. Sinon, garder VARENNE en le présentant comme « Émise à l'instant ».
   Motif : la vidéo vend « des chiffres calculés, jamais devinés » à un public de finance.

## À corriger

5. **Droits d'accès : la vidéo contredit le tableau « Ce que voit chacun »** (document lignes 77 et 79 ; images t016, t030, t045, t055, x36 pour Claire, et t088, x95 pour Steve).
   Actuel : le menu de Claire et celui de Steve affichent « Clôture du mois », alors que le document indique « Non » dans la colonne Clôture du mois pour les deux.
   Corrigé : retirer l'entrée « Clôture du mois » de leur menu dans les maquettes. Si l'accès est voulu, écrire « Lecture » aux lignes 77 et 79.

6. **Expéditeur du mail de fin de mission** (image t115 et x110, en-tête du mail).
   Actuel : « De Alphonse Plein Sens <alphonse@mail.pleinsens.fr> »
   Corrigé : « De Alphonse · Plein Sens Ethique <alphonse@[domaine à définir]> »
   Motif : la ligne 19 dit « Plein Sens ne change pas », et la ligne 152 prévoit des envois propres à PSE. L'adresse affichée laisse aussi croire qu'un domaine réel est déjà configuré.

7. **Contact de facturation : texte coupé, badge contradictoire, source absente** (images x36 et t030 ; légende 3/12).
   Actuel : le champ affiche « Nadia Lemoine, comptabilité fournisseurs, n.lemoine@varenne-servi », coupé, et garde le badge « À compléter » alors qu'il est rempli. Aucun badge de source « Mail » n'apparaît, alors que la légende dit « trouve le contact dans un mail ».
   Corrigé : valeur « Nadia Lemoine, comptabilité fournisseurs », avec l'adresse sur une seconde ligne ou dans un champ dédié. Remplacer le badge par « Mail du client, signature » (le format que cite le document à la ligne 89).

8. **Le rappel préparé masque le tableau** (image t088).
   Actuel : la fenêtre « Rappel préparé » couvre la colonne « Où en est-on » de VARENNE et de TALMONT (« Déposée le 05/1… », « Envoi par mail… ») et le bouton « Envoyer » de TALMONT.
   Corrigé : ancrer la fenêtre sous la ligne HALIOS, ou dans le panneau de droite.

9. **Chevauchements du fil d'Ariane, du repère « Le parcours » et de l'étiquette** (images t008, t016, t045, t055).
   - t016 : la barre « Le parcours » recouvre les libellés « CONTACT FACTURATION » (seul « CON » est lisible) et « ADRESSE… ».
   - t045 : le fil d'Ariane masque « CODE POSTAL + VILLE ».
   - t055 : le fil d'Ariane coupe l'onglet « Facturation » (« Facturati… »).
   - t008 : l'étiquette « Aujourd'hui · Alphonse et le facturier Excel » masque les en-têtes des colonnes A à H de l'Excel.
   Corrigé : réserver une bande libre en haut et en bas de chaque écran, ou décaler le contenu.

10. **Le curseur cache du texte clé pendant les pauses.**
    - t065 : « Steve (fa●ation et relances) » ; c'est justement la phrase reprise mot pour mot à la ligne 83.
    - t115 : « reportée au ● janvier » ; le « 8 » est masqué.
    - t088 : le bouton « Prép● e rappel ».
    - t008 : les cellules TTC 9 000 et 9 780.
    - t075 : la pastille « À émettre ».
    - x100 : « Solde chez le chef d● projet ».
    Corrigé : placer le curseur hors du texte à chaque arrêt sur image.

11. **Tirets cadratins visibles à l'écran** (images t008, t016, t055, x95).
    - t008 : « …traitement des frais — repris automatiquement… » devient « …traitement des frais : repris automatiquement… ». « …à cette entité — renseignées par l'ADV. » devient « …à cette entité, renseignées par l'ADV. »
    - t016 : les champs vides affichent « — » (ENTITÉ, SIREN, N° + RUE, BON DE COMMANDE, etc.). Remplacer par « Non renseigné » ou laisser vide.
    - x95 : la colonne « Prochaine échéance » affiche « — ». Remplacer par « Aucune ».
    - t055 : « Paris, — » devient « Paris, le [date d'émission] ».

12. **TALMONT_Enq incohérent dans « Par chantier »** (image x95, comparée à t075 et t088).
    Actuel : montant 9 800, réalisé à fin octobre 4 900, facturé 4 900, « aligné ». Or le solde de 4 900 € (F2026-00008) est déjà émis, ce qui suppose un acompte de 4 900 € facturé avant lui.
    Corrigé : « réalisé à fin octobre 9 800 · facturé 9 800 · aligné ».

13. **Barème d'effort contradictoire** (document ligne 110 et annexe ligne 141).
    Actuel : ligne 110, « gros : 8 à 10 » ; ligne 141, « Gros (6 à 8 j) ». Le total du lot 1 (46 à 69 j) n'est juste qu'avec 6 à 8 j.
    Corrigé, ligne 110 : « Petit : 1 à 2 jours ; moyen : 3 à 5 ; gros : 8 à 10, sauf mention contraire dans l'annexe. »

14. **Engagements de délai** (document lignes 121 et 122).
    Actuel : « Le lot 1 se montre sur une vraie enquête environ trois mois après son lancement… » et « Lots 2 et 3 et plateforme agréée terminés avant l'été 2027. »
    Corrigé : « Le lot 1 pourrait être montré sur une vraie enquête environ trois mois après son lancement (six à sept semaines avec deux développeurs). » et « Objectif : lots 2 et 3 et branchement de la plateforme agréée terminés avant l'été 2027, sous réserve d'un démarrage en [mois] et du choix de la plateforme. »
    Motif : le branchement de la plateforme est exclu du chiffrage (ligne 110), mais il est promis à date.

15. **« Dext ? » proposé comme plateforme agréée** (document lignes 106 et 132).
    Actuel : « La plateforme reste à choisir avec Fabrice (Dext ?). » et « …la plateforme agréée (Dext ?)… »
    Corrigé : « La plateforme reste à choisir avec Fabrice ; si vous utilisez déjà un outil (Dext, par exemple), nous vérifierons qu'il est immatriculé comme plateforme agréée. »
    Motif : rien n'établit que Dext soit une plateforme agréée, et la forme interrogative fait note de travail.

16. **Personne non présentée** (document ligne 134).
    Actuel : « …est-il confirmé avec Alice ? »
    Corrigé : « …est-il confirmé avec Alice [nom], [fonction] ? » Sinon : « …est-il confirmé de votre côté ? »

17. **Question sur le prénom de Steve** (document ligne 133).
    Actuel : « Vous nous l'avez épelé « Stive » le 8 octobre. Lequel retenir, et quel est son nom de famille ? »
    Corrigé : « Nos notes du 8 octobre portent « Stive » ; nous avons retenu « Steve ». Pouvez-vous nous confirmer l'orthographe et son nom de famille ? »
    Motif : la formulation actuelle attribue l'erreur au client.

18. **Jargon technique hors annexe** (document ligne 76).
    Actuel : « Onglet masqué, et factures fermées aussi côté serveur »
    Corrigé : « Onglet masqué ; les factures lui restent inaccessibles, quel que soit le chemin »

19. **Durée de l'ellipse** (image t103).
    Actuel : « SEPT SEMAINES PLUS TARD » ; or il y a 43 jours entre la scène précédente (05/11) et le 18/12.
    Corrigé : « SIX SEMAINES PLUS TARD »

20. **Accent manquant** (images t030, x22, x36, « Frais de mission »).
    Actuel : « A facturer en sus »
    Corrigé : « À facturer en sus »

21. **Facture maquette sans mentions obligatoires** (image t055).
    Actuel : on ne lit que « Délai de règlement : 45 jours · Nature : prestations de services ».
    Corrigé : ajouter « Date d'échéance : [date] · Pénalités de retard : [taux] · Indemnité forfaitaire pour frais de recouvrement : 40 € ».
    Motif : le document met justement en avant le contrôle des mentions obligatoires (ligne 26).

## Mineur

22. **Typographie de la facture** (image t055). « Montant H.T.: » devient « Montant HT : ». « 20,00% TVA » devient « TVA 20 % ». « Montant T.T.C : » devient « Montant TTC : ».
23. **Libellé de champ** (images t008, t030, t045, x36). « ADRESSE SITE DÉPOSE FACTURES » devient « ADRESSE DU PORTAIL DE DÉPÔT ».
24. **Grammaire du rappel** (image t088). « …arrivait à échéance le 20/10. » devient « …est arrivée à échéance le 20/10. »
25. **Abréviation** (images t115 et x110). « 21 j saisis sur 25 prévus. » devient « 21 jours saisis sur 25 prévus. »
26. **Légende 2/12** (image t016). « Claire dépose le devis signé et le bon de commande dans la fiche du chantier. » Seul le devis est déposé à l'écran. Corrigé : « Claire dépose le devis signé dans la fiche du chantier. » Sinon, montrer aussi le bon de commande.
27. **Badge de notification sur le compte d'un consultant** (image t065). La cloche de Lucas Bernard affiche « 2 », alors que le document (ligne 76) indique « Messages : Aucun ». Retirer le badge.
28. **Jargon dans le menu** (toutes les images avec menu). « Connecter MCP » n'est pas expliqué. Masquer l'entrée dans les maquettes.
29. **Nom du fichier Excel** (image t008). « PLS_facturier.xlsx » : vérifier que c'est bien le nom réel. Sinon : « PSE_facturier.xlsx ».
30. **Coupure de ligne** (dernière carte, x164). « …rien n'est développé à / ce stade » laisse un « à » seul en fin de ligne. Mettre une espace insécable avant « à ».
31. **Document ligne 3.** « Exemples fictifs. » devient « Les chantiers, montants et numéros cités sont fictifs. »
32. **Document ligne 11.** « Chaque mois, Fabrice clôt le mois en un clic. » devient « Chaque mois, Fabrice clôt le mois en un clic, une fois les trois vérifications au vert. » Même nuance pour t160 (« clôt le mois en un clic »). Harmoniser aussi « trois fichiers » (ligne 11) et « 3 fichiers » (lignes 81 et 131).
33. **Document ligne 18.** « Les montants comptables sont des formules figées à la clôture. » devient « Les montants comptables sont calculés, puis figés à la clôture. »
34. **Document ligne 33.** « Le jalon revient à « À préparer » » devient « L'échéance revient à « À préparer » ». Le terme « jalon » n'est défini nulle part.
35. **Document ligne 38.** L'exemple n'illustre pas le cas du mois clos. « un acompte vérifié le 3 novembre est une facture de novembre » devient « un acompte prévu le 30 octobre mais vérifié le 3 novembre est une facture de novembre ».
36. **Document ligne 48.** « Plus de tournée » devient « Plus de tournée des chefs de projet ».
37. **Document ligne 55.** « Clôture › « Passer en … » » : citer le libellé exact du bouton actuel.
38. **Document ligne 103.** « (386 pour un acompte, 380 pour une facture) » devient « (386 pour une facture d'acompte, 380 pour une facture de solde ou de complément) ».
39. **Document ligne 105.** « Le paiement est alors déclaré automatiquement : c'est l'e-reporting. » devient « Le paiement est alors transmis à l'administration par la plateforme : c'est l'e-reporting. »
40. **Document ligne 106.** « par API si elle le permet » devient « par connexion directe (API) si elle le permet ».

---

## Décompte

- Bloquant : 4 (points 1 à 4)
- À corriger : 17 (points 5 à 21)
- Mineur : 19 (points 22 à 40)
- Total : 40
