/* ==========================================================================
   CONTACTS — Service Relations Entreprises
   --------------------------------------------------------------------------
   👉 Les contacts sont écrits UNE SEULE FOIS ici et s'affichent
      automatiquement en bas de stage.html ET de alternance.html.

   Pour modifier une personne : change le texte entre guillemets.
   Pour ajouter une photo : dépose-la dans assets/img/equipe/
      puis indique son chemin dans "photo", ex. "assets/img/equipe/juliette-loncle.jpg"
      (format carré conseillé, 400 x 400 px). Sans photo, les initiales s'affichent.
   Le texte du mail pré-rempli se modifie juste en dessous de la liste (MAIL_TEXTE).
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
   MAIL PRÉ-REMPLI
   Quand on clique sur une adresse, le mail s'ouvre avec cet objet et ce texte.
   {prenom} est remplacé par le prénom du contact,
   {sujet} par "stage" ou "alternance" selon la page.
   -------------------------------------------------------------------------- */
var MAIL_OBJET = "Question {sujet} — FAQ Relations Entreprises";

var MAIL_TEXTE = [
  "Bonjour {prenom},",
  "",
  "Nom et prénom : ",
  "Filière : ",
  "Ma question ou mon problème : ",
  "Démarches déjà effectuées : ",
  "Documents concernés (à joindre si besoin) : ",
  "",
  "Merci et bonne journée,"
].join("\n");

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
      ? '<img class="contact-card__photo" src="' + escape(c.photo) + '" alt="Photo de ' + escape(fullName) + '" width="72" height="72">'
      : '<span class="contact-card__initials" aria-hidden="true">' + escape(initials) + "</span>";

    var actions = "";
    if (c.email) {
      var sujet = document.body.getAttribute("data-faq") || "stage ou alternance";
      var mailto = "mailto:" + c.email +
        "?subject=" + encodeURIComponent(MAIL_OBJET.replace("{sujet}", sujet)) +
        "&body=" + encodeURIComponent(MAIL_TEXTE.replace("{prenom}", c.prenom));
      actions += '<a class="btn" href="' + escape(mailto) + '">' + escape(c.email) + "</a>";
    }
    if (c.rdv) {
      actions += '<a class="btn btn--outline" href="' + escape(c.rdv) + '" target="_blank" rel="noopener">Prendre rendez-vous</a>';
    }

    return (
      '<article class="contact-card">' +
        '<div class="contact-card__top">' + visual +
          '<div class="contact-card__identity">' +
            '<h4 class="contact-card__name">' + escape(c.prenom) +
              ' <span class="contact-card__lastname">' + escape(c.nom) + "</span></h4>" +
            '<p class="contact-card__role">' + escape(c.role) + "</p>" +
          "</div>" +
        "</div>" +
        (c.note ? '<p class="contact-card__note">' + escape(c.note) + "</p>" : "") +
        '<div class="contact-card__actions">' + actions + "</div>" +
      "</article>"
    );
  }).join("");
})();
