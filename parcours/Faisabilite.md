# Parcours facturation PSE (v3) : ce qui est réalisable dans Alphonse

Vérification faite en lecture seule sur le code d'Alphonse V2 (projet Lovable « SENS ERP »), le 4 novembre 2026. Rien n'a été lancé ni modifié dans Lovable.

Légende : **Existe** (déjà dans le code), **À adapter** (petite évolution d'un écran existant), **À créer** (nouveau). Taille : S, M, L.

| # | Séquence de la vidéo | État | Taille | Où dans le code |
|---|---|---|---|---|
| 1 | Onglet Facturation de la fiche chantier, aujourd'hui | Existe | | `src/pages/MissionDetail.tsx`, `BillingScheduleEditor.tsx`, `MissionBillingInfoCard.tsx` |
| 2 | Dépôt du devis, documents gardés dans la fiche | À créer | L | Aucun stockage de documents sur un chantier : bucket et table à créer (`src/lib/org-storage.functions.ts`) |
| 3 | Échéancier proposé d'après le devis, rapproché du CA initial | À adapter | S | `BillingScheduleEditor.tsx` (le message d'écart avec le CA existe déjà) ; CA initial `missions.revenueTotal` |
| 4 | Informations préremplies avec leur source, complétées sur place | À créer | M | Lecture d'un PDF sur la base de l'appel IA des notes de frais (`expense-capture.functions.ts`) ; formulaire existant `MissionBillingInfoCard.tsx` |
| 5 | Facture d'acompte en brouillon, vérifiée par le chef de projet (le fil sur le côté) | À adapter et à créer | M | Le brouillon existe (`createDraftInvoiceForMission`, numéro « BROUILLON-… ») mais l'assistant l'émet aussitôt ; à créer : la création automatique à l'échéance du jalon, l'étape « Vérification du chef de projet », l'affichage dans la fiche chantier |
| 6 | La finance émet, puis marque la facture déposée sur le portail | Existe pour l'émission ; à créer pour le dépôt | S | Émission et numéro définitif : `assign_invoice_number`, statut « Envoyée » ; mode d'envoi « Portail (dépôt en ligne) » sur l'entité ; pas encore de date de dépôt |
| 7 | Clôture de novembre : checklist, période figée, export | Existe | | `src/pages/CutOff.tsx` : checklist, « Figer la période », tuiles FAE et PCA, « Export FEC » (réglage « Contrôle de gestion avancé » à activer) |
| 8 | Mail de fin de mission avec trois réponses | À créer, gabarit à adapter | M | `src/lib/email-layout.ts` n'accepte qu'un bouton : à étendre ; liens vers une page précise du chantier déjà utilisés ; envoi des mails à activer |
| 9 | « Pas encore » ouvre le jalon, Claire décale la date | Existe, lien à créer | S | Édition de la date d'un jalon dans l'échéancier ; paramètre `?tab=facturation` existant |
| 10 | Suivi de Steve dans la Revue mensuelle | Existe | | `AdvMissionsView.tsx` : tuile « Adresses à compléter », facette « Infos de facturation », « Prochain jalon » |
| 11 | Rentabilité : le mois échu compte pour son réalisé | À adapter | S, M avec les tests | `src/lib/retained-value.ts` et tests `ventilation-*`, `cutoff-*` |

## Les pages finance, en clair

- **Facturation › Revue mensuelle.** La tournée du mois, chantier par chantier : ce qui est à facturer, à voir, déjà facturé. C'est l'écran de travail de Steve.
- **Facturation › À préparer.** La file des factures à émettre, créée pendant la tournée.
- **Facturation › Impayés.** Les factures émises et non réglées, avec les relances notées.
- **Facturation › Facturier.** Le registre de toutes les factures, avec l'export au format du facturier PLS.
- **Clôture mensuelle.** Une fois par mois, la finance vérifie une checklist puis fige le mois : les temps passent en lecture seule et plus aucune facture ne peut être datée dans ce mois. Avec le volet comptable, la page montre aussi :
  - **FAE :** le travail fait mais pas encore facturé ;
  - **PCA :** ce qui a été facturé d'avance ;
  - **Export FEC :** le fichier pour le comptable.
- **Valorisation production.** La lecture des valeurs figées à chaque clôture. Rien n'y est modifié.

## Doublons de clients, d'entités et de fournisseurs

- **Entités de facturation.**
  - La recherche est limitée aux entités du client du chantier.
  - Une alerte « « X » existe déjà pour ce client » s'affiche, et une contrainte d'unicité sur le nom bloque le doublon.
  - Quand Alphonse lit un devis, il doit d'abord chercher l'entité existante, et n'en proposer une nouvelle qu'à défaut.
- **SIREN.** Il n'y a pas de champ SIREN, ni sur les clients ni sur les entités. À ajouter : il fiabilise la recherche de doublons et il est obligatoire sur la facture électronique.
- **Clients.** Une recherche de clients similaires et une fusion de clients existent déjà.
- **Fournisseurs et sous-traitants.** Il n'existe aucun référentiel : on ne peut donc pas retrouver un fournisseur déjà créé. C'est hors du périmètre de ce parcours.

## Facture électronique

Sources non officielles recoupées, à confirmer sur impots.gouv.fr.

- **Calendrier.** La réception est obligatoire depuis le 1er septembre 2026. L'émission sera obligatoire pour Plein Sens Ethique au 1er septembre 2027.
- **Plateforme agréée.** Toute facture entre entreprises passera par une plateforme agréée. Alphonse peut générer la facture et la lui transmettre par API.
- **Format.** Il faut un format structuré (Factur-X).
- **SIREN du client.** Il devient obligatoire sur la facture.
- **Choix de la plateforme.** À faire avec Fabrice et le comptable. Dext se présente comme plateforme agréée.

Schéma : tableau Miro « Facturation PSE · parcours et chantiers », repris en ouverture de la vidéo.
