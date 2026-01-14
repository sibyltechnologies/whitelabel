// whitelabel/public/js/branding.js

(function () {
  const NEW_TITLE = "Sibyl ERP";
  const SELECTOR = ".sidebar-item-label.header-subtitle";

  function replaceSubtitle() {
    const el = document.querySelector(SELECTOR);
    if (!el) return;

    // Replace only if it's ERPNext (prevents overwriting other apps)
    if (el.textContent && el.textContent.trim() === "ERPNext") {
      el.textContent = NEW_TITLE;
    }
  }

  function observeSidebar() {
    // Run once now
    replaceSubtitle();

    // Watch for rerenders (Frappe desk updates sidebar on navigation / refresh)
    const observer = new MutationObserver(() => replaceSubtitle());
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // Frappe desk loads after DOM; this is safe in v16
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeSidebar);
  } else {
    observeSidebar();
  }

  // Extra safety on route changes (SPA)
  if (window.frappe && frappe.router && frappe.router.on) {
    frappe.router.on("change", () => setTimeout(replaceSubtitle, 0));
  }
})();

