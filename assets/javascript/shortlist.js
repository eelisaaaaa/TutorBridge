/* TutorBridge — Shortlist page script (self-contained) */

if (typeof TUTORS_DATA === 'undefined') {
  var TUTORS_DATA = [
    {
      id: "tutor-1",
      name: "Aisha Rahman",
      subject: "Elementary & Additional Mathematics",
      level: "O-Level / N-Level",
      country: "Malaysia (KL)",
      rate: 18,
      avatar: "../assets/images/zixuan.jpg",
    },
    {
      id: "tutor-2",
      name: "Dr. Mark Tan",
      subject: "Pure & Combined Physics",
      level: "O-Level",
      country: "Philippines (Manila)",
      rate: 22,
      avatar: "../assets/images/tutor-mark.jpg",
    },
    {
      id: "tutor-3",
      name: "Nurul Huda",
      subject: "Pure & Combined Chemistry",
      level: "O-Level / N-Level",
      country: "Indonesia (Bandung)",
      rate: 16,
      avatar: "../assets/images/tutor-nurul.jpg",
    },
    {
      id: "tutor-4",
      name: "Rajesh Kumar",
      subject: "English Language & Literature",
      level: "O-Level / N-Level",
      country: "India (Bengaluru)",
      rate: 15,
      avatar: "../assets/images/tutor-rajesh.jpg",
    },
    {
      id: "tutor-5",
      name: "Chloe Lee",
      subject: "Biology & General Science",
      level: "O-Level / N-Level",
      country: "Malaysia (Penang)",
      rate: 17,
      avatar: "../assets/images/tutor-chloe.jpg",
    },
  ];
}

// Apply any saved theme immediately (before DOMContentLoaded) so dark mode
// is set as early as possible, minimizing the light-mode flash on load.
applyStoredTheme();

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  renderFAB();
  updateShortlistBadge();
  updateThemeToggleIcon();
  renderShortlistPage();
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
    { href: 'shortlist.html', label: 'Shortlist', badge: true, active: true },
    { href: 'pricing.html', label: 'Pricing & Savings' },
    { href: 'signupRequestTutor.html', label: 'Request Tutor' },
    { href: 'testimonials.html', label: 'Success Stories' },
    { href: 'sessions.html', label: 'Sessions' },
    { href: 'resourcesForParents.html', label: 'Resources for Parents' },
    { href: 'contactUs.html', label: 'Contact' },
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

/* ---------- Shortlist storage helpers ---------- */
function getShortlist() {
  return JSON.parse(localStorage.getItem('tb_shortlist') || '[]');
}

function removeFromShortlist(tutorId) {
  const list = getShortlist().filter(id => id !== tutorId);
  localStorage.setItem('tb_shortlist', JSON.stringify(list));
  updateShortlistBadge();
}

function updateShortlistBadge() {
  const badge = document.getElementById('shortlist-count-badge');
  if (!badge) return;
  badge.textContent = getShortlist().length;
}

/* ---------- Page render ---------- */
function renderShortlistPage() {
  const container = document.getElementById('shortlist-content');
  if (!container) return;

  const savedIds = getShortlist();
  const shortlistedTutors = TUTORS_DATA.filter(t => savedIds.includes(t.id));

  if (shortlistedTutors.length === 0) {
    container.innerHTML = `
      <div class="card empty-state-card">
        <div class="empty-state-icon">💔</div>
        <h3 class="empty-state-title">Nothing here yet</h3>
        <p class="empty-state-text">Head over to the tutor directory and swipe right on anyone you'd like to save for later.</p>
        <a href="tutorProfile.html" class="btn btn-primary">Browse Tutors &rarr;</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="shortlist-summary">
      ${shortlistedTutors.length} tutor${shortlistedTutors.length > 1 ? 's' : ''} saved — tap "Request" when you're ready to book a trial.
    </div>
    <div class="grid-2">
      ${shortlistedTutors.map(t => `
        <div class="card tutor-card-row">
          <img src="${t.avatar}" class="tutor-avatar" alt="${t.name}">
          <div class="tutor-card-info">
            <h3 class="tutor-card-name">${t.name}</h3>
            <div class="tutor-card-meta">${t.subject} &bull; ${t.level}</div>
            <div class="tutor-card-country">${t.country}</div>
            <div class="tutor-card-rate">SGD $${t.rate} / hr</div>
          </div>
          <div class="tutor-card-actions">
            <a href="signupRequestTutor.html?tutor=${encodeURIComponent(t.name)}" class="btn btn-primary btn-request">Request</a>
            <button class="btn btn-ghost btn-remove" onclick="removeAndRefresh('${t.id}')">Remove ✕</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function removeAndRefresh(id) {
  removeFromShortlist(id);
  renderShortlistPage();
}
