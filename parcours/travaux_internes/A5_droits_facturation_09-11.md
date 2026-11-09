# A5. Droits et rôles sur la facturation : vérification du code (9 novembre)

Lecture seule du projet Lovable « SENS ERP » au commit `83a1be35` (dernière modification du 5 novembre). Aucune requête en base, aucun envoi, aucun déploiement.

Limite importante : les documents `Feuille_de_Route_Droits_Roles_11-10.md` et `Journal_Run_Droits_Roles_11-10.md` n'ont pas pu être lus (l'outil Projets n'était pas disponible dans cette session). Les arbitrages du 11 octobre sont repris des notes de projet et recoupés avec le code.

## 1. Ce qui décide les droits

- Le code porte des valeurs **par défaut** (`ROUTE_ACL`, `CAPABILITIES`). La matrice `role_permissions` en base **les remplace** dès qu'une ligne existe : `can()` lit d'abord la matrice, puis le code (`src/stores/feature-flags-store.ts:576-588`, `src/lib/permissions-overrides.ts`). Pour les routes, même règle (`feature-flags-store.ts:799-801`).
- Les arbitrages du 11 octobre (tout le monde voit le budget de tous les chantiers, tout le monde modifie tous les chantiers, rôle Manager retiré, Associé aligné sur Consultant) ne sont **dans aucune migration ni aucun fichier de code**. Les migrations de cette période (0039, 0041) retirent les rôles associé et manager des règles en base, mais n'écrivent aucune ligne de matrice pour le rôle Consultant. Ces arbitrages ont donc été appliqués, s'ils l'ont été, par les interrupteurs de l'écran des droits. **Le code seul ne permet pas de savoir ce que vaut la matrice aujourd'hui.**
- Indice concordant : le 5 novembre, il a été accepté qu'Alice Marchionno puisse « modifier les chantiers », sans créer de rôle lecture seule. Cela suppose que le droit « Modifier les chantiers » (`cap:mission.editAll`) est ouvert à tous.

**Tranché :** la passation dit vrai pour les valeurs par défaut du code, et seulement pour elles. Si la matrice applique les arbitrages du 11 octobre, elle est fausse sur trois points majeurs : le consultant voit le budget et la rentabilité dans Pilotage, il voit tous les chantiers, et il **peut modifier la facturation de tous les chantiers**.

**Vérification à faire (5 minutes, sans requête en base)** : un admin ouvre Paramètres › Utilisateurs › droits par rôle, dans **chacune** des deux organisations (la matrice est propre à chaque organisation), et relève pour le rôle Consultant : `cap:mission.viewProfitability`, `cap:mission.viewAll`, `cap:mission.editAll`, `cap:mission.tab.facturation`, `route:/facturation`, `cap:mission.billing.edit`, `cap:invoice.manage`, `cap:clients.edit`. Relever aussi l'état des drapeaux « Facturation dans l'ERP » et du module Facturation chez Plein Sens Ethique.

## 2. Preuves (renvois du tableau)

| Réf. | Fichier:ligne | Ce que ça dit |
|---|---|---|
| P1 | `src/pages/MissionDetail.tsx:391-394` | Onglet Facturation visible si module allumé ET (droit de modifier la facturation OU (contributeur ou lien RH) avec `mission.tab.facturation`) |
| P2 | `MissionDetail.tsx:308-310`, `353-354` | Propriétaire = chef de projet (`managerId`) ou associé de référence ; contributeur = propriétaire ou membre de l'équipe |
| P3 | `MissionDetail.tsx:374-381`, `902-903` | Lien RH seul (portée « équipe ») : composants forcés en lecture seule |
| P4 | `src/stores/feature-flags-store.ts:494-502` | `canEditMissionBilling` = propriétaire OU `mission.billing.edit` OU **`mission.editAll`** OU `invoice.manage` |
| P5 | `feature-flags-store.ts:147-154`, `178-186`, `218-220`, `294-299`, `358-360` | Défauts : `viewProfitability` manager, associé, finance, admin ; `editAll` associé, finance, admin ; `billing.edit` finance, admin ; `tab.facturation` tous ; `invoice.manage` finance, admin ; `viewAll` associé, finance, admin ; `viewTeam` manager ; `clients.edit` finance, admin |
| P6 | `src/components/sens/BillingScheduleEditor.tsx:542-543`, `270`, `592`, `553`, `695`, `676` | Édition des jalons = P4 ; colonne « Montant HT », total et « CA du chantier » affichés **sans aucune condition de droit** ; « Ajouter un jalon » si modifiable |
| P7 | `src/components/sens/MissionBillingInfoCard.tsx:75-82`, `166`, `228`, `251`, `380` | « Modifier » et choix de l'entité = P4 ; « Nouvelle entité » et « Coordonnées de l'entité » = `clients.edit` ; mention « Lecture seule - la facturation de ce chantier est gérée par le contrôle de gestion » |
| P8 | `feature-flags-store.ts:523-536` | Statut des jalons : **voir** = drapeau « Facturation dans l'ERP » seul, pour tous ; **modifier** = `invoice.manage` seul (le chef de projet jamais) |
| P9 | `feature-flags-store.ts:439-444` ; `MissionDetail.tsx:348`, `826`, `882` | Budget et rentabilité dans Pilotage = propriétaire OU `mission.viewProfitability` ; sinon « Budget d'exécution & rentabilité - réservés » |
| P10 | `drizzle/migrations/0041_droits_retrait_associe_manager.sql:160-167`, `168-173`, `177-180` | `invoices_read_scoped` : finance, admin, `invoice.manage`, factures des chantiers possédés, **factures liées à un jalon d'un chantier où l'on contribue** ; lignes de facture : propriétaires, finance, admin ; paiements : chantiers pilotés, finance, admin |
| P11 | `src/pages/Facturation.tsx:58`, `268-269`, `280`, `315` | Drapeau éteint : la page ne montre que la revue. Drapeau allumé : onglet « Facturier » rendu **sans condition de droit** |
| P12 | `src/components/sens/AdvMissionsView.tsx:401-402`, `455-463`, `718`, `780`, `951` | Revue : tous les chantiers si `mission.viewAll`, sinon associé = ses chantiers de référence, sinon seulement les chantiers dont on est chef de projet ; colonnes « CA chantier », « Facturable », « Prochain jalon » (montant) |
| P13 | `src/components/sens/FacturierView.tsx:242-245`, `1099-1106` | Le Facturier lit `invoices` (filtré par P10) ; crayon « Éditer » affiché sans contrôle de droit (la base refuse l'écriture) |
| P14 | `feature-flags-store.ts:33-38`, `113-115`, `799-807` | Module Facturation éteint par défaut ; `/facturation` tous les rôles ; `/cut-off` et `/valorisation-production` finance et admin (+ drapeau `cutoffComptable` pour la valorisation) |
| P15 | `src/components/sens/AppSidebar.tsx:57-61`, `123`, `139` ; `MobilePlusSheet.tsx:47-48`, `97` | Les listes de rôles du menu ne servent qu'avant le chargement des droits ; ensuite seul `isRouteVisible` (P14 + matrice) décide. Le mobile n'a pas « Valorisation production » |
| P16 | `src/lib/billing-entities.functions.ts` (`setMissionBillingEntity`, en-tête) | Choisir l'entité = écrire `missions.billing_entity_id` (règle de modification du chantier) ; créer ou modifier une entité = `cap:clients.edit` |
| P17 | `supabase/migrations/20260721001922_d60a7e5f-….sql:99-120` | Seed de la matrice (juillet) : `invoice.manage` finance, admin ; `schedule.edit` et `editMilestones` associé, finance, admin ; `viewAll` associé, finance, admin. Insertion `ON CONFLICT DO NOTHING` : la base peut différer |
| P18 | `BillingScheduleEditor.tsx:612-628` ; `src/lib/billing-helpers.ts` (`derivedBillingStatus`) | Jalon lié à une facture : badge « Facturé », « En retard » ou « Réglé » avec date d'échéance en infobulle, sans numéro, et seulement si le statut est visible (P8) |

## 3. Tableau « Aujourd'hui » selon les valeurs par défaut du code

V = voir, M = modifier. Module Facturation supposé allumé. « Drapeau » = « Facturation dans l'ERP » (`facturationEmettrice`), éteint par défaut. Les cases marquées **(¹)** changent si la matrice applique les arbitrages du 11 octobre (voir le tableau suivant).

| Profil | Onglet Facturation | Montants HT des jalons | CA du chantier | Informations et entité | Statut des jalons | Factures dans la fiche | Factures via le menu | Menu Finance |
|---|---|---|---|---|---|---|---|---|
| Consultant contributeur | V (P1, P5) ; M non (P4) **(¹)** | V (P6) ; M non **(¹)** | V (P6) | V ; M non, mention « Lecture seule » (P7) **(¹)** | V si drapeau (P8) ; M non | Badge de statut seulement, si drapeau (P18) | Drapeau éteint : aucune. Allumé : onglet Facturier, factures liées aux jalons de ses chantiers (P10, P11, P13) | Facturation : V, revue vide « Vous n'êtes chef de projet d'aucun chantier en cours. » (P12, P14) **(¹)** ; Clôture, Valorisation : non (P14) |
| Consultant non contributeur | Non (P1) **(¹)** | Non | Non | Non | Non | Non | Facturier : aucune (P10) | Comme ci-dessus |
| Manager (rôle, non propriétaire) | Contributeur ou lien RH : V ; M non (P1, P3) | V ; M non | V | V ; M non | V si drapeau ; M non | Badge si drapeau | Comme consultant | Facturation : V, ses seuls chantiers de chef de projet (P12) ; Clôture, Valorisation : non |
| Chef de projet (`missions.manager_id`) | V et M (P4) | V et M (ajout, modification, suppression) (P6) | V (non modifiable ici) | V et M : « Modifier », choix de l'entité parmi celles du client, bon de commande, frais (P7, P16) ; créer une entité : non | V si drapeau ; M non (P8) | Badge si drapeau | Revue : ses chantiers. Facturier (drapeau) : factures de ses chantiers ; lignes et paiements aussi (P10) | Facturation : V ; Clôture, Valorisation : non |
| Associé de référence | Comme chef de projet (P2, P4) | idem | idem | idem | idem | idem | Revue : tous (défaut `viewAll`) (P12) | idem |
| Associé non propriétaire | V et M sur **tous** les chantiers via `editAll` (P4, P5) | V et M | V | V et M ; créer une entité : non | V si drapeau ; M non | Badge si drapeau | Revue : tous ; Facturier : celles de ses chantiers seulement (P10) | idem |
| Finance | V et M partout (P4) | V et M | V | V et M, y compris créer ou modifier une entité (P7) | V et M si drapeau (P8) | Badge si drapeau | Tout, avec émission, encaissement, relances (P11) | Facturation, Clôture : V ; Valorisation : V si `cutoffComptable` (P14) |
| Admin | Comme finance | idem | idem | idem | idem | idem | idem | idem |

Pilotage, pour mémoire (P9) : le consultant contributeur voit l'onglet, sans budget ni rentabilité ; le manager, l'associé, la finance et l'admin les voient.

### Si la matrice applique les arbitrages du 11 octobre (à confirmer à l'écran)

Hypothèse : pour le rôle Consultant, `mission.viewProfitability`, `mission.viewAll` et `mission.editAll` sont ouverts.

| Profil | Ce qui change |
|---|---|
| Consultant, contributeur ou non | Voit **tous** les chantiers. Pilotage : budget et rentabilité visibles (P9). Onglet Facturation **visible et modifiable sur tous les chantiers** : jalons, montants, entité, bon de commande, frais, car `editAll` suffit (P4). Le statut des jalons et la création d'entité restent fermés (P7, P8). Revue de facturation : **tous les chantiers**, avec CA et facturable (P12). Facturier : toujours limité par la base aux factures de ses chantiers, car `invoices_read_scoped` ne lit pas `viewAll` (P10) |
| Associé | Aligné sur Consultant : même résultat |
| Manager | Plus personne ne porte ce rôle : profil théorique ; le lien RH (`viewTeam`) ne joue plus pour personne |

## 4. Écarts avec la passation (§4 et §5)

1. **« Budget et rentabilité masqués au consultant dans Pilotage »** : vrai seulement pour les défauts du code. Contredit par l'arbitrage du 11 octobre ; si la matrice l'applique, c'est faux. L'incohérence signalée (« le consultant voit les montants dans Facturation mais pas dans Pilotage ») disparaît alors.
2. **Consultant contributeur « ne peut rien modifier »** : faux si `editAll` est ouvert au rôle Consultant. Il peut alors modifier la facturation de tous les chantiers. C'est le point le plus important, car il contredit directement la cible du 9 novembre (lecture seule).
3. **Consultant non contributeur « pas d'onglet, ne voit pas le chantier »** : faux dans la même hypothèse (`viewAll` et `editAll`).
4. **« Associé non propriétaire peut tout modifier : incohérence à signaler »** : dépassé. C'est désormais voulu pour tout le monde (arbitrage du 11 octobre), ce n'est plus propre à l'associé.
5. **Lignes Manager** : le rôle a été retiré aux personnes le 11 octobre ; les deux lignes Manager décrivent un cas qui n'existe plus.
6. **Revue de facturation du consultant** (« limitée à ses chantiers de chef de projet ») : faux si `viewAll` est ouvert ; il voit alors tous les chantiers, avec CA et facturable.
7. **« La matrice réelle n'a pas été lue, il faudrait une requête en base »** : inexact sur la méthode. L'écran des droits la montre à un admin, sans requête.
8. Détail : le menu est dans `src/components/sens/AppSidebar.tsx` et `src/components/sens/MobilePlusSheet.tsx`, pas `src/components/`.
9. Confirmé tel quel : statut des jalons réservé à `invoice.manage` ; création d'entité réservée à `clients.edit` ; mention « Lecture seule » ; factures lisibles en base par le contributeur (P10) sans écran dans la fiche ; Clôture réservée à finance et admin ; crayon « Éditer » du Facturier sans contrôle de droit ; le mobile n'a ni Valorisation ni Exports.

## 5. Matrice CIBLE (décision du 9 novembre)

« Les consultants voient la facturation de leurs chantiers en lecture seule ; le chef de projet voit l'onglet Facturation avec les informations, notamment l'échéancier et l'entité de facturation. »

| Profil | Onglet Facturation | Jalons (montants, dates) | CA | Infos et entité | Statut des jalons | Factures | Menu Facturation |
|---|---|---|---|---|---|---|---|
| Consultant contributeur | V, ses chantiers | V | V (Q1) | V | V si drapeau | Q2 | Q4 |
| Consultant non contributeur | Non (Q5) | Non | Non | Non | Non | Non | Q4 |
| Chef de projet | V | V et M (Q3) | V | V et M, choix parmi les entités existantes (Q3) | V | V (Q2) | V, ses chantiers |
| Associé de référence | Comme chef de projet | idem | idem | idem | idem | idem | idem |
| Associé non propriétaire | Comme consultant | idem | idem | idem | idem | idem | idem |
| Finance, admin | Tout | Tout | Tout | Tout, y compris créer une entité | V et M | Tout | Tout |

### Écarts entre la cible et aujourd'hui

| # | Écart | Existe si | Fichiers à changer | Taille |
|---|---|---|---|---|
| E1 | Le droit « Modifier les chantiers » (`editAll`) donne aussi le droit de modifier la facturation : un consultant non propriétaire peut modifier jalons, entité, bon de commande, frais | `editAll` ouvert au Consultant (probable) | `feature-flags-store.ts` (`canEditMissionBilling` sans `editAll`) ; nouvelle migration sous `drizzle/migrations/` : règle `billing_schedules_write_scoped` sans `editAll`, et garde sur les colonnes de facturation de `missions` (`billing_entity_id`, `purchase_order`, `expenses_billing`) que `missions_update_scoped` laisse passer avec `editAll` ; `billing-entities.functions.ts` (message) ; tests `mission-billing-rights.test.ts`, `rls-role-matrix.test.ts` | Moyen (3 à 5 j) |
| E2 | Onglet visible sur tous les chantiers (aujourd'hui par le droit de modifier), au lieu de « leurs chantiers » | même hypothèse | `MissionDetail.tsx:391-394` (après E1, la règle contributeur suffit) ; test `mission-detail-acces-rh.test.tsx` | Petit (1 j), avec E1 |
| E3 | Montants et CA visibles au consultant | seulement si Q1 = masquer | `BillingScheduleEditor.tsx` (colonne, total, ligne CA), éventuellement une capacité dédiée dans `feature-flags-store.ts` | Petit (1 à 2 j) |
| E4 | Aucune facture dans la fiche chantier (badge sans numéro, et seulement drapeau allumé) | si Q2 = afficher | `BillingScheduleEditor.tsx` (numéro dans le badge, P18) : petit ; ou bloc « Factures du chantier » en lecture (nouveau composant, `MissionDetail.tsx`) : moyen. Attention : la base ne laisse lire au contributeur que les factures **liées à un jalon** (P10) | Petit (1 à 2 j) ou moyen (3 j) |
| E5 | Onglet « Facturier » et crayon « Éditer » proposés à tous dès que le drapeau est allumé | drapeau allumé | `Facturation.tsx:280`, `FacturierView.tsx:1099-1106` | Petit (1 j) |
| E6 | Revue de facturation ouverte à tous les chantiers si `viewAll` est ouvert | `viewAll` ouvert au Consultant | `AdvMissionsView.tsx:401-463` : périmètre propre à la revue (chantiers pilotés), indépendant de `viewAll` sauf finance et admin | Petit (1 j) |
| E7 | Entrée de menu Facturation pour les consultants | si Q4 = retirer | `feature-flags-store.ts` (`isRouteVisible`), `AppSidebar.tsx`, `MobilePlusSheet.tsx` | Petit (1 j) |
| E8 | Chef de projet qui donne son accord au lieu de modifier | si Q3 = accord | `BillingScheduleEditor.tsx`, `MissionBillingInfoCard.tsx`, migration (état « validé par le chef de projet »), notification à la finance | Moyen (3 à 5 j) ; gros (8 à 10 j) avec circuit complet et relances |
| E9 | Matrice Plein Sens Ethique à aligner après les changements | toujours | Écran des droits de PSE (interrupteurs, pas de code) | Négligeable |

Si la vérification de l'écran montre que `editAll` n'est **pas** ouvert au Consultant, E1, E2 et E6 disparaissent : la cible est déjà atteinte pour l'onglet, et il ne reste que Q1 à Q4.

## 6. Questions à trancher

**Q1. Montants visibles ou non pour le consultant ?**
Aujourd'hui : visibles dans l'onglet Facturation, sans condition (montant HT de chaque jalon, total, CA du chantier, écart) (P6). Si la matrice suit le 11 octobre, le consultant voit déjà budget, CA et rentabilité dans Pilotage, et le CA de tous les chantiers dans la revue.
Recommandation : **les laisser visibles**. Le CA est déjà ouvert à tous par l'arbitrage du 11 octobre ; les masquer ici seulement serait incohérent. Un échéancier sans montants ne sert presque à rien au consultant. Zéro développement.

**Q2. Factures (numéro, statut, payée ou non) visibles ou non ?**
Aujourd'hui : la base laisse lire au contributeur les factures liées aux jalons de ses chantiers (P10). Dans la fiche, il ne voit qu'un badge « Facturé / En retard / Réglé » avec la date d'échéance, et seulement si le drapeau est allumé (P18). Via le menu, il les voit dans le Facturier, drapeau allumé (P11).
Recommandation : **afficher statut, numéro et payé ou non dans l'échéancier**, rien de plus (ni lignes, ni PDF, ni actions). Cela répond à « voir la facturation de ses chantiers », aide le chef de projet pour les relances, et réutilise le badge existant (E4, petit). En contrepartie, retirer l'onglet Facturier aux non-gestionnaires (E5) pour qu'il n'y ait qu'un seul endroit.

**Q3. Le chef de projet modifie-t-il l'échéancier et l'entité, ou donne-t-il seulement son accord ?**
Aujourd'hui : il modifie (ajout, modification et suppression de jalons ; choix de l'entité parmi celles du client ; bon de commande ; frais). Il ne change ni le statut des jalons, ni ne crée d'entité (P6, P7, P8).
Recommandation : **garder la modification** pour l'échéancier et le choix de l'entité, la création d'entité restant à la finance. C'est lui qui connaît le contrat ; c'est déjà en place ; un circuit d'accord coûte 3 à 10 jours (E8) pour un gain faible tant que la finance garde la main sur le statut et l'émission. Le « bon à facturer » existe déjà côté finance (file « À préparer »), on peut y revenir plus tard.

**Q4. Entrée de menu Facturation pour les consultants ?**
Aujourd'hui : visible pour tous dès que le module est allumé (P14, P15). Un consultant qui n'est chef de projet d'aucun chantier tombe sur « Vous n'êtes chef de projet d'aucun chantier en cours. ». Si `viewAll` est ouvert, il voit au contraire la revue de tous les chantiers.
Recommandation : **la réserver à la finance, à l'admin et aux personnes chefs de projet ou associés de référence d'au moins un chantier en cours**. « Chef de projet » n'étant pas un rôle, un simple interrupteur de matrice ne suffit pas : petit développement (E7, 1 j). Les consultants voient leur facturation dans la fiche chantier, ce qui suffit à la cible.

**Q5. « Leurs chantiers » ou tous les chantiers en lecture ?**
Aujourd'hui, si la matrice suit le 11 octobre, tout le monde voit Pilotage, budget compris, sur tous les chantiers. Limiter la facturation aux seuls chantiers du consultant est cohérent avec la décision du 9 novembre, mais crée une asymétrie avec Pilotage. À confirmer en une ligne avec Pierre-Guillaume Ferré ; la recommandation est de s'en tenir à « leurs chantiers », comme décidé.

## 7. Non établi sans la base

- Valeurs réelles de la matrice dans les deux organisations (voir la vérification du §1).
- État réel du module Facturation et du drapeau « Facturation dans l'ERP » chez Plein Sens Ethique.
- Définitions SQL de `billing_schedules_write_scoped`, `missions_update_scoped` et `contributor_mission_ids` : non relues ; le code les déclare miroirs des règles d'interface (`feature-flags-store.ts:492`).
- Valeurs par défaut en base de `cap:mission.tab.facturation`, `cap:mission.billing.edit`, `cap:mission.editAll`, `cap:mission.viewProfitability`, `cap:clients.edit`, `route:/facturation` : absentes des migrations lues ; seules celles de P17 sont établies.
