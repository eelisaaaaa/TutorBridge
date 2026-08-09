/* TutorBridge — Testimonials / Success Stories page script (self-contained) */

/* Swap these avatar paths for your own uploaded photos in /assets/images/ */
const TESTIMONIALS_DATA = [
  {
    name: "Darren Koh (Sec 4 Express)",
    subject: "Additional Mathematics",
    improvement: "Jumped from E8 to A2 in 4 months",
    quote: "My tutor explained calculus so clearly, and the rate was less than half what my old home tutor charged — that made a real difference for my family.",
    avatar: "../assets/images/testimonial-darren.jpg",
  },
  {
    name: "Mrs. Sarah Lim (Parent of Sec 3 N-Level student)",
    subject: "Combined Science (Physics/Chem)",
    improvement: "Saved over $350/month in tuition fees",
    quote: "TutorBridge has genuinely been a lifesaver. My daughter now gets 1-on-1 Zoom sessions with a highly qualified physics tutor for just $22/hr, and her confidence has grown so much.",
    avatar: "../assets/images/testimonial-sarah.jpg",
  },
  {
    name: "Siti Zulaiha (Sec 5 Normal Academic)",
    subject: "O-Level English Language",
    improvement: "Achieved a B3 grade at O-Levels",
    quote: "Being able to try a free trial lesson first gave me real peace of mind. My tutor helped me structure my argumentative essays step-by-step — I'd recommend it to anyone.",
    avatar: "../assets/images/testimonial-siti.jpg",
  },
];

let currentSlide = 0;

// Apply any saved theme immediately (before DOMContentLoaded) so dark mode
// is set as early as possible, minimizing the light-mode flash on load.
applyStoredTheme();

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  renderFAB();
  updateShortlistBadge();
  updateThemeToggleIcon();
  renderSlide();
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
    { href: 'testimonials.html', label: 'Success Stories', active: true },
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
        <div class="brand-icon">TB</div>
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
            <div class="brand-icon">TB</div>
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
  fab.title = 'My Profile & Billing';
  fab.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>`;
  fab.addEventListener('click', () => { window.location.href = 'profile.html'; });
  document.body.appendChild(fab);
}

function updateShortlistBadge() {
  const badge = document.getElementById('shortlist-count-badge');
  if (!badge) return;
  const list = JSON.parse(localStorage.getItem('tb_shortlist') || '[]');
  badge.textContent = list.length;
}

/* ---------- Carousel ---------- */
function renderSlide() {
  const box = document.getElementById('testimonial-slide-box');
  const dotsBox = document.getElementById('carousel-dots-box');
  if (!box) return;

  const t = TESTIMONIALS_DATA[currentSlide];

  box.innerHTML = `
    <div class="carousel-card">
      <img src="${t.avatar}" class="testimonial-avatar" alt="${t.name}">
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-meta">${t.subject} &bull; ${t.improvement}</div>
    </div>
  `;

  dotsBox.innerHTML = TESTIMONIALS_DATA.map((_, idx) => `
    <span class="dot ${idx === currentSlide ? 'active' : ''}" onclick="goToSlide(${idx})"></span>
  `).join('');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % TESTIMONIALS_DATA.length;
  renderSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
  renderSlide();
}

function goToSlide(idx) {
  currentSlide = idx;
  renderSlide();
}
