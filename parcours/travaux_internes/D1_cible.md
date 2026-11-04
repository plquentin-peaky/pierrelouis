# D1 · Cible unique : la facturation PSE dans Alphonse

## 1. L'idée et les principes

**En 3 phrases.** Chaque facture suit une vie simple : à chaque étape, un responsable et une action, et le statut se calcule à partir des faits, sans jamais être coché. Claire dépose le devis, Alphonse prépare tout, Claire vérifie, Fabrice émet, Steve envoie et suit le paiement. Les chiffres du comptable sont des formules figées à la clôture du mois, et l'IA ne fait que gagner du temps.

**Les 5 principes**
1. **Une facture, une vie, un responsable.** Personne ne coche « facturé », ni à l'écran ni côté serveur.
2. **Alphonse propose, deux humains valident.** Rien n'est émis sans la vérification du CP puis celle de Fabrice.
3. **Peu de messages.** Au plus un récapitulatif par jour et par personne, plus un mail de fin de mission par chantier.
4. **Des chiffres par formule, figés.** L'IA ne calcule aucun montant comptable.
5. **Chacun voit ce qui le concerne.** Les échanges client restent dans les mails, et tout passe par un réglage propre à PSE : Plein Sens ne change pas.

**Arbitrages entre A et B**

| Point | Retenu | Raison |
|---|---|---|
| Colonne vertébrale | Cycle de vie calculé (B) | C'est l'idée neuve que PG attend, au lieu d'un renommage ; une seule vérité sur « facturé » |
| Qui émet | Fabrice seul (B), délégation possible | C'est la seule vraie double validation CP puis finance |
| Vue par chantier | Gardée (A), sans rentabilité | Facture et production se réconcilient (PG, 21/07), et c'est le support du point mensuel de Steve |
| Statut après émission | « À envoyer » (B) | Tous les clients n'ont pas de portail ; le bouton dit « Déposer sur le portail » quand l'entité l'exige |
| Clôture | Deux états, Ouvert ou Clos (A) | C'est plus simple à expliquer, et la règle de date ci-dessous évite le blocage |
| Mois clos | Facture datée du jour d'émission, encaissement à sa date réelle (B) | Pas de réouverture, et c'est conforme à l'e-reporting |
| Messages | Récapitulatif quotidien pour Claire (A, B), hebdomadaire pour Steve (A) | Pas un mail par facture |
| Noms | « Facturation » gardé (A), « Clôture du mois » (B) | Le repère de Steve est conservé, et « Clôture du mois » se comprend sans glossaire |
| Journal ADV | Supprimé dans les deux | Décision de Pierre-Louis |

## 2. Le cycle de vie d'une facture

| Statut | Responsable | On y entre quand | On en sort par |
|---|---|---|---|
| **À venir** | Personne | Le jalon est validé | La date du jalon est atteinte (tâche quotidienne) |
| **À préparer** | Steve | La date est atteinte mais une mention manque (BC, contact) | La mention est complétée : le brouillon passe chez le CP |
| **Chez le CP** | Claire | Le brouillon est complet | « C'est bon » ou « À corriger » (retour à préparer, avec le motif) |
| **À émettre** | Fabrice | Claire a vérifié | « Émettre » : numéro définitif, date du jour |
| **À envoyer** | Steve | La facture est émise | La date de dépôt ou d'envoi est saisie |
| **À encaisser** | Steve | La facture est envoyée ; le badge « En retard » apparaît après l'échéance | Le paiement est saisi |
| **Réglée** | Personne | Le paiement est complet | |
| **Contestée** | Steve | « Marquer contestée », avec un motif choisi dans une liste ; les relances sont suspendues | Retour à encaisser, ou avoir |
| **Annulée** | Fabrice | Un avoir est créé | Le jalon revient à préparer |

**Cas limites**
- **Avoir.** Fabrice le crée. Dans la fiche, la facture apparaît barrée avec son avoir, et le jalon revient « À préparer ».
- **Contestée.** Les relances s'arrêtent. Steve règle le litige par mail ; Alphonse ne garde que le motif et la date.
- **Mois clos.** Une facture porte la date de son émission, jamais antidatée : l'acompte vérifié le 3/11 est une facture de novembre. Un paiement garde sa date réelle ; si son mois est clos, il reçoit en plus une date comptable au 1er mois ouvert.
- **Complément.** Il fait toujours l'objet d'une facture séparée. Claire joint l'accord du client, et le CA du chantier est augmenté et tracé.
- **BC tardif.** Le brouillon reste « À préparer » chez Steve, avec la mention « Bon de commande manquant ». Claire ne vérifie qu'une facture complète.
- **Chantier sans devis.** Claire clique « Remplir à la main ». La règle 50/50 s'applique au CA saisi à la création, et sa source est affichée.

## 3. La section Finance

| Aujourd'hui | Demain | Pourquoi |
|---|---|---|
| Facturation (entrée) | Gardée, nom et adresse inchangés ; fermée au contributeur | Repère conservé ; le contenu dépend du profil |
| › Revue mensuelle | Renommée « Par chantier » et allégée | Le facturé, l'encaissé et le produit se lisent côte à côte. La tournée et « Rien à facturer » disparaissent : le statut suffit |
| › À préparer | Fusionnée dans « À faire » | Elle devient trois statuts : à préparer, chez le CP, à émettre |
| › Impayés | Fusionnée dans « À faire » | Elle devient les statuts « À encaisser » et « Contestée ». L'export Excel est gardé |
| › Facturier | Renommée « Registre » | L'export PLS est conservé, et le comptable y a accès |
| Clôture mensuelle | Renommée « Clôture du mois » | Ce nom se comprend sans glossaire |
| › Checklist | Devient « Vérifications », en trois lignes | Temps saisis, factures dues émises, brouillons traités |
| › Ajustements FAE/PCA | Renommés « Facturé / produit non facturé » | Les montants sont figés au clic « Clore », chantiers terminés compris |
| › Export FEC | Gardé, dans le « Pack comptable » | Il lit les valeurs figées, et non un recalcul |
| › « Passer en … » | Supprimé | Le mois est ouvert ou clos, rien d'autre |
| Valorisation production | Fusionnée en onglet « Mois clos » | Même public ; une entrée de menu en moins |
| Administration › Exports | Gardés ; Rentabilité et Classeur CDG masqués pour PSE | Hors sujet ici |
| Fiche client › Facturation | Simplifiée | Les entités (avec leur nombre de chantiers) et les factures restent ; l'échéancier, en double, est retiré |

```
Finance (bureau et mobile identiques)
├ Facturation
│  ├ À faire (n)     statut, responsable, filtre « Chez moi »
│  ├ Par chantier    groupé par CP, sert au point mensuel
│  └ Registre        ex-Facturier, export PLS
└ Clôture du mois
   ├ Vérifications
   ├ Facturé / produit non facturé   + Pack comptable
   └ Mois clos       ex-Valorisation production
Fiche chantier › Facturation : Devis et documents · Infos de facturation · Échéancier · Factures et avoirs
```

## 4. Ce que voit chaque profil

| Profil | Fiche chantier › Facturation | Facturation | Clôture du mois | Messages |
|---|---|---|---|---|
| Contributeur | Onglet masqué ; lecture des factures fermée en base (0041) | Non | Non | Aucun |
| Claire, CP | Tout ; elle dépose, valide et vérifie | Par chantier, ses chantiers | Non | Récapitulatif du jour si quelque chose l'attend ; mail de fin de mission |
| Associé de référence | Lecture, ses chantiers | Lecture, ses chantiers | Non | Aucun |
| Steve, ADV | Infos, envoi, paiement | À faire (tout sauf Émettre et Avoir), Par chantier, Registre | Non | Récapitulatif hebdomadaire des infos manquantes ; copie des fins de mission |
| Fabrice | Tout | Tout ; il est seul à émettre | Il clôt | Récapitulatif du jour |
| Comptable | Non | Registre, lecture et export | Lecture, Pack comptable | Pack mensuel |

Phrase affichée au contributeur, dans Informations : **« La facturation de ce chantier est suivie par Claire Morel (cheffe de projet) et Steve (ADV). »**

## 5. Le rôle de l'IA, et le mode sans IA

| Étape | Avec IA | Sans IA |
|---|---|---|
| Dépôt du devis | Lit le devis et le BC, préremplit le formulaire, indique la source de chaque champ | « Remplir à la main », source « saisi par Claire » |
| Entité | Repère les variantes de nom (« Varenne Services S.A.S. ») | Recherche par nom normalisé et SIREN, sur tous les clients |
| Échéancier | Signale un écart entre le devis et le CA initial | Règle 50/50 et contrôle « couvre le CA » (existant) |
| Brouillon | Prépare le mail d'accompagnement et rappelle « dépôt sur portail, BC obligatoire » | Modèle fixe |
| Vérification et émission | Signale un écart avec le devis ou un doublon possible | Relecture |
| Relance | Rédige le rappel, que Steve envoie depuis sa messagerie | Modèle fixe |
| Fin de mission, clôture | Aucune : les jours saisis et le produit sont des calculs | Identique |

## 6. Facture électronique 2027

1. **SIREN.** Il est ajouté sur le client et l'entité, et il fiabilise aussi la détection des doublons.
2. **Type de jalon.** Acompte, solde ou complément : il donne les types 386 et 380, et la facture de solde cite l'acompte déduit.
3. **Numérotation.** Une séquence PSE continue, commune à toutes les factures (F2026-00001…).
4. **Statuts de la plateforme.** Déposée, rejetée, refusée et encaissée se branchent sur les nôtres. Une facture rejetée revient « À préparer » ; une facture refusée passe « Contestée ».
5. **Plateforme agréée.** Elle reste à choisir avec Fabrice (Dext ?). Alphonse lui transmet la facture par API et ne dépose jamais lui-même.

## 7. Storyboard (3 min 07)

| # | Durée | Personne et écran | Contenu | Animation | Légende |
|---|---|---|---|---|---|
| 1 | 18 s | Fabrice Ducellier · finance › Facturation › Revue mensuelle | Aujourd'hui : menu avec Facturation (4 onglets : Revue mensuelle, À préparer, Impayés, Facturier), Clôture mensuelle, Valorisation production, Exports | Les onglets glissent et se regroupent : À préparer et Impayés fondent dans « À faire » ; Revue mensuelle devient « Par chantier » ; Facturier devient « Registre » ; Valorisation entre dans « Clôture du mois » | Moins de pages, une seule liste de travail, la même sur bureau et mobile. |
| 2 | 12 s | Claire Morel · cheffe de projet › Chantiers › VARENNE_EnqSig › Facturation | Zone « Déposez le devis signé (PDF) », lien « Remplir à la main », « CA du chantier : 18 600 € (saisi à la création) » | Glisser PSE-2026-041.pdf et BC-VS-2026-0187.pdf ; barre « Lecture… » | Claire dépose le devis et le bon de commande, c'est tout. |
| 3 | 15 s | Claire Morel · cheffe de projet › VARENNE_EnqSig › Facturation › Infos de facturation | Formulaire existant prérempli. Entité Varenne Services SAS (devis p. 1) ; SIREN 812 345 678 (devis p. 1) ; BC BC-VS-2026-0187 (bon de commande p. 1) ; Envoi « Portail fournisseurs Varenne » (devis p. 3) ; Contact facturation « à compléter » (orange). Bouton « Valider ces informations » | Les pastilles de source apparaissent une à une ; clic sur une pastille → aperçu du devis surligné | Chaque champ montre d'où il vient ; il ne manque que le contact. |
| 4 | 12 s | Idem | Encart : « Varenne Services SAS, déjà utilisée sur 2 chantiers de Groupe Varenne Services : VARENNE_Baro2025, VARENNE_Form2026. » Boutons « Utiliser cette entité », « C'est une autre entité » | Clic « Utiliser cette entité » ; adresse et mode d'envoi se remplissent | Alphonse retrouve l'entité existante au lieu d'en créer une seconde. |
| 5 | 12 s | Idem › Échéancier | Type, Libellé, Date, Montant HT, Statut : Acompte 50 %, 02/11/2026, 9 300 €, À venir ; Solde 50 %, 18/12/2026, 9 300 €, À venir. Bandeau vert « Total 18 600 € = CA initial (devis PSE-2026-041) » | Clic « Valider l'échéancier » | L'échéancier est proposé et rapproché du CA initial. |
| 6 | 10 s | Thomas Renaud · consultant › Chantiers › VARENNE_EnqSig › Informations | Onglets Pilotage, Informations (pas d'onglet Facturation). Ligne : « La facturation de ce chantier est suivie par Claire Morel (cheffe de projet) et Steve (ADV). » | Zoom sur la ligne | Le consultant voit qui suit la facturation, pas les montants. |
| 7 | 16 s | Claire Morel · cheffe de projet › VARENNE_EnqSig › Facturation › Factures et avoirs | Brouillon d'acompte 9 300 € HT, 11 160 € TTC, BC cité. Fil à droite : Préparée 02/11 ✓, Vérifiée par le CP, Émise par la finance, Déposée. Boutons « C'est bon », « À corriger » | Clic « C'est bon » ; la 2e étape se coche « Claire Morel, 03/11 » | Claire vérifie le brouillon ; le fil montre la suite. |
| 8 | 15 s | Fabrice Ducellier · finance › Facturation › À faire | Compteurs : À préparer 1, Chez le CP 1, À émettre 2, À envoyer 1, À encaisser 1 (en retard), Contestée 1. Filtre « Chez moi » : VARENNE_EnqSig, Acompte, 9 300 €, vérifiée 03/11 ; TALMONT_Enq, Solde, 4 900 €. Panneau : « Aucun doublon » | Clic « Émettre » sur VARENNE : numéro F2026-00007, la ligne part vers « À envoyer » | Fabrice émet ce que Claire a vérifié : c'est la double validation. |
| 9 | 14 s | Steve · ADV › Facturation › À faire | « Chez moi » : BRENNE_Enq, Acompte 7 500 €, À préparer, « Bon de commande manquant » ; VARENNE_EnqSig, F2026-00007, À envoyer, « Déposer sur le portail » ; ORLAN_EnqHar, F2026-00006, À envoyer ; HALIOS_EnqSig, F2026-00004, 12 000 €, À encaisser, badge « En retard de 16 j » ; MERIDIA_EnqRPS, F2026-00005, 10 500 €, Contestée | Clic « Déposer » (05/11) : VARENNE passe À encaisser ; clic « Préparer le rappel » sur HALIOS : brouillon de mail à copier | Steve ne remplit plus d'Excel : il sait quoi faire et qui appeler. |
| 10 | 15 s | Steve · ADV › Facturation › Par chantier | Au 20/11, groupé par CP. Colonnes CA, Produit à fin octobre, Facturé, Encaissé, Écart, Prochain jalon. Claire Morel : VARENNE_EnqSig 18 600, 1 860, 9 300, 0, facturé d'avance 7 440, Solde 18/12 ; BRENNE_Enq 15 000, 3 000, 7 500, 0, facturé d'avance 4 500. Julien Hamon : HALIOS_EnqSig 24 000, 16 800, 12 000, 0, à facturer 4 800 ; CAPELLE_Enq 12 400, 12 400, 6 200, 6 200, à facturer 6 200, « Chez le CP depuis 04/11 ». Sophie Marchal : ORLAN_EnqHar, MERIDIA_EnqRPS, TALMONT_Enq | Surbrillance de CAPELLE | Le point mensuel avec chaque CP part de cette vue. |
| 11 | 18 s | Claire Morel · cheffe de projet › Messagerie | Mail du 18/12, copie Steve : « VARENNE_EnqSig se termine aujourd'hui. On prépare le solde de 9 300 € HT ? 21 j saisis sur 25 prévus. » Boutons « Oui, préparer le solde », « Pas encore », « Un complément est à prévoir » | Clic « Pas encore » → fiche, jalon Solde ; Claire saisit 08/01/2027 ; trace « Reporté par Claire Morel le 18/12 » | Un seul mail, trois réponses ; le report est tracé. |
| 12 | 18 s | Fabrice Ducellier · finance › Clôture du mois › Vérifications | Novembre 2026 : « Temps saisis 14/14 ✓ », « Factures dues émises ✓ », « Brouillons traités ✓ ». Bouton « Clore novembre ». Puis l'onglet Facturé / produit non facturé : facturé en novembre 27 900 € ; produit non facturé 7 200 € ; facturé d'avance 9 760 € (dont VARENNE 1 860) ; bouton « Pack comptable » (Registre PLS, état figé, FEC) | Clic « Clore » ; cadenas sur les temps et les chiffres ; le pack se télécharge | Une fois clos, novembre ne bouge plus ; le comptable reçoit trois fichiers. |
| 13 | 12 s | Synthèse | Six cartes. Claire : dépose, vérifie, répond à un mail. Steve : plus d'Excel, une liste. Fabrice : émet et clôt. Consultant : rien à faire. Associé : lecture de ses chantiers. Comptable : un pack par mois | Les cartes apparaissent en cascade | Chacun fait moins, et la facture part à l'heure. |

## 8. Faisabilité

S = 1 à 2 j, M = 3 à 5 j, L = 8 à 10 j.

| Brique | État | Taille | Fichiers |
|---|---|---|---|
| Réglage « processus PSE » | À créer | S | `feature-flags-store.ts`, `app_settings` |
| Statut calculé (avoir, contestée) | À adapter | M | `billing-helpers.ts`, `ScheduleStatusPill.tsx`, migration `invoices` |
| Statut manuel refusé côté serveur | À adapter | S | `billing.functions.ts` |
| Type de jalon, lien solde vers acompte | À adapter | S | `BillingScheduleEditor.tsx`, migration |
| À faire | À adapter | M | `Facturation.tsx`, `BillingItemsQueue.tsx`, `OverdueInvoicesView.tsx` |
| Par chantier | À adapter | S | `AdvMissionsView.tsx`, `adv-review.ts` |
| Fabrice seul à émettre | À adapter | M | `assertInvoiceManager`, `roles.ts` |
| Tâche quotidienne à privilèges | À créer | M | `mark_due_billing_schedules`, `createDraftInvoiceForMission` |
| Dépôt du devis | À créer | L | `org-storage.functions.ts`, nouvelle table |
| Lecture du devis avec sources | À créer | M | `expense-capture.functions.ts`, `MissionBillingInfoCard.tsx` |
| Entité sur tous les clients, compteur, SIREN | À adapter | M | `billing-entity-name.ts`, `ClientBillingEntities.tsx` |
| Fil de vérification, factures et avoirs dans la fiche | À adapter | M | `MissionDetail.tsx` |
| Mails : trois boutons, récapitulatifs, envoi activé | À adapter | M | `email-layout.ts` |
| Paiement à date réelle dans un mois clos | À adapter | S | `assertCutoffOpen`, `recordPayment` |
| Clôture figée, terminés compris, FEC sur le figé | À adapter | L | `CutOff.tsx`, `valorisation-production.ts`, tests `cutoff-*` |
| Droits contributeur, associé, menus | À adapter | S | migration corrigeant `0041`, `AppSidebar.tsx`, `MobilePlusSheet.tsx` |
| Lecture seule du comptable | À adapter | S | `role_permissions` |

**Total : 45 à 60 jours, environ 52 en estimation centrale.** Hypothèse : un développeur qui connaît le code, tests compris, hors recette PSE et hors branchement de la plateforme agréée. Le lot 1, celui de la vidéo (devis, formulaire, entité, échéancier, brouillon, À faire, droits, mails), représente environ 30 jours.

## 9. Questions à trancher avec PG

1. Fabrice seul émet-il les factures (notre choix), ou Steve aussi, par délégation pendant ses absences ?
2. Garde-t-on le point mensuel Steve et CP sur « Par chantier » ? À valider avec Steve, qui n'a jamais été interrogé (PS-4).
3. Le complément fait-il toujours l'objet d'une facture séparée (notre choix) ?
4. L'associé voit-il seulement ses chantiers ?
5. Le comptable reçoit-il un pack mensuel, ou a-t-il aussi un accès en lecture ?
6. Quels sont l'outil comptable, la plateforme agréée (Dext ?), le premier numéro de facture, l'IBAN et le logo ? Ces points sont à voir avec Fabrice.
7. Faut-il écrire « Steve » ou « Stive » ? PG a épelé « Stive » le 08/10 ; nous écrivons « Steve » comme dans le compte rendu. Son nom de famille est aussi à confirmer.
8. Le schéma 50/50 et la date de l'acompte (au lancement) sont-ils confirmés avec Alice (PS-3) ?
