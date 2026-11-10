# FAQ Relations Entreprises — Ynov Montpellier

Deux pages FAQ (stage et alternance), responsive et mobile first, dans la DA Ynov.
Chaque page est pensée pour être ouverte via son propre QR code.

## Structure du dossier

```
faq-relations-entreprises/
├── index.html            → page d'accueil : choix Stage / Alternance
├── stage.html            → FAQ Stage        (QR code 1)
├── alternance.html       → FAQ Alternance   (QR code 2)
├── README.md
└── assets/
    ├── css/
    │   ├── variables.css → couleurs, polices, arrondis, espacements
    │   └── style.css     → mise en page (commentée par sections)
    ├── js/
    │   ├── contacts.js   → les 3 contacts du service (affichés sur les 2 pages)
    │   └── faq.js        → animation des accordéons, recherche, liens directs
    └── img/
        ├── logo-ynov.png → logo officiel
        └── equipe/       → photos des contacts (400 × 400 px)
```

## Modifier le contenu

### Une question ou une réponse
Ouvre `stage.html` ou `alternance.html`. Chaque question est un bloc :

```html
<details class="faq-item" id="mon-id-unique">
  <summary class="faq-item__question">
    <span class="faq-item__title">Ma question ?</span>
    <span class="faq-item__icon" aria-hidden="true"></span>
  </summary>
  <div class="faq-item__answer">
    <p>Ma réponse.</p>
  </div>
</details>
```

- **Ajouter** : copie un bloc entier et colle-le dans le bon groupe.
- **Supprimer** : efface le bloc de `<details>` jusqu'à `</details>`.
- L'`id` doit être unique, sans espace ni accent.

Éléments disponibles dans une réponse :
- encadré conseil : `<div class="note"><span class="note__label">Conseil</span><p>…</p></div>`
- encadré important (fond noir) : ajoute `note--alert` → `<div class="note note--alert">`
- étapes numérotées : `<ol class="steps"><li>…</li></ol>`

### Les contacts
Tout est dans `assets/js/contacts.js` (modifié une fois, mis à jour sur les deux pages).
Pour une photo : dépose-la dans `assets/img/equipe/` (carré, ~300 × 300 px) et indique le chemin dans `photo`.

### Les couleurs et polices
Tout est dans `assets/css/variables.css`.

### Le logo
Le logo officiel est `assets/img/logo-ynov.png` (version claire, pour le header noir).
Pour le changer, remplace ce fichier en gardant le même nom.

## Liens directs vers une question
Chaque question s'ouvre automatiquement avec son `id` dans l'URL, par exemple :
`…/stage.html#generer-convention` ou `…/alternance.html#remuneration`.

## Mise en ligne avec GitHub Pages
1. Crée un dépôt et envoie tout le contenu du dossier à la racine.
2. Dans le dépôt : **Settings → Pages → Branch : main / root → Save**.
3. Le site est en ligne à `https://<ton-compte>.github.io/<nom-du-depot>/`.

## QR codes
Génère un QR code pour chacune de ces adresses :
- **Stage** : `https://<ton-compte>.github.io/<nom-du-depot>/stage.html`
- **Alternance** : `https://<ton-compte>.github.io/<nom-du-depot>/alternance.html`

Teste-les sur téléphone avant impression.
