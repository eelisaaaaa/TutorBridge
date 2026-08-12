/* TutorBridge — Contact Us page script (self-contained: nav, footer, form logic) */

// Apply any saved theme immediately (before DOMContentLoaded) so dark mode
// is set as early as possible, minimizing the light-mode flash on load.
applyStoredTheme();

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  renderFAB();
  updateShortlistBadge();
  updateThemeToggleIcon();

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleContactSubmit);
});

/* ---------- Dark Mode ---------- */
function applyStoredTheme() {
  const saved = localStorage.getItem('tb_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('tb_theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('tb_theme', 'dark');
  }
  updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
  const btn = document.getElementById('nav-theme-toggle-btn');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* ---------- Navbar ---------- */
function renderNav() {
  const target = document.getElementById('global-navbar');
  if (!target) return;

  const links = [
    { href: '../index.html', label: 'Home' },
    { href: 'aboutus.html', label: 'About Us' },
    { href: 'howItWorks.html', label: 'How It Works' },
    { href: 'tutorProfile.html', label: 'Find Tutors' },
    { href: 'shortlist.html', label: 'Shortlist', badge: true },
    { href: 'pricing.html', label: 'Pricing & Savings' },
    { href: 'signupRequestTutor.html', label: 'Request Tutor' },
    { href: 'testimonials.html', label: 'Success Stories' },
    { href: 'sessions.html', label: 'Sessions' },
    { href: 'resourcesForParents.html', label: 'Resources for Parents' },
    { href: 'contactUs.html', label: 'Contact', active: true },
  ];

  const linksHTML = links.map(l => {
    const badge = l.badge ? `<span id="shortlist-count-badge" class="nav-badge">0</span>` : '';
    return `<li><a href="${l.href}" class="${l.active ? 'active' : ''}"><span>${l.label}</span>${badge}</a></li>`;
  }).join('');

  target.innerHTML = `
    <nav class="navbar">
      <a href="../index.html" class="brand">
        <img src="../assets/images/logo.png" alt="TutorBridge logo" class="brand-icon">
        TutorBridge
      </a>
      <div class="nav-right-container">
        <button class="nav-theme-toggle-btn" id="nav-theme-toggle-btn" title="Switch to Dark Mode" onclick="toggleDarkMode()">🌙</button>
        <a href="profile.html" class="btn btn-ghost nav-account-btn">Account</a>
        <button class="hamburger-btn-icon" id="hamburger-toggle-btn" title="Open Navigation Menu" onclick="toggleNav(event)">☰</button>
      </div>
      <ul class="nav-dropdown-menu" id="nav-dropdown-panel">${linksHTML}</ul>
    </nav>
  `;

  document.addEventListener('click', (e) => {
    const panel = document.getElementById('nav-dropdown-panel');
    const btn = document.getElementById('hamburger-toggle-btn');
    if (panel && panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove('open');
      btn.textContent = '☰';
    }
  });
}

function toggleNav(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('nav-dropdown-panel');
  const btn = document.getElementById('hamburger-toggle-btn');
  if (!panel) return;
  panel.classList.toggle('open');
  btn.textContent = panel.classList.contains('open') ? '✕' : '☰';
}

/* ---------- Footer ---------- */
function renderFooter() {
  const target = document.getElementById('global-footer');
  if (!target) return;

  target.innerHTML = `
    <footer class="footer-dark">
      <div class="footer-dark-inner">
        <div>
          <div class="footer-dark-brand">
            <img src="../assets/images/logo.png" alt="TutorBridge logo" class="brand-icon">
            TutorBridge
          </div>
          <p class="footer-dark-desc">Connecting Singapore secondary students with vetted tutors abroad, at a fraction of local rates.</p>
        </div>
        <div>
          <div class="footer-col-title">Explore</div>
          <div class="footer-col-links">
            <a href="aboutus.html">About Us</a>
            <a href="howItWorks.html">How It Works</a>
            <a href="tutorProfile.html">Tutor Directory</a>
            <a href="pricing.html">Pricing &amp; Currency Comparison</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Support</div>
          <div class="footer-col-links">
            <a href="resourcesForParents.html">FAQ &amp; Resources</a>
            <a href="contactUs.html">Contact Us</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom-copy">&copy; 2026 TutorBridge — Built for SP Front-End Web Dev CA2 (Group 3: Elisa, Zi Xuan, Shin, Kalai)</div>
    </footer>
  `;
}

/* ---------- Floating profile button ---------- */
function renderFAB() {
  if (document.querySelector('.fab-profile')) return;
  const fab = document.createElement('div');
  fab.className = 'fab-profile';
  fab.title = 'Back to Top';
  fab.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>`;
  fab.addEventListener('click', scrollToTop);
  document.body.appendChild(fab);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateShortlistBadge() {
  const badge = document.getElementById('shortlist-count-badge');
  if (!badge) return;
  const list = JSON.parse(localStorage.getItem('tb_shortlist') || '[]');
  badge.textContent = list.length;
}

/* ---------- Contact form validation ---------- */
function handleContactSubmit(e) {
  e.preventDefault();
  let isValid = true;

  const fields = [
    { id: 'contact-name', errId: 'c-err-name' },
    { id: 'contact-email', errId: 'c-err-email' },
    { id: 'contact-msg', errId: 'c-err-msg' },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el.value.trim()) {
      el.classList.add('field-error');
      if (err) err.classList.add('show');
      isValid = false;
    } else {
      el.classList.remove('field-error');
      if (err) err.classList.remove('show');
    }
  });

  if (isValid) {
    alert("Thanks for reaching out — our team will get back to you within 24 hours.");
    document.getElementById('contact-form').reset();
  }
}
