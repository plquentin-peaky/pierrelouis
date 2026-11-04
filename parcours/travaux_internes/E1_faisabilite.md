# E1 · Vérification de faisabilité de la cible D1

Code relu en lecture seule le 4/11 (SENS ERP, HEAD) : facturation, droits, clôture, mails, stockage, IA, migration 0041, types de la base. Aucune écriture.

## Six constats qui pèsent sur la cible

1. **Steve et Fabrice ont le même rôle `finance`.** `role_permissions` est indexée par (organisation, rôle) et l'enum `app_role` n'a que cinq valeurs. Aucun réglage de matrice ne sépare deux personnes du même rôle. `assertInvoiceManager` teste d'ailleurs le rôle en dur, pas la matrice.
2. **Il n'existe ni rôle « comptable » ni connexion hors Microsoft.** La page de connexion n'offre que le SSO Microsoft, avec contrôle du domaine et d'une fiche active (SSO-F5).
3. **L'interrupteur des mails est global.** `EMAIL_SENDING_ENABLED` est un secret du serveur, commun à Plein Sens et PSE. Tous les envois actuels partent d'un clic : il n'existe aucun planificateur.
4. **Les règles d'accès en base sont communes aux deux organisations.** `invoices_read_scoped` (0041) et `is_mission_owner` ne lisent aucun réglage d'organisation.
5. **Des données utiles existent déjà.** Le type de facture `acompte | solde | situation | regie`, les champs `advance_amount` et `advance_label` (acompte déduit sur le solde), les statuts `emise` puis `envoyee`, la table `schedule_notes` (trace de report), `production_snapshots` (production figée par mois), `set_invoice_counter`.
6. **Absents de la base :** SIREN (clients et entités), date de dépôt ou d'envoi, vérification par le CP, statut contesté, date comptable d'un paiement, documents rattachés à un chantier.

## Briques de la section 8

| Brique | Verdict | Commentaire |
|---|---|---|
| Réglage « processus PSE » | OK | Précédent exact : drapeau `sousTraitancePleinSens`. À lire aussi côté serveur et en SQL. |
| Statut calculé (avoir, contestée) | OK avec réserve, M → L | Annulée se déduit de `credit_note_of_invoice_id` (le cumul existe déjà). Il faut ajouter des colonnes : vérifiée par le CP (date, auteur), date de dépôt, contestation (date, motif), et défaire le lien `billing_schedules.invoice_id` après un avoir. `mark_overdue_invoices` et `recordDunning` écrivent `en_retard` : à neutraliser si la facture est contestée. Compter 6 à 8 j. |
| Statut manuel refusé côté serveur | OK avec réserve | Le CP écrit dans `billing_schedules` par la base (`billing_schedules_write_scoped`), sans passer par `upsertBillingSchedule`. Il faut un trigger en plus du validateur. Toujours S. |
| Type de jalon, lien solde vers acompte | OK | C'est en partie existant : `invoice_type` et `advance_amount` sont déjà sur la facture. Le type reste à ajouter sur le jalon. |
| À faire | OK avec réserve | Dépend des nouvelles colonnes de statut et de la brique Fabrice (Steve sans « Émettre »). |
| Par chantier | OK avec réserve, S → M | « Encaissé » et « Produit à fin octobre » n'existent pas dans la Revue (elle affiche « Facturable », jours × tarif). Le produit figé doit venir de `production_snapshots`, avec une seule règle de production. Une variante PSE de `AdvMissionsView` est partagée avec Plein Sens. |
| Fabrice seul à émettre | **NON FAISABLE en l'état** | Voir constat 1. Correction minimale : une liste nominative d'« émetteurs » dans le réglage PSE, contrôlée dans `setInvoiceStatus`, `createCreditNote`, `generateInvoiceFromSchedule`, l'outil MCP `generate-invoice` et le gel de la clôture, plus un trigger sur `invoices.status` et `accounting_cutoffs`. Taille L (8 j). Même mécanisme pour masquer Clôture à Steve. |
| Tâche quotidienne à privilèges | OK avec réserve | Aucun planificateur aujourd'hui. Il faut pg_cron ou une route interne signée, sur le modèle de `notify-client-created` (table `internal_webhook_secrets`). Garder M. |
| Dépôt du devis | OK | Le seul conteneur existant est privé par utilisateur. Un conteneur par chantier avec ses règles d'accès justifie le L. |
| Lecture du devis avec sources | OK avec réserve | L'appel IA existant n'envoie qu'une image. PDF multipage et page source : réalisables. « Aperçu surligné » exige une visionneuse avec coordonnées : remplacer par « devis p. 3 », ou passer en L. |
| Entité sur tous les clients, compteur, SIREN | OK avec réserve | Le compteur existe. La recherche sur tous les clients bute sur `readable_client_ids` pour un CP. |
| Fil de vérification, factures et avoirs dans la fiche | OK avec réserve | Le geste « C'est bon » du CP demande une fonction serveur à privilèges : le CP n'écrit pas dans `invoices`. À l'émission, `issue_date` doit passer à la date du jour, ce que `setInvoiceStatus` ne fait pas. |
| Mails : trois boutons, récapitulatifs, envoi activé | **NON FAISABLE en l'état** | Activer le secret global ouvre aussi les mails de Plein Sens (création de client, relances de temps). Il n'existe pas de planificateur pour les récapitulatifs et le mail du 18/12. Les trois boutons se font par trois liens (le gabarit n'en a qu'un). Correction : un interrupteur par organisation et le planificateur. Taille L. |
| Paiement à date réelle dans un mois clos | OK | Colonne de date comptable et assouplissement de `recordPayment`. |
| Clôture figée, terminés compris, FEC sur le figé | OK | Confirmé : FAE et PCA sont recalculés (`en_cours` seulement). `production_snapshots` fournit la base figée. Garder les quatre statuts pour Plein Sens. L crédible. |
| Droits contributeur, associé, menus | OK avec réserve, S → M | La correction de 0041 changerait aussi Plein Sens, sauf si la règle lit le réglage PSE. Fermer `route:/facturation` au rôle consultant dans la matrice PSE fermerait aussi « Par chantier » à Claire si elle a ce rôle : la visibilité doit dépendre du statut de CP. Pour l'associé, « lecture de ses chantiers » contredit `is_mission_owner`, qui le rend propriétaire, donc éditeur. Retirer `mission.editAll` et `mission.viewAll` agit sur tous les chantiers. |
| Lecture seule du comptable | **NON FAISABLE en l'état** | Voir constat 2. Correction minimale : pas de compte, mais un Pack comptable téléchargé par Fabrice ou envoyé par mail. Un accès en lecture demanderait un nouveau rôle, un compte Microsoft invité et une fiche : M au minimum. |

**Briques absentes du tableau :**
- liste des motifs de contestation et suspension des relances ;
- Pack comptable (zip de trois fichiers) ;
- complément, avec mise à jour tracée du CA ;
- textes IA (mail d'accompagnement, rappel, contrôle de doublon) ;
- reprise du compteur de factures (`set_invoice_counter`, pour le premier numéro).

Compter 5 à 7 j de plus.

## Scènes du storyboard

| # | Verdict | Commentaire |
|---|---|---|
| 1 | OK avec réserve | Onglets exacts. « Exports » est dans Administration, pas dans Finance. « Valorisation production » exige le contrôle de gestion avancé. |
| 2 | OK | « CA du chantier : X € » est un libellé existant. Attention : le montant affiché est le CA reprévu s'il existe, et non le CA initial. |
| 3 | OK avec réserve | Titre exact : « Informations de facturation ». SIREN nouveau. Aperçu surligné : voir réserve IA. |
| 4 | OK | Même client, donc sans obstacle d'accès. Le compteur s'appuie sur l'existant. |
| 5 | OK | « À venir » existe (`SCHEDULE_STATUS_META`). La colonne Type est nouvelle. |
| 6 | OK avec réserve | Pilotage reste visible. La règle 0041 doit suivre. |
| 7 | OK avec réserve | 11 160 € TTC juste. Dépend des fonctions à privilèges. |
| 8 | OK si Fabrice est corrigé | Les compteurs sont cohérents avec les scènes 9 et 10. |
| 9 | OK | `emise` puis `envoyee` portent déjà « À envoyer » et « À encaisser ». « En retard de 16 j » se calcule déjà (`daysLate`). |
| 10 | OK avec réserve | Les calculs sont justes : 18 600 − 1 860 = 7 440 ; 7 500 − 3 000 = 4 500 ; 16 800 − 12 000 = 4 800 ; 12 400 − 6 200 = 6 200. Mais BRENNE, qui était « À préparer » sans BC le 05/11, est facturé 7 500 au 20/11 : il faut le montrer ou le dire. L'encaissé est lisible par le CP seulement sur ses chantiers (`payments_read_scoped`). |
| 11 | OK avec réserve | Trace dans `schedule_notes`. L'envoi dépend de la brique mails. |
| 12 | OK avec réserve | 9 300 + 4 900 + 7 500 + 6 200 = 27 900, c'est cohérent, à condition qu'ORLAN (F2026-00006) ait été émise en octobre : il faut le dire. « Dont VARENNE 1 860 » est juste (produit fin novembre 7 440, soit 9 300 − 7 440), mais c'est le même nombre que le produit de fin octobre de la scène 10 : le spectateur confondra. Mieux vaut un autre exemple ou une légende. |
| 13 | OK | |

## Autres écarts de libellé et de chiffres

- La numérotation est annuelle (`invoice_number_counters`) : écrire « séquence continue par année ».
- « Réglée » (facture) et « Réglé » (jalon) coexisteront : c'est acceptable.
- Claire Morel, Thomas Renaud, Julien Hamon et Sophie Marchal sont des noms fictifs.

## Tailles et total

**Le total annoncé contredit la propre grille de D1.** La grille compte 7 S, 8 M et 2 L, soit 47 à 74 j (61 j en estimation centrale), et non 45 à 60 j (52 j).

**Avec les corrections ci-dessus**, le total monte à 70 à 85 j, environ 77 j en estimation centrale :
- Fabrice passe en L ;
- les mails passent en L ;
- les droits passent en M ;
- « Par chantier » passe en M ;
- le statut calculé passe en L ;
- s'ajoutent les briques absentes.

**Le lot 1 « environ 30 jours » n'est pas crédible.** Les seules briques qu'il cite font environ 32 j avec les tailles de D1. La vidéo exige aussi le réglage PSE, le statut calculé, la tâche quotidienne et l'émission par Fabrice. Il faut annoncer 45 à 50 j.
