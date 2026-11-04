# Parcours facturation PSE : ce qui est réalisable dans Alphonse

Vérification faite en lecture seule sur le code d'Alphonse V2 (projet Lovable « SENS ERP »), le 4 novembre 2026. Rien n'a été lancé ni modifié dans Lovable.

Légende : **Existe** (déjà dans le code), **À adapter** (petite évolution d'un écran existant), **À créer** (nouveau). Taille : S, M, L.

| # | Séquence de la vidéo | État | Taille | Où dans le code |
|---|---|---|---|---|
| 1 | Onglet Facturation de la fiche chantier, aujourd'hui | Existe | | `src/pages/MissionDetail.tsx`, `BillingScheduleEditor.tsx`, `MissionBillingInfoCard.tsx` |
| 2 | Dépôt du devis, documents gardés dans la fiche | À créer | L | Aucun stockage de documents sur un chantier : bucket et table à créer, registre `src/lib/org-storage.functions.ts` |
| 3 | Échéancier proposé d'après le devis, rapproché du CA initial | À adapter | S | `BillingScheduleEditor.tsx` (le message d'écart avec le CA existe déjà) ; CA initial `missions.revenueTotal` |
| 4 | Informations préremplies, avec la source de chaque champ | À créer | M | Lecture d'un PDF à bâtir sur l'appel IA des notes de frais (`src/lib/expense-capture.functions.ts`) ; cible `MissionBillingInfoCard.tsx`, `billing_entities` |
| 5 | Claire complète dans le formulaire et enregistre | Existe | | Formulaire en ligne « Modifier », boutons « Annuler » et « Enregistrer » |
| 6 | Bon à facturer du chef de projet sur le jalon | À créer | M | Aujourd'hui seul le rôle finance change le statut d'un jalon (`cap:invoice.manage`) : action dédiée au chef de projet à ajouter |
| 7 | La finance émet depuis la Revue mensuelle | Existe, à activer | S | `AdvMissionsView.tsx`, `InvoiceWizard.tsx`, `generate_invoice_from_schedule`, `assign_invoice_number`, `src/lib/invoice-pdf.ts` ; réglage « Facturation dans l'ERP » à activer pour Plein Sens Ethique |
| 8 | Mail de fin de mission, Steve en copie | À créer | M | Gabarit existant `src/lib/email-layout.ts` ; envoi coupé par défaut (`EMAIL_SENDING_ENABLED`) ; logo absent pour Ethique |
| 9 | Claire décale elle-même la date du solde | Existe | | Édition de la date d'un jalon dans l'échéancier ; passage automatique à « À facturer » à échéance (`mark_due_billing_schedules`) |
| 10 | Suivi de Steve dans la Revue mensuelle | Existe | S | Tuile « Adresses à compléter », facette « Infos de facturation » (`missions-missing-billing.ts`), colonne « Prochain jalon » |
| 11 | Export FAE de fin de mois | Existe | | `src/lib/fae-export.ts`, export facturier PLS |
| 12 | Rentabilité : le mois échu compte pour son réalisé | À adapter | S, M avec les tests | `src/lib/retained-value.ts` et tests `ventilation-*`, `cutoff-*` |

## Points à trancher le 12 novembre

- **Pas de chat.** Alphonse préremplit le formulaire existant et cite la source de chaque champ.
- **Notes client supprimées.** Les échanges avec les clients restent dans les mails.
- **Validation en deux temps.** Le bon à facturer du chef de projet sert de validation, puis la finance émet avec l'assistant existant.
- **Report du solde.** Le chef de projet décale la date du jalon, sans justification demandée.
- **Steve et Fabrice ont aujourd'hui le même rôle « finance ».** Un rôle ADV distinct n'est pas nécessaire pour ce parcours.
- **Prérequis.** Logo et IBAN de Plein Sens Ethique.

## Facture électronique

Sources non officielles recoupées, à confirmer sur impots.gouv.fr.

- **Calendrier.** La réception est obligatoire depuis le 1er septembre 2026. L'émission sera obligatoire pour Plein Sens Ethique au 1er septembre 2027.
- **Plateforme agréée.** Toute facture entre entreprises passera par une plateforme agréée. Alphonse peut générer la facture et la transmettre à cette plateforme par API.
- **Format.** Le PDF actuel ne suffira plus : il faudra un format structuré (Factur-X).
- **Mentions nouvelles.** SIREN du client et catégorie d'opération : le SIREN n'est pas encore un champ de l'entité de facturation.
- **Choix de la plateforme.** À faire avec Fabrice et le comptable. Dext se présente comme plateforme agréée.

Schéma détaillé : tableau Miro « Facturation PSE · parcours et chantiers ».
