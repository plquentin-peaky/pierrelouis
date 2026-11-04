# E3 · Vérification finale de D2

Relecture en lecture seule du code SENS ERP (HEAD) le 4/11, en plus des fichiers déjà relus pour E1 : `MissionBillingInfoCard.tsx` et `BillingEntityBlocks.tsx`. Aucune écriture, aucune requête en base.

## Verdict global

**OK pour maquettage, après six corrections de texte.** Aucune ne change l'architecture ni le planning. Elles sont listées en fin de document, prêtes à appliquer.

## 1. Les NON FAISABLE de E1

| Point de E1 | Traitement dans D2 | Verdict |
|---|---|---|
| Fabrice seul à émettre | Brique « Émetteurs nominatifs » (Gros), contrôlée dans les fonctions et par un trigger, gel de la clôture compris. Levier de 8 à 10 j si Steve émet aussi | OK |
| Mails propres à PSE et planificateur | Interrupteur par organisation (le secret `EMAIL_SENDING_ENABLED` est bien nommé comme global), et planificateur dans « Contrôle de chaque nuit » | OK |
| Comptable en lecture | « Pas de compte » : Fabrice envoie les 3 fichiers. Question 5 posée | OK |
| Total et lot 1 | Grille recalculée, voir § 4 | OK |

Les réserves de E1 sont toutes reprises : statut calculé en Gros, droits conditionnés au réglage PSE, Par chantier lu dans `production_snapshots`, aperçu surligné remplacé par « devis p. 3 », numérotation annuelle.

## 2. Scènes

| # | Verdict | Remarque |
|---|---|---|
| 1 | Correction | « Aucune entité sélectionnée » n'apparaît que dans la liste déroulante, en mode édition. En lecture, le champ « Entité » affiche un simple tiret. Les intitulés Excel exacts sont « hono sans frais HT » et « date facture », pas « hono HT » et « date ». |
| 2 | OK | « Montant du chantier » est un nouveau libellé : l'existant est « CA du chantier : X € ». |
| 3 | Correction | Deux points, détaillés dans les corrections 2 et 3 ci-dessous. Le mode d'envoi n'a que trois valeurs (« E-mail », « Portail (dépôt en ligne) », « Courrier »). Le chef de projet ne peut pas écrire sur l'entité. Le SIREN 999 999 998 passe le contrôle de Luhn. |
| 4 | OK | « À venir » existe. |
| 5 | OK | 9 300 × 1,2 = 11 160 €. |
| 6 | OK | Les compteurs au 04/11 sont cohérents avec les scènes 7 et 8. Les numéros 00007 et 00008 suivent 00006. |
| 7 | OK | « À envoyer » et « À encaisser » reposent sur les statuts `emise` et `envoyee`. « En retard de 16 j » se calcule déjà. |
| 8 | Correction | Les calculs sont justes : 7 440, 4 800, 6 200. La formule du réalisé n'est écrite nulle part (voir correction 4). Il manque la colonne « Prochaine échéance » annoncée au § 4. |
| 9 | OK | Trace dans `schedule_notes`, qui existe. 21 j sur 25. |
| 10 | OK | Total novembre : 9 300 + 4 900 + 7 500 + 6 200 = 27 900 €. Facturé d'avance : 1 116 + 1 500 + 6 400 = 9 016 €. HALIOS : 19 200 − 12 000 = 7 200 €. |
| 11 | Correction | Les libellés exacts sont « Ajustements FAE/PCA » et « Valorisation production ». « Sept pages deviennent six » est juste. |
| 12 | OK | |

La durée est juste : 181 s, soit 3 min 01.

## 3. Libellés repris de l'existant

**Exacts :**
- « Revue mensuelle », « À préparer », « Impayés », « Facturier » ;
- « Clôture mensuelle », « Checklist » ;
- « Informations de facturation », « Facturation » ;
- « À venir » ;
- « Remplir à la main » (nouveau, cohérent).

**Inexact :** au § 4, l'Export FEC contient aussi les écritures d'inventaire FAE et PCA (journal OD), et pas seulement les ventes.

## 4. Chiffres et planning

- **Chiffres des scènes.** Tous cohérents entre eux et avec les « Chiffres sous-jacents ». Par exemple, ORLAN : 16 000 − 6 400 = 9 600 € réalisés.
- **Lot 1.** La somme des briques donne 46 à 69 j, à condition d'y compter le « Statut facturé manuel refusé ».
- **Lots 2 et 3 et total.** Lot 2 : 12 à 21 j. Lot 3 : 10 à 14 j. Total : 68 à 104 j, environ 86 en estimation centrale. C'est conforme à D2.
- **Délai du lot 1.** 57 j font environ 2,7 mois, ou 6 semaines à deux développeurs. Le texte est juste.

## Corrections à appliquer telles quelles

1. **Scène 1.** Remplacer « « Aucune entité sélectionnée » » par « champ « Entité » vide (un simple tiret) ». Remplacer « (Client, Commande n°, hono HT, date, n° facture, Payé) » par « (Client, Commande n°, hono sans frais HT, date facture, n° facture, Payé) ».
2. **Scène 3.** Remplacer « envoi « Portail fournisseurs Varenne » (devis p. 3) » par « mode d'envoi « Portail (dépôt en ligne) », adresse du site de dépôt « portail fournisseurs Varenne » (devis p. 3) ».
3. **Annexe, ligne « Entité retrouvée, SIREN ».** Ajouter : « Écriture du SIREN et du contact sur l'entité par une fonction serveur : le chef de projet n'a pas le droit de modifier une entité (`clients.edit`) ». La taille reste Moyen.
4. **Annexe, ligne « Par chantier ».** Ajouter : « Réalisé = jours saisis ÷ jours prévus × montant du chantier, lu dans les colonnes `jours_realises_cumules`, `budget_jours_total` et `budget_montant` de `production_snapshots` ; même formule à la clôture ».
5. **Scène 8.** Ajouter la colonne « Prochaine échéance » : « Solde 18/12 » pour VARENNE.
6. **Scène 11 et § 4.** Écrire « Ajustements FAE/PCA » et « Valorisation production ». Au § 4, remplacer « Ce sont les écritures de ventes au format FEC » par « Ce sont les écritures de ventes et d'inventaire (FAE, PCA) au format FEC ».
