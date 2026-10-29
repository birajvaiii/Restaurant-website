/* ==========================================================================
   HOT & SPICY — Simple website interactions
   - Mobile navigation
   - Menu category filtering
   - Contact form validation (demo only)
   - Back-to-top button and footer year
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initMenuFilters();
  initContactForm();
  initBackToTop();
  setCurrentYear();
  initImageFallback();
});

/* --------------------------------------------------------------------------
   Mobile navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("body-nav-open");
  };

  toggle.addEventListener("click", () => {
    const willOpen = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("body-nav-open", willOpen);
  });

  // Close the menu after a navigation link is selected.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking outside the open menu.
  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  // Close with the Escape key.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Reset the menu if the window grows past the mobile breakpoint.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880) closeMenu();
  });
}

/* --------------------------------------------------------------------------
   Menu category filtering
   -------------------------------------------------------------------------- */
function initMenuFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const count = document.getElementById("menu-count");
  const emptyMessage = document.getElementById("menu-empty");

  if (!filterButtons.length || !menuItems.length) return;

  const showCategory = (category) => {
    let visibleItems = 0;

    menuItems.forEach((item) => {
      const matches = category === "all" || item.dataset.category === category;
      item.hidden = !matches;
      if (matches) visibleItems += 1;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (count) count.textContent = String(visibleItems);
    if (emptyMessage) emptyMessage.hidden = visibleItems !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showCategory(button.dataset.filter);
    });
  });

  // The homepage category cards link here with a hash, e.g. menu.html#burgers.
  const requestedCategory = window.location.hash.replace("#", "");
  const matchingButton = Array.from(filterButtons).find(
    (button) => button.dataset.filter === requestedCategory
  );

  if (matchingButton) {
    showCategory(requestedCategory);
  }
}

/* --------------------------------------------------------------------------
   Contact form validation
   This is a demo only. No data is sent or stored.
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  const fields = {
    name: {
      input: document.getElementById("name"),
      message: "Please enter your name (at least 2 characters).",
      isValid: (value) => value.trim().length >= 2,
    },
    email: {
      input: document.getElementById("email"),
      message: "Please enter a valid email address.",
      isValid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
    },
    subject: {
      input: document.getElementById("subject"),
      message: "Please add a short subject (at least 3 characters).",
      isValid: (value) => value.trim().length >= 3,
    },
    message: {
      input: document.getElementById("message"),
      message: "Please write a message of at least 10 characters.",
      isValid: (value) => value.trim().length >= 10,
    },
  };

  const setFieldError = (field, showError) => {
    const wrapper = field.input.closest(".form-field");
    const error = document.getElementById(field.input.id + "-error");

    wrapper.classList.toggle("has-error", showError);
    field.input.setAttribute("aria-invalid", String(showError));

    if (error) {
      error.textContent = showError ? field.message : "";
    }
  };

  const validateField = (field) => {
    const isValid = field.isValid(field.input.value);
    setFieldError(field, !isValid);
    return isValid;
  };

  Object.values(fields).forEach((field) => {
    if (!field.input) return;

    // Clear an error as soon as the visitor starts correcting it.
    field.input.addEventListener("input", () => {
      if (field.input.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });

    field.input.addEventListener("blur", () => {
      if (field.input.value.trim() !== "") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (status) {
      status.hidden = true;
      status.textContent = "";
    }

    let firstInvalidField = null;

    Object.values(fields).forEach((field) => {
      if (!field.input) return;
      const isValid = validateField(field);
      if (!isValid && !firstInvalidField) firstInvalidField = field.input;
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    const visitorName = fields.name.input.value.trim();
    if (status) {
      const title = document.createElement("strong");
      title.textContent = `Thanks, ${visitorName}! Your demo message looks good.`;

      const message = document.createElement("span");
      message.textContent =
        "This is a demonstration website only — your message was not sent and no information was stored. Please call or email us instead.";

      status.replaceChildren(title, message);
      status.hidden = false;
    }

    form.reset();

    Object.values(fields).forEach((field) => {
      if (!field.input) return;
      field.input.removeAttribute("aria-invalid");
      field.input.closest(".form-field").classList.remove("has-error");
    });
  });
}

/* --------------------------------------------------------------------------
   Back-to-top button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  const toggleButton = () => {
    button.classList.toggle("is-visible", window.scrollY > 400);
  };

  window.addEventListener("scroll", toggleButton, { passive: true });
  toggleButton();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   Footer copyright year
   -------------------------------------------------------------------------- */
function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

/* --------------------------------------------------------------------------
   Image fallback
   Inline onerror attributes handle most image errors. This adds one more
   safety net for any image that fails after the page has loaded.
   -------------------------------------------------------------------------- */
function initImageFallback() {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = "images/fallback.svg";
    });
  });
}
