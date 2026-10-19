
/* GLOBAL WEBSITE COMPONENTS */

async function loadComponent(id, path) {
  const container = document.getElementById(id);

  if (!container) return;

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load component: ${path}`);
  }

  container.innerHTML = await response.text();
}

async function initializeComponents() {

  // Load shared header and footer
  await Promise.all([
    loadComponent("site-header", "/components/header.html"),
    loadComponent("site-footer", "/components/footer.html")
  ]);

  // Header scroll effect
  const header = document.querySelector(".header");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle(
        "scrolled",
        window.scrollY > 50
      );
    };

    window.addEventListener("scroll", updateHeader, {
      passive: true
    });

    updateHeader();
  }

  // Automatically update copyright year
  const year = document.getElementById("copyright-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

}

initializeComponents().catch(console.error);
