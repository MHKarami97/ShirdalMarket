(function () {
  "use strict";

  const ThemeManager = {
    key: "sheerdal-theme",
    toggleBtn: document.getElementById("themeToggle"),
    sunIcon: document.getElementById("iconSun"),
    moonIcon: document.getElementById("iconMoon"),

    init() {
      const saved = localStorage.getItem(this.key) || "light";
      this.apply(saved);
      this.toggleBtn.addEventListener("click", () => this.toggle());
    },

    apply(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      const isLight = theme === "light";
      this.sunIcon.style.display = isLight ? "block" : "none";
      this.moonIcon.style.display = isLight ? "none" : "block";
      localStorage.setItem(this.key, theme);
    },

    toggle() {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      this.apply(current === "light" ? "dark" : "light");
    },
  };

  const setFooterYear = () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  const initScrollReveal = () => {
    const items = document.querySelectorAll(".card, .contact-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
      observer.observe(el);
    });
  };

  const ContactModal = {
    overlay: document.getElementById("contactFormModal"),
    openBtn: document.getElementById("openContactFormBtn"),
    closeBtn: document.getElementById("closeContactFormBtn"),
    form: document.getElementById("contactForm"),
    submitBtn: document.getElementById("formSubmitBtn"),
    statusEl: document.getElementById("formStatus"),

    init() {
      if (!this.overlay || !this.openBtn) return;
      this.openBtn.addEventListener("click", () => this.open());
      this.closeBtn.addEventListener("click", () => this.close());
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !this.overlay.hidden) this.close();
      });
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    },

    open() {
      this.overlay.hidden = false;
      requestAnimationFrame(() => this.overlay.classList.add("is-visible"));
      document.body.style.overflow = "hidden";
      this.form.querySelector("input[name='نام']")?.focus();
    },

    close() {
      this.overlay.classList.remove("is-visible");
      document.body.style.overflow = "";
      setTimeout(() => {
        this.overlay.hidden = true;
      }, 250);
    },

    setStatus(message, type) {
      this.statusEl.textContent = message;
      this.statusEl.className = "form-status " + (type || "");
    },

    async handleSubmit(event) {
      event.preventDefault();
      this.submitBtn.disabled = true;
      this.setStatus("در حال ارسال...", "");

      try {
        const formData = new FormData(this.form);
        const response = await fetch(this.form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (response.ok) {
          this.setStatus("پیام شما با موفقیت ارسال شد. متشکریم!", "success");
          this.form.reset();
          setTimeout(() => this.close(), 2000);
        } else {
          throw new Error("Submit failed");
        }
      } catch (err) {
        this.setStatus(
          "ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.",
          "error",
        );
      } finally {
        this.submitBtn.disabled = false;
      }
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    ThemeManager.init();
    setFooterYear();
    initScrollReveal();
    ContactModal.init();
  });
})();
