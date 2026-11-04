# E2 · Relecture de D1 avant envoi à PG

Verdict : le fond tient. À corriger avant envoi : l'ouverture de la vidéo, deux incohérences de chiffres, les noms, les traces internes.

## 1. Lecture PG

**Couvert (AO-3)** : dépôt du devis, infos et échéancier proposés, double validation, mail de fin de mission, écran Steve. Critères 3, 6, 8 solides.

**Ce qui le ferait décrocher**
1. **La vidéo s'ouvre sur un menu qui se réorganise (scène 1).** C'est exactement le « renommage » qu'il appelle « 1995 ». Supprimer la scène de la vidéo (le tableau du §3 suffit) et ouvrir sur la page blanche.
2. **L'alerte J+7 (infos manquantes) n'apparaît pas à l'écran.** Il l'a décrite mot pour mot. L'ajouter dans la scène Steve.
3. **La réponse en langage naturel manque.** Il a dit « tu lui réponds en langage naturel : non, j'attends… ». Trois boutons seulement, c'est un formulaire. Garder les boutons, mais montrer Claire qui répond en une phrase.
4. **Le contact facturation reste « à compléter ».** Il imaginait « glisser la signature de mail ». Montrer Claire glisser un mail : le contact se remplit. C'est le moment « ça dépote ».
5. **La règle de reprévision (AO-4, critère 9) est absente de D1.** Ajouter une ligne au §3 : « En novembre, octobre compte pour son réalisé ; figer le mois reste un contrôle des temps saisis. »
6. **Steve n'émet plus.** Aujourd'hui c'est son métier (15/07). Le dire comme une proposition ouverte, pas comme un acquis : « Fabrice émet ; Steve peut émettre par délégation. »
7. **52 jours de développement** sans jalon court. Présenter d'abord le lot 1 (environ 30 j) et ce qui sera montrable sur une vraie enquête.

**Traces internes à retirer du document**
- « Arbitrages entre A et B » : PG n'a jamais vu A et B. Renommer « Nos choix et pourquoi », supprimer la colonne des lettres et la ligne « Décision de Pierre-Louis ».
- §8 Faisabilité : retirer les noms de fichiers (`billing-helpers.ts`, migration `0041`…) et les mettre en annexe technique. Garder brique, taille, total.
- §4 : « fermée en base (0041) » devient « fermée aussi côté serveur ».
- §9 : titre « Questions pour le 12 novembre ». Q7 parle de PG à la troisième personne (« PG a épelé ») : réécrire « Prénom de Steve : vous nous l'avez épelé Stive le 08/10. Lequel retenir, et quel nom de famille ? ».

## 2. Lecture non-financier (vidéo sans son)

Les 13 légendes respectent 110 caractères et l'absence de tiret cadratin. Le problème : 13 scènes, des écrans trop chargés (scène 10 : 7 lignes × 6 colonnes) et du jargon.

**Jargon à remplacer à l'écran**

| À l'écran | Remplacer par |
|---|---|
| Steve · ADV | Steve · facturation et relances |
| CP (colonnes, « Chez le CP ») | « Chez la cheffe de projet » ; en colonne « Cheffe de projet » |
| CA du chantier / CA initial | Montant du chantier / montant du devis |
| BC | Bon de commande (en entier partout) |
| Produit à fin octobre | Travail réalisé à fin octobre |
| Facturé / produit non facturé | Travail réalisé non facturé, facturé d'avance |
| Pack comptable (Registre PLS, état figé, FEC) | « 3 fichiers pour le comptable » ; le détail reste dans le document |
| SIREN | garder, avec infobulle « numéro d'entreprise » |

**Dans le document** : expliciter une fois FAE (factures à établir), PCA (produits constatés d'avance), FEC (fichier des écritures comptables), e-reporting, plateforme agréée (prestataire agréé par l'État qui transmet les factures électroniques), types 386 et 380 (codes normés acompte et facture).

**Fusions et suppressions**
- Scène 1 (menu) : supprimée, remplacée par une ouverture « aujourd'hui » de 10 s.
- Scènes 3 et 4 : fusionnées (infos préremplies, entité retrouvée, contact trouvé par mail glissé).
- Scènes 6 et 13 : le consultant devient une carte de la synthèse.
- Scène 10 : garder 3 lignes (VARENNE, HALIOS, CAPELLE) et 4 colonnes (Montant, Réalisé, Facturé, Écart).
- Scène 12 : une seule vue, trois coches puis trois montants.

## 3. Lecture qualité

**Chiffres**
- **Scène 12, « facturé d'avance … dont VARENNE 1 860 »** : 1 860 est le travail réalisé de VARENNE à fin octobre (scène 10). Le spectateur y verra une erreur. Corriger : fin novembre, 11 j saisis sur 25, réalisé 8 184 €, donc **« dont VARENNE 1 116 € »** (9 300 − 8 184). Cohérent avec 21 j au 18/12.
- **Facturé en novembre 27 900 €** = VARENNE 9 300 + BRENNE 7 500 + TALMONT 4 900 + CAPELLE 6 200. C'est juste, à condition qu'ORLAN (F2026-00006) ait été émise en octobre. Ajouter « émise le 30/10 » sur la ligne ORLAN de la scène 9, sinon le total est faux.
- **Scène 8** : CAPELLE est « chez le CP depuis 04/11 » mais compte déjà dans les compteurs de Fabrice. Dater la scène 8 au **04/11**. VARENNE vérifiée le 03/11 : inchangé.
- **SIREN 812 345 678** : la clé de contrôle est invalide, et un contrôle Alphonse le rejetterait. Prendre **812 345 676** (clé valide), après avoir vérifié sur annuaire-entreprises qu'il n'appartient à aucune société réelle ; sinon en choisir un autre.
- Justes : TVA 11 160 TTC, échéancier 18 600, HALIOS 4 800, VARENNE 7 440, dates en semaine.
- VARENNE_Baro2025 : si PSE n'existait pas en 2025, renommer VARENNE_Baro2026.

**Noms**
- Julien Hamon → **Julien Petit** ; Sophie Marchal → **Sophie Martin** (noms des maquettes précédentes, scènes 10 et suivantes).
- **Steve / Stive** : PG a épelé « S-T-I-V-E » le 08/10. Écorcher ce prénom est le risque le plus bête du dossier : demander à Fabrice avant l'envoi.

**Promesses à adoucir**
- « la même sur bureau et mobile » (scène 1) : non montré, à retirer.
- « c'est tout » (scène 2) : Claire valide encore trois écrans. À retirer.
- « Alphonse transmet la facture par API » : remplacer par « par API si la plateforme le permet, sinon par fichier ». Le rôle de Dext en émission n'est pas confirmé (A1 §7).
- « Export FEC » : un FEC complet vient de l'outil comptable. Écrire « écritures de ventes au format FEC ».
- « la facture part à l'heure » : remplacer par une phrase vérifiable (voir légende 11).

## 4. Ordre final proposé (2 min 55)

| # | Durée | Ex. | Écran | Légende |
|---|---|---|---|---|
| 1 | 10 s | nouveau | Facturier Excel, copier-coller, liste de relances | Aujourd'hui, une facture passe par un Excel, des copier-coller et des relances à la main. |
| 2 | 12 s | 2 | Claire glisse devis et bon de commande | Claire dépose le devis signé et le bon de commande dans la fiche du chantier. |
| 3 | 22 s | 3+4 | Champs avec leur source ; entité retrouvée ; Claire glisse un mail, le contact se remplit (« signature du mail du 28/10 ») | Alphonse lit les documents, montre la source de chaque champ et retrouve le client existant. |
| 4 | 12 s | 5 | Échéancier 9 300 + 9 300 = 18 600 | L'acompte et le solde sont proposés : 50 % au lancement, 50 % à la fin. |
| 5 | 15 s | 7 | Brouillon d'acompte, fil des étapes | Claire relit la facture d'acompte. Le fil montre qui fait quoi ensuite. |
| 6 | 14 s | 8 | Liste de Fabrice au 04/11, clic « Émettre » | Fabrice émet ce que Claire a vérifié : deux personnes valident chaque facture. |
| 7 | 16 s | 9 | Liste de Steve ; ligne « BRENNE : bon de commande manquant depuis 7 jours » ; rappel HALIOS | Steve n'a plus d'Excel à remplir : il voit quoi déposer, quoi relancer et qui appeler. |
| 8 | 18 s | 10 | Par chantier, 3 lignes, CAPELLE surlignée | Chaque mois, Steve et chaque chef de projet comparent travail réalisé et montant facturé. |
| 9 | 22 s | 11 | Mail du 18/12 ; Claire tape « Pas encore, restitution le 8 janvier » ; Alphonse propose le 08/01, Claire confirme | Fin prévue du chantier : Claire répond en une phrase, le report est noté pour Steve. |
| 10 | 18 s | 12 | Clôture : 3 coches, 3 montants, « Clore novembre » | Fabrice clôt novembre : les chiffres ne bougent plus et le comptable reçoit trois fichiers. |
| 11 | 16 s | 6+13 | Six cartes, dont le consultant (« voit qui suit la facturation, pas les montants ») | Chacun n'agit qu'à son étape, et chaque facture a toujours un responsable. |

Total : 175 s, soit 2 min 55. Toutes les légendes font moins de 95 caractères.

## 5. Priorités

1. Retirer les traces internes (§1). 2. Corriger les chiffres et le SIREN (§3). 3. Noms : Petit, Martin, Steve ou Stive. 4. Nouvel ordre des scènes (§4), avec mail glissé, réponse en une phrase et alerte J+7. 5. Ajouter au document la règle de reprévision et le lexique.
