# La facturation de Plein Sens Ethique dans Alphonse

Proposition d'AI Origin pour Pierre-Guillaume Ferré et Fabrice Ducellier, point du 12 novembre 2026. Exemples fictifs.

## 1. Ce qu'on propose, en 5 lignes

- Chaque facture suit une vie simple, et à chaque étape une seule personne est responsable.
- La cheffe de projet dépose le devis dans la fiche du chantier. Alphonse prépare les informations de facturation, l'acompte et le solde.
- La cheffe de projet vérifie, la finance émet, et Steve envoie, suit le paiement et relance.
- Personne ne coche « facturé » : le statut se déduit de ce qui s'est réellement passé.
- Chaque mois, Fabrice clôt le mois en un clic. Les chiffres sont alors figés, et le comptable reçoit trois fichiers.

## 2. Les principes

1. **Une facture, un responsable.** À tout moment, on sait qui doit agir et sur quoi.
2. **Alphonse propose, deux personnes valident.** Rien n'est émis sans la vérification du chef de projet, puis celle de la finance.
3. **Peu de messages.** Au plus un récapitulatif par jour, seulement s'il y a quelque chose à faire, et un mail de fin de mission par chantier.
4. **Des chiffres calculés, jamais devinés.** Les montants comptables sont des formules figées à la clôture.
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
| **Annulée** | Fabrice | Un avoir (facture d'annulation) est créé | Le jalon revient à « À préparer » |

**Cas particuliers**
- **Avoir.** Fabrice le crée ; la facture apparaît barrée dans la fiche.
- **Facture contestée.** Relances arrêtées ; Alphonse garde le motif et la date.
- **Mois déjà clos.** Une facture porte toujours la date de son émission, sans antidater : un acompte vérifié le 3 novembre est une facture de novembre. Un paiement garde sa date réelle ; si son mois est clos, il reçoit en plus une date comptable, le 1er du mois ouvert.
- **Complément.** Il fait toujours l'objet d'une facture séparée. Claire joint l'accord du client ; le montant du chantier est alors augmenté, et la modification est tracée.
- **Bon de commande reçu tard.** La facture reste « À préparer » chez Steve.
- **Chantier sans devis.** Claire clique « Remplir à la main ». Le 50/50 s'applique au montant saisi à la création.
- **Informations manquantes une semaine après la création du chantier.** Steve est alerté dans sa liste et dans son récapitulatif de la semaine.

## 4. La section Finance, aujourd'hui et demain

| Aujourd'hui | Demain | Pourquoi |
|---|---|---|
| Facturation › Revue mensuelle | **Par chantier** : montant, travail réalisé, facturé, écart, prochaine échéance, groupé par chef de projet | Plus de tournée : chaque facture a son statut. La vue sert au point mensuel de Steve avec chaque chef de projet |
| Facturation › À préparer | Intégrée à **À faire** | Elle devient trois statuts : à préparer, chez le chef de projet, à émettre |
| Facturation › Impayés | Intégrée à **À faire** | Elle devient les statuts « À encaisser » et « Contestée ». L'export Excel est gardé |
| Facturation › Facturier | **Registre** | Même contenu, avec le format du facturier Excel de Steve |
| Clôture mensuelle › Checklist | **Clôture du mois › Vérifications**, en trois lignes | Temps saisis, factures dues émises, brouillons traités |
| Clôture › Ajustements FAE/PCA | **Travail réalisé et facturé** : réalisé non facturé (FAE, factures à établir) et facturé d'avance (PCA, produits constatés d'avance) | Figés à la clôture, chantiers terminés compris, au lieu d'être recalculés à chaque affichage |
| Clôture › Export FEC | Dans les **3 fichiers pour le comptable** | Ce sont les écritures de ventes et d'inventaire (FAE, PCA) au format FEC (fichier des écritures comptables), tirées des valeurs figées |
| Clôture › « Passer en … » | Supprimé | Un mois est ouvert ou clos, rien d'autre |
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
   ├ Travail réalisé et facturé   + 3 fichiers pour le comptable
   └ Mois clos
Fiche chantier › Facturation : Documents · Informations de facturation · Échéancier · Factures et avoirs
```

## 5. Ce que voit chacun

| Personne | Fiche chantier › Facturation | Facturation | Clôture du mois | Messages |
|---|---|---|---|---|
| Consultant du chantier | Onglet masqué, et factures fermées aussi côté serveur | Non | Non | Aucun |
| Claire, cheffe de projet | Tout : elle dépose, valide et vérifie | Par chantier, pour ses chantiers | Non | Récapitulatif du jour si une facture l'attend ; mail de fin de mission |
| Associé de référence | Lecture, pour ses chantiers | Lecture, pour ses chantiers | Non | Aucun |
| Steve, facturation et relances (ADV, administration des ventes) | Informations, envoi, paiement | À faire (sans Émettre ni Avoir), Par chantier, Registre | Non | Récapitulatif de la semaine (informations manquantes) ; copie des mails de fin de mission |
| Fabrice, finance | Tout | Tout ; il émet | Il clôt | Récapitulatif du jour |
| Comptable | Pas de compte | Pas de compte | Pas de compte | Chaque mois, Fabrice lui envoie les 3 fichiers |

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

L'émission électronique sera obligatoire pour Plein Sens Ethique au 1er septembre 2027. La cible y prépare cinq points :

1. **SIREN.** Il est ajouté sur le client et sur l'entité facturée. Il devient obligatoire sur la facture, et il fiabilise la recherche de doublons.
2. **Type d'échéance.** Acompte, solde ou complément : il donne les codes normés de la facture (386 pour un acompte, 380 pour une facture). La facture de solde cite l'acompte déduit.
3. **Numérotation.** Une séquence continue par année, commune à toutes les factures de Plein Sens Ethique.
4. **Statuts.** Ceux de la plateforme agréée (le prestataire agréé par l'État qui transmet les factures) se branchent sur les nôtres. Une facture déposée passe « À encaisser » ; rejetée, elle revient « À préparer » ; refusée, elle passe « Contestée » ; encaissée, elle est « Réglée ». Le paiement est alors déclaré automatiquement : c'est l'e-reporting.
5. **Transmission.** Alphonse envoie la facture à la plateforme, par API si elle le permet, sinon par fichier. La plateforme reste à choisir avec Fabrice (Dext ?).

## 8. Planning et effort

Petit : 1 à 2 jours ; moyen : 3 à 5 ; gros : 8 à 10. Tests compris ; recette et branchement de la plateforme agréée non compris.

| Lot | Ce qu'il apporte | Effort |
|---|---|---|
| **1. Première facture d'acompte de bout en bout** | Réglage propre à Plein Sens Ethique ; statuts calculés ; dépôt et lecture du devis et des mails ; entité retrouvée et SIREN ; échéancier typé ; vérification par la cheffe de projet ; émission réservée aux personnes désignées ; liste « À faire » ; droits des consultants et associés ; contrôle de chaque nuit ; envoi des mails propre à Plein Sens Ethique et récapitulatifs | 46 à 69 j, environ 57 |
| **2. Suivi et fin de mission** | Mail de fin de mission avec trois choix et réponse en une phrase ; Par chantier ; contestation ; complément ; textes préparés par l'IA ; date comptable des paiements | 12 à 21 j, environ 16 |
| **3. Clôture et comptable** | Mois figé, chantiers terminés compris ; 3 fichiers pour le comptable ; reprise de la numérotation | 10 à 14 j, environ 12 |
| **Total** | | **68 à 104 j, environ 85** |

**Hypothèses**
- Un développeur qui connaît Alphonse.
- Le lot 1 se montre sur une vraie enquête environ trois mois après son lancement, ou six à sept semaines avec deux développeurs.
- Lots 2 et 3 et plateforme agréée terminés avant l'été 2027.
- **Levier d'économie.** Si Steve et Fabrice peuvent tous deux émettre, l'émission réservée disparaît : 8 à 10 jours en moins.

## 9. Questions à trancher ensemble

1. **Qui émet ?** Nous proposons Fabrice, avec une délégation possible à Steve. Si vous préférez que Steve émette, comme aujourd'hui, le lot 1 est plus court.
2. **Le point mensuel.** Garde-t-on le point de Steve avec chaque chef de projet, appuyé sur « Par chantier » ? À voir avec Steve.
3. **Le complément.** Fait-il toujours l'objet d'une facture séparée, comme nous le proposons ?
4. **L'associé de référence.** Voit-il seulement ses chantiers, et en lecture seule ?
5. **Le comptable.** Les 3 fichiers envoyés chaque mois par Fabrice lui suffisent-ils ? Un accès direct demanderait un compte dédié.
6. **La chaîne comptable.** Quels sont l'outil comptable, la plateforme agréée (Dext ?), le premier numéro de facture, l'IBAN et le logo de Plein Sens Ethique ?
7. **Le prénom de Steve.** Vous nous l'avez épelé « Stive » le 8 octobre. Lequel retenir, et quel est son nom de famille ?
8. **Le schéma de facturation.** Le 50/50, avec l'acompte au lancement, est-il confirmé avec Alice ?

## Storyboard (3 min 11)

Données fictives. VARENNE_EnqSig : chantier créé le 26/10/2026, devis déposé le 28/10, fin prévue le 18/12/2026.

| # | Durée | Fil d'Ariane | Contenu de l'écran | Animation | Légende |
|---|---|---|---|---|---|
| 1 | 12 s | Steve · facturation et relances › Facturier Excel (aujourd'hui) | À gauche, Alphonse, VARENNE_EnqSig › Facturation : champ « Entité » vide (un simple tiret), échéancier vide. À droite, l'Excel : une ligne par facture (Client, Commande n°, hono sans frais HT, date facture, n° facture, Payé) ; une cellule jaune « BC ? » | Copier-coller d'un montant de l'Excel vers un PDF | Aujourd'hui, une facture passe par un Excel, des copier-coller et des relances de mémoire. |
| 2 | 10 s | Claire Morel · cheffe de projet › Chantiers › VARENNE_EnqSig › Facturation | Zone « Déposez le devis signé (PDF) » ; lien « Remplir à la main » ; « Montant du chantier : 18 600 € (saisi à la création) » | Claire glisse PSE-2026-041.pdf et BC-VS-2026-0187.pdf ; barre « Lecture… » | Claire dépose le devis signé et le bon de commande dans la fiche du chantier. |
| 3 | 22 s | Claire Morel · cheffe de projet › Chantiers › VARENNE_EnqSig › Facturation › Informations de facturation | Formulaire existant prérempli : entité « Varenne Services SAS » (devis p. 1) ; SIREN 999 999 998 (devis p. 1) ; bon de commande BC-VS-2026-0187 (bon de commande p. 1) ; mode d'envoi « Portail (dépôt en ligne) », adresse du site de dépôt « portail fournisseurs Varenne » (devis p. 3) ; contact facturation « à compléter » (orange). Encart : « Varenne Services SAS, déjà utilisée sur 2 chantiers de Groupe Varenne Services : VARENNE_Baro2026, VARENNE_Form2026. » | Clic « Utiliser cette entité ». Claire glisse le mail « Re: bon de commande » : le contact devient « Nadia Lemoine, comptabilité fournisseurs, n.lemoine@varenne-services.example » (signature du mail du 28/10). Clic « Valider ces informations » | Alphonse montre la source de chaque champ, retrouve l'entité et trouve le contact dans un mail. |
| 4 | 12 s | Claire Morel · cheffe de projet › Chantiers › VARENNE_EnqSig › Facturation › Échéancier | Type, Libellé, Date, Montant HT, Statut. Acompte, « Acompte 50 % », 02/11/2026, 9 300 €, À venir ; Solde, « Solde 50 % », 18/12/2026, 9 300 €, À venir. Bandeau vert : « Total 18 600 € = montant du devis PSE-2026-041 » | Clic « Valider l'échéancier » | L'acompte et le solde sont proposés : la moitié au lancement, la moitié à la fin. |
| 5 | 14 s | Claire Morel · cheffe de projet › Chantiers › VARENNE_EnqSig › Facturation › Factures et avoirs | Brouillon d'acompte : 9 300 € HT, 11 160 € TTC, « Commande BC-VS-2026-0187 ». Fil à droite : Préparée 02/11 ✓ · Vérifiée par la cheffe de projet · Émise par la finance · Déposée sur le portail. Boutons « C'est bon », « À corriger » | Clic « C'est bon » ; la 2e étape se coche « Claire Morel, 03/11 » | Claire relit la facture d'acompte ; le fil montre qui agit ensuite. |
| 6 | 14 s | Fabrice Ducellier · finance › Facturation › À faire | Au 04/11. Compteurs : À préparer 1 · Chez le chef de projet 1 · À émettre 2 · À envoyer 1 · À encaisser 1 (en retard) · Contestée 1. « Chez moi » : VARENNE_EnqSig, acompte, 9 300 €, vérifiée le 03/11 ; TALMONT_Enq, solde, 4 900 €. Panneau : « Aucun doublon détecté » | Clic « Émettre » sur les deux : F2026-00007 et F2026-00008 ; les lignes partent vers « À envoyer » | Fabrice émet ce que Claire a vérifié : chaque facture est validée par deux personnes. |
| 6 bis | 10 s | Lucas Bernard · consultant › Chantiers › VARENNE_EnqSig › Informations | Onglets Pilotage, Informations, Frais (pas d'onglet Facturation). Ligne : « La facturation de ce chantier est suivie par Claire Morel (cheffe de projet) et Steve (facturation et relances). » | Zoom sur la ligne | Le consultant du chantier voit qui suit la facturation, pas les montants. |
| 7 | 16 s | Steve · facturation et relances › Facturation › À faire | Au 05/11, « Chez moi ». Bandeau orange : « BRENNE_Enq : bon de commande manquant, chantier créé il y a 7 jours ». Lignes : VARENNE_EnqSig, F2026-00007, 9 300 €, À envoyer, « Déposer sur le portail » ; TALMONT_Enq, F2026-00008, 4 900 €, À envoyer ; ORLAN_EnqHar, F2026-00006 (émise le 30/10), 16 000 €, À envoyer ; HALIOS_EnqSig, F2026-00004, 12 000 €, À encaisser, « En retard de 16 j » ; MERIDIA_EnqRPS, F2026-00005, 10 500 €, Contestée | Clic « Déposer » sur VARENNE : la ligne passe « À encaisser ». Clic « Préparer le rappel » sur HALIOS : un mail prêt à copier s'ouvre | Steve n'a plus d'Excel à remplir : il voit quoi déposer, quoi relancer et qui appeler. |
| 8 | 15 s | Steve · facturation et relances › Facturation › Par chantier | Au 20/11, groupé par chef de projet. Colonnes : Montant, Réalisé à fin octobre, Facturé, Écart, Prochaine échéance. Claire Morel : VARENNE_EnqSig, 18 600, 1 860, 9 300, « facturé d'avance 7 440 », Solde 18/12. Julien Petit : HALIOS_EnqSig, 24 000, 16 800, 12 000, « à facturer 4 800 », Solde 11/12 ; CAPELLE_Enq, 12 400, 12 400, 6 200, « à facturer 6 200 », Solde, badge « Solde chez le chef de projet depuis le 04/11 » | Surbrillance de la ligne CAPELLE | Chaque mois, Steve et chaque chef de projet comparent travail réalisé et facturé. |
| 9 | 20 s | Claire Morel · cheffe de projet › Chantiers › VARENNE_EnqSig › Fin de mission | Mail du 18/12, copie Steve : « VARENNE_EnqSig se termine aujourd'hui. On prépare le solde de 9 300 € HT ? 21 j saisis sur 25 prévus. » Boutons « Oui, préparer le solde », « Pas encore », « Un complément est à prévoir », et un champ « Ou répondez en une phrase » | Claire tape « Pas encore, la restitution est reportée au 8 janvier ». Alphonse propose « Reporter le solde au 08/01/2027 ? » ; clic « Confirmer ». La trace s'affiche : « Reporté par Claire Morel le 18/12 » | Claire répond en une phrase ; le report est noté et Steve le voit. |
| 10 | 16 s | Fabrice Ducellier · finance › Clôture du mois › Vérifications | Novembre 2026. Trois coches : « Temps saisis 14/14 », « Factures dues émises », « Brouillons traités ». Bouton « Clore novembre ». Puis trois montants : facturé en novembre 27 900 € ; travail réalisé non facturé 7 200 € ; facturé d'avance 9 016 € (dont VARENNE 1 116 €). Bouton « 3 fichiers pour le comptable » | Clic « Clore novembre » ; un cadenas se pose sur les montants ; les 3 fichiers se téléchargent | Novembre est clos : ses chiffres ne bougent plus, et le comptable reçoit trois fichiers. |
| 11 | 16 s | Fabrice Ducellier · finance › Finance | Deux colonnes. Aujourd'hui : Revue mensuelle, À préparer, Impayés, Facturier, Checklist, Ajustements FAE/PCA, Valorisation production. Demain : À faire, Par chantier, Registre, Vérifications, Travail réalisé et facturé, Mois clos | Une flèche par ligne, avec le pourquoi : « devient un statut », « suivi par chantier », « figé à la clôture » | Sept pages deviennent six, organisées autour de ce que chacun a à faire. |
| 12 | 14 s | Synthèse | Six cartes. Claire : dépose, vérifie, répond en une phrase. Steve : une liste au lieu d'un Excel. Fabrice : émet et clôt. Lucas Bernard, consultant : « voit qui suit la facturation, pas les montants ». Associé : lit ses chantiers. Comptable : 3 fichiers par mois. Carton : « Données fictives » | Les cartes apparaissent l'une après l'autre | Chacun n'agit qu'à son étape, et chaque facture a toujours un responsable. |

**Chiffres sous-jacents :**
- **ORLAN.** Facture émise le 30/10, donc comptée en octobre.
- **BRENNE.** Le bon de commande est arrivé le 10/11 ; la facture F2026-00009 de 7 500 € est émise le 12/11.
- **CAPELLE.** La facture F2026-00010 de 6 200 € est émise le 23/11.
- **Facturé en novembre.** 9 300 + 4 900 + 7 500 + 6 200 = 27 900 €.
- **VARENNE à fin novembre.** 11 j saisis sur 25, soit 8 184 € réalisés pour 9 300 € facturés.
- **Facturé d'avance.** VARENNE 1 116, BRENNE 1 500 et ORLAN 6 400, soit 9 016 €.
- **Travail réalisé non facturé.** HALIOS, 19 200 − 12 000 = 7 200 €.

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
| 3 fichiers pour le comptable, premier numéro | À créer | 2 petits | Zip ; `set_invoice_counter` |
