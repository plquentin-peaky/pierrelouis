# A2 · Inventaire de la section Finance d'Alphonse V2, et « qui voit quoi »

Lecture seule du code du projet Lovable « SENS ERP » (d822e134-7069-4fbe-8433-0807f3a50d7a), branche HEAD, le 4 novembre 2026. Aucun message envoyé à Lovable, aucune requête en base.

Conventions :
- Les libellés de l'application sont cités entre guillemets. Quand un libellé contient un tiret long, il est transcrit ici par un tiret simple (-).
- Les droits décrits sont ceux du **code** (`ROUTE_ACL` et `CAPABILITIES` dans `src/stores/feature-flags-store.ts`). En production, la matrice `role_permissions` de l'organisation peut les surcharger rôle par rôle (`src/lib/permissions-overrides.ts` : une clé présente en base l'emporte, une clé absente retombe sur le code). Le contenu réel de cette matrice pour Plein Sens Ethique n'a pas été lu (requête en base interdite). Le kit `scripts/ethique-parametres/README.md` indique seulement que les droits de Plein Sens Ethique sont « déjà identiques » à ceux de Plein Sens.
- Trois réglages par organisation pèsent sur tout l'inventaire (table `app_settings.feature_flags`) :
  - module « facturation » (`MODULE_CATALOG`, **éteint par défaut**) : s'il est éteint, la route `/facturation` et les onglets Facturation des fiches chantier et client disparaissent ;
  - drapeau `facturationEmettrice`, nom fonctionnel « Facturation dans l'ERP » (éteint par défaut) ;
  - drapeau `cutoffComptable`, nom fonctionnel « Contrôle de gestion avancé » (éteint par défaut).
  La note Faisabilite indique que le contrôle de gestion avancé est à activer. L'état réel des deux drapeaux chez Plein Sens Ethique est donc à confirmer en base.

---

## 1. Barre latérale et section Finance

Source : `src/components/sens/AppSidebar.tsx`.

### 1.1 Sections et entrées, dans l'ordre

| Section | Entrée (libellé exact) | Icône (lucide) | Route | Rôles du tableau de la barre | Rôles `ROUTE_ACL` (ce qui compte une fois les droits chargés) |
|---|---|---|---|---|---|
| « Pilotage » | « Tableau de bord » | LayoutDashboard | `/` | tous | tous (core) |
| « Activité » | « Mes feuilles de temps » | Clock | `/feuille-de-temps` | tous | tous, et `canOpenTimesheetModule` |
| | « Chantiers » | Target | `/chantiers` | tous | tous |
| | « Occupation » | Gauge | `/occupation` | manager, associé, finance, admin | tous (la portée varie) |
| | « Clients » | Users | `/clients` | tous | finance et admin seulement (`canViewClientList`) |
| | « Notes de frais » (compteur « expenses_to_validate ») | Plane | `/frais` | tous | tous, si module frais allumé |
| « Finance » | « Facturation » (compteur « invoices_draft ») | Receipt | `/facturation` | manager, associé, finance, admin | **tous les rôles**, si module facturation allumé |
| | « Clôture mensuelle » (`LEXICON.navCloture`) | Scissors | `/cut-off` | manager, associé, finance, admin | **finance et admin** |
| | « Valorisation production » | BarChart3 | `/valorisation-production` | finance, admin | finance et admin, **et** `cutoffComptable` allumé |
| « Administration » | « Consultants » | UserCog | `/collaborateurs` | finance, admin | finance, admin |
| | « Suivi feuilles de temps » | ClipboardCheck | `/suivi-cra` | tous | tous, si portée `timesheet.track` non nulle |
| | « Exports » | Download | `/exports` | finance, admin | finance, admin |
| | « Paramètres » | Settings | `/parametres` | admin | admin |
| « Intégrations » | « Connecter MCP » | Plug | `/mcp-connect` | tous | tous, si module mcp allumé (éteint par défaut) |

Point important : la colonne « rôles du tableau de la barre » ne sert que pendant le chargement (et seul « Tableau de bord » est alors affiché). Une fois les droits chargés, la barre applique `isRouteVisible`, donc `ROUTE_ACL` et la matrice. Conséquence : **un consultant voit l'entrée « Facturation »** dès que le module est allumé (le commentaire de `ROUTE_ACL` le confirme : « Ouvert à tous les rôles … le périmètre est décidé par le rôle à l'intérieur de `AdvMissionsView` »). Inversement, un manager ou un associé **ne voient pas** « Clôture mensuelle ».

Le compteur de « Facturation » ne compte que les factures au statut brouillon, et seulement si « Facturation dans l'ERP » est allumée.

Le module « Marge & Rentabilité » (`/marge`) existe dans le catalogue mais n'a pas `phase1: true` : il est masqué partout.

Menu mobile (`src/components/sens/MobilePlusSheet.tsx`) : la section « Finance » n'y contient que « Facturation » et « Clôture mensuelle ». Pas de « Valorisation production » ni d'« Exports ». « Consultants » s'y appelle « Collaborateurs ».

### 1.2 « Facturation » (`/facturation`)

Fichiers : `src/pages/Facturation.tsx`, `src/components/sens/AdvMissionsView.tsx`, `BillingItemsQueue.tsx`, `OverdueInvoicesView.tsx`, `FacturierView.tsx`.

Titre de page : « Facturation ». Sous-titre :
- drapeau éteint : « Revue de l'avancement de la facturation par chantier. L'émission des factures est faite hors d'Alphonse. » ;
- drapeau allumé, finance ou admin : « N factures émises » ;
- drapeau allumé, autre rôle : « N factures - lecture seule (process ADV réservé à finance/admin) », avec un bandeau orange : « Vous accédez à la facturation en lecture seule. Génération, émission, encaissement et relances sont réservés au contrôle de gestion (rôles finance et admin). »

L'ouverture de la page appelle la fonction serveur `mark_due_billing_schedules`. C'est elle qui passe en « À facturer » les jalons dont la date est atteinte. **Cette bascule n'a lieu que si quelqu'un ouvre `/facturation`.**

**Drapeau « Facturation dans l'ERP » éteint** : pas d'onglets, seulement la revue (vue réduite, voir ci-dessous).

**Drapeau allumé** : quatre onglets.

#### Sous-onglet « Revue mensuelle » (tous les rôles qui ouvrent la page)
- **À quoi ça sert.** C'est la tournée du mois, chantier par chantier : CA, production valorisée à date, montant déjà facturé d'après l'échéancier, et l'écart. On y marque « Rien à facturer », ou on crée les éléments « À facturer ».
- **Qui l'utilise.** Steve, pour l'ADV : il a toutes les actions. Les chefs de projet y voient leurs chantiers en lecture, avec en plus le bouton « Rien à facturer ».
- **Périmètre.** Avec `cap:mission.viewAll` (associé, finance, admin dans le code), tous les chantiers non archivés et non internes. Un associé sans ce droit voit les chantiers dont il est associé de référence ou chef de projet. Les autres rôles voient seulement les chantiers dont ils sont chef de projet (`missions.manager_id`). Si ce périmètre est vide, la page affiche : « Vous n'êtes chef de projet d'aucun chantier en cours. ».
  - Attention : dans le code, l'associé a `mission.viewAll`. Il voit donc **tout**, sauf si la matrice le lui retire. La règle « Vos chantiers de référence » ne joue alors pas.
- **Barre du haut (drapeau allumé).** « Tournée du mois » (sélecteur des 12 derniers mois), « Tournée du mois : X / Y chantiers vus », bouton « Export FAE » (finance et admin, `cap:billing.fae.export`).
- **Tuiles.**
  - Drapeau éteint : « CA chantier », « Facturable ».
  - Drapeau allumé : en plus « Facturation », « Écart », « Adresses à compléter ».
  - Un total incomplet s'affiche « Indisponible », avec un bouton « Réessayer ».
- **Colonnes visibles par défaut.**
  - Drapeau éteint : « Chantier » (code et intitulé, triangle d'alerte si les informations de facturation sont incomplètes), « CA chantier », « Facturable », « Prochain jalon ».
  - Drapeau allumé : en plus « Facturation », « Écart », « Revue {mois} », et un bouton « Émettre une facture » (`cap:invoice.emit`).
- **Colonnes masquées par défaut.**
  - Toujours : « Intitulé », « Client », « Associé de référence », « Chef de projet », « Statut » (avec le badge « Terminé - reste à facturer »), « CA sous-traitant ».
  - Drapeau allumé : en plus « Infos de facturation », « Production à date », « Reste à facturer », et « Frais refacturables en attente » si le module frais est allumé.
- **Filtres.** « Statut » (« En cours (et terminés à solder) » / « Terminé »), « Chef de projet », « Associé de référence » (absent pour un associé limité à ses chantiers), « Client ». Drapeau allumé, en plus : « Revue du mois » (« À voir », « À facturer », « Rien à facturer », « Facture créée ») et « Infos de facturation » (« Complètes », « Incomplètes », « Bon de commande manquant »).
- **Regroupement et tri.** Les lignes sont regroupées par chef de projet, avec des sous-totaux « CA … · Facturable … · Facturation … · Écart … ». Tri par défaut : « Écart » décroissant (drapeau allumé) ou « Facturable » décroissant (drapeau éteint). Export CSV « etat_facturation ».
- **Actions de ligne.** Clic : pour finance et admin (`cap:billing.items.manage`), ouvre le dialogue des éléments à facturer ; pour les autres, ouvre la fiche chantier sur `?tab=facturation`. Dans la colonne Revue : « À facturer… » (finance et admin), et « Rien à facturer » avec une note facultative. Ce dernier bouton n'est protégé par **aucune capacité** dans le code : un chef de projet qui voit la revue peut l'utiliser.

#### Sous-onglet « À préparer (n) » (finance et admin)
Condition : `cap:billing.items.manage`, drapeau allumé.
- **À quoi ça sert.** C'est la file des « bons à facturer » décidés pendant la tournée, tous mois confondus, en attente d'être transformés en facture. Rien ne s'y perd tant que l'élément n'est pas traité.
- **Qui l'utilise.** Steve, puis la finance au moment d'émettre.
- **Colonnes.** « Mois de décision », « Chantier », « Client », « Libellé », « Montant HT » (badge « À arbitrer » si vide), « Frais », « Origine » (« Jalon », « Production », « Frais », « Libre »), « Infos manquantes », « Note » (masquée).
- **Filtres.** « Mois », « Origine ».
- **Boutons.** « Modifier », « Abandonner », « Émettre la facture » (ou « Saisir la ligne facturier » sans droit d'émission). Si l'adresse de facturation est incomplète, une fenêtre « Coordonnées de facturation incomplètes » s'ouvre avec « Compléter la fiche chantier » et « Continuer quand même ».
- **Liste vide.** « Aucun élément à préparer », « La tournée est à jour. ».

#### Sous-onglet « Impayés (n) » (finance et admin)
Condition : `cap:billing.overdue.view`, drapeau allumé.
- **À quoi ça sert.** Liste des factures émises et non soldées, regroupées par associé de référence et séparées en plus ou moins de 2 mois. On y voit les relances déjà faites.
- **Qui l'utilise.** Fabrice et Steve pour le recouvrement. Les associés s'en servent indirectement, au travers de l'export.
- **Tuiles.** « Encours total », « Dont > 2 mois », « Sans relance depuis 30 j ».
- **Filtres.** « Associé de référence », « Chef de projet », « Client », « Statut ».
- **Bouton.** « Export Excel », avec deux feuilles : « Plus de 2 mois » et « Moins de 2 mois ».
- **Sections et colonnes.** Deux sections, « Plus de 2 mois » et « Moins de 2 mois ». Colonnes : « Chantier », « N° facture », « Date », « Hono. HT », « TTC », « Restant dû », « Retard », « Dernière relance », « Actions » (relance et « Enregistrer un encaissement » si `cap:invoice.manage`, plus « Voir dans le Facturier »).

#### Sous-onglet « Facturier » (tous les rôles qui ouvrent la page)
- **À quoi ça sert.** C'est le registre de toutes les factures et de tous les avoirs, avec les 26 colonnes du fichier Excel PLS. C'est aussi l'export destiné au comptable.
- **Qui l'utilise.** Finance et ADV pour gérer les factures, le comptable par l'export. Les autres rôles le consultent en lecture, et la base filtre ce qu'ils voient (voir § 2.3).
- **Colonnes.** Celles du fichier PLS, dans l'ordre, avec les intitulés du fichier (« Client », « Entité », « nom personne », « n°, rue », « Cpl adresse », « codeP ville », « Alphonse », « Commande n° », « nom chantier », « hono sans frais HT », « exo tva », « Frais », « date facture », « n° facture », « ttc », « Payé », « Date de paiement », « Date règlement prévu », « Contact services financiers », « Relance », « Associé de référence », « RM », « exercice », « Catégorie », « COMPTA », « COMMENTAIRES »). Puis des colonnes masquées : « N° fournisseur », « Réf. obligatoire », « Délai de paiement », « Mode d'envoi », « Tél. compta », « Observations », « Modèle ».
- **Filtres.** « Catégorie », « Paiement », « TVA », « Comptabilité », « Exercice ».
- **Boutons.** « Export format facturier PLS » (brouillons exclus), « Autres exports » (« Export CSV (Excel FR) », « Export XLSX »).
- **Actions de ligne.**
  - Crayon « Éditer », qui ouvre « Éditer la ligne Facturier » (« Libellé facturé », « Exonération de TVA », « Catégorie comptable », « Contact services financiers », « Associé de référence », « Date de règlement prévue », « Note de relance », « Transmis à la comptabilité »). Ce crayon est affiché **sans contrôle de droit**.
  - Menu de ligne : « Aperçu », « Télécharger le PDF », « Émettre », « Enregistrer un encaissement », « Créer un avoir », « Consigner une relance », « Changer le statut ». Toutes ces actions sauf « Aperçu » demandent `invoice.manage` ou `invoice.emit`.
- **Aperçu d'une facture.** Panneau latéral : émetteur, client, entité, lignes, totaux, avoirs liés, « Exonéré de TVA », éditeur « Données de facturation (brouillon) », boutons « PDF », « Créer un avoir », « Ajouter des frais », « Émettre ».

### 1.3 « Clôture mensuelle » (`/cut-off`)

Fichiers : `src/pages/CutOff.tsx`, `src/lib/cutoff-checks.ts`. Visible par finance et admin.

- **Titre et sous-titre.** Titre « Clôture mensuelle ». Sous-titre « Gel des feuilles de temps du mois » (drapeau éteint) ou « Clôture comptable, FAE/PCA, export FEC » (drapeau allumé). Le badge de statut de la période est en haut à droite.
- **Barre de mois et boutons.**
  - Flèches de mois, puis « Figer la période » (`cap:cutoff.freeze`, finance et admin), qui ouvre une confirmation « Figer {mois} ? » listant le nombre de consultants dont la saisie est incomplète. Si le mois n'est pas terminé, une seconde confirmation s'ouvre : « Mois non terminé », bouton « Verrouiller quand même ».
  - « Rouvrir » (`cap:cutoff.reopen`).
  - Drapeau allumé, en plus : « Export FEC » et « Passer en « … » », qui fait avancer la période d'un statut : ouverte, en cours, validée, clôturée.
- **Bandeau quand la période est figée.** « Période figée · {mois} ».
- **Tuiles.**
  - Drapeau éteint : le seul texte « Le volet comptable (FAE, PCA, CA reconnu) n'est pas activé. ».
  - Drapeau allumé : « Facturé du mois », « FAE (à établir) », « PCA (à neutraliser) », « CA reconnu ».

Les sous-onglets :

#### « Checklist »
- **À quoi ça sert.** Vérifier, avant de figer le mois, que les temps sont saisis. Si les modules sont allumés, vérifier aussi que les notes de frais sont traitées, que les échéances sont facturées et que les brouillons sont émis.
- **Qui l'utilise.** Fabrice (finance), une fois par mois.
- **Lignes.**
  - « Feuilles de temps du mois complétées » est toujours présente.
  - « Notes de frais traitées » si le module frais est allumé.
  - « Échéances du mois facturées » et « Factures brouillons émises » si le module facturation **et** la facturation dans l'ERP sont allumés.

#### « Ajustements FAE/PCA » (drapeau `cutoffComptable` allumé)
- **À quoi ça sert.** Calculer, chantier par chantier, ce qui a été produit sans être facturé (FAE) et ce qui a été facturé d'avance (PCA). Ces montants alimentent l'export FEC.
- **Qui l'utilise.** La finance, et le comptable au travers de l'export FEC.
- **Colonnes.** « Chantier », « % réalisé », « Production cumulée », « Facturé cumulé », « Facturé du mois », « FAE / PCA ».

### 1.4 « Valorisation production » (`/valorisation-production`)

Fichiers : `src/pages/ValorisationProduction.tsx`, `src/lib/valorisation-production.ts`.

Accès : finance et admin, drapeau `cutoffComptable` allumé, et `RequireCapability cdg.revenueRecognition.view`.

- **En-tête.** Surtitre « Contrôle de gestion », titre « Valorisation de la production », sous-titre « Lecture des valeurs figées lors des arrêtés mensuels, sans recalcul côté écran. ». À droite, le sélecteur « Mois arrêté » (mois validés ou clôturés seulement) et un badge « Arrêté validé » ou « Arrêté clôturé ».
- **Tuiles.** « Jours réalisés cumulés », « RAF », « CA reconnu cumulé », « CA du mois ».
- **Filtres.** Recherche, case « Afficher les chantiers sans production sur le mois ».
- **Colonnes.** « Code chantier », « Organisme », « Chef de projet », « Jours réalisés cumulés », « RAF », « Jours totaux », « Taux d'avancement », « CA Plein Sens », « CA reconnu cumulé », « CA du mois », « Motif ». Une valeur absente s'affiche « non évaluable ».
- **À quoi ça sert.** Relire les valeurs figées à chaque arrêté (table `revenue_recognition`). Rien n'y est modifiable.
- **Qui l'utilise.** La finance et le comptable.

### 1.5 Administration › « Exports » (`/exports`), partie finance

Fichier : `src/pages/Exports.tsx`. Finance et admin. Surtitre « Administration », titre « Exports ».

**Toujours visibles :**
- section « Contrôle de gestion » : « Export alphonse » (cases « Vendu », « Formation », « Interne »), « Taux de staffing », « Staffing » (année), « Staffing collaborateur × chantier × mois » (période), « Rentabilité des missions » (année ; colonne « dont Plein Sens » si le drapeau `sousTraitancePleinSens` est allumé) ;
- grille : « Rapprochement production / facturation ».

**Visibles seulement si `cutoffComptable` est allumé :** « Classeur d'alimentation contrôle de gestion » (bouton « Classeur XLSX »), « Temps par chantier × mois », « Temps par collaborateur », « Temps non facturables par catégorie », « Prévision et consommé sur 3 ans », « Fiche chantiers », « Jours par chantier × mois », « Production valorisée à une date d'arrêté », « Paramètres de génération (CSV) ».

**À quoi ça sert.** Produire les fichiers Excel du contrôle de gestion et de la tournée de facturation. Utilisé par la finance. Le comptable reçoit surtout le facturier PLS et le FEC, qui ne sont **pas** sur cette page.

---

## 2. Rôles, chef de projet, associé de référence : qui voit quoi

### 2.1 Définitions
- Rôles globaux : `collaborateur` (libellé « Consultant »), `manager`, `associe`, `finance`, `admin`. Une personne peut en cumuler plusieurs : on retient alors le droit le plus favorable.
- **Propriétaire du chantier** (`isOwner`) : chef de projet (`missions.manager_id`) **ou** associé de référence (`missions.associate_ref_id`). Ce n'est pas un rôle, c'est un attribut du chantier. Source : `canEditMission`, `canEditMissionBilling`, `OWNER_SCOPED_CAPS` dans `feature-flags-store.ts`. La base applique la même règle avec `is_mission_owner`.
- **Contributeur** (`isContributor`) : propriétaire, ou membre de `m.team`.
- **Lien RH seul** (`isHrScoped`) : le chantier implique un subordonné de l'utilisateur, et l'utilisateur a la portée « équipe » (`cap:mission.viewTeam`, manager dans le code). Ce lien ouvre la lecture seule.

### 2.2 Fiche chantier (`src/pages/MissionDetail.tsx`)

Règles d'affichage des onglets :
- **« Pilotage »** : visible si `canEdit`, ou `canEditReprev`, ou lien RH. Le bloc budget et rentabilité exige `canSeeMissionFinance` (propriétaire, ou `cap:mission.viewProfitability` : manager, associé, finance, admin). Sinon il est remplacé par « Budget d'exécution & rentabilité - réservés (voir matrice des accès). ».
- **« Informations »** : toujours visible. Modifiable si `canEditMissionInfo` (propriétaire, ou `cap:mission.editAll` : associé, finance, admin).
- **« Facturation »** :
  ```ts
  const canViewBillingTab = facturationModule &&
    (canEditMissionBilling(authRoles, { isOwner }) ||
     ((isContributor || isHrScoped) && can("mission.tab.facturation", authRoles)));
  ```
  `mission.tab.facturation` vaut **tous les rôles** dans le code. `canEditMissionBilling` est vrai pour le propriétaire, ou avec `cap:mission.billing.edit` (finance, admin), `cap:mission.editAll` (associé, finance, admin) ou `cap:invoice.manage` (finance, admin).
- **« Frais »** : module frais allumé et `canForMission("mission.tab.frais")`, c'est-à-dire manager, associé, finance, admin, ou le propriétaire.
- Un utilisateur sans droit d'édition voit le badge « Lecture seule » dans l'en-tête.

Contenu de l'onglet Facturation :
- `BillingScheduleEditor.tsx`, carte « Échéancier de facturation » : colonnes « Libellé », « Date », « Montant HT », « Statut » ; total ; ligne « CA du chantier : X € » et « L'échéancier ne couvre pas le CA (écart : X €) » ; bouton « Ajouter un jalon ».
- `MissionBillingInfoCard.tsx`, carte « Informations de facturation » : entité, adresse, envoi, bloc ADV, « Bon de commande », frais de mission.

Les droits sur la colonne Statut :
- **voir** la colonne exige que « Facturation dans l'ERP » soit allumée, pour tous les rôles (`canSeeScheduleStatus`) ;
- **modifier** un statut exige `cap:invoice.manage`. Être chef de projet ne suffit jamais.

**Aucune liste de factures dans la fiche chantier** : on ne voit que le badge de statut d'un jalon lié à une facture, et seulement si le drapeau est allumé.

| Profil (droits du code, modules facturation et frais allumés) | Pilotage | Informations | Facturation | Frais |
|---|---|---|---|---|
| **Consultant contributeur** (membre de l'équipe, ni chef de projet ni associé de référence) | Visible : grille de ventilation, RAF modifiable (`mission.editReprevision` ouvert à tous). Budget et rentabilité **masqués** (message « … réservés … ») | Lecture seule | **Visible, en lecture seule.** Voit libellés, dates et **montants HT** des jalons, le total, le **CA du chantier** et l'écart. Statut affiché seulement si le drapeau ERP est allumé, sans pouvoir le changer. Voit l'entité, l'adresse, l'envoi, le bon de commande, le traitement des frais. Pas de bouton « Modifier ». Mention : « Lecture seule - la facturation de ce chantier est gérée par le contrôle de gestion. ». Ne voit **aucune facture** | Masqué |
| **Manager contributeur** (rôle manager, non propriétaire) | Visible, budget et rentabilité **visibles en lecture** | Lecture seule | Lecture seule, comme le consultant | Visible, lecture (validation des notes réservée au propriétaire et à `expense.validate` ; or `expense.validate` couvre manager et plus, donc il peut valider les notes des autres) |
| **Manager, lien RH seul** | Lecture | Lecture | Lecture (`readOnly={isHrScoped}`) | Visible si `mission.tab.frais` |
| **Chef de projet** (`manager_id`), quel que soit son rôle | Tout modifiable, y compris valider ou dévalider le prévisionnel | Modifiable (statut, chef de projet, associé, dates…) | **Modifiable** : ajouter, modifier, supprimer des jalons ; « Modifier » les informations ; choisir l'entité ; bon de commande ; frais. **Ne peut pas** changer le statut d'un jalon, ni créer ou modifier une entité (`cap:clients.edit`) | Visible, peut valider les notes des autres |
| **Associé de référence** (`associate_ref_id`) | Identique au chef de projet | idem | idem | idem |
| **Associé non propriétaire** | `mission.editAll` lui est accordé dans le code : il **peut tout modifier sur tous les chantiers**, facturation comprise | Modifiable | Modifiable (via `editAll`), sans changer les statuts ni les entités | Visible |
| **Finance** | Tout | Modifiable | Tout, y compris le statut des jalons (si drapeau ERP allumé) et la création ou modification d'entité (« Nouvelle entité », « Coordonnées de l'entité ») | Visible et validation |
| **Admin** | Tout, plus « Supprimer le chantier » | idem | idem | idem |

Pour un consultant **non** contributeur : il n'a pas la portée « équipe », donc pas de lien RH ; l'onglet Facturation n'est pas proposé et il ne voit en principe pas le chantier dans sa liste.

### 2.3 Section Finance selon le rôle (code, modules allumés)

| Rôle | « Facturation » | « Clôture mensuelle » | « Valorisation production » | « Exports » |
|---|---|---|---|---|
| Consultant | **Visible.** Revue limitée aux chantiers dont il est chef de projet. Sinon : « Vous n'êtes chef de projet d'aucun chantier en cours. ». Drapeau allumé : onglets « Revue mensuelle » et « Facturier » en lecture | Non | Non | Non |
| Manager | Idem consultant : seulement ses chantiers de chef de projet, pas ceux de son équipe | Non | Non | Non |
| Associé | Tous les chantiers (`mission.viewAll` dans le code ; si la matrice le retire : ses chantiers d'associé de référence ou de chef de projet, avec la mention « Vos chantiers de référence »). Revue et Facturier en lecture | Non | Non | Non |
| Finance | Tout : 4 onglets, « Export FAE », émission, encaissement, relances | Oui : figer, rouvrir, FEC si drapeau | Oui si drapeau | Oui |
| Admin | idem | idem | idem | idem |

Ce que la base laisse lire dans le Facturier (migration `drizzle/migrations/0041_droits_retrait_associe_manager.sql`, politique `invoices_read_scoped`) :
- finance et admin : toutes les factures ;
- propriétaire d'un chantier (`owned_mission_ids`) : les factures de ce chantier ;
- **contributeur** d'un chantier : les factures liées à un jalon de l'échéancier de ce chantier.
Un consultant contributeur peut donc lire, dans l'onglet « Facturier » de `/facturation`, les factures liées aux jalons de ses chantiers, alors que la fiche chantier ne les lui montre pas. Les lignes de facture et les paiements restent réservés aux propriétaires, à la finance et à l'admin.

---

## 3. Entité de facturation existante : détection et affichage

Fichiers : `MissionBillingInfoCard.tsx`, `BillingEntityEditor.tsx`, `BillingEntityDialog.tsx`, `ClientBillingEntities.tsx`, `src/lib/billing-entity-name.ts`.

**Combobox « Sélectionner une entité… »**
- Elle n'apparaît qu'en mode édition (bouton « Modifier », réservé à `canEditMissionBilling`).
- Elle propose **uniquement les entités dont `clientId` est le client du chantier**, non archivées, sauf l'entité actuellement liée. L'ordre est alphabétique.
- Chaque option affiche « {nom} - {code postal ville} », suffixé « (archivée) » si besoin. La première option est « - Aucune entité sélectionnée ».
- Le champ de recherche « Rechercher une entité… » renvoie « Aucune entité trouvée. » si rien ne correspond.
- Les boutons « Nouvelle entité » et « Coordonnées de l'entité » n'existent que pour `cap:clients.edit` (finance, admin). **Un chef de projet peut choisir une entité, pas en créer.**
- Si le chantier n'a pas de client : « Rattachez d'abord un client à ce chantier pour choisir une entité facturée. ».
- Le choix d'une entité est **enregistré immédiatement** (`setMissionBillingEntity`). Les boutons « Enregistrer » et « Annuler » ne portent que sur le bon de commande et les frais.

**Alerte de doublon**
- Elle n'existe que dans la fenêtre « Nouvelle entité de facturation » (ou en modification).
- Texte exact : « « {nom} » existe déjà pour ce client{ (archivée)}. Sélectionnez-la plutôt que d'en créer une seconde. ».
- La comparaison se fait sur le nom normalisé (minuscules, sans accent, ponctuation remplacée par une espace), **pour le même client seulement**. Une contrainte d'unicité en base (`billing_entities.name_normalized`) bloque le doublon exact.

**Compteurs existants**
- La combobox n'a **aucun compteur**.
- La fenêtre de modification d'entité (finance et admin) affiche « Cette entité est utilisée par N chantier(s). Les factures déjà émises conservent l'adresse figée à leur émission : cette modification n'affecte que les prochaines factures. ».
- La fiche client, onglet « Facturation », bloc « Entités de facturation », affiche pour chaque entité « N chantier(s) rattaché(s) · X € facturés ». Le montant facturé lit la table des factures : il vaut 0 € si la facturation est tenue hors ERP.
- La fiche chantier affiche **toujours**, dès qu'une entité est liée (même si un seul chantier l'utilise) : « Coordonnées partagées : les modifier impacte tous les chantiers rattachés à cette entité. ».

**Cas « Groupe Varenne Services » / « Varenne Services SAS », ce qu'on verrait aujourd'hui**
1. Dans un nouveau chantier du client « Groupe Varenne Services », le chef de projet clique « Modifier ». La combobox propose « Varenne Services SAS - {CP ville} », sans indication qu'elle sert déjà sur d'autres chantiers.
2. Une fois l'entité choisie, la carte affiche son adresse, son mode d'envoi, le bloc ADV et la phrase « Coordonnées partagées : … ». Il n'y a ni nombre de chantiers ni liste.
3. Si la finance clique « Nouvelle entité » et tape « Varenne Services SAS », l'alerte « « Varenne Services SAS » existe déjà pour ce client. … » apparaît.
   - En revanche, « Varenne Services S.A.S. » (normalisé en « varenne services s a s ») ou « Varenne Services » **ne déclenchent pas** l'alerte.
   - Si l'entité existante est rattachée à un **autre** fiche client (par exemple un doublon « Varenne Services »), elle n'est **ni proposée ni détectée**.
   - Il n'y a pas de champ SIREN pour fiabiliser la détection.
4. Le nombre de chantiers rattachés n'est visible que par la finance, dans « Coordonnées de l'entité » (« Cette entité est utilisée par N chantiers. ») ou sur la fiche client (« N chantiers rattachés · … »).

---

## 4. Recouvrements, incohérences, fonctions derrière des drapeaux

### 4.1 Ce qui est montré deux fois, ou calculé de plusieurs façons
1. **La production et la FAE sont calculées de quatre façons différentes.**
   - « Facturable » de la revue : jours réalisés × tarif vendu du grade, plus la sous-traitance (`missionBillableAmount`).
   - FAE/PCA de la clôture : % d'avancement × `budgetAmount`, moins le montant des factures (`CutOff.tsx`).
   - « Export FAE » de la revue (`FaeExportDialog`) et « Production valorisée à une date d'arrêté » des Exports.
   - « Valorisation production » : valeurs figées de `revenue_recognition`.
   Le même mois peut donc donner des chiffres différents d'un écran à l'autre.
2. **« Facturé » a deux sources.**
   - Dans la revue, « Facturation » et « Écart » lisent l'échéancier (jalons au statut « Facturé » ou « Réglé »).
   - « Reste à facturer », « Facture créée », la clôture et le FEC lisent la table des factures.
   Si quelqu'un coche un jalon à la main sans émettre de facture, les deux divergent.
3. **L'échéancier apparaît à deux endroits** : dans la fiche chantier, et dans la fiche client (onglet « Facturation », `ClientBillingSchedules`).
4. **Les adresses incomplètes sont signalées à quatre endroits** : la tuile « Adresses à compléter », le filtre et la colonne « Infos de facturation », le triangle à côté du code chantier, la colonne « Infos manquantes » de « À préparer ». L'ancien onglet `MissionsMissingBillingTab` ne sert plus que de source de calcul.
5. **Les factures sont visibles à trois endroits** : « Facturier », « Impayés », et « Factures émises » sur la fiche client (si le drapeau ERP est allumé). Elles ne le sont pas sur la fiche chantier.

### 4.2 Incohérences de droits
1. La barre latérale annonce « Facturation » pour manager et plus, et « Clôture mensuelle » pour manager et plus. Une fois les droits chargés, la règle effective est tous les rôles pour « Facturation » et finance et admin pour la clôture. Le menu mobile a encore ses propres listes.
2. Un consultant contributeur voit le **CA du chantier** et les montants de l'échéancier dans l'onglet Facturation, alors que le budget et la rentabilité lui sont masqués dans l'onglet Pilotage.
3. L'associé a `mission.editAll` dans le code : il peut modifier la facturation de **tous** les chantiers, pas seulement les siens. Il voit aussi toute la revue, alors que le code prévoit une vue « Vos chantiers de référence ».
4. Un manager ne voit dans la revue que ses chantiers de chef de projet, pas ceux de son équipe. Pourtant, le lien RH lui ouvre l'onglet Facturation de ces mêmes chantiers.
5. Le bouton « Rien à facturer » n'est pas réservé à l'ADV. Le crayon « Éditer » du Facturier est affiché sans droit (la base refusera l'écriture).
6. Le passage automatique des jalons en « À facturer » ne se fait que si quelqu'un ouvre `/facturation`.
7. Le choix d'une entité est enregistré tout de suite, hors du couple « Enregistrer » / « Annuler ».
8. Le facturier n'a pas de vue « par chef de projet » : la revue est le seul écran du chef de projet.

### 4.3 Ce qui manque pour le processus cible (devis, acompte, solde, complément)
- Aucun type de jalon (acompte, solde, complément) : un jalon n'a qu'un libellé libre (exemple affiché : « ex : Acompte 30 % au démarrage »).
- Pas d'étape de vérification par le chef de projet entre le brouillon et l'émission. Pas de date de dépôt sur le portail.
- Pas de stockage du devis ni de documents sur le chantier (voir Faisabilite).
- Aucune vue des factures dans la fiche chantier. Aucune file « à valider » pour Fabrice : seuls les rôles finance et admin agissent, sans distinction entre Steve et Fabrice.

### 4.4 Fonctions présentes mais derrière des réglages éteints
- **Module « facturation »** (éteint par défaut) : route `/facturation`, onglet « Facturation » de la fiche chantier, onglet « Facturation » de la fiche client.
- **Module « frais »** (éteint par défaut) : onglet « Frais », colonne « Frais refacturables en attente », ligne de checklist « Notes de frais traitées », bouton « Générer la facture de débours ».
- **`facturationEmettrice` (« Facturation dans l'ERP »)** : onglets « À préparer », « Impayés », « Facturier » ; colonnes « Facturation », « Écart », « Revue », « Infos de facturation », « Production à date », « Reste à facturer » ; tuiles « Facturation », « Écart », « Adresses à compléter » ; sélecteur « Tournée du mois » et « Export FAE » ; filtres « Revue du mois » et « Infos de facturation » ; notion « Terminé - reste à facturer » ; bouton « Émettre une facture » et assistant d'émission ; colonne « Statut » des jalons (masquée pour **tous**, finance comprise, quand le drapeau est éteint) ; compteur de brouillons dans la barre latérale ; tuiles « CA cumulé » et « Encours facturation » et tableau « Factures émises » de la fiche client ; lignes de checklist « Échéances du mois facturées » et « Factures brouillons émises ».
- **`cutoffComptable` (« Contrôle de gestion avancé »)** : tuiles FAE, PCA, CA reconnu ; onglet « Ajustements FAE/PCA » ; « Export FEC » ; bouton « Passer en « … » » ; page « Valorisation production » ; neuf cartes d'export (dont le « Classeur d'alimentation contrôle de gestion » et « Fiche chantiers »).
- **Code mort.** `ManualInvoiceDialog` (saisie manuelle du facturier, « mode registre ») reste monté mais n'est plus ouvert, sauf par « Saisir la ligne facturier » si la matrice sépare `billing.items.manage` de `invoice.emit`. La route `/marge` est hors phase 1.

---

Fichiers principaux lus : `src/components/sens/AppSidebar.tsx`, `src/stores/feature-flags-store.ts`, `src/lib/billing-gates.ts`, `src/lib/access-scope.ts`, `src/pages/Facturation.tsx`, `src/components/sens/AdvMissionsView.tsx`, `BillingItemsQueue.tsx`, `OverdueInvoicesView.tsx`, `FacturierView.tsx`, `src/pages/CutOff.tsx`, `src/lib/cutoff-checks.ts`, `src/pages/ValorisationProduction.tsx`, `src/pages/Exports.tsx`, `src/pages/MissionDetail.tsx`, `BillingScheduleEditor.tsx`, `MissionBillingInfoCard.tsx`, `BillingEntityDialog.tsx`, `BillingEntityEditor.tsx`, `ClientBillingEntities.tsx`, `src/lib/billing-entity-name.ts`, `src/lib/missions-missing-billing.ts`, `src/lib/adv-review.ts`, `mission-detail/MissionExpensesTab.tsx`, `src/pages/ClientDetail.tsx`, `MobilePlusSheet.tsx`, `drizzle/migrations/0041_droits_retrait_associe_manager.sql`.
