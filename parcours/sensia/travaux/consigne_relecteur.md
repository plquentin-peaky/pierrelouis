# Consigne du relecteur indépendant : vidéo « Compléter Alphonse depuis Sens IA »

Tu es un relecteur indépendant. Tu n'as pas participé à la fabrication de la vidéo. Ton rôle : la regarder avec les yeux de son destinataire et dire ce qui doit être corrigé pour qu'elle soit irréprochable demain.

## Le contexte
- AI Origin a construit Alphonse (ERP de gestion des chantiers, feuilles de temps et facturation) pour le cabinet de conseil Plein Sens et sa filiale Plein Sens Ethique. Le cabinet utilise aussi Sens IA, un assistant conversationnel interne (modes Cowork et Chat, connecteurs Outlook, Teams, SharePoint, agents, projets).
- Jeudi 12 novembre à 14 h, atelier facturation avec Pierre-Guillaume Ferré (associé, sponsor, non technicien, exigeant, aime comprendre vite) et Fabrice Ducellier (responsable administratif et financier, précis sur les chiffres et les règles de gestion).
- Cette vidéo est un complément « et demain ? » : elle doit aider Pierre-Guillaume à SE PROJETER dans une intégration plus profonde, où l'on complète Alphonse en parlant à Sens IA, via un connecteur MCP. Ce n'est PAS une proposition commerciale : aucun discours de vente, aucun prix de prestation, aucune promesse de délai.
- Deux cas d'usage demandés : (1) une consultante fait remplir sa feuille de temps à partir de sa semaine (agenda, mails, conversations Sens IA), elle valide et cela s'inscrit dans Alphonse ; (2) une cheffe de projet demande d'aller chercher un mail, un devis, une proposition, pour alimenter la facturation du chantier dans Alphonse. Un troisième personnage côté finance (Stive) est permis.
- Exigences du commanditaire : reprendre les interfaces de Sens IA et d'Alphonse telles qu'elles sont ; montrer les deux côte à côte avec une animation qui fait comprendre que la donnée passe par le MCP ; des cartons plein écran entre les cas et les personnages pour que la vidéo n'aille pas trop vite ; durée de 2 min 30 à 3 min au maximum ; voix off ; données fictives ; orthographe « Stive » ; jamais de tiret cadratin ; français soigné, compréhensible par un non technicien.

## Les fichiers
- Vidéo : `/home/claude/pierrelouis/parcours/Projection_SensIA_Alphonse.mp4` (1920 × 1080, avec voix off).
- Texte de la voix off : `/home/claude/pierrelouis/parcours/sensia/voix.md`. Instants de départ de chaque segment et chapitres : `/home/claude/pierrelouis/parcours/sensia/chapitres.txt`. Durée de chaque segment audio : `ffprobe` sur `/home/claude/pierrelouis/parcours/sensia/audio/sNN.mp3`.
- Tu ne peux pas écouter l'audio : contrôle la synchronisation en comparant, pour chaque segment, ce que dit la voix (texte + instant de départ + durée) et ce que montre l'image à ces instants.
- Sources (lecture seule, ne rien modifier) : `/home/claude/pierrelouis/parcours/sensia/source/video.js` et `gabarit.html`.

## La méthode
1. Extrais des images avec ffmpeg dans `/home/claude/pierrelouis/parcours/sensia/revue/boucleN/` (N = numéro de boucle donné dans ta mission) : une image par seconde en 1920 px pour la lisibilité, et regarde-les réellement (outil Read sur les images). Regarde au minimum une image toutes les 2 secondes, et toutes les images autour des moments clés (transit par le MCP, écriture dans Alphonse, cartons).
2. Juge successivement comme Pierre-Guillaume (comprend-on en une fois ? le rythme laisse-t-il le temps de lire ? voit-on que la donnée passe de Sens IA à Alphonse par le MCP ? y a-t-il quoi que ce soit qui ressemble à de la vente ?), puis comme Fabrice (chiffres, dates, totaux, statuts, règles : tout est-il cohérent d'un écran à l'autre et entre la voix et l'image ?).
3. Vérifie la lisibilité réelle des textes à l'écran (taille), les débordements, recouvrements, éléments coupés, pastilles en transit mal placées, fautes, incohérences de dates (la semaine du 9 au 13 novembre 2026, le 11 novembre est férié, le 13 est un vendredi), de montants, de noms.
4. Vérifie la durée totale et le rythme de chaque séquence : trop rapide, trop lent, temps mort.

## Le rendu
Écris ton rapport dans `/home/claude/pierrelouis/parcours/sensia/travaux/relecture_boucleN.md`, en français, sans tiret cadratin :
- un verdict en une ligne (« montrable en l'état », « montrable après corrections mineures », « à reprendre ») ;
- les constats classés BLOQUANT, IMPORTANT, MINEUR, chacun avec l'instant (mm:ss), ce que l'on voit, pourquoi c'est un problème pour Pierre-Guillaume ou Fabrice, et la correction précise proposée ;
- ce qui fonctionne bien et qu'il ne faut pas casser (3 à 5 points) ;
- lors des boucles 2 et 3 : pour chaque constat de la boucle précédente, dis s'il est corrigé, en le vérifiant sur les images.
Sois concret et exigeant. Ne propose pas d'ajouter du contenu qui allongerait la vidéo au-delà de 3 minutes. Termine ta réponse par un résumé de dix lignes au plus.
