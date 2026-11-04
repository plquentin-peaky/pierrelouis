# B1 · Proposition A : évolution minimale, gain maximal

## 1. L'idée en 3 phrases

Alphonse a déjà 80 % du processus (échéancier, brouillon de facture, numérotation, file À préparer, impayés, facturier, clôture) : on l'allume, on le corrige, on ne le reconstruit pas. Le chef de projet ne fait qu'un geste, déposer le devis dans l'onglet Facturation de la fiche chantier, puis il vérifie ; Steve émet et suit dans la page Facturation qu'il connaît déjà. On ajoute quatre choses (documents, circuit de vérification, mail à trois boutons, tâches quotidiennes) et on retire tout ce qui fait doublon ou parle de rentabilité.

## 2. Le processus cible

| # | Quand | Qui | Écran | Sans IA | Avec IA |
|---|---|---|---|---|---|
| 1 | Signature du devis | Claire (CP) | Fiche chantier › Facturation | Elle saisit entité, BC, contact | Alphonse lit le devis et préremplit, chaque champ avec sa source |
| 2 | Même moment | Alphonse | idem | Règle fixe : 50 % au lancement, 50 % à la date de fin | Lit l'échéancier écrit dans le devis s'il diffère |
| 3 | Même moment | Alphonse | idem | Recherche par nom normalisé | Signale « Varenne Services SAS, déjà utilisée sur 2 chantiers » et les quasi-doublons |
| 4 | Date du jalon acompte | Tâche quotidienne | Brouillon dans la fiche | Brouillon créé depuis l'échéancier | Rien de plus |
| 5 | Dans la foulée | Claire | Circuit à droite du brouillon | « J'ai vérifié » ou « À corriger » | Signale un écart devis / brouillon |
| 6 | Après vérification | Steve | Facturation › À émettre | Émet (numéro définitif), dépose sur le portail, saisit la date | Prépare le mail d'accompagnement et rappelle « portail Varenne, BC obligatoire » |
| 7 | J+7 après création, infos incomplètes | Steve | Un seul mail récapitulatif hebdomadaire | Liste des chantiers concernés | Rédige le rappel à Claire, que Steve envoie s'il veut |
| 8 | Date de fin prévue (18/12) | Claire, Steve en copie | Mail à trois boutons | Mail fixe | Ajoute « 12 j consommés sur 15 prévus » |
| 9 | Réponse | Claire | Fiche chantier | Oui : brouillon de solde. Pas encore : elle décale la date. Complément : jalon « Complément, accord client attendu » | Rien de plus |
| 10 | Échéance dépassée | Steve | Facturation › Impayés | Consigne la relance | Rédige le brouillon de relance client |
| 11 | Début de mois | Fabrice | Clôture mensuelle | Checklist, figer, exports | Aucune : chiffres par formules |

Rien n'est émis sans les deux validations (Claire puis Steve). « Facturé » ne vient que de la facture émise.

## 3. La section Finance cible

| Aujourd'hui | Décision | Pourquoi |
|---|---|---|
| Facturation › Revue mensuelle | Renommer « Suivi » | C'est l'écran de Steve ; on retire « Rien à facturer » aux CP et « Facturable » (4e calcul de production) |
| Facturation › À préparer | Renommer « À émettre » | Reçoit aussi les brouillons vérifiés par le CP |
| Facturation › Impayés | Garder | Recouvrement, ajout du brouillon de relance |
| Facturation › Facturier | Garder, finance seule | Registre et export comptable ; plus visible des consultants |
| Clôture › Checklist | Garder | Expliquée en une phrase par ligne |
| Clôture › Ajustements FAE/PCA | Renommer « Produit non facturé » | Libellé compréhensible, état demandé par le comptable |
| Clôture › bouton « Passer en … » (4 statuts) | Supprimer | Figer / Rouvrir suffit |
| Valorisation production | Fusionner dans Clôture (onglet « Valeurs figées ») | Même public, même mois, une entrée de menu en moins |
| Fiche client › échéanciers | Supprimer | Doublon de la fiche chantier |
| Exports › Rentabilité des missions, Classeur CDG | Masquer pour PSE | Hors sujet |
| Onglet Facturation de la fiche chantier | Garder, enrichir | Point d'entrée du CP |

Arborescence cible :
```
Finance
├─ Facturation : Suivi · À émettre (n) · Impayés (n) · Facturier
└─ Clôture mensuelle : Checklist · Produit non facturé · Valeurs figées
Fiche chantier › Facturation : Documents · Informations · Échéancier · Factures du chantier
```

## 4. Ce que voit chaque profil

| Écran | Contributeur | Claire (CP) | Associé de réf. | Steve (ADV) | Fabrice | Comptable |
|---|---|---|---|---|---|---|
| Onglet Facturation du chantier | Masqué (aujourd'hui : montants et CA visibles) | Tout, modifie, vérifie | Lecture, ses chantiers | Tout | Tout | Non |
| Factures du chantier | Non | Statut, montant, payé | Lecture | Agit | Agit | Non |
| Facturation › Suivi | Non | Ses chantiers, lecture | Ses chantiers seulement (correction de `viewAll`) | Tout | Tout | Non |
| À émettre, Impayés | Non | Non | Non | Agit | Lecture | Non |
| Facturier | Non | Non | Non | Agit | Agit | Reçoit l'export |
| Clôture mensuelle | Non | Non | Non | Lecture | Agit | Reçoit FEC et état |

## 5. Les écrans à maquetter (11)

1. **Fiche VARENNE_EnqSig › Facturation, au départ.** Zone « Déposez le devis signé (PDF) », bandeau « Infos de facturation à compléter », échéancier vide, « CA du chantier : 18 600 € ».
2. **Informations préremplies.** Champs avec pastille de source : Client « Groupe Varenne Services » (fiche chantier), Entité (devis p. 1), BC « BC-VS-2026-0187 » (devis p. 3), Mode d'envoi « Portail fournisseurs » (devis p. 3), Contact facturation « à compléter » (orange). Encadré : « Varenne Services SAS est déjà utilisée sur 2 chantiers de ce client (VARENNE_Baro25, VARENNE_DiagRPS). » Boutons « Utiliser cette entité », « C'est une autre entité ». Bas : « Valider les informations ».
3. **Échéancier proposé.** Colonnes Type, Libellé, Date, Montant HT, Statut : Acompte 50 %, 16/11/2026, 9 300 € ; Solde 50 %, 18/12/2026, 9 300 €. Ligne verte « Total 18 600 € = CA initial ». Boutons « Accepter l'échéancier », « Modifier ».
4. **Facture d'acompte brouillon (vue Claire).** Aperçu BROUILLON, 9 300 € HT, 11 160 € TTC, BC rappelé. Circuit à droite : Préparée (Alphonse, 16/11) ✓, Vérifiée par le CP (en attente), Émise par la finance, Déposée sur le portail. Boutons « J'ai vérifié », « À corriger » (commentaire).
5. **Facturation › À émettre (Steve).** Ligne VARENNE_EnqSig, Acompte, 9 300 €, « Vérifiée par C. Morel le 16/11 ». Boutons « Émettre » puis « Marquer déposée » (date). Volet : mail d'accompagnement préparé, rappel « Portail Varenne : BC obligatoire ».
6. **Mail de fin de mission.** Objet « VARENNE_EnqSig se termine le 18/12 : on facture le solde ? ». Corps : 9 300 € restant, 12 j consommés sur 15. Boutons « Oui, préparer le solde », « Pas encore », « Un complément est à prévoir ». Copie Steve.
7. **« Pas encore ».** Fiche chantier, jalon Solde surligné, champ date passé au 15/01/2027, note « Restitution décalée », trace « Réponse de Claire, 18/12 ».
8. **Facturation › Suivi (Steve).** Tuiles « À émettre 3 », « Infos incomplètes 2 », « En retard 1 ». Colonnes Chantier, Client, CP, CA chantier, Facturé, Prochain jalon, Infos, Dernière réponse du CP.
9. **Facturation › Impayés.** Facture PSE-2026-0012, 11 160 € TTC, retard 12 j, bouton « Préparer une relance » (brouillon à relire).
10. **Clôture de novembre.** Trois étapes en clair : « 1. Les temps sont saisis », « 2. Les factures prévues sont parties », « 3. On fige et on envoie au comptable ». Tuiles « Facturé du mois », « Produit non facturé ». Boutons « Figer novembre », « Export FEC », « État pour le comptable ».
11. **Thomas, contributeur.** Même fiche : onglets Pilotage (sans budget) et Informations, plus d'onglet Facturation.

## 6. Ce qui est supprimé ou simplifié

- Calcul « Facturable » au tarif des grades : une seule production, celle de la clôture.
- Jalon coché « Facturé » à la main : le statut suit la facture.
- Bascule « À facturer » à l'ouverture de `/facturation` : remplacée par une tâche quotidienne.
- « Rien à facturer » pour les CP, crayon « Éditer » sans droit.
- Menu Valorisation production, statuts « Passer en … », échéanciers de la fiche client.
- Facturier et onglet Facturation pour les contributeurs.
- Listes de rôles en double (barre, mobile, `ROUTE_ACL`) : une seule source.
- Rentabilité et reprévision absentes des maquettes.

## 7. La faisabilité

| Brique | État | Taille | Fichiers |
|---|---|---|---|
| Allumer modules, `facturationEmettrice`, `cutoffComptable` pour PSE | Existe | S | `app_settings.feature_flags` |
| Dépôt du devis | À créer | L | `org-storage.functions.ts`, nouvelle table documents |
| Lecture du devis, sources par champ | À créer | M | base `expense-capture.functions.ts`, `MissionBillingInfoCard.tsx` |
| Entité existante avec compteur | À adapter | S | `MissionBillingInfoCard.tsx`, `ClientBillingEntities.tsx` |
| SIREN client et entité | À créer | S | migration, `BillingEntityDialog.tsx` |
| Type de jalon, échéancier 50/50 | À adapter | S | `BillingScheduleEditor.tsx` |
| Brouillon automatique, tâche quotidienne | À adapter | M | `createDraftInvoiceForMission`, `mark_due_billing_schedules` |
| Vérification CP, date de dépôt | À créer | M | table invoices, `BillingItemsQueue.tsx` |
| Factures dans la fiche chantier | À créer | S | `MissionDetail.tsx` |
| Mail à trois boutons, récapitulatif J+7 | À adapter | M | `email-layout.ts` |
| Brouillons de relance et de mail | À créer | S | `OverdueInvoicesView.tsx` |
| Droits contributeur, associé, Steve | À adapter | S | `feature-flags-store.ts`, `0041_droits_…sql`, `MobilePlusSheet.tsx` |
| Renommages, fusion Valorisation | À adapter | S | `Facturation.tsx`, `CutOff.tsx`, `AppSidebar.tsx` |
| Une seule production | À adapter | M | `AdvMissionsView.tsx`, `adv-review.ts` |

Un seul L, aucune nouvelle page.

## 8. Risques et questions ouvertes pour PG

1. PG a dit « un bouton sur la fiche, c'est des chevaux » : notre réponse est qu'il n'y a pas de bouton à penser, Alphonse prépare et relance ; à défendre.
2. Steve : rôle finance avec la clôture retirée par la matrice, Fabrice admin ? Prénom : Steve ou Stive ?
3. Complément : facture séparée ou intégré au solde ?
4. Plateforme agréée (Dext ?) et outil comptable : on prépare Factur-X et statuts plus tard, hors démo.
5. Numérotation PSE, IBAN, logo : attendus de Fabrice.
6. Masquer l'onglet Facturation aux contributeurs : d'accord ?
7. Règle 50/50 à confirmer avec Alice.
