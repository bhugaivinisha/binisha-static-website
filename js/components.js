/**
 * Shared Header and Footer Components Injector
 */

function injectHeaderAndFooter() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isPortfolioPage = currentPage.includes('portfolio.html');

  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="nav-container">
          <a href="${isPortfolioPage ? 'index.html#home' : '#home'}" class="logo">
            <span class="logo-text">Binisha</span><span class="logo-dot">.</span>
          </a>
          <ul class="nav-links" id="nav-links">
            <li><a href="${isPortfolioPage ? 'index.html#home' : '#home'}" class="nav-link ${!isPortfolioPage ? 'active' : ''}">Home</a></li>
            <li><a href="${isPortfolioPage ? 'index.html#about' : '#about'}" class="nav-link">About</a></li>
            <li><a href="${isPortfolioPage ? 'index.html#skills' : '#skills'}" class="nav-link">Skills</a></li>
            <li><a href="portfolio.html" class="nav-link ${isPortfolioPage ? 'active' : ''}">Portfolio</a></li>
            <li><a href="${isPortfolioPage ? 'index.html#contact' : '#contact'}" class="nav-link">Contact</a></li>
          </ul>
          <button class="hamburger" id="hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    `;
  }

  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-inner">
            <div class="footer-logo">
              <a href="${isPortfolioPage ? 'index.html#home' : '#home'}" style="text-decoration: none;">
                <span class="footer-logo-text">Binisha</span><span class="footer-logo-dot">.</span>
              </a>
            </div>
            <p class="footer-text">Designed &amp; Built with <i class="fa-solid fa-heart" style="color: #f43f5e;"></i> by Binisha &copy; <span id="year">${new Date().getFullYear()}</span></p>
            <div class="footer-links">
              <a href="${isPortfolioPage ? 'index.html#home' : '#home'}">Home</a>
              <a href="${isPortfolioPage ? 'index.html#about' : '#about'}">About</a>
              <a href="portfolio.html">Portfolio</a>
              <a href="${isPortfolioPage ? 'index.html#contact' : '#contact'}">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Bind Navbar Scroll & Mobile Menu Events after Injection
  initNavbarEvents();
}

function initNavbarEvents() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    // Check initial scroll state
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }
}

// Run injection as soon as DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeaderAndFooter);
} else {
  injectHeaderAndFooter();
}
