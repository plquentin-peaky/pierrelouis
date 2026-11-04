# La facturation de Plein Sens Ethique dans Alphonse

Proposition d'AI Origin pour Pierre-Guillaume Ferré et Fabrice Ducellier, point du 12 novembre 2026. Les chantiers, montants et numéros cités sont fictifs.

## 1. Ce qu'on propose, en 5 lignes

- Chaque facture suit une vie simple, et à chaque étape une seule personne est responsable.
- La cheffe de projet dépose le devis dans la fiche du chantier. Alphonse prépare les informations de facturation, l'acompte et le solde.
- La cheffe de projet vérifie, la finance émet, et Steve envoie, suit le paiement et relance.
- Personne ne coche « facturé » : le statut se déduit de ce qui s'est réellement passé.
- Chaque mois, Fabrice clôt le mois en un clic, une fois les trois vérifications au vert. Les chiffres sont alors figés, et le comptable reçoit trois fichiers.

## 2. Les principes

1. **Une facture, un responsable.** À tout moment, on sait qui doit agir et sur quoi.
2. **Alphonse propose, deux personnes valident.** Rien n'est émis sans la vérification du chef de projet, puis celle de la finance.
3. **Peu de messages.** Au plus un récapitulatif par jour, seulement s'il y a quelque chose à faire, et un mail de fin de mission par chantier.
4. **Des chiffres calculés, jamais devinés.** Les montants comptables sont calculés, puis figés à la clôture.
5. **Rien de nouveau à apprendre pour les consultants.** Les échanges avec les clients restent dans la messagerie. Ces changements ne concernent que Plein Sens Ethique : Plein Sens ne change pas.

## 3. La vie d'une facture

| Statut | Responsable | On y entre quand | On en sort par |
|---|---|---|---|
| **À venir** | Personne | L'échéancier est validé | La date prévue arrive (contrôle automatique chaque nuit) |
| **À préparer** | Steve | La date est arrivée, mais une mention obligatoire manque (le bon de commande, par exemple) | La mention est complétée |
| **Chez le chef de projet** | Claire, la cheffe de projet | La facture en brouillon est complète | « C'est bon », ou « À corriger » avec un motif |
| **À émettre** | Fabrice | Claire a vérifié | « Émettre » : la facture reçoit son numéro définitif et la date du jour |
| **À envoyer** | Steve | La facture est émise | Steve note la date de dépôt sur le portail du client ou d'envoi par mail |
| **À encaisser** | Steve | La facture est envoyée ; un badge « En retard » s'affiche après l'échéance | Le paiement est enregistré |
| **Réglée** | Personne | Le paiement est complet | |
| **Contestée** | Steve | Le client refuse la facture ; Steve choisit un motif dans une liste, et les relances s'arrêtent | Retour à « À encaisser », ou avoir |
| **Annulée** | Fabrice | Un avoir (facture d'annulation) est créé | L'échéance revient à « À préparer » |

**Cas particuliers**

- **Avoir.** Fabrice le crée ; la facture apparaît barrée dans la fiche.
- **Facture contestée.** Relances arrêtées ; Alphonse garde le motif et la date.
- **Mois déjà clos.** Une facture porte toujours la date de son émission, sans antidater : un acompte prévu le 30 octobre mais vérifié le 3 novembre est une facture de novembre. Un paiement garde sa date réelle ; si son mois est clos, il reçoit en plus une date comptable, le 1er du mois ouvert.
- **Complément.** Il fait toujours l'objet d'une facture séparée. Claire joint l'accord du client ; le montant du chantier est alors augmenté, et la modification est tracée.
- **Bon de commande reçu tard.** La facture reste « À préparer » chez Steve.
- **Chantier sans devis.** Claire clique « Remplir à la main ». Le 50/50 s'applique au montant saisi à la création.
- **Informations manquantes une semaine après la création du chantier.** Steve est alerté dans sa liste et dans son récapitulatif de la semaine.

## 4. La section Finance, aujourd'hui et demain

| Aujourd'hui | Demain | Pourquoi |
|---|---|---|
| Facturation › Revue mensuelle | **Par chantier** : montant, travail réalisé, facturé, écart, prochaine échéance, groupé par chef de projet | Plus de tournée des chefs de projet : chaque facture a son statut. La vue sert au point mensuel de Steve avec chaque chef de projet |
| Facturation › À préparer | Intégrée à **À faire** | Elle devient trois statuts : à préparer, chez le chef de projet, à émettre |
| Facturation › Impayés | Intégrée à **À faire** | Elle devient les statuts « À encaisser » et « Contestée ». L'export Excel est gardé |
| Facturation › Facturier | **Registre** | Même contenu, avec le format du facturier Excel de Steve |
| Clôture mensuelle › Checklist | **Clôture du mois › Vérifications**, en trois lignes | Temps saisis, factures dues émises, brouillons traités |
| Clôture › Ajustements FAE/PCA | **Travail réalisé et facturé** : réalisé non facturé (FAE, factures à établir) et facturé d'avance (PCA, produits constatés d'avance) | Figés à la clôture, chantiers terminés compris, au lieu d'être recalculés à chaque affichage |
| Clôture › Export FEC | Dans les **trois fichiers pour le comptable** | Ce sont les écritures de ventes et d'inventaire (FAE, PCA) au format FEC (fichier des écritures comptables), tirées des valeurs figées |
| Clôture › boutons « Passer en » (en cours, validée, clôturée) | Supprimés | Un mois est ouvert ou clos, rien d'autre |
| Valorisation production | **Clôture du mois › Mois clos** | Même public ; une entrée de menu en moins |
| Fiche client › Facturation | Entités (avec le nombre de chantiers) et factures | L'échéancier y figurait en double |

```
Finance
├ Facturation
│  ├ À faire (n)        chaque facture, son statut, son responsable ; filtre « Chez moi »
│  ├ Par chantier       groupé par chef de projet
│  └ Registre           toutes les factures, export au format du facturier
└ Clôture du mois
   ├ Vérifications
   ├ Travail réalisé et facturé   + trois fichiers pour le comptable
   └ Mois clos
Fiche chantier › Facturation : Documents · Informations de facturation · Échéancier · Factures et avoirs
```

## 5. Ce que voit chacun

| Personne | Fiche chantier › Facturation | Facturation | Clôture du mois | Messages |
|---|---|---|---|---|
| Consultant du chantier | Onglet masqué ; les factures lui restent inaccessibles, quel que soit le chemin | Non | Non | Aucun |
| Claire, cheffe de projet | Tout : elle dépose, valide et vérifie | Par chantier, pour ses chantiers | Non | Récapitulatif du jour si une facture l'attend ; mail de fin de mission |
| Associé de référence | Lecture, pour ses chantiers | Lecture, pour ses chantiers | Non | Aucun |
| Steve, facturation et relances (ADV, administration des ventes) | Informations, envoi, paiement | À faire (sans Émettre ni Avoir), Par chantier, Registre | Non | Récapitulatif de la semaine (informations manquantes) ; copie des mails de fin de mission |
| Fabrice, finance | Tout | Tout ; il émet | Il clôt | Récapitulatif du jour |
| Comptable | Pas de compte | Pas de compte | Pas de compte | Chaque mois, Fabrice lui envoie les trois fichiers |

La Clôture du mois n'apparaît pas dans le menu de Claire ni dans celui de Steve : seul Fabrice y a accès.

Dans l'onglet Informations, le consultant lit : **« La facturation de ce chantier est suivie par Claire Morel (cheffe de projet) et Steve (facturation et relances). »**

## 6. Où l'IA aide, et comment ça marche sans elle

| Étape | Ce que fait l'IA | Sans IA |
|---|---|---|
| Dépôt du devis, du bon de commande, d'un mail | Lit les documents, préremplit le formulaire existant et indique la source de chaque champ (« devis p. 3 », « signature du mail ») | « Remplir à la main » ; la source affichée est « saisi par Claire » |
| Entité facturée | Reconnaît les variantes d'écriture (« Varenne Services S.A.S. ») | Recherche sur le nom et le SIREN (numéro d'entreprise) |
| Échéancier | Signale un écart entre le devis et le montant du chantier | Règle 50/50 et contrôle « couvre le montant », qui existe déjà |
| Facture en brouillon | Prépare le mail d'accompagnement et rappelle les consignes de dépôt (« portail, bon de commande obligatoire ») | Modèle fixe |
| Vérification et émission | Signale un écart avec le devis ou un doublon possible | Relecture |
| Fin de mission | Comprend une réponse en une phrase (« pas encore, restitution le 8 janvier ») et propose la nouvelle date, que Claire confirme | Trois boutons et un champ date |
| Relance | Rédige le rappel, que Steve envoie depuis sa messagerie | Modèle fixe |
| Clôture | Aucune : les jours saisis et le travail réalisé sont des calculs | Identique |

## 7. Facture électronique 2027

Pour une PME comme Plein Sens Ethique, l'émission de factures électroniques devient obligatoire le 1er septembre 2027 ; la réception l'est déjà depuis le 1er septembre 2026. Calendrier à confirmer avec votre expert-comptable selon la taille de l'entreprise. La cible prépare cinq points :

1. **SIREN.** Il est ajouté sur le client et sur l'entité facturée. Il devient obligatoire sur la facture, et il fiabilise la recherche de doublons.
2. **Type d'échéance.** Acompte, solde ou complément : il donne les codes normés de la facture (386 pour une facture d'acompte, 380 pour une facture de solde ou de complément). La facture de solde cite l'acompte déduit.
3. **Numérotation.** Une séquence continue par année, commune à toutes les factures de Plein Sens Ethique.
4. **Statuts.** Ceux de la plateforme agréée (le prestataire agréé par l'État qui transmet les factures) se branchent sur les nôtres. Une facture déposée passe « À encaisser » ; rejetée, elle revient « À préparer » ; refusée, elle passe « Contestée » ; encaissée, elle est « Réglée ». Le paiement est alors transmis à l'administration par la plateforme : c'est l'e-reporting.
5. **Transmission.** Alphonse envoie la facture à la plateforme, par connexion directe (API) si elle le permet, sinon par fichier. La plateforme reste à choisir avec Fabrice ; si vous utilisez déjà un outil (Dext, par exemple), nous vérifierons qu'il est immatriculé comme plateforme agréée.

Les mentions légales de Plein Sens Ethique (forme juridique, capital, RCS, IBAN, logo) seront reprises de vos factures actuelles.

## 8. Planning et effort

Petit : 1 à 2 jours ; moyen : 3 à 5 ; gros : 8 à 10, sauf mention contraire dans l'annexe. Tests compris ; recette et branchement de la plateforme agréée non compris.

| Lot | Ce qu'il apporte | Effort |
|---|---|---|
| **1. Première facture d'acompte de bout en bout** | Réglage propre à Plein Sens Ethique ; statuts calculés ; dépôt et lecture du devis et des mails ; entité retrouvée et SIREN ; échéancier typé ; vérification par la cheffe de projet ; émission réservée aux personnes désignées ; liste « À faire » ; droits des consultants et associés ; contrôle de chaque nuit ; envoi des mails propre à Plein Sens Ethique et récapitulatifs | 46 à 69 j, environ 57 |
| **2. Suivi et fin de mission** | Mail de fin de mission avec trois choix et réponse en une phrase ; Par chantier ; contestation ; complément ; textes préparés par l'IA ; date comptable des paiements | 12 à 21 j, environ 16 |
| **3. Clôture et comptable** | Mois figé, chantiers terminés compris ; trois fichiers pour le comptable ; reprise de la numérotation | 10 à 14 j, environ 12 |
| **Total** | | **68 à 104 j, environ 85** |

**Hypothèses**

- Un développeur qui connaît Alphonse.
- Le lot 1 pourrait être montré sur une vraie enquête environ trois mois après son lancement (six à sept semaines avec deux développeurs).
- Objectif : lots 2 et 3 et branchement de la plateforme agréée terminés avant l'été 2027, sous réserve de la date de démarrage et du choix de la plateforme.
- **Levier d'économie.** Si Steve et Fabrice peuvent tous deux émettre, l'émission réservée disparaît : 8 à 10 jours en moins.

## 9. Questions à trancher ensemble

1. **Qui émet ?** Nous proposons Fabrice, avec une délégation possible à Steve. Si vous préférez que Steve émette, comme aujourd'hui, le lot 1 est plus court.
2. **Le point mensuel.** Garde-t-on le point de Steve avec chaque chef de projet, appuyé sur « Par chantier » ? À voir avec Steve.
3. **Le complément.** Fait-il toujours l'objet d'une facture séparée, comme nous le proposons ?
4. **L'associé de référence.** Voit-il seulement ses chantiers, et en lecture seule ?
5. **Le comptable.** Les trois fichiers envoyés chaque mois par Fabrice lui suffisent-ils ? Un accès direct demanderait un compte dédié.
6. **La chaîne comptable.** Quels sont l'outil comptable, la plateforme agréée envisagée et le premier numéro de facture de Plein Sens Ethique ?
7. **Le prénom de Steve.** Nos notes du 8 octobre portent « Stive » ; nous avons retenu « Steve ». Pouvez-vous nous confirmer l'orthographe et son nom de famille ?
8. **Le schéma de facturation.** Le 50/50, avec l'acompte au lancement, est-il confirmé de votre côté ?

## Annexe : faisabilité dans le code

| Brique | État | Taille | Fichiers et remarques |
|---|---|---|---|
| Réglage « processus PSE », lu à l'écran, côté serveur et en SQL | À créer | Petit | `feature-flags-store.ts`, `app_settings` |
| Statuts calculés : vérification, dépôt, contestation, avoir | À adapter | Gros (6 à 8 j) | `billing-helpers.ts`, `ScheduleStatusPill.tsx`, colonnes sur `invoices`, `mark_overdue_invoices` neutralisé si contestée |
| Statut « facturé » manuel refusé | À adapter | Petit | Validateur dans `upsertBillingSchedule` et trigger |
| Type d'échéance | À adapter | Petit | `BillingScheduleEditor.tsx` |
| Émetteurs nominatifs | À créer | Gros | Liste dans le réglage PSE, contrôlée dans `setInvoiceStatus`, `createCreditNote`, `generateInvoiceFromSchedule` et la clôture, plus un trigger ; Steve et Fabrice partagent le rôle `finance` |
| Contrôle de chaque nuit | À créer | Moyen | Planificateur à créer (pg_cron ou route interne signée) pour `mark_due_billing_schedules` et `createDraftInvoiceForMission` |
| Dépôt des documents | À créer | Gros | Conteneur par chantier et règles d'accès ; `org-storage.functions.ts` |
| Lecture du devis et des mails | À créer | Moyen | `expense-capture.functions.ts` étendu au PDF et au mail |
| Entité retrouvée, SIREN | À adapter | Moyen | `billing-entity-name.ts`, `ClientBillingEntities.tsx` ; écriture du SIREN et du contact sur l'entité par une fonction serveur : le chef de projet n'a pas le droit de modifier une entité (`clients.edit`) |
| Vérification par le chef de projet, factures et avoirs dans la fiche | À adapter | Moyen | Fonction serveur à privilèges ; date d'émission au jour dans `setInvoiceStatus` ; `MissionDetail.tsx` |
| Liste À faire | À adapter | Moyen | `Facturation.tsx`, `BillingItemsQueue.tsx`, `OverdueInvoicesView.tsx` |
| Droits consultant, associé, menus | À adapter | Moyen | Règles `invoices_read_scoped` et `is_mission_owner` conditionnées au réglage PSE ; `AppSidebar.tsx`, `MobilePlusSheet.tsx` |
| Envoi des mails propre à PSE, récapitulatifs | À adapter | Moyen | Interrupteur par organisation (`EMAIL_SENDING_ENABLED` est global) ; `email-layout.ts` |
| Mail de fin de mission : trois liens, réponse en une phrase | À adapter | Moyen | Page de réponse dans Alphonse ; trace dans `schedule_notes` |
| Par chantier | À adapter | Moyen | Variante PSE de `AdvMissionsView.tsx` ; réalisé = jours saisis ÷ jours prévus × montant du chantier, lu dans les colonnes `jours_realises_cumules`, `budget_jours_total` et `budget_montant` de `production_snapshots` ; même formule à la clôture |
| Contestation, complément tracé, date comptable d'un paiement | À adapter | 3 petits | `recordPayment`, `assertCutoffOpen` |
| Textes IA (accompagnement, rappel, doublon) | À créer | Moyen | Même appel IA |
| Clôture figée, terminés compris, écritures FEC sur le figé | À adapter | Gros | `CutOff.tsx`, `valorisation-production.ts`, tests `cutoff-*` |
| Trois fichiers pour le comptable, premier numéro | À créer | 2 petits | Zip ; `set_invoice_counter` |
