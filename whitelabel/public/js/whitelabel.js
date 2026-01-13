// Whitelabel client tweaks (v16-safe)
(function () {
  function afterAjax(fn) {
    if (window.frappe && frappe.after_ajax) {
      frappe.after_ajax(fn);
    } else {
      // fallback
      setTimeout(fn, 500);
    }
  }

  function getSettings() {
    return (window.frappe && frappe.boot && frappe.boot.whitelabel_setting) || {};
  }

  function setLogoSize(s) {
    if (s.logo_width) document.querySelectorAll(".app-logo").forEach(el => el.style.width = s.logo_width + "px");
    if (s.logo_height) document.querySelectorAll(".app-logo").forEach(el => el.style.height = s.logo_height + "px");
  }

  function setNavbarBg(s) {
    if (!s.navbar_background_color) return;
    document.querySelectorAll(".navbar, header.navbar").forEach(el => (el.style.backgroundColor = s.navbar_background_color));
  }

  function setHelpVisibility(s) {
    // default behavior: help is hidden by CSS; if enabled, show it
    if (!s.show_help_menu) return;
    document.querySelectorAll(".dropdown-help, li.dropdown-help, li.dropdown.dropdown-help").forEach(el => {
      el.style.setProperty("display", "block", "important");
    });
  }

  function insertCustomTitle(s) {
    if (!(s.custom_navbar_title && s.custom_navbar_title_style)) return;

    const target =
      document.querySelector("#navbar-breadcrumbs") ||
      document.querySelector(".navbar .breadcrumb-container") ||
      document.querySelector(".navbar .navbar-nav") ||
      document.querySelector(".navbar");

    if (!target) return;

    // avoid inserting multiple times
    if (document.getElementById("whitelabel-custom-title")) return;

    const span = document.createElement("span");
    span.id = "whitelabel-custom-title";
    span.setAttribute("style", s.custom_navbar_title_style);
    span.textContent = s.custom_navbar_title;

    target.parentNode.insertBefore(span, target.nextSibling);
  }

  function apply() {
    const s = getSettings();
    setHelpVisibility(s);
    setLogoSize(s);
    setNavbarBg(s);
    insertCustomTitle(s);
  }

  window.addEventListener("load", function () {
    afterAjax(apply);
  });

  // SPA transitions
  document.addEventListener("page-change", function () {
    afterAjax(apply);
  });
})();
