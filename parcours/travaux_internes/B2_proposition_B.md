# Proposition B, version 2 : une facture, une vie, un responsable

## 1. L'idée en 3 phrases

Chaque facture suit une vie, chaque étape a un responsable : à venir, à préparer (Steve), chez le CP (Claire), à émettre (Fabrice), à envoyer (Steve), à encaisser (Steve), contestée (Steve), réglée. Ce statut est **calculé** à partir des faits (facture, vérification, numéro, dépôt, paiement, avoir), jamais coché, ni à l'écran ni côté serveur. La section Finance devient « Factures » (À faire, Par chantier, Registre) et « Clôture du mois », la fiche chantier reste le lieu de Claire; un réglage propre à PSE protège Plein Sens.

## 2. Le processus cible

| # | Moment | Qui, où | Ce qui se passe | IA | Sans IA |
|---|---|---|---|---|---|
| 1 | Devis signé | Claire, fiche chantier | Dépose le devis PSE-2026-041. | Lit le devis, préremplit, source de chaque champ. | Même formulaire, à la main. |
| 2 | Aussitôt | Alphonse | Cherche l'entité existante, tous clients, par nom normalisé et SIREN. | Repère les variantes de nom. | Recherche déterministe. |
| 3 | Aussitôt | Claire | Valide l'échéancier 9 300 + 9 300, rapproché du CA initial 18 600 € (source du CA affichée). | Signale un écart. | Règle 50/50. |
| 4 | Date d'acompte | Tâche quotidienne | Brouillon créé : « à préparer » si une mention manque (BC tardif), sinon « chez le CP ». | Rédige le mail d'accompagnement. | Mail type. |
| 5 | Vérification | Claire, fiche chantier | « C'est bon » ou « À corriger ». Pas de mail par facture : la demande figure dans son récapitulatif du jour. | Aucune. | Identique. |
| 6 | Émission | Fabrice, À faire | Seul à « Émettre » : numéro définitif, date du jour. | Signale un doublon. | Relecture. |
| 7 | Envoi | Steve, À faire | Dépôt portail Varenne, date saisie : « à encaisser ». | Aucune. | Identique. |
| 8 | Paiement | Steve, À faire | Retard signalé, appel tracé au journal client, paiement à date réelle : « réglée ». Refus : « contestée », relances suspendues. | Rédige le rappel. | Modèle fixe. |
| 9 | Chaque mois | Steve et chaque CP, Par chantier | Point mensuel **gardé**, sur la vue filtrée par CP. | Aucune. | Identique. |
| 10 | Fin prévue 18/12/2026 | Claire, copie Steve | « Oui, préparer le solde » / « Pas encore » (nouvelle date) / « Un complément est à prévoir ». | Indique les jours consommés. | Sans cette ligne. |
| 11 | Début de mois | Fabrice, Clôture | Trois vérifications, « Clore le mois », état figé pour le comptable. | Aucune sur les chiffres. | Identique. |

**Messages de Claire.** Un récapitulatif quotidien, seulement les jours où quelque chose l'attend, et un mail de fin de mission par chantier. Steve reçoit un récapitulatif hebdomadaire des infos manquantes (repris de A).

**Cas limites, règles écrites.**
- **Avoir.** Fabrice crée l'avoir (`createCreditNote`) : facture barrée dans la fiche, jalon revenu « à préparer », plus de relance.
- **Complément.** Toujours une facture séparée. Claire joint l'accord client et met à jour le CA du chantier ; c'est tracé.
- **Mois clos.** Une facture porte la date de son émission, jamais antidatée : l'acompte vérifié le 3/11 est une facture de novembre, octobre le compte en produit non facturé. Un encaissement garde sa date réelle (exigée par l'e-reporting) ; dans un mois clos, il reçoit en plus une date comptable au 1er mois ouvert.
- **Figer les temps et clore le mois sont distincts.** Figer contrôle la saisie des temps sans rien bloquer ; seul « Clore le mois » verrouille.

## 3. La section Finance cible

| Aujourd'hui | Décision | Pourquoi |
|---|---|---|
| Facturation › Revue mensuelle | **Renommer et alléger** en « Par chantier » | CA chantier, facturé, encaissé, produit (dernier mois clos), écart, prochain jalon, groupé par CP. |
| › À préparer | **Fusionner** dans « À faire » | Devient un statut. |
| › Impayés | **Fusionner** dans « À faire » | Statuts « à encaisser » et « contestée ». |
| › Facturier | **Renommer** « Registre » | Export PLS conservé. |
| Clôture › Checklist | **Garder**, trois lignes | Temps, factures émises, brouillons. |
| Clôture › FAE/PCA | **Renommer** « Facturé / produit non facturé » | Lu dans les valeurs figées à la clôture, chantiers terminés compris. |
| Clôture › 4 statuts | **Simplifier** | Ouvert, temps figés, clos. |
| Valorisation production | **Fusionner** dans Clôture | Onglet « Mois clos ». |
| Exports finance | **Garder** sous Administration | Rentabilité masquée pour PSE. |
| Fiche chantier › Facturation | **Enrichir** | Documents, infos, échéancier, factures et avoirs. |
| Fiche client › Facturation | **Simplifier** | Échéancier retiré ; entités avec compteur, factures, journal ADV. |

```
Finance (bureau et mobile identiques)
├ Factures
│  ├ À faire (n)     statut, responsable, filtre « Chez moi »
│  ├ Par chantier    sert au point mensuel Steve / CP
│  └ Registre        ex-Facturier, export PLS
└ Clôture du mois
   ├ Vérifications
   ├ Facturé / produit non facturé
   └ Mois clos
```

## 4. Ce que voit chaque profil

| Profil | Fiche chantier › Facturation | À faire | Par chantier | Registre | Clôture |
|---|---|---|---|---|---|
| Contributeur (Thomas) | Onglet masqué ; dans Informations : « Facturation suivie par Claire Morel et Steve ». Plus de lecture des factures en base. | Non | Non | Non | Non |
| Claire, CP | Tout ; vérifie ; factures et paiements en lecture | Non | Ses chantiers | Non | Non |
| Associé de réf. | Lecture, ses chantiers | Lecture, ses chantiers | Ses chantiers | Ses chantiers | Non |
| Steve, ADV | Infos et lecture | Tout sauf Émettre et Avoir | Tout | Lecture, export | Non |
| Fabrice | Tout | Tout | Tout | Tout | Tout |
| Comptable | Non | Non | Non | Lecture, export | Lecture, export |

## 5. Les écrans à maquetter (12)

1. **Fiche VARENNE_EnqSig › Facturation, vide.** « Déposez le devis signé (PDF) » ; lien « Remplir à la main ».
2. **Infos préremplies.** Entité (devis p. 1), BC « BC-VS-2026-0187 » (mail du 28/10), contact facturation (signature), envoi « Portail fournisseurs Varenne » (devis p. 3), SIREN « 812 345 678 » (fictif). « Valider ces informations ».
3. **Entité existante.** « Varenne Services SAS est déjà utilisée sur 2 chantiers de Groupe Varenne Services : VARENNE_Baro2025, VARENNE_Form2026. » « Utiliser cette entité » / « Ce n'est pas la même ».
4. **Échéancier.** Acompte 50 %, 02/11/2026, 9 300 €, « Chez le CP » ; Solde 50 %, 18/12/2026, 9 300 €, « À venir ». « Couvre le CA initial (18 600 €, source : devis) ».
5. **Brouillon d'acompte et son fil.** 9 300 € HT, 11 160 € TTC. Fil : Préparée, Vérifiée par Claire, Émise par Fabrice, Déposée. « C'est bon » / « À corriger ». Tableau de bord de Claire : « 1 facture à vérifier ».
6. **À faire, vue Steve.** Compteurs par statut. Colonnes Chantier, Jalon, Montant, Statut, Responsable, Depuis, Action. Ligne VARENNE_EnqSig, « À envoyer », « Saisir la date de dépôt ».
7. **À faire, vue Fabrice.** 1 ligne « À émettre ». Panneau : vérification de Claire (03/11), « Aucun doublon ». « Émettre ».
8. **Par chantier.** Groupé par CP. VARENNE_EnqSig : CA 18 600, facturé 9 300, encaissé 0, produit 6 200, écart +3 100 (facturé d'avance), prochain jalon Solde 18/12.
9. **Mail de fin de mission.** « VARENNE_EnqSig : on prépare le solde ? » ; « 23 jours consommés sur 25 prévus » ; trois boutons ; copie Steve.
10. **Suites.** « Pas encore » : solde au 15/01/2027. Complément : jalon « Complément vague 2 », 2 400 € HT, accord client joint, CA porté à 21 000 €.
11. **Encaissement et contestation.** Panneau facture : « Enregistrer un paiement » (date réelle 30/10, date comptable 01/11 si octobre clos), « Marquer contestée », journal client avec l'appel de Steve.
12. **Clôture de novembre.** Vérifications cochées ; « Facturé 9 300 €, produit 6 200 €, facturé d'avance 3 100 € » ; « Clore novembre » ; « Export comptable ».

## 6. Ce qui est supprimé ou simplifié

- Tournée et « Rien à facturer » ; trois onglets fusionnés en « À faire ».
- Statut « facturé » coché, refusé aussi par le serveur.
- Quatre calculs de production ramenés à un, figé.
- Échéancier en double sur la fiche client ; mails par facture pour Claire.
- Verrou comptable posé par le gel des temps ; factures visibles du contributeur.

## 7. La faisabilité

S = 1 à 2 j, M = 3 à 5 j, L = 8 à 10 j. Total environ 50 jours, en deux lots.

| Brique | État | Taille | Fichiers |
|---|---|---|---|
| Réglage « processus PSE » | À créer | S | `app_settings.feature_flags`, `feature-flags-store.ts` |
| Statut calculé, contestée, avoirs pris en compte | À adapter | M | `billing-helpers.ts` (`derivedBillingStatus`), migration (vérification CP, dépôt, contestation) |
| Statut manuel refusé côté serveur, reprise des jalons cochés | À adapter | S | `billing.functions.ts` (`upsertBillingSchedule`), `BillingScheduleEditor.tsx` |
| Liste « À faire » | À créer sur l'existant | M | `Facturation.tsx`, requêtes de `BillingItemsQueue.tsx`, `OverdueInvoicesView.tsx` |
| Par chantier | À adapter | M | `AdvMissionsView.tsx`, `adv-review.ts` |
| Tâche quotidienne à privilèges (brouillons, jalons échus) | À créer | M | `createDraftInvoiceForMission`, `mark_due_billing_schedules` |
| Rôle ADV séparé de l'émission | À adapter | M | `assertInvoiceManager` à scinder (`billing.functions.ts`), `roles.ts`, `feature-flags-store.ts` |
| Contributeur et associé | À adapter | S | migration corrigeant `invoices_read_scoped` (0041), `MissionDetail.tsx` |
| Dépôt du devis | À créer | L | `org-storage.functions.ts`, table documents |
| Lecture du devis, sources | À créer | M | `expense-capture.functions.ts`, `MissionBillingInfoCard.tsx` |
| Entité tous clients, compteur, SIREN | À adapter | M | `billing-entity-name.ts`, `ClientBillingEntities.tsx` |
| Mails : trois boutons, récapitulatifs, envoi activé | À adapter | M | `email-layout.ts` |
| Gel des temps distinct du verrou, date comptable d'encaissement | À adapter | M | `CutOff.tsx`, `assertCutoffOpen`, `recordPayment` |
| Produit figé à la clôture, une seule formule | À adapter | L | `CutOff.tsx`, `valorisation-production.ts`, tests `cutoff-*` |
| Journal ADV sur la fiche client | À créer | M | `ClientDetail.tsx` |

**Lot 1 (démo, environ 25 j) :** réglage PSE, statut calculé, serveur, À faire, Par chantier, droits, dépôt et lecture du devis, entité, mails. **Lot 2 :** tâche quotidienne, verrou distinct, produit figé, journal ADV.

**2027.** Une seule numérotation pour l'acompte (type 386) et le solde (type 380), le solde citant l'acompte déduit. Les statuts de la plateforme agréée se branchent sur les nôtres : déposée, rejetée (retour « à préparer »), refusée (« contestée »), encaissée (« réglée »).

## 8. Risques et questions ouvertes pour PG

1. **Qui émet ?** Nous maintenons Fabrice seul : c'est la seule vraie double validation CP puis finance. Si vous préférez Steve, le réglage le permet.
2. Le point mensuel Steve / CP sur Par chantier vous convient-il ? À valider avec Steve, jamais interviewé.
3. Le contributeur ne voit vraiment rien ?
4. L'associé voit-il tout ou seulement ses chantiers ?
5. Règles du mois clos et du complément séparé : d'accord ?
6. Outil comptable, plateforme (Dext ?), numérotation PSE : avec Fabrice.
7. Steve ou Stive ?
8. Effort supérieur à A (50 j contre 35) : il paie la double validation et le journal client.
