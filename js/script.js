/* ==========================================================================
   VELVET CRUMB — Site Script
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initSmoothScroll();
    initScrollReveal();
    initHeroHeadline();
    initCustomizer();
    initTestimonialCarousel();
    initGalleryFilters();
    initLightbox();
    initFinalCtaParallax();
    initUploadZone();
    initOrderForm();
    initYear();
  });

  /* ---- Navigation -------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector(".site-nav");
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 40) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var toggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector(".mobile-drawer");
    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        var open = toggle.classList.toggle("open");
        drawer.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.classList.toggle("no-scroll", open);
      });
      drawer.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.classList.remove("open");
          drawer.classList.remove("open");
          document.body.classList.remove("no-scroll");
        });
      });
    }
  }

  /* ---- Smooth scroll for in-page nav links -------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var navH = document.querySelector(".site-nav") ? document.querySelector(".site-nav").offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  }

  /* ---- Scroll reveal ------------------------------------------------------ */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal], .vc-divider");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { io.observe(el); });

    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    });
  }

  /* ---- Hero headline reveal ------------------------------------------------ */
  function initHeroHeadline() {
    var title = document.querySelector(".hero-title");
    if (!title) return;
    requestAnimationFrame(function () {
      setTimeout(function () { title.classList.add("reveal"); }, 300);
    });
  }

  /* ---- Custom cake experience (frontend-only demo) ------------------------- */
  function initCustomizer() {
    var wrap = document.querySelector(".customize-options");
    if (!wrap) return;

    var state = { flavour: "Vanilla", style: "Minimal", colour: "Blush" };
    var summaryEl = document.querySelector(".customize-summary p");

    function updateSummary() {
      if (!summaryEl) return;
      summaryEl.innerHTML =
        "Your cake so far: <b>" + state.flavour + "</b> flavour, " +
        "<b>" + state.style + "</b> style, in <b>" + state.colour + "</b> tones.";
    }

    wrap.querySelectorAll(".pill[data-group]").forEach(function (pill) {
      pill.addEventListener("click", function () {
        var group = pill.getAttribute("data-group");
        wrap.querySelectorAll('.pill[data-group="' + group + '"]').forEach(function (p) {
          p.classList.remove("selected");
        });
        pill.classList.add("selected");
        state[group] = pill.textContent.trim();
        updateSummary();
      });
    });

    wrap.querySelectorAll(".swatch").forEach(function (swatch) {
      swatch.addEventListener("click", function () {
        wrap.querySelectorAll(".swatch").forEach(function (s) { s.classList.remove("selected"); });
        swatch.classList.add("selected");
        state.colour = swatch.getAttribute("data-name") || state.colour;
        updateSummary();
      });
    });

    updateSummary();
  }

  /* ---- Testimonial carousel ------------------------------------------------- */
  function initTestimonialCarousel() {
    var track = document.querySelector(".t-track");
    if (!track) return;
    var slides = track.children;
    var dotsWrap = document.querySelector(".t-dots");
    var index = 0;
    var timer;

    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", "Show review " + (i + 1));
      (function (idx) {
        dot.addEventListener("click", function () { goTo(idx); resetTimer(); });
      })(i);
      dotsWrap.appendChild(dot);
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      Array.prototype.forEach.call(dotsWrap.children, function (d, di) {
        d.classList.toggle("active", di === index);
      });
    }
    function resetTimer() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { goTo(index + 1); }, 5500);
    }
    goTo(0);
    resetTimer();
  }

  /* ---- Gallery filters -------------------------------------------------------- */
  function initGalleryFilters() {
    var filters = document.querySelectorAll(".g-filter");
    if (!filters.length) return;
    var items = document.querySelectorAll(".g-item");

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (item) {
          var match = cat === "all" || item.getAttribute("data-cat") === cat;
          item.classList.toggle("hidden", !match);
        });
      });
    });
  }

  /* ---- Lightbox ------------------------------------------------------------------ */
  function initLightbox() {
    var items = document.querySelectorAll(".g-item");
    var lightbox = document.querySelector(".lightbox");
    if (!items.length || !lightbox) return;

    var imgEl = lightbox.querySelector("img");
    var nameEl = lightbox.querySelector(".lightbox-caption .name");
    var catEl = lightbox.querySelector(".lightbox-caption .cat");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-nav.prev");
    var nextBtn = lightbox.querySelector(".lightbox-nav.next");
    var list = Array.prototype.slice.call(items);
    var current = 0;

    function render(i) {
      current = i;
      var item = list[current];
      var img = item.querySelector("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      if (nameEl) nameEl.textContent = item.getAttribute("data-name") || img.alt;
      if (catEl) catEl.textContent = item.getAttribute("data-cat") || "";
    }
    function open(i) {
      render(i);
      lightbox.classList.add("open");
      document.body.classList.add("no-scroll");
    }
    function close() {
      lightbox.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
    function show(delta) { render((current + delta + list.length) % list.length); }

    list.forEach(function (item, i) {
      item.addEventListener("click", function () { open(i); });
    });
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(-1); });
    nextBtn.addEventListener("click", function () { show(1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    });
  }

  /* ---- Final CTA parallax ------------------------------------------------------- */
  function initFinalCtaParallax() {
    if (reduceMotion) return;
    var img = document.querySelector(".final-cta img");
    if (!img) return;
    var ticking = false;
    function update() {
      var rect = img.parentElement.getBoundingClientRect();
      var vh = window.innerHeight;
      var offset = (rect.top - vh / 2) * 0.12;
      img.style.transform = "translateY(" + offset.toFixed(1) + "px)";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---- Upload zone (frontend-only) ------------------------------------------------ */
  function initUploadZone() {
    var zone = document.querySelector(".upload-zone");
    if (!zone) return;
    var input = zone.querySelector("input[type=file]");
    var filenameEl = document.querySelector(".upload-filename");

    function showFile(file) {
      if (!file) return;
      filenameEl.textContent = "Attached: " + file.name;
      filenameEl.style.display = "block";
    }

    zone.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function () { showFile(input.files[0]); });

    ["dragover", "dragenter"].forEach(function (evt) {
      zone.addEventListener(evt, function (e) {
        e.preventDefault();
        zone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach(function (evt) {
      zone.addEventListener(evt, function (e) {
        e.preventDefault();
        zone.classList.remove("dragover");
      });
    });
    zone.addEventListener("drop", function (e) {
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        showFile(e.dataTransfer.files[0]);
      }
    });
  }

  /* ---- Form validation helpers ---------------------------------------------------- */
  function setFieldError(group, message) {
    var errorEl = group.querySelector(".field-error");
    if (message) {
      group.classList.add("error");
      if (errorEl) errorEl.textContent = message;
    } else {
      group.classList.remove("error");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function validateField(input) {
    var group = input.closest(".form-group");
    if (!group) return true;
    var value = input.value.trim();

    if (input.hasAttribute("required") && !value) {
      setFieldError(group, "This field is required.");
      return false;
    }
    if (input.type === "email" && value) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) { setFieldError(group, "Enter a valid email address."); return false; }
    }
    if (input.type === "tel" && value) {
      var re2 = /^[0-9+\-\s()]{7,}$/;
      if (!re2.test(value)) { setFieldError(group, "Enter a valid phone number."); return false; }
    }
    if (input.type === "date" && value) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var chosen = new Date(value);
      if (chosen < today) { setFieldError(group, "Please choose a future date."); return false; }
    }
    setFieldError(group, "");
    return true;
  }

  /* ---- Order / enquiry form --------------------------------------------------------- */
  function initOrderForm() {
    var form = document.getElementById("order-form");
    if (!form) return;
    var successEl = document.querySelector(".order-success");
    var fields = form.querySelectorAll("input[required], select[required], textarea[required], input[type=email], input[type=tel]");

    fields.forEach(function (f) {
      f.addEventListener("blur", function () { validateField(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      fields.forEach(function (f) { if (!validateField(f)) valid = false; });
      if (!valid) {
        var firstError = form.querySelector(".form-group.error input, .form-group.error select, .form-group.error textarea");
        if (firstError) firstError.focus();
        return;
      }

      form.style.display = "none";
      var head = document.querySelector(".order-form-head");
      if (head) head.style.display = "none";
      successEl.classList.add("show");
      successEl.setAttribute("tabindex", "-1");
      successEl.focus();
    });
  }

  /* ---- Footer year -------------------------------------------------------------------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
