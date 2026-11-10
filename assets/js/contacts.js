/* ==========================================================================
   CONTACTS — Service Relations Entreprises
   --------------------------------------------------------------------------
   👉 Les contacts sont écrits UNE SEULE FOIS ici et s'affichent
      automatiquement en bas de stage.html ET de alternance.html.

   Pour modifier une personne : change le texte entre guillemets.
   Pour ajouter une photo : dépose-la dans assets/img/equipe/
      puis indique son chemin dans "photo", ex. "assets/img/equipe/juliette-loncle.jpg"
      (format carré conseillé, 300 x 300 px). Sans photo, les initiales s'affichent.
   Pour ajouter un bouton de prise de rendez-vous : remplis "rdv" avec le lien.
   ========================================================================== */

var CONTACTS = [
  {
    prenom: "Juliette",
    nom: "LONCLE",
    role: "Responsable du service Relations Entreprises",
    note: "Pour toute question sur le fonctionnement du service.",
    email: "juliette.loncle@ynov.com",
    rdv: "",
    photo: "assets/img/equipe/juliette-loncle.jpg"
  },
  {
    prenom: "Mathieu",
    nom: "FAIVRET",
    role: "Chargé des relations entreprises",
    note: "Ton interlocuteur pour les contrats d'alternance.",
    email: "mathieu.faivret@ynov.com",
    rdv: "",
    photo: "assets/img/equipe/mathieu-faivret.jpg"
  },
  {
    prenom: "Elisa",
    nom: "GORBATOFF BENATMANE",
    role: "Chargée des relations entreprises",
    note: "Coaching personnalisé pour ta recherche de stage ou d'alternance.",
    email: "elisa.gorbatoff@ynov.com",
    rdv: "https://calendly.com/elisa-gorbatoff-ynov/ynovcampus-rendez-vous-etudiant",
    photo: "assets/img/equipe/elisa-gorbatoff.jpg"
  }
];

/* --------------------------------------------------------------------------
   Affichage des cartes — pas besoin de modifier en dessous
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var container = document.querySelector("[data-contacts]");
  if (!container) return;

  function escape(text) {
    var div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  container.innerHTML = CONTACTS.map(function (c) {
    var fullName = c.prenom + " " + c.nom;
    var initials = (c.prenom.charAt(0) + c.nom.charAt(0)).toUpperCase();

    var visual = c.photo
      ? '<img class="contact-card__photo" src="' + escape(c.photo) + '" alt="Photo de ' + escape(fullName) + '" loading="lazy" width="64" height="64">'
      : '<span class="contact-card__initials" aria-hidden="true">' + escape(initials) + "</span>";

    var actions = "";
    if (c.email) {
      actions += '<a class="btn" href="mailto:' + escape(c.email) + '">' + escape(c.email) + "</a>";
    }
    if (c.rdv) {
      actions += '<a class="btn btn--outline" href="' + escape(c.rdv) + '" target="_blank" rel="noopener">Prendre rendez-vous</a>';
    }

    return (
      '<article class="contact-card">' +
        '<div class="contact-card__top">' + visual +
          "<div>" +
            '<h4 class="contact-card__name">' + escape(fullName) + "</h4>" +
            '<p class="contact-card__role">' + escape(c.role) + "</p>" +
          "</div>" +
        "</div>" +
        (c.note ? '<p class="contact-card__note">' + escape(c.note) + "</p>" : "") +
        '<div class="contact-card__actions">' + actions + "</div>" +
      "</article>"
    );
  }).join("");
})();
