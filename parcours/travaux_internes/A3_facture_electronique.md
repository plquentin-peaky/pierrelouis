# A3. Facturation électronique B2B : vérification sur sources officielles (état au 4 novembre 2026)

Entreprise visée : Plein Sens Ethique (SAS, PME de conseil, prestations de services, factures d'acompte et de solde à des entreprises françaises assujetties).

## Limite de méthode (à lire d'abord)

- Lecture directe impossible : `www.impots.gouv.fr` et `www.economie.gouv.fr` ne se résolvent pas depuis cette session (erreur DNS `ENOTFOUND`, domaines hors de la liste réseau autorisée). Conformément à la consigne de l'environnement, aucun autre site n'a été retenté (Légifrance, BOFiP, service-public non ouverts). L'agent « web-fetch » n'était pas disponible dans cette session.
- Ce qui a été fait : 9 recherches WebSearch restreintes aux domaines officiels (impots.gouv.fr, economie.gouv.fr, legifrance.gouv.fr, bofip.impots.gouv.fr, entreprendre.service-public.fr). Les citations ci-dessous sont les extraits renvoyés par le moteur de recherche à partir de ces pages officielles, non une lecture intégrale. Dates de mise à jour : non visibles sauf mention.
- Conséquence : « confirmé » signifie ici « confirmé par l'extrait officiel indexé ». Avant décision engageante, faire relire les pages citées (ou ouvrir le réseau vers impots.gouv.fr et legifrance.gouv.fr).

## Vérification point par point

### 1. Calendrier : réception 1/09/2026 pour tous, émission PME 1/09/2027
**Confirmé.**
- impots.gouv.fr, Fiche 3 TPE « À partir de quelle date mon entreprise doit-elle être prête » : https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiche-3_tpe_a-partir-de-quand-mon-entreprise-doit-etre-prete.pdf : les petites et micro-entreprises doivent « être en capacité d'émettre électroniquement leurs factures et de transmettre leurs données de e-reporting à partir du 1er septembre 2027 ».
- economie.gouv.fr, « Facturation électronique : la liste des 101 premières plateformes agréées » : « Au plus tard le 1er septembre 2026 : vous devez avoir fait le choix d'une plateforme agréée pour la réception des factures électroniques de vos fournisseurs. »
- impots.gouv.fr, FAQ « Je découvre la facturation électronique » (PDF) : les TPE/PME peuvent « anticiper sur l'échéance du 1er septembre 2027 ».

### 1 bis. Références des textes (LF 2026, décret 2026-677, arrêté du 27/07/2026)
**Confirmé, avec précisions.**
- Loi n° 2026-103 du 19 février 2026 de finances pour 2026, article 123 : https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053508878 (modifie notamment l'article 1737 du CGI).
- Décret n° 2026-677 du 27 juillet 2026 relatif à la généralisation de la facturation électronique : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054499487 ; publié au JORF n° 0174 du 28 juillet 2026. Il modifie les articles 242 nonies B et suivants de l'annexe II du CGI, remplace les notions de « plateformes de dématérialisation partenaires » et de PPF par « plateformes agréées », et crée les articles 242 nonies E bis à E quater (changement de plateforme, mobilité).
- Arrêté du 27 juillet 2026 : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054499535 ; modifie les articles 41 septies A et suivants de l'annexe IV (formats, accord formel de changement de plateforme). Rectificatif au JORF n° 0178 du 1er août 2026.
- Correction de forme : le calendrier de base (réception 2026, émission PME 2027) résulte de l'article 289 bis du CGI tel que fixé par la loi de finances pour 2024 (economie.gouv.fr : « selon le calendrier fixé par la loi de finances pour 2024 ») ; la LF 2026 et les textes de juillet 2026 l'ajustent sans le décaler pour les PME, d'après les extraits consultés.

### 2. Passage obligatoire par une plateforme agréée ; PPF réduit à annuaire et concentrateur ; logiciel maison = solution compatible
**Confirmé.**
- impots.gouv.fr, « Je découvre la facturation électronique » : les factures entre entreprises françaises « doivent être transmises obligatoirement sous un format électronique par l'intermédiaire d'un tiers, appelé plateforme agréée ».
- impots.gouv.fr, norme XP Z12-012 (https://www.impots.gouv.fr/factures-norme-afnor) : le PPF fournit les services d'« Annuaire des destinataires et de Concentrateur de Données ».
- impots.gouv.fr, fiches réforme : une solution compatible (logiciel de facturation, ERP) n'est pas immatriculée et « ne peut donc pas transmettre directement les factures à l'administration » ; elle passe par une plateforme agréée. L'échange ERP vers PA se fait par API normalisée (XP Z12-013, https://www.impots.gouv.fr/specifications-externes-b2b).
- Liste des PA : 101 premières plateformes immatriculées publiées le 16 janvier 2026 (presse.economie.gouv.fr), liste à jour dans l'espace Professionnel d'impots.gouv.fr (non lue).
- Nuance : le terme « OD » (opérateur de dématérialisation) n'apparaît plus dans les textes 2026 ; parler de « solution compatible ».

### 3. Formats Factur-X, UBL, CII ; un PDF seul n'est pas une facture électronique
**Confirmé.**
- impots.gouv.fr, fiche « L'émission de factures électroniques » (fiche-e-invoicing.pdf) : format « UBL, CII ou tout format mixte composé d'un fichier de données structurées et d'un fichier image » ; Factur-X = PDF/A-3 + XML CII (D22B).
- impots.gouv.fr, FAQ : « un document PDF n'est donc pas nécessairement une facture électronique » ; seules les données structurées valent facture.

### 4. Nouvelles mentions : SIREN client, adresse de livraison si différente, catégorie d'opération, option débits
**Confirmé, avec une nuance de calendrier.**
- impots.gouv.fr, fiches réforme et FAQ ; economie.gouv.fr « Mentions obligatoires d'une facture » : « le SIREN du client ; la catégorie de l'opération ; l'option de paiement de la TVA sur les débits ; l'adresse de livraison des biens ». Catégories codées LB (biens), PS (prestations de services), LBPS (mixte). Option débits : « mention en cas d'option ».
- Nuance : le tableau impots.gouv.fr des données à transmettre indique que l'adresse de livraison n'est transmise à l'administration qu'à partir du 1er septembre 2027. Pour PSE (services, pas de livraison), seule compte la catégorie « PS ».

### 5. Statuts obligatoires : déposée, rejetée, refusée, encaissée ; encaissée à la charge du fournisseur pour les services
**Confirmé, avec une exception à noter.**
- impots.gouv.fr, fiche-e-invoicing.pdf : les PA doivent proposer « a minima 4 statuts » ; « DÉPOSÉE », « REJETÉE » (par la plateforme : format, incohérence HT/TVA/TTC), « REFUSÉE » (par le destinataire, motivé), « ENCAISSÉE » qui « comprend les données de paiement (date et montant) ». Base légale : article 41 septies G annexe IV CGI (Légifrance).
- impots.gouv.fr, fiche « La transmission des données de paiement » et page « MAJ août 2026 Données de paiement à transmettre à l'administration » (https://www.impots.gouv.fr/e-reporting-donnees-de-paiement) : l'e-reporting de paiement vise les prestations de services et les acomptes, transmis par le fournisseur via le statut « encaissée » (numéro de facture, date de paiement, montant encaissé par taux de TVA).
- Exception : pas de données de paiement si le fournisseur a opté pour la TVA sur les débits, ni pour les opérations autoliquidées.

### 6. Amende de 50 euros par facture non conforme (LF 2026)
**Confirmé, à compléter.**
- Légifrance, article 1737 CGI (https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046869201) modifié par l'article 123 de la loi 2026-103 : amende portée de 15 euros à 50 euros par facture non émise sous forme électronique, plafond 15 000 euros par année civile.
- Pas d'amende en cas de première infraction réparée spontanément ou dans les 30 jours d'une demande de l'administration (article 1737, V ; FAQ DGFiP).
- Défaut de plateforme de réception : mise en demeure de 3 mois puis amende de 500 euros en cas de persistance (extrait Légifrance / FAQ).
- presse.economie.gouv.fr : le ministre annonce « pas de sanctions au démarrage de cette réforme pour les entreprises de bonne foi ».

### 7. Factures d'acompte : mêmes règles
**Confirmé.**
- impots.gouv.fr, norme XP Z12-012 : type de document « facture d'acompte » (code 386).
- impots.gouv.fr, fiche données de paiement : statut « encaissée » de la facture d'acompte, avec date et montant encaissé par taux.

## Implications concrètes pour l'ERP de PSE (8 lignes)

1. Calendrier : PSE reçoit déjà via une PA choisie (obligatoire depuis le 1/09/2026, à vérifier) ; émission électronique obligatoire au plus tard le 1/09/2027, viser une bascule et des tests au printemps 2027.
2. Choix d'une PA : en retenir une dans la liste officielle impots.gouv.fr disposant d'une API (XP Z12-013) ; l'ERP reste « solution compatible » et ne dépose jamais directement.
3. Numérotation : séquence continue et unique, sans trou, commune aux factures d'acompte (type 386) et de solde (type 380), avec lien de la facture de solde vers les acomptes déduits.
4. Mentions à stocker par facture : SIREN client (obligatoire, valider 9 chiffres et l'annuaire PPF), catégorie d'opération « PS », mention option débits si PSE a opté, adresse de livraison inutile pour du conseil.
5. Fiche client : SIREN, adresse de facturation électronique issue de l'annuaire, PA du client si connue.
6. Statuts : modéliser Déposée, Rejetée, Refusée, Encaissée (plus statuts facultatifs) remontés de la PA ; une facture Rejetée ou Refusée bloque la relance et exige un avoir ou une rectification.
7. Encaissée : à chaque paiement (y compris acompte), pousser vers la PA date et montant encaissé par taux de TVA, sauf si PSE a opté pour la TVA sur les débits.
8. Format : générer Factur-X (PDF/A-3 + CII) ou confier la génération à la PA à partir des données ERP ; ne plus envoyer de PDF par courriel comme facture B2B après le 1/09/2027.

## Sources officielles citées (extraits de recherche, non lus en intégralité)

- https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique
- https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-invoicing.pdf
- https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-reporting_paiements.pdf
- https://www.impots.gouv.fr/e-reporting-donnees-de-paiement (MAJ août 2026)
- https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiche-3_tpe_a-partir-de-quand-mon-entreprise-doit-etre-prete.pdf
- https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/faq---fe_je-decouvre-la-facturation-electronique.pdf
- https://www.impots.gouv.fr/factures-norme-afnor ; https://www.impots.gouv.fr/specifications-externes-b2b
- https://www.impots.gouv.fr/facturation-electronique-documentation-juridique
- https://www.economie.gouv.fr/actualites/facturation-electronique-la-liste-des-101-premieres-plateformes-agreees-est-disponible
- https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir
- https://presse.economie.gouv.fr/ (communiqués liste des PA et tolérance au démarrage)
- https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053508878 (LF 2026, art. 123)
- https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046869201 (CGI art. 1737)
- https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054499487 (décret 2026-677)
- https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054499535 (arrêté du 27/07/2026)
- https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069576/LEGISCTA000046386156/2026-08-12/ (ann. IV CGI, art. 41 septies A à P)
