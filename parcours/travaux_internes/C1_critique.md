# C1 · Critique croisée des propositions A et B

Code relu en lecture seule le 4/11 (`billing-helpers.ts`, `billing.functions.ts`, `CutOff.tsx`). Quatre constats changent l'analyse :
- **Figer = verrou comptable.** « Figer la période » passe le mois en `validee`. Dès lors, `assertCutoffOpen` refuse toute facture, tout avoir et tout encaissement datés dans ce mois (« Choisissez une date à partir du 1er… »). Aucune des deux propositions ne traite ce point.
- **Le FAE/PCA de la clôture est recalculé à chaque affichage** (avancement × budget, chantiers `en_cours` seulement), y compris pour l'export FEC. Seule « Valorisation production » lit des valeurs figées. Un chantier « terminé, reste à facturer » sort du produit non facturé.
- **Le statut « facturé » coché à la main survit côté serveur.** `upsertBillingSchedule` accepte `status: "facture"` de tout collaborateur actif, et `derivedBillingStatus` en tient compte en l'absence de facture. Le retirer de l'écran ne suffit pas.
- **Un avoir ne change pas le statut du jalon.** `derivedBillingStatus` ignore les avoirs : une facture annulée par avoir reste « Facturé » ou « En retard », et elle serait donc relancée.

## 1. Les six regards

### PG, sponsor
- **A.** Lisible, mais c'est exactement « on a automatisé notre process actuel » : on renomme Revue, À préparer, Impayés, Facturier. La phrase « il n'y a pas de bouton à penser » ne le convaincra pas, puisque l'arborescence est celle d'aujourd'hui.
- **B.** Il y trouve une idée neuve : une facture, une vie, un responsable à chaque étape. Les messages sont plafonnés (un par personne et par jour) et l'IA propose sans décider. C'est la base qui lui donnerait envie de confier d'autres sujets.
- **Ce qui le gênera dans B.** La disparition de la vue par chantier « facturé, produit, écart », qui est son lien facture-pilotage (21/07).
- **Scénario.** Le 20 du mois, PG veut savoir quels chantiers ont trop d'écart. A répond (Suivi). B le renvoie à la Clôture, qui lui est fermée.

### Claire, cheffe de projet
- **Gestes communs.** Dans les deux, Claire dépose le devis, valide les infos, valide l'échéancier, puis vérifie chaque facture et répond au mail de fin. Cela fait 3 gestes au lancement et 1 par facture. C'est acceptable.
- **Ce qui manque à B.** B envoie à Claire un mail de vérification pour chaque brouillon. Avec 6 enquêtes, cela fait 12 à 18 mails par an, en plus des relances. Il faut les regrouper dans le récapitulatif quotidien, ou ne lui montrer la demande que dans sa fiche.
- **BC reçu après le lancement.** B classe le brouillon « à préparer » (mention manquante) chez Steve : c'est juste. A ne dit rien, et Claire « vérifie » une facture que le portail Varenne refusera.
- **Chantier sans devis.** B prévoit « Remplir à la main ». A seulement implicitement. Dans les deux cas, la règle 50/50 s'applique au CA saisi : il faut que Claire voie d'où vient le montant.
- **Complément accepté tardivement, après l'émission du solde.** Aucune des deux ne dit qui augmente le CA du chantier (`revenueTotal`). Sans cela, l'échéancier affiche « ne couvre pas le CA » à l'envers, et le produit non facturé reste plafonné au budget.

### Thomas, consultant contributeur
- **Accord des deux propositions.** Elles masquent l'onglet Facturation. C'est juste : il n'en a pas besoin, et aujourd'hui il voit le CA qu'on lui cache dans Pilotage.
- **Oubli de B.** La politique `invoices_read_scoped` (migration 0041) laisse un contributeur lire les factures liées aux jalons de ses chantiers. Masquer l'onglet sans changer cette règle laisse une fuite par l'API ou le Facturier. A cite la migration, B non.
- **Ce qu'il doit voir.** Dans « Informations », une ligne sans montant : « Facturation suivie par Claire Morel et Steve ». Rien d'autre.

### Steve, ADV
- **A.** Garde ses repères : Suivi, À émettre, Impayés, Facturier. Il émet lui-même, comme aujourd'hui. Mais il n'a pas d'espace d'échanges par client, alors que PG l'a demandé explicitement.
- **B.** Lui donne une liste « Chez moi » et un journal par client. Mais il ne peut plus émettre : il prépare, dépose, encaisse. Le point mensuel avec chaque CP disparaît, et B le pose seulement en question.
- **Point de vigilance.** Ce point mensuel fait facturer les « zozos » ; on ne le supprime pas sans l'avis de Steve, jamais interviewé (PS-4).
- **Client qui refuse la facture.** Aucune des deux propositions ne prévoit de statut « contestée » avant 2027, ni de suspension des relances.
- **Acompte payé en retard.** Les deux affichent le retard. Mais si Steve saisit le 6/11 un virement reçu le 30/10 et qu'octobre est figé, le code refuse la date réelle. Or l'e-reporting « encaissée » exigera cette date réelle.
- **Remplace-t-on l'Excel ?** Oui, si le Registre garde l'export PLS. Seul B remplace aussi les mails éparpillés.

### Fabrice, finance
- **Contrôle.** B le place seul à « Émettre », ce qui répond à « CP puis finance ». Dans A, la finance, c'est Steve : Fabrice ne voit rien passer avant la clôture.
- **Droits.** Aujourd'hui, Steve et Fabrice ont le même rôle `finance` (`assertRole` dans `assertInvoiceManager`). Séparer leurs droits n'est pas un simple réglage de matrice.
- **Facture à corriger après émission.** `createCreditNote` existe, réservé à la finance. Mais aucune des deux propositions ne montre l'avoir dans la fiche chantier, ni le retour du jalon à « à préparer ».
- **Mois figé alors qu'une facture doit y être datée.** C'est le cas de l'acompte de fin octobre vérifié le 3/11. Le code impose de rouvrir le mois ou de dater en novembre. Il faut une règle écrite, que ni A ni B ne donnent.
- **Produit non facturé.** Le chiffre de la carte de clôture de B est recalculé à chaque affichage, et non figé.
- **Facture électronique 2027.** A la repousse « hors démo ». B relie déjà les statuts de la plateforme agréée et le SIREN. Ni l'une ni l'autre ne traite la numérotation unique acompte (type 386) et solde (type 380), avec le lien du solde vers l'acompte.

### Le développeur sceptique
- **Ordre de grandeur** (S = 1 à 2 jours, M = 3 à 5, L = 8 à 10) : environ 35 jours pour A, environ 50 pour B.
- **Briques sous-estimées par les deux :**
  - la tâche planifiée : le brouillon automatique appelle `createDraftInvoiceForMission`, réservé à finance et admin, et il faut donc une fonction serveur à privilèges ;
  - l'envoi réel des mails, « à activer » ;
  - le retrait du statut manuel côté serveur ;
  - « une seule production », qui touche trois calculs et leurs tests (M à L).
- **Propre à B :** le rôle ADV séparé (S annoncé, M réel) et la suppression de la Revue.
- **Risque de régression.** Plein Sens partage ce code. Toute suppression ou tout renommage doit passer par un réglage propre à l'organisation PSE, sinon Fabrice perd sa Revue côté Plein Sens.

## 2. Notes sur les 12 critères (0 à 3)

| # | Critère | A | B | Justification |
|---|---|---|---|---|
| 1 | Page blanche | 1 | 2 | A renomme l'existant ; B part du cycle de vie de la facture |
| 2 | Un geste CP | 2 | 2 | Dépôt unique, mais 3 validations au lancement dans les deux |
| 3 | Proposition puis double validation | 2 | 3 | A : CP puis Steve, sans Fabrice ; B : CP puis Fabrice |
| 4 | Peu de messages | 2 | 2 | A : récapitulatif hebdomadaire ; B : plafond quotidien mais mail de vérification à chaque facture |
| 5 | Steve de la saisie à la relation | 2 | 3 | Le journal client et « Chez moi » sont dans B seulement |
| 6 | Une vérité sur « facturé » | 2 | 3 | B formalise le statut calculé ; les deux oublient le serveur et les avoirs |
| 7 | Facture et pilotage réconciliés | 2 | 1 | B supprime la vue budget, facturé, écart par chantier |
| 8 | Chiffres déterministes et figés | 2 | 2 | Aucune ne voit que FAE/PCA et FEC sont recalculés à chaque affichage |
| 9 | Reprévision calendaire | 1 | 1 | Absente des deux (AO-4), même hors vidéo |
| 10 | Chaîne aval | 1 | 2 | A repousse ; B relie les statuts de la plateforme et le SIREN |
| 11 | Pas de contrainte, bons mots | 2 | 2 | « Mois clos » et « À faire » sont neutres ; la vérification par mail de B pèse sur Claire |
| 12 | Démarrage maîtrisé | 3 | 2 | A est plus petit et montrable vite ; B touche plus de code partagé |
| | **Total** | **22** | **25** | |

## 3. Les cinq failles les plus graves

**Proposition A**
1. Elle donne à PG l'impression d'un renommage : c'est le reproche « 95 » qu'il a lui-même formulé.
2. Fabrice est absent du circuit d'émission. La « double validation » se réduit à CP puis Steve.
3. Pas d'espace d'échanges par client pour Steve, pourtant demandé le 04/11.
4. La facture électronique est renvoyée à plus tard, sans modèle de statuts ni numérotation.
5. Rien sur l'avoir, le refus client, le BC tardif ou le mois figé.

**Proposition B**
1. La suppression de la Revue fait perdre la vue budget, facturé, écart par chantier, ainsi que le point mensuel Steve/CP.
2. Un mail de vérification par facture pour Claire, ce qui contredit « peu de messages ».
3. La séparation Steve/Fabrice est chiffrée S alors qu'elle touche les contrôles serveur.
4. L'onglet est masqué au contributeur sans correction de la règle d'accès en base (0041).
5. Le produit non facturé est montré comme figé alors qu'il est recalculé ; les cas de l'avoir et du mois figé ne sont pas traités.

## 4. Synthèse recommandée

**Colonne vertébrale prise à B.** Statut unique calculé, un responsable par statut, liste « À faire » avec filtre « Chez moi », Fabrice seul à émettre, journal ADV sur la fiche client, deux états de clôture, menu identique sur bureau et mobile, branchement des statuts de la plateforme agréée.

**Pris à A.**
- La vue par chantier, conservée et renommée.
- Le récapitulatif groupé des infos manquantes.
- La correction de la migration 0041 et de la portée de l'associé.
- La prudence de périmètre : tout passe derrière un réglage PSE.

**Ajouts indispensables :**
- statut « Contestée » (relances suspendues) ;
- avoir visible dans la fiche chantier, jalon revenu à « à préparer » ;
- statut manuel interdit côté serveur ;
- date d'encaissement réelle acceptée dans un mois figé (date comptable distincte) ;
- produit non facturé lu dans les valeurs figées à la clôture, chantiers terminés compris.

**Section Finance cible :**
```
Finance
├ Factures
│  ├ À faire (n)        statut, responsable, « Chez moi » ; Steve, Fabrice ; associé en lecture (ses chantiers)
│  ├ Par chantier       budget, facturé, encaissé, écart, prochain jalon, groupé par CP ; sert au point mensuel
│  └ Registre           ex-Facturier, export PLS ; Steve, Fabrice, comptable
└ Clôture du mois
   ├ Vérifications      temps saisis, factures du mois émises, brouillons traités
   ├ Facturé / produit non facturé   état figé pour le comptable, export
   └ Mois clos          ex-Valorisation production, lecture
Fiche chantier › Facturation : Devis et documents · Infos de facturation (sources) · Échéancier (statut calculé) · Factures et avoirs
Fiche client › Facturation : Entités (compteur de chantiers) · Factures · Journal ADV
```

**Ce que voient les profils :**
- **Contributeur :** ni onglet Facturation, ni Finance, ni lecture des factures en base. Une ligne « Facturation suivie par Claire Morel et Steve » dans Informations.
- **Claire :** sa fiche chantier en entier, plus la vue « Par chantier » filtrée sur ses chantiers.
- **Comptable :** Registre et Clôture, en lecture et export.

**Arbitrages proposés :**
- La vérification de Claire se fait dans la fiche, et sa demande apparaît dans un récapitulatif quotidien, pas dans un mail par facture.
- Le complément donne toujours lieu à une facture séparée, après mise à jour du CA du chantier par Claire avec l'accord client joint. C'est plus simple pour le FAE et la facture électronique.
- Une facture due dans un mois figé est datée du 1er du mois suivant, sauf réouverture décidée par Fabrice.

**Questions à trancher par PG :**
1. Qui émet : Fabrice seul, ou Steve avec délégation ?
2. Garde-t-on le point mensuel Steve/CP, appuyé sur « Par chantier » ?
3. Complément séparé ou intégré au solde ?
4. Le contributeur ne voit-il vraiment rien ?
5. Steve ou Stive ?
6. Quels sont l'outil comptable et la plateforme agréée (Dext ?) ?
7. Quelle règle pour le mois figé : date au 1er du mois suivant, ou réouverture ?
8. L'associé voit-il tout ou seulement ses chantiers ?
