/* ==========================================================================
   FAQ.JS — comportements de la page
   --------------------------------------------------------------------------
   1. Animation d'ouverture / fermeture des accordéons
   2. Ouverture automatique via un lien (#id-de-la-question)
   3. Recherche dans les questions
   4. Pastille de catégorie active pendant le défilement
   5. Flèches de défilement des pastilles (mobile)
   6. Bouton « retour en haut »

   Tu n'as normalement pas besoin de modifier ce fichier :
   les questions se gèrent directement dans stage.html / alternance.html.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));

  /* ---------- 1. Animation des accordéons ---------- */
  items.forEach(function (item) {
    var summary = item.querySelector("summary");
    var answer = item.querySelector(".faq-item__answer");
    if (!summary || !answer) return;

    summary.addEventListener("click", function (event) {
      if (reduceMotion || !answer.animate) return; // comportement natif
      event.preventDefault();

      if (item.open) {
        // Fermeture
        var closing = answer.animate(
          [{ height: answer.offsetHeight + "px", opacity: 1 }, { height: "0px", opacity: 0 }],
          { duration: 240, easing: "ease-out" }
        );
        closing.onfinish = function () { item.open = false; };
      } else {
        // Ouverture
        item.open = true;
        var target = answer.offsetHeight;
        answer.animate(
          [{ height: "0px", opacity: 0 }, { height: target + "px", opacity: 1 }],
          { duration: 280, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" }
        );
      }
    });
  });

  /* ---------- 2. Ouvrir la question visée par le lien ---------- */
  function openFromHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.classList.contains("faq-item")) {
      target.open = true;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  /* ---------- 3. Recherche ---------- */
  var input = document.querySelector("[data-faq-search]");
  var groups = Array.prototype.slice.call(document.querySelectorAll(".faq-group"));
  var empty = document.querySelector("[data-faq-empty]");

  // Retire accents et majuscules : "Rémunération" = "remuneration"
  function normalize(text) {
    return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  items.forEach(function (item) { item.dataset.search = normalize(item.textContent); });

  if (input) {
    input.addEventListener("input", function () {
      var words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
      var total = 0;

      groups.forEach(function (group) {
        var visible = 0;
        group.querySelectorAll(".faq-item").forEach(function (item) {
          var match = words.every(function (w) { return item.dataset.search.indexOf(w) !== -1; });
          item.hidden = !match;
          if (match) visible++;
        });
        group.hidden = visible === 0;
        total += visible;
      });

      if (empty) empty.hidden = total !== 0;
    });
  }

  /* ---------- 4. Pastille active au défilement ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[href^='#']"));
  if ("IntersectionObserver" in window && chips.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        chips.forEach(function (chip) {
          var active = chip.getAttribute("href") === "#" + entry.target.id;
          chip.classList.toggle("is-active", active);
          if (active && chip.scrollIntoView) {
            chip.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
          }
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    groups.forEach(function (group) { observer.observe(group); });
  }

  /* ---------- 5. Flèches de défilement des pastilles ---------- */
  var scroller = document.querySelector("[data-chips-scroller]");
  if (scroller) {
    var list = scroller.querySelector(".chips");
    var prev = scroller.querySelector("[data-chips-prev]");
    var next = scroller.querySelector("[data-chips-next]");

    // Affiche / masque les flèches selon la position
    function updateArrows() {
      var max = list.scrollWidth - list.clientWidth;
      scroller.classList.toggle("is-scrollable", max > 4);
      scroller.classList.toggle("is-start", list.scrollLeft <= 4);
      scroller.classList.toggle("is-end", list.scrollLeft >= max - 4);
    }

    function scrollChips(direction) {
      list.scrollBy({ left: direction * list.clientWidth * 0.7, behavior: reduceMotion ? "auto" : "smooth" });
    }

    prev.addEventListener("click", function () { scrollChips(-1); });
    next.addEventListener("click", function () { scrollChips(1); });
    list.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();

    // Petit mouvement au chargement pour montrer qu'on peut faire glisser
    if (!reduceMotion && list.scrollWidth > list.clientWidth) {
      setTimeout(function () {
        list.scrollBy({ left: 60, behavior: "smooth" });
        setTimeout(function () { list.scrollBy({ left: -60, behavior: "smooth" }); }, 450);
      }, 700);
    }
  }

  /* ---------- 6. Bouton « retour en haut » ---------- */
  var backToTop = document.querySelector("[data-back-to-top]");
  if (backToTop) {
    function toggleBackToTop() {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", window.location.pathname);
    });
  }
})();
