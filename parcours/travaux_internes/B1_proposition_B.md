# Proposition B : repenser le processus, pas seulement les écrans

## 1. L'idée en 3 phrases

Chaque facture suit une seule vie, en sept statuts, et chaque statut a un seul responsable : à venir, à préparer (Steve), chez le CP (Claire), à émettre (Fabrice), à envoyer (Steve), à encaisser (Steve), réglée. Ce statut est **calculé** à partir de ce qui s'est réellement passé (date atteinte, vérification, numéro attribué, dépôt, paiement) et ne se coche jamais à la main. La section Finance devient une seule liste « À faire » triée par responsable, la fiche chantier reste le lieu de Claire, et la clôture devient un rituel de trois vérifications et un état pour le comptable.

## 2. Le processus cible

| # | Moment | Qui, où | Ce qui se passe | IA | Sans IA |
|---|---|---|---|---|---|
| 1 | Devis signé | Claire, fiche chantier | Dépose le devis PSE-2026-041 (et au besoin un mail). | Lit le devis, préremplit avec la source de chaque champ. | Même formulaire, rempli à la main. |
| 2 | Aussitôt | Alphonse | Cherche l'entité existante avant d'en proposer une. | Repère les variantes de nom. | Nom normalisé et SIREN. |
| 3 | Aussitôt | Claire, fiche chantier | Valide l'échéancier proposé : 9 300 + 9 300 = CA initial 18 600 €. | Signale un écart. | Règle 50/50 par défaut. |
| 4 | Date d'acompte | Alphonse | Brouillon créé (calcul quotidien) : « à préparer » si une mention manque, sinon « chez le CP ». | Rédige le mail d'accompagnement. | Mail type. |
| 5 | J+7, infos manquantes | Steve, À faire | Une alerte groupée par semaine ; il appelle le client. | Brouillon de mail client. | Steve écrit. |
| 6 | Vérification | Claire, mail puis fiche | « C'est bon » ou « À corriger ». | Aucune. | Identique. |
| 7 | Émission | Fabrice, À faire | Seul à « Émettre » : numéro définitif, statut « à envoyer ». | Détecte un doublon. | Relecture. |
| 8 | Envoi | Steve, À faire | Dépose sur le portail Varenne, saisit la date : « à encaisser ». | Aucune. | Identique. |
| 9 | Encaissement | Steve, À faire | Badge de retard ; appel ; échange tracé dans le journal client ; paiement saisi : « réglée ». | Rédige le rappel. | Modèle fixe. |
| 10 | Fin prévue 18/12/2026 | Claire, copie Steve, mail | « Oui, préparer le solde » / « Pas encore » (Claire décale la date) / « Un complément est à prévoir » (jalon « accord client attendu »). | Indique les jours consommés. | Mail sans cette ligne. |
| 11 | Début du mois | Fabrice, Clôture | Trois vérifications, « Clore le mois », état pour le comptable. | Aucune sur les chiffres. | Identique. |

Règle : au plus un message par personne et par jour, regroupé ; chaque réponse est tracée dans le fil du jalon.

## 3. La section Finance cible

| Aujourd'hui | Décision | Pourquoi |
|---|---|---|
| Facturation › Revue mensuelle | **Supprimer** | La liste « À faire » est continue ; « Rien à facturer » devient « Pas encore » ; production, facturé et écart passent dans la clôture. |
| Facturation › À préparer | **Fusionner** dans « À faire » | Devient le statut « à préparer » ; « Facture hors échéancier » couvre les cas libres. |
| Facturation › Impayés | **Fusionner** dans « À faire » | Devient le statut « à encaisser », avec badge de retard. |
| Facturation › Facturier | **Renommer** « Registre des factures » | Garde le registre et l'export PLS pour le comptable. Réservé finance, ADV, comptable. |
| Clôture mensuelle › Checklist | **Garder**, simplifier | Trois lignes : temps saisis, factures du mois émises, brouillons traités. |
| Clôture › Ajustements FAE/PCA | **Renommer** « Produit non facturé / Facturé d'avance » | Même calcul, mots compréhensibles. |
| Clôture › « Passer en … » (4 statuts) | **Simplifier** | Deux états : ouvert, clos. |
| Valorisation production | **Fusionner** dans Clôture, onglet « Mois clos » | Lecture des valeurs figées, au même endroit que l'arrêté. |
| Exports (partie finance) | **Garder** sous Administration | Hors parcours ; le rapprochement production / facturation, doublon de la clôture, est masqué. |
| Fiche chantier › Facturation | **Garder**, enrichir | Devis, infos préremplies, échéancier à statut unique, factures du chantier. |
| Fiche client › Facturation | **Simplifier** | On retire l'échéancier (doublon) ; on garde les entités et les factures ; on ajoute le journal des échanges de Steve. |

Menu cible (bureau et mobile identiques) :
```
Finance
  À faire (n)                 Steve, Fabrice ; associé en lecture
  Registre des factures       Steve, Fabrice, comptable
  Clôture du mois             Fabrice ; comptable en lecture
     ├ Vérifications
     ├ Facturé / produit non facturé
     └ Mois clos
```

## 4. Ce que voit chaque profil

| Profil | Fiche chantier › Facturation | À faire | Registre | Clôture |
|---|---|---|---|---|
| Consultant contributeur | **Rien** : onglet masqué (aujourd'hui il voit montants et CA) | Non | Non | Non |
| Claire, CP | Tout, modifiable ; boutons « C'est bon » / « À corriger » ; factures et paiements en lecture | Non (tout lui arrive par mail et dans sa fiche) | Non | Non |
| Associé de référence | Lecture sur ses chantiers | Lecture, filtrée sur ses chantiers | Ses chantiers | Non |
| Steve, ADV | Lecture et infos de facturation | Tout sauf « Émettre » | Lecture, export | Non |
| Fabrice, finance | Tout | Tout, seul à émettre | Tout | Tout |
| Comptable | Non | Non | Lecture, export | Lecture et export |

## 5. Les écrans à maquetter (10)

1. **Fiche VARENNE_EnqSig › Facturation, vide.** Zone « Déposez le devis ici (PDF) ». Lien « Remplir à la main ».
2. **Infos préremplies.** Liste de champs avec pastille de source : Entité « Varenne Services SAS » (source : devis p. 1), BC « BC-VS-2026-0187 » (source : mail du 28/10), Contact facturation « Comptabilité fournisseurs » (source : signature du mail), Envoi « Portail fournisseurs Varenne » (source : devis p. 3), SIREN « 812 345 678 » (fictif, à saisir). Bouton « Valider ces informations ».
3. **Entité existante détectée.** Encart : « Varenne Services SAS existe déjà. Utilisée sur 2 chantiers de Groupe Varenne Services : VARENNE_Baro2025, VARENNE_Form2026. » Boutons « Utiliser cette entité » (principal), « Ce n'est pas la même ».
4. **Échéancier proposé.** Colonnes Libellé, Date, Montant HT, Statut. « Acompte 50 % », 02/11/2026, 9 300 €, « À préparer » ; « Solde 50 % », 18/12/2026, 9 300 €, « À venir ». Total 18 600 € ; « Couvre le CA initial (18 600 €) » en vert. Bouton « Valider l'échéancier ».
5. **Brouillon d'acompte et son fil.** Aperçu facture BROUILLON, 9 300 € HT, 11 160 € TTC, BC rappelé. Fil à droite : Préparée (02/11), Vérifiée par Claire (en attente), Émise par Fabrice, Déposée. Boutons « C'est bon », « À corriger ».
6. **Finance › À faire, vue Steve.** Compteurs : À préparer 1, Chez le CP 2, À émettre 1, À envoyer 1, À encaisser 4 (dont 1 en retard). Filtre « Chez moi » activé. Colonnes : Chantier, Client, Jalon, Montant HT, Statut, Responsable, Depuis, Action. Ligne : VARENNE_EnqSig, Acompte, 9 300 €, « À envoyer », Steve, 1 j, bouton « Saisir la date de dépôt ».
7. **Même liste, vue Fabrice.** Filtre « Chez moi » : 1 ligne « À émettre ». Panneau latéral : brouillon, vérification de Claire (03/11, « C'est bon »), contrôle « Aucun doublon ». Bouton « Émettre » ; numéro définitif affiché ensuite (format à arrêter).
8. **Mail de fin de mission.** Objet « VARENNE_EnqSig : on prépare le solde ? ». Corps : « Fin prévue le 18/12/2026. 23 jours consommés sur 25 prévus. » Trois boutons : « Oui, préparer le solde », « Pas encore », « Un complément est à prévoir ». Copie Steve.
9. **Suites du mail.** a) « Pas encore » : jalon Solde ouvert, champ date décalée au 15/01/2027, note « Restitution reportée ». b) Complément : nouveau jalon « Complément vague 2 », 2 400 € HT, statut « À venir, accord client attendu ».
10. **Clôture de novembre.** Trois vérifications cochées. Carte : « Facturé en novembre : 9 300 €. Produit à date : 6 200 €. Facturé d'avance : 3 100 €. » Boutons « Clore novembre », « Export comptable ».

## 6. Ce qui est supprimé ou simplifié

- La Revue mensuelle et sa tournée : remplacées par une liste continue.
- Quatre onglets ramenés à une liste et un registre.
- Le statut de jalon coché à la main : « facturé » vient seulement de la facture.
- L'échéancier en double sur la fiche client ; les quatre alertes d'adresse ramenées au statut « à préparer ».
- Quatre états de clôture ramenés à deux.
- Les montants montrés au simple contributeur.
- La bascule « à facturer » liée à l'ouverture d'une page.

## 7. La faisabilité

| Brique | État | Taille | Fichiers |
|---|---|---|---|
| Statut unique calculé (7 valeurs) | À adapter | M | `src/lib/billing-helpers.ts` (`derivedBillingStatus`, déjà 4 statuts dérivés), `ScheduleStatusPill.tsx` ; migration : date de vérification CP, date de dépôt sur `invoices` |
| Retrait du statut coché à la main | À adapter | S | `BillingScheduleEditor.tsx` |
| Liste « À faire » | À créer sur l'existant | M | `src/pages/Facturation.tsx`, requêtes de `BillingItemsQueue.tsx` et `OverdueInvoicesView.tsx` |
| Calcul quotidien des jalons échus | À adapter | S | `mark_due_billing_schedules` appelé par une tâche planifiée |
| Dépôt et stockage du devis | À créer | L | `src/lib/org-storage.functions.ts`, nouvelle table |
| Lecture du devis, préremplissage avec sources | À créer | M | `expense-capture.functions.ts`, `MissionBillingInfoCard.tsx` |
| Détection d'entité tous clients, compteur, SIREN | À adapter | M | `billing-entity-name.ts`, `MissionBillingInfoCard.tsx`, `ClientBillingEntities.tsx` |
| Brouillon automatique et vérification CP | À adapter | M | `createDraftInvoiceForMission` |
| Mail à trois boutons, regroupement quotidien | À adapter | M | `src/lib/email-layout.ts` |
| Rôle ADV séparé de l'émission | À adapter | S | `feature-flags-store.ts`, `permissions-overrides.ts` (matrice) |
| Onglet masqué au contributeur | À adapter | S | `MissionDetail.tsx` (`canViewBillingTab`) |
| Clôture simplifiée, valorisation fusionnée | À adapter | M | `CutOff.tsx`, `cutoff-checks.ts`, `ValorisationProduction.tsx` |
| Fiche client : journal des échanges | À créer | M | `ClientDetail.tsx` |
| Menu bureau et mobile | À adapter | S | `AppSidebar.tsx`, `MobilePlusSheet.tsx` |

En 2027, ces statuts se branchent sur ceux de la plateforme agréée (déposée, rejetée, refusée, encaissée) ; une facture rejetée revient « à préparer ».

## 8. Risques et questions ouvertes pour PG

1. Steve perd la tournée mensuelle avec chaque CP : la garde-t-on comme simple rendez-vous, avec la liste filtrée par CP ?
2. Qui enregistre l'encaissement : Steve ou Fabrice ?
3. Le complément : facture séparée ou intégrée au solde ?
4. Masquer toute la facturation au contributeur vous convient-il ?
5. Le produit est aujourd'hui calculé de quatre façons : on retient celle de la clôture.
6. Numérotation PSE, outil comptable, plateforme (Dext ?) à confirmer avec Fabrice.
7. Prénom : Steve ou Stive, à vérifier avant les maquettes.
8. Les deux réglages (« Facturation dans l'ERP », « Contrôle de gestion avancé ») à activer chez PSE.
