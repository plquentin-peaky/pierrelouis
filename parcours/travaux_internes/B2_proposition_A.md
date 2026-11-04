# B2 · Proposition A révisée : évolution minimale, gain maximal

## 1. L'idée en 3 phrases

Chaque facture suit une seule vie, avec un statut **calculé** à partir des faits (date atteinte, vérification, numéro, dépôt, paiement, avoir) et un responsable par statut : c'est le changement de processus, emprunté à B. Pour l'outiller, on ne crée aucune page : la page Facturation garde sa route et passe de quatre onglets à trois (À faire, Par chantier, Registre), la fiche chantier reste le lieu de Claire, la clôture devient trois vérifications et un état **figé** pour le comptable. Tout changement passe par un réglage propre à PSE, pour que Plein Sens ne perde rien.

## 2. Le processus cible

Vie d'une facture : À venir → À préparer (Steve) → Chez le CP (Claire) → À émettre (Fabrice) → À déposer (Steve) → À encaisser (Steve) → Réglée. Écarts : Contestée (Steve, relances suspendues) ; Annulée par avoir (le jalon revient « À préparer »).

| # | Moment | Qui, où | Sans IA | Avec IA |
|---|---|---|---|---|
| 1 | Devis signé | Claire, fiche chantier | « Remplir à la main », source « saisi par Claire » | Lit le devis, préremplit avec la source de chaque champ |
| 2 | Aussitôt | Alphonse | Recherche par nom normalisé et SIREN, tous clients | Repère les variantes (« Varenne Services S.A.S. ») |
| 3 | Aussitôt | Claire | Règle 50/50 appliquée au CA affiché, avec son origine | Signale un écart avec le devis |
| 4 | Date du jalon | Tâche quotidienne | Brouillon créé : « À préparer » si une mention manque (BC tardif), sinon « Chez le CP » | Prépare le mail d'accompagnement |
| 5 | Vérification | Claire, fiche chantier | « C'est bon » / « À corriger » ; la demande arrive dans **un** récapitulatif quotidien, pas un mail par facture | Signale un écart devis / brouillon |
| 6 | Émission | Fabrice, À faire « Chez moi » | Seul à émettre, numéro définitif | Signale un doublon |
| 7 | Dépôt | Steve | Dépose sur le portail Varenne, saisit la date | Rappelle « BC obligatoire » |
| 8 | J+7 sans infos | Steve | Un récapitulatif hebdomadaire groupé | Rédige le message à Claire |
| 9 | Encaissement | Steve | Saisit le paiement à sa **date réelle**, trace l'appel dans le journal client | Rédige la relance |
| 10 | Fin prévue 18/12 | Claire, copie Steve | Mail à trois boutons | Ajoute « 12 j consommés sur 15 » |
| 11 | Complément accepté | Claire puis Steve | Claire porte le CA à 21 000 € en joignant l'accord client ; facture séparée | Lit l'accord client |
| 12 | Le 20 du mois | Steve et chaque CP | Point mensuel sur « Par chantier » | Aucune |
| 13 | Début de mois | Fabrice, Clôture | Trois vérifications, « Figer », état comptable figé | Aucune sur les chiffres |

Règles écrites :
- **Mois figé.** Une facture ou un avoir dû dans un mois figé est daté du 1er du mois suivant, sauf réouverture décidée par Fabrice. L'encaissement garde toujours sa date réelle (exigée par l'e-reporting « encaissée »).
- **Statut.** Personne ne coche « facturé », ni à l'écran ni côté serveur.

## 3. La section Finance cible

| Aujourd'hui | Décision | Pourquoi |
|---|---|---|
| Facturation › À préparer | Fusionner dans « À faire » | Devient les statuts À préparer, Chez le CP, À émettre |
| Facturation › Impayés | Fusionner dans « À faire » | Devient À encaisser et Contestée, badge de retard ; export conservé |
| Facturation › Revue mensuelle | Renommer « Par chantier » | **Maintenu contre B** : budget, facturé, encaissé, écart, prochain jalon, groupé par CP. C'est le lien facture-pilotage de PG (21/07) et le support du point mensuel qui fait facturer les CP ; Steve n'a pas été interrogé (PS-4), on ne le lui retire pas. « Rien à facturer » devient « Pas encore » réservé à Steve |
| Facturation › Facturier | Renommer « Registre » | Export PLS gardé ; Steve, Fabrice, comptable |
| Clôture › Checklist | Renommer « Vérifications » | Trois lignes en clair |
| Clôture › Ajustements FAE/PCA | Renommer « Facturé / produit non facturé » | **Figé** au moment de « Figer », chantiers terminés compris ; le FEC lit ce figé |
| Clôture › « Passer en … » | Supprimer | Ouvert ou figé suffit |
| Valorisation production | Fusionner dans Clôture, onglet « Mois clos » | Même public, une entrée en moins |
| Fiche client › Facturation | Simplifier | Échéancier retiré (doublon) ; entités avec compteur, factures, **journal ADV** (emprunté à B) |
| Exports › Rentabilité, Classeur CDG | Masquer pour PSE | Hors sujet |

Arborescence cible, identique bureau et mobile :
```
Finance
├ Facturation : À faire (n) · Par chantier · Registre
└ Clôture mensuelle : Vérifications · Facturé / produit non facturé · Mois clos
Fiche chantier › Facturation : Devis et documents · Infos (sources) · Échéancier (statut calculé) · Factures et avoirs
Fiche client › Facturation : Entités · Factures · Journal ADV
```

## 4. Ce que voit chaque profil

| Écran | Thomas, contributeur | Claire, CP | Associé de réf. | Steve | Fabrice | Comptable |
|---|---|---|---|---|---|---|
| Onglet Facturation | Masqué ; ligne « Facturation suivie par Claire Morel et Steve » dans Informations ; lecture des factures fermée **en base** (0041) | Tout ; vérifie | Lecture, ses chantiers | Infos et dépôt | Tout | Non |
| À faire | Non | Non (fiche et récapitulatif) | Lecture, ses chantiers | Tout sauf émettre | Tout, seul à émettre | Non |
| Par chantier | Non | Ses chantiers | Ses chantiers (`viewAll` retiré) | Tout | Tout | Non |
| Registre | Non | Non | Ses chantiers | Lecture, export | Tout | Lecture, export |
| Journal ADV client | Non | Lecture | Lecture | Écrit | Lecture | Non |
| Clôture | Non | Non | Non | Lecture | Agit | Lecture, export |

## 5. Les écrans à maquetter (12)

1. **Fiche VARENNE_EnqSig › Facturation, vide.** « Déposez le devis signé (PDF) », lien « Remplir à la main », « CA du chantier : 18 600 € (saisi à la création) ».
2. **Infos préremplies et entité.** Pastilles de source : Entité (devis p. 1), BC « BC-VS-2026-0187 » (devis p. 3), Envoi « Portail fournisseurs » (devis p. 3), SIREN « 812 345 678 » (fictif, à confirmer), Contact facturation « à compléter ». Encart : « Varenne Services SAS est déjà utilisée sur 2 chantiers de ce client (VARENNE_Baro25, VARENNE_DiagRPS). » Boutons « Utiliser cette entité », « C'est une autre entité », « Valider ces informations ».
3. **Échéancier proposé.** Type, Libellé, Date, Montant HT, Statut : Acompte 50 %, 16/11/2026, 9 300 €, À venir ; Solde 50 %, 18/12/2026, 9 300 €, À venir. « Total 18 600 € = CA initial ». « Valider l'échéancier ».
4. **Brouillon d'acompte, vue Claire.** BROUILLON 9 300 € HT, 11 160 € TTC. Fil à droite : Préparée (16/11) ✓, Vérifiée par Claire, Émise par Fabrice, Déposée, Encaissée. « C'est bon », « À corriger ».
5. **À faire, vue Steve « Chez moi ».** Compteurs À préparer 1, Chez le CP 2, À émettre 1, À déposer 1, À encaisser 4 (1 en retard), Contestée 0. Colonnes Chantier, Client, Jalon, Montant HT, Statut, Responsable, Depuis, Action. Ligne VARENNE_EnqSig, Acompte, À déposer, « Saisir la date de dépôt ».
6. **À faire, vue Fabrice.** Une ligne À émettre ; panneau : « Vérifiée par C. Morel le 17/11 », « Aucun doublon ». « Émettre ».
7. **Mail de fin de mission.** « VARENNE_EnqSig se termine le 18/12 : on prépare le solde ? », 9 300 € restant, 12 j sur 15. Trois boutons, copie Steve.
8. **Suites.** « Pas encore » : jalon Solde au 15/01/2027, note tracée. « Complément » : jalon « Complément vague 2 », 2 400 € HT, « accord client attendu », CA à mettre à jour.
9. **Par chantier (le 20 novembre).** Groupé par CP. Colonnes Chantier, Budget, Production à date, Facturé, Encaissé, Écart, Prochain jalon, Infos. VARENNE_EnqSig : 18 600, 4 100, 9 300, 0, -5 200 (facturé d'avance).
10. **Fiche client Groupe Varenne › Journal ADV.** « 20/11, appel compta fournisseurs : facture reçue, paiement à 45 j. » Bouton « Marquer contestée ».
11. **Avoir.** Fiche chantier, Factures et avoirs : PSE-2026-0012 annulée par avoir AV-2026-0001, jalon revenu « À préparer ».
12. **Clôture de novembre.** Trois vérifications cochées. « Figer novembre » ; carte figée « Facturé 9 300 €, produit non facturé 0 €, facturé d'avance 5 200 € » ; « Export FEC », « État pour le comptable ».

## 6. Ce qui est supprimé ou simplifié

- Quatre onglets ramenés à trois ; À préparer et Impayés deviennent des statuts.
- Statut « facturé » manuel, à l'écran et côté serveur.
- Calcul « Facturable » au tarif des grades : une seule production, celle figée à la clôture.
- Bascule des jalons à l'ouverture de `/facturation`.
- Mail de vérification par facture, au profit d'un récapitulatif.
- Statuts « Passer en … », menu Valorisation, échéancier de la fiche client.
- Accès des contributeurs aux montants et aux factures.
- Trois listes de rôles (barre, mobile, ACL) ramenées à une.

## 7. La faisabilité

S = 1 à 2 j, M = 3 à 5 j, L = 8 à 10 j. Total estimé : environ 42 jours.

| Brique | État | Taille | Fichiers |
|---|---|---|---|
| Réglage PSE pour renommages et fusions | À créer | S | `feature-flags-store.ts` |
| Statut calculé, avoirs compris | À adapter | M | `billing-helpers.ts` (`derivedBillingStatus`), `ScheduleStatusPill.tsx` |
| Statut manuel refusé côté serveur | À adapter | S | `billing.functions.ts` (`upsertBillingSchedule`) |
| Dates de vérification et de dépôt, statut Contestée | À créer | S | migration `invoices` |
| Onglet À faire | À adapter | M | `Facturation.tsx`, `BillingItemsQueue.tsx`, `OverdueInvoicesView.tsx` |
| Fabrice seul à émettre | À adapter | M | `assertInvoiceManager`, `feature-flags-store.ts` |
| Tâche quotidienne à privilèges, brouillon auto | À créer | M | `mark_due_billing_schedules`, `createDraftInvoiceForMission` |
| Dépôt du devis | À créer | L | `org-storage.functions.ts`, nouvelle table |
| Lecture du devis avec sources | À créer | M | `expense-capture.functions.ts`, `MissionBillingInfoCard.tsx` |
| Entité tous clients, compteur, SIREN | À adapter | M | `billing-entity-name.ts`, `ClientBillingEntities.tsx` |
| Mails : trois boutons, récapitulatifs, activation de l'envoi | À adapter | M | `email-layout.ts` |
| Encaissement à date réelle dans un mois figé | À adapter | S | `assertCutoffOpen` |
| FAE/PCA figés à « Figer », terminés compris, FEC sur le figé | À adapter | M | `CutOff.tsx`, `revenue_recognition` |
| Une seule production | À adapter | M | `AdvMissionsView.tsx`, `adv-review.ts`, tests `cutoff-*` |
| Journal ADV, factures et avoirs dans la fiche | À créer | M | `ClientDetail.tsx`, `MissionDetail.tsx` |
| Droits : contributeur, associé, menus | À adapter | S | `MissionDetail.tsx`, `0041_…sql`, `AppSidebar.tsx`, `MobilePlusSheet.tsx` |
| Préparation 2027 : type de jalon vers type 386 / 380, lien solde vers acompte, SIREN | À adapter | S | `BillingScheduleEditor.tsx`, `invoices` |

Facture électronique : les statuts ci-dessus se branchent en 2027 sur ceux de la plateforme (déposée, rejetée, refusée, encaissée) ; rejetée ou refusée renvoie vers « À préparer » ou « Contestée ». Numérotation PSE continue, commune acompte et solde.

## 8. Risques et questions ouvertes pour PG

1. Fabrice seul à émettre, ou Steve par délégation pendant ses absences ?
2. Point mensuel Steve et CP sur « Par chantier » : on le garde (notre position) ?
3. Complément : facture séparée (notre position) ou intégré au solde ?
4. Mois figé : date au 1er du mois suivant (notre position) ou réouverture ?
5. Contributeur : rien voir, confirmé ?
6. Associé : ses chantiers seulement ?
7. Outil comptable, plateforme agréée (Dext ?), numérotation, IBAN, logo : Fabrice.
8. Reprévision calendaire (AO-4) : traitée à part, hors vidéo.
9. Steve ou Stive ?
