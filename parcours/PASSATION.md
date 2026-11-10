# Passation : facturation Plein Sens Ethique dans Alphonse

Mise à jour : 9 novembre 2026. À coller (ou joindre) au début d'une nouvelle conversation Claude Cowork.

---

## 1. Le contexte en 10 lignes

- **AI Origin** (Pierre-Louis Quentin) fait évoluer **Alphonse V2**, l'ERP de Plein Sens, sur alphonse.pleinsens.fr.
- Le sujet : la facturation des enquêtes de **Plein Sens Ethique (PSE)** :
  - un devis ;
  - un acompte de 50 % au lancement ;
  - un solde de 50 % en fin de mission ;
  - un complément éventuel.
- **Sponsor : Pierre-Guillaume Ferré (PG).** Échange du 4 novembre 2026, prochain point le **jeudi 12 novembre à 14 h** avec PG et Fabrice.
- **Les personnes :**
  - Fabrice Ducellier, finance et contrôle de gestion ;
  - Steve, facturation et relances ; il tient aujourd'hui un facturier Excel, et PG a épelé « Stive » le 8 octobre, à confirmer ;
  - les chefs de projet ;
  - les consultants ;
  - Alice, à qui faire valider le schéma 50/50 ;
  - Paul Courtaud, en copie.
- **Ce que veut PG** : ne pas « automatiser le process actuel ». Concrètement :
  - partir de la fiche chantier, sans ressaisie ;
  - peu de mails ;
  - une IA qui propose, et l'humain qui valide ;
  - Steve suit tout depuis un écran, plus depuis un Excel.
- **Règles de travail :**
  - ne jamais rien modifier ni lancer dans le vrai Alphonse ;
  - le code se lit **en lecture seule** via le connecteur Lovable ;
  - données fictives uniquement ;
  - pas de tiret cadratin dans les livrables.

## 2. Où sont les choses

**Code d'Alphonse (Lovable, lecture seule)**
- Projet **« SENS ERP »**, id `d822e134-7069-4fbe-8433-0807f3a50d7a`, espace « Résilience Group » (`QVvCyCqdBYVxESSLhDmc`).
- Outils autorisés : `list_files`, `read_file`, `get_project`. **Jamais** `send_message`, ni aucun outil qui écrit, déploie ou interroge la base.
- Le projet « Alphonse démo facturation (bac à sable AI Origin) », id `d7353ec8-…`, n'est qu'une copie du 3 novembre.

**Livrables (GitHub)**
- Dépôt `plquentin-peaky/pierrelouis`, branche `claude/admiring-galileo-bnr4gz`, dossier `parcours/`.
- `Proposition_Facturation_PSE.pdf`, `.docx` et `.md` : la proposition client (9 pages, prête à envoyer, sous réserve des points du §6).
- `Parcours_Facturation_PSE.mp4` : la vidéo de 2 min 46, avec ses chapitres dans `chapitres.txt`.
- `Parcours_Facturation_PSE.html` : les maquettes cliquables (touches ← →, A pour la lecture automatique).
- `source/` : le moteur des maquettes (`parcours.js`, `gabarit.html`, capture du schéma Miro).
- Pour régénérer le tout : `node parcours/construire.mjs`, puis `node parcours/enregistrer.mjs`.
- `travaux_internes/` : les notes des agents, à ne pas envoyer. Les plus utiles :
  - `A1_vision_PG.md` : la vision de PG, ses citations datées et 12 critères de succès ;
  - `A2_inventaire_finance.md` : l'inventaire complet de la section Finance et des droits ;
  - `A3_facture_electronique.md` ;
  - `D2_final.md` : la cible et le storyboard ;
  - `E1_faisabilite.md`, `E3_verif_finale.md`, `F1_recette.md`.

**Autres sources**
- **Tableau Miro « Facturation PSE · parcours et chantiers »** : https://miro.com/app/board/uXjVERrplck=/. Il montre encore le parcours de la v3, à mettre à jour.
- **Réunions** : connecteurs Fathom et Circleback. Il y a la transcription du 4 novembre et celle du 15 juillet, plus des extraits du 7 juillet au 2 novembre.

## 3. Ce que montre la version actuelle (v4)

- **Le principe.** Chaque facture suit une seule vie, avec un responsable par étape. Le statut est calculé à partir des faits, personne ne le coche.
- **Les statuts**, avec leur responsable :

| Statut | Responsable |
|---|---|
| À venir | Personne |
| À préparer | Steve |
| Chez le chef de projet | Claire |
| À émettre | Fabrice, seul à émettre |
| À envoyer | Steve |
| À encaisser | Steve |
| Réglée | Personne |
| Contestée | Steve |
| Annulée (avoir) | Fabrice |

- **Fiche chantier, onglet Facturation**, avec quatre blocs : Documents, Informations de facturation, Échéancier, Factures et avoirs.
  - Le devis est déposé dans la fiche. Alphonse préremplit le formulaire existant et affiche la source de chaque champ. Pas de chat.
  - Il détecte l'entité existante (Varenne Services SAS, déjà sur 2 chantiers) et trouve le contact en lisant la signature d'un mail.
  - L'échéancier 50/50 est rapproché du CA initial.
  - La facture en brouillon s'affiche avec son fil : préparée, vérifiée par le chef de projet, émise par la finance, déposée.
- **Section Finance**, avec deux entrées :
  - Facturation : À faire, Par chantier, Registre ;
  - Clôture du mois : Vérifications, Travail réalisé et facturé, Mois clos.

  Cela remplace Revue mensuelle, À préparer, Impayés, Facturier, Clôture mensuelle et Valorisation production.
- **Mail de fin de mission** : trois boutons (« Oui, préparer le solde », « Pas encore », « Un complément est à prévoir ») et une réponse possible en une phrase. Le chef de projet décale lui-même la date, sans justification.
- **Clôture du mois** : trois vérifications, « Clore novembre », des montants figés, et 3 fichiers que Fabrice envoie au comptable (qui n'a pas de compte).
- **Effort annoncé** : 68 à 104 jours (environ 85), dont 46 à 69 pour le lot 1. Il est élevé, à valider avant envoi.
- **Choix de Pierre-Louis déjà tranchés :**
  - pas de chat ;
  - pas de journal des échanges client : les échanges restent dans les mails ;
  - pas de rentabilité ni de reprévision dans la présentation ;
  - l'IA optimise sans refondre le processus ;
  - le décalage du solde se fait à la main.

## 4. Le point à reprendre : droits et rôles

**Nouvelle décision de Pierre-Louis (9 novembre)** :
- les consultants doivent **voir** la facturation du chantier, **en lecture seule** ;
- le chef de projet voit l'onglet Facturation avec les informations, notamment l'échéancier et l'entité de facturation.

**C'est contraire à la v4**, qui masque l'onglet au consultant (scène 6 de la vidéo, section 5 de la proposition). Il faut donc reprendre :
- la scène 6 ;
- le tableau « Ce que voit chacun » ;
- la synthèse ;
- la ligne « Droits des consultants » du chiffrage, qui devient plus simple.

**Ce que fait Alphonse aujourd'hui**, d'après le code lu en lecture seule (source : `A2_inventaire_finance.md` §2).
- Les rôles : `collaborateur` (affiché « Consultant »), `manager`, `associe`, `finance`, `admin`. Une personne peut en cumuler plusieurs, et on retient le droit le plus favorable.
- **« Chef de projet » n'est pas un rôle.** C'est `missions.manager_id`.
  - Le chef de projet et l'associé de référence (`associate_ref_id`) sont les propriétaires du chantier (`isOwner`).
  - Les contributeurs sont les propriétaires plus les membres de l'équipe (`m.team`).
- **Qui voit l'onglet Facturation** (dans `src/pages/MissionDetail.tsx`) :
  ```ts
  const canViewBillingTab = facturationModule &&
    (canEditMissionBilling(authRoles, { isOwner }) ||
     ((isContributor || isHrScoped) && can("mission.tab.facturation", authRoles)));
  ```
  `mission.tab.facturation` est ouvert à tous les rôles dans le code.

| Profil | Onglet Facturation de la fiche chantier |
|---|---|
| **Consultant contributeur** (membre de l'équipe, ni chef de projet ni associé) | **Déjà visible, en lecture seule** : libellés, dates et **montants HT** des jalons, total, **CA du chantier** et écart, entité, adresse, envoi, bon de commande, frais. Pas de bouton « Modifier ». Mention « Lecture seule - la facturation de ce chantier est gérée par le contrôle de gestion. ». Il ne voit aucune facture dans la fiche. **Il ne peut rien modifier.** |
| Manager contributeur (non propriétaire) | Lecture seule, comme le consultant |
| Manager rattaché par lien RH seul | Lecture seule |
| **Chef de projet / associé de référence** | **Modifiable** : jalons (ajouter, modifier, supprimer), « Modifier » les informations, choix de l'entité, bon de commande, frais. **Ne peut pas** changer le statut d'un jalon (il faut `cap:invoice.manage`, finance et admin), ni créer ou modifier une entité (il faut `cap:clients.edit`, finance et admin) |
| Associé non propriétaire | Peut tout modifier sur **tous** les chantiers (`mission.editAll` dans le code) : incohérence à signaler |
| Finance, admin | Tout, y compris les statuts et les entités |
| Consultant non contributeur | Pas d'onglet ; en principe, il ne voit pas le chantier |

**Points à vérifier ou trancher dans la nouvelle conversation :**
1. **Montants.** Le consultant voit aujourd'hui les montants et le CA du chantier dans Facturation, alors que le budget et la rentabilité lui sont masqués dans Pilotage. Garde-t-on les montants visibles, ou seulement l'échéancier sans montants et l'entité ?
2. **Factures.** Le consultant peut lire, dans Facturation › Facturier, les factures liées aux jalons de ses chantiers (règle d'accès en base, migration `0041_droits_retrait_associe_manager.sql`, politique `invoices_read_scoped`), alors que la fiche ne les montre pas. À aligner avec la décision.
3. **Menu Finance.** L'entrée « Facturation » est ouverte à tous les rôles (`ROUTE_ACL` dans `src/stores/feature-flags-store.ts`). Un consultant y voit la revue limitée à ses chantiers de chef de projet, sinon le message « Vous n'êtes chef de projet d'aucun chantier en cours. ». Faut-il lui retirer l'entrée ?
4. **La matrice réelle.** Les droits réels de Plein Sens Ethique sont dans la matrice `role_permissions` en base, qui peut corriger ces valeurs du code. **Elle n'a pas été lue** : il faudrait une requête en base, exclue jusqu'ici. À demander à l'équipe Alphonse ou à vérifier dans l'écran des droits.
5. **Droits du chef de projet.** Doit-il pouvoir modifier l'échéancier et l'entité (c'est le cas aujourd'hui), ou seulement les voir et donner son « bon à facturer » ?
6. **Steve et Fabrice ont le même rôle `finance`.** « Fabrice seul à émettre » demande une liste nominative d'émetteurs dans un réglage propre à PSE (taille Gros).
7. **Associé.** L'associé non propriétaire peut modifier tous les chantiers. Est-ce voulu ?

Fichiers à relire dans Lovable :
- `src/stores/feature-flags-store.ts` (`ROUTE_ACL`, `CAPABILITIES`, `OWNER_SCOPED_CAPS`) ;
- `src/pages/MissionDetail.tsx` ;
- `src/components/sens/BillingScheduleEditor.tsx` et `MissionBillingInfoCard.tsx` ;
- `src/lib/billing-gates.ts` ;
- `src/components/AppSidebar.tsx` et `MobilePlusSheet.tsx` ;
- `drizzle/migrations/0041_droits_retrait_associe_manager.sql`.

## 5. Autres faits utiles, vérifiés dans le code

- **Génération de facture.** Elle existe déjà, derrière le réglage « Facturation dans l'ERP » (`facturationEmettrice`, éteint) : brouillon « BROUILLON-… », numéro définitif à l'émission, PDF, avoirs, encaissements.
  - L'assistant « Émettre une facture » (3 étapes) part de Facturation › Revue mensuelle et **émet aussitôt**, sans circuit de validation.
  - La fiche chantier n'émet rien.
- **Clôture.** La page `/cut-off` est réservée à la finance et à l'admin.
  - Figer le mois **bloque aussi les factures, les avoirs et les encaissements datés de ce mois** (`billing.functions.ts`, `assertCutoffOpen`, `recordPayment`).
  - Le volet comptable (FAE, PCA, FEC) est derrière le réglage `cutoffComptable`.
- **Pas de documents sur un chantier.** Aucun stockage, aucun upload : c'est la plus grosse brique à créer.
- **Mails.**
  - Ils partent par Resend, avec un gabarit commun (`src/lib/email-layout.ts`) qui n'accepte **qu'un bouton**.
  - L'envoi est coupé par un interrupteur commun à Plein Sens et à PSE.
  - Il n'y a pas de planificateur.
  - Le logo n'apparaît que pour Plein Sens.
- **Entités de facturation.**
  - La liste ne propose que les entités du même client.
  - L'alerte de doublon (« « X » existe déjà pour ce client… ») n'existe que dans la création d'une entité, réservée à la finance.
  - Le chef de projet peut choisir une entité, pas en créer.
- **SIREN** : il n'y a aucun champ SIREN, ni sur les clients ni sur les entités. Il est à ajouter, car il devient obligatoire avec la facture électronique.
- **Fournisseurs et sous-traitants** : il n'y a aucun référentiel.

## 6. Avant d'envoyer la proposition au client

- **Effort.** Valider 68 à 104 jours (environ 85), ou réduire le lot 1. Si Steve peut aussi émettre : 8 à 10 jours de moins.
- **Prénom.** Confirmer « Steve » ou « Stive », et son nom de famille.
- **Facture électronique.** Les règles ont été confirmées par des extraits de recherche, sans lecture directe d'impots.gouv.fr ni de legifrance.gouv.fr, bloqués par le réseau de la session cloud. En résumé :
  - réception obligatoire depuis le 1/09/2026 ;
  - émission obligatoire pour une PME au 1/09/2027 ;
  - passage obligatoire par une plateforme agréée ;
  - format Factur-X, UBL ou CII ;
  - SIREN du client obligatoire.

  Le document recommande de confirmer avec l'expert-comptable.
- **Droits du consultant (§4).** Une fois tranchés, mettre à jour la vidéo et le document.
- **Miro.** Mettre à jour le tableau avec le parcours v4.

## 7. Questions ouvertes pour le 12 novembre (déjà dans la proposition)

1. Qui émet : Fabrice seul, avec délégation possible à Steve ?
2. Garde-t-on le point mensuel de Steve avec chaque chef de projet, sur la vue « Par chantier » ?
3. Le complément est-il toujours une facture séparée ?
4. L'associé voit-il seulement ses chantiers, et en lecture seule ?
5. Les 3 fichiers mensuels suffisent-ils au comptable ?
6. Quels sont l'outil comptable, la plateforme agréée et le premier numéro de facture ?
7. Comment s'écrit le prénom de Steve ?
8. Le schéma 50/50 est-il confirmé de votre côté ?

---

## Prompt de reprise (à coller dans la nouvelle conversation)

> Je reprends le chantier « facturation Plein Sens Ethique dans Alphonse ». Lis d'abord la passation ci-jointe (PASSATION.md).
>
> Règles : ne rien modifier ni lancer dans Alphonse ; lire le code uniquement en lecture seule via le connecteur Lovable (projet « SENS ERP », id d822e134-7069-4fbe-8433-0807f3a50d7a ; outils list_files et read_file, jamais send_message) ; données fictives ; pas de tiret cadratin.
>
> Objectif immédiat : les droits et rôles sur la facturation.
> 1. Vérifie dans le code l'état actuel : qui voit et qui peut modifier l'onglet Facturation de la fiche chantier, le menu Finance et les factures. Profils : consultant contributeur, manager, chef de projet, associé de référence, associé, finance, admin.
> 2. Ma cible : les consultants voient la facturation de leurs chantiers en lecture seule ; le chef de projet voit l'onglet Facturation avec les informations, notamment l'échéancier et l'entité de facturation. Propose la matrice cible (profil × élément × voir / modifier), avec les écarts par rapport à aujourd'hui, les fichiers à changer, la taille de chaque changement et les questions à trancher (montants visibles ou non pour le consultant, factures visibles ou non, droits de modification du chef de projet).
> 3. Ensuite, on mettra à jour la proposition client et la vidéo (scène 6, tableau « Ce que voit chacun », synthèse).

---

## 8. Mise à jour du 9 novembre au soir : support de préparation du 12 novembre

- **Livrable :** `parcours/support/Support_Facturation_PSE_12-11.html` (3,6 Mo, moins de 5 Mo pour adopt.aiorigin.io), page autonome : l'essentiel, vidéo intégrée (2 min 45, chapitres cliquables), 11 écrans cliquables avec « Aujourd'hui / Demain » et badge d'étape, statuts, qui voit quoi (suit les choix), IA, facture électronique, planning en 4 étapes, 9 arbitrages au format des ateliers Promologis (aperçu visuel par option, conseillé / actuel), informations attendues, récapitulatif copiable.
- **Régénérer :** `node parcours/construire.mjs`, `CHROME=/usr/bin/google-chrome node parcours/enregistrer.mjs`, puis `node parcours/support/construire_support.mjs`. Contrôle : `node parcours/support/capturer.mjs <dossier>`.
- **Changements par rapport à la v4 :**
  - le prénom s'écrit **Stive** (PG l'écrit ainsi dans son mail du 12/10) ;
  - **Stive émet** (Fabrice en relais, avoirs et clôture à Fabrice), avec un profil « facturation » dédié : plus de liste nominative d'émetteurs (8 à 10 j en moins) ;
  - consultants : facturation de leurs chantiers en **lecture seule**, montants visibles (conseillé), arbitrage n° 2 ;
  - une seule validation « informations et échéancier » pour le chef de projet ; Stive complète ce qui manque ;
  - « Par chantier » : production, déjà facturé, écart (pas de « à facturer ») ;
  - planning en **4 étapes** : 22 à 36 j, 18 à 28 j, 12 à 21 j, 9 à 12 j, soit 61 à 97 j ; prix en euros à présenter par Pierre-Louis.
- **Relectures « PG et Fabrice » :** `travaux_internes/V1` à `V4` ; brief des réunions `A4_brief_relecteur_PG_Fabrice.md` ; droits dans le code `A5_droits_facturation_09-11.md`.
- **À vérifier avant ou pendant jeudi :** l'écran des droits (matrice `role_permissions`) de Plein Sens Ethique pour le rôle Consultant (budget visible ? modification des chantiers ?).

### Mise en ligne (10 novembre, 12 h 40)
- Support déposé sur adopt.aiorigin.io (Custom decks, type « Commercial proposal ») : « [Plein Sens] Facturation des enquêtes · point du 12 novembre ».
- Lien : https://adopt.aiorigin.io/c/plein-sens-facturation-des-enqu-tes-poin-6wlqya (accessible par le lien, sans mot de passe, sans demande d'email, sauvegarde automatique désactivée).
- Correctif fait au passage : les liens internes (menu, « Voir l'écran concerné ») rechargeaient l'application hôte dans le cadre d'adopt ; ils font désormais défiler la page (page.js). Vérifié en ligne : liens, vidéo (2 min 45, lisible).

## 9. Mise à jour du 10 novembre au soir : V2 du support après les retours de Pierre-Louis

**Retours intégrés (message du 10 novembre, 18 h)**
- Échéancier repris du devis (plus de 50/50 imposé) ; exemple VARENNE gardé à 50 % commande / 50 % remise du rapport, avec la source « Devis, p. 2 ».
- Envoi et dépôt sur le portail : jamais faits par Alphonse. La finance les fait comme aujourd'hui et note le statut (« Noter l'envoi »). Statuts : À venir, À vérifier, À émettre, À envoyer (automatiques), Envoyée, Réglée, Contestée (notés par la finance), En retard (calculé).
- Vidéo refaite (3 min 28) : un carton plein écran avant chacune des 5 étapes (qui agit, ce qui suit, barre des 5 étapes) ; échéancier avant les informations ; champs remplis sans trou (l'ancien « écran frais » venait des champs masqués pendant l'animation) ; vérification dans un panneau ouvert depuis l'échéancier ; plus de bloc « Factures et avoirs » ; fin de mission : le mail n'a qu'un bouton « Répondre dans Alphonse », la décision se prend dans une fenêtre d'Alphonse (facturer, reporter avec date et motif, complément).
- Faisabilité vérifiée dans le code (lecture seule) : Alphonse envoie déjà des mails (Resend, `email-layout.ts`, journal `notification_log`) ; aucune lecture des réponses ; pas de stockage de documents de chantier (seuls les justificatifs de frais). Une décision d'un clic dans un mail est écartée (les messageries d'entreprise ouvrent les liens pour les analyser).
- Rôles réels (`app_role` : admin, associate, manager, finance, employee) ; chef de projet, associé de référence et référent facturation (à ajouter) sont désignés par chantier. Tout le monde voit tout en lecture. Stive et Fabrice : même rôle Finance.
- Planning supprimé du support ; plus aucune mention d'étapes de livraison ni de jours.
- Schéma Miro mis à jour : nouveau cadre « 1 bis. Le parcours cible au 10 novembre » sur https://miro.com/app/board/uXjVERrplck=/ (cadres 1, 2 et 4 renommés « v3 »). Capture propre dans `source/schema_miro_v5.webp` (rendu par `miro/render.py` à partir de `miro/gen.py`), placée en tête du support.
- 12 arbitrages, regroupés : ouverture du chantier (qui dépose, échéancier, documents, ordre de l'onglet), rôles et droits (qui émet, consultant, associé), émission et messages (envoi, complément, messages), suivi et clôture (point mensuel, comptable). Réponses enregistrées sous la clé `pse-facturation-12-11-v2`.
- Vidéo du support réencodée en 720p, 15 images par seconde, CRF 31, pour rester sous 5 Mo.
- Relecture « PG et Fabrice » de la V2 (`travaux_internes/V5_relecture_boucle1.md`) : « envoyable après corrections mineures », 0 bloquant, 7 importants, appliqués (exemple 30/40/30 attribué à un autre devis, messages « un par facture à vérifier », « sans développement » retiré, associé prévenu dans « Chez moi », partage Stive / Fabrice libre dans la vidéo, statut « À préparer » ajouté, compteur « En retard »).
- V2 en ligne au même lien adopt (remplacée par « Edit » le 10 novembre au soir) : https://adopt.aiorigin.io/c/plein-sens-facturation-des-enqu-tes-poin-6wlqya. Vérifié en ligne : 12 arbitrages, schéma et agrandissement, vidéo 3 min 27 lisible, liens internes.
