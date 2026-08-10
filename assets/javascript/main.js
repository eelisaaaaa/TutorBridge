/* TutorBridge Global JavaScript Engine */

// Apply any saved theme immediately (before DOMContentLoaded) so dark mode
// is set as early as possible, minimizing the light-mode flash on load.
applyStoredTheme();

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  renderFAB();
  updateShortlistBadge();
  setupGlobalModals();
});

// Dark Mode Helpers
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

// Render Global Top Navigation Bar with Chrome-Satyle Right-Side Hamburger Dropdown
function renderNavbar() {
  const navContainer = document.getElementById('global-navbar');
  if (!navContainer) return;

  // index.html sits at the project root; every other page sits one level
  // deeper inside /pages/, so links need a different base depending on where
  // the navbar is actually being rendered.
  const inPages = window.location.pathname.includes('/pages/');
  const base = inPages ? '' : 'pages/';
  const assetBase = inPages ? '../' : '';
  const home = inPages ? '../index.html' : 'index.html';

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: home, label: 'Home' },
    { href: `${base}aboutus.html`, label: 'About Us' },
    { href: `${base}howItWorks.html`, label: 'How It Works' },
    { href: `${base}tutorProfile.html`, label: 'Find Tutors' },
    { href: `${base}shortlist.html`, label: 'Shortlist', badge: true },
    { href: `${base}pricing.html`, label: 'Pricing & Savings' },
    { href: `${base}signupRequestTutor.html`, label: 'Request Tutor' },
    { href: `${base}testimonials.html`, label: 'Success Stories' },
    { href: `${base}sessions.html`, label: 'Sessions' },
    { href: `${base}resourcesForParents.html`, label: 'Resources for Parents' },
    { href: `${base}contactUs.html`, label: 'Contact' },
  ];

  let linksHTML = links.map(link => {
    const activeClass = (currentPath === link.href.split('/').pop()) ? 'active' : '';
    const badgeHTML = link.badge ? `<span id="shortlist-count-badge" class="nav-badge">0</span>` : '';
    return `<li><a href="${link.href}" class="${activeClass}"><span>${link.label}</span>${badgeHTML}</a></li>`;
  }).join('');

  navContainer.innerHTML = `
    <nav class="navbar">
    <a href="${home}" class="brand">
    <img src="${assetBase}assets/images/logo.png" alt="TutorBridge logo" class="brand-icon">
   TutorBridge
    </a>
      
      <!-- Right-side Container with Dark Mode Toggle, Account Button, and Chrome 3-line/dot Hamburger Icon -->
      <div class="nav-right-container">
        <button class="nav-theme-toggle-btn" id="nav-theme-toggle-btn" title="Switch to Dark Mode" onclick="toggleDarkMode()">
          🌙
        </button>

        <a href="${base}profile.html" class="btn nav-account-btn">Account</a>

        <button class="hamburger-btn-icon" id="hamburger-toggle-btn" title="Open Navigation Menu" onclick="toggleDropdownNav(event)">
          ☰
        </button>
      </div>

      <!-- Right-Aligned Floating Dropdown Menu Panel -->
      <ul class="nav-dropdown-menu" id="nav-dropdown-panel">
        ${linksHTML}
      </ul>
    </nav>
  `;

  updateThemeToggleIcon();

  // Close dropdown menu when clicking outside
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('nav-dropdown-panel');
    const btn = document.getElementById('hamburger-toggle-btn');
    if (panel && panel.classList.contains('open')) {
      if (!panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('open');
        btn.textContent = '☰';
      }
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDropdownNav(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('nav-dropdown-panel');
  const btn = document.getElementById('hamburger-toggle-btn');
  if (panel) {
    panel.classList.toggle('open');
    if (btn) {
      btn.textContent = panel.classList.contains('open') ? '✕' : '☰';
    }
  }
}

// Render Dark Laptop-Style Footer
function renderFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer) return;

  const inPages = window.location.pathname.includes('/pages/');
  const base = inPages ? '' : 'pages/';

  footerContainer.innerHTML = `
    <footer class="footer-dark">
      <div class="footer-dark-inner">
        <div>
          <div class="footer-dark-brand">
            <img src="${inPages ? '../' : ''}assets/images/logo.png" alt="TutorBridge logo" class="brand-icon" style="width:30px; height:30px;">
            TutorBridge
          </div>
          <p class="footer-dark-desc">
            Affordable, quality tuition for Singapore secondary students — matched with vetted tutors abroad.
          </p>
        </div>

        <div>
          <div class="footer-col-title">Explore</div>
          <div class="footer-col-links">
            <a href="${base}aboutus.html">About Us</a>
            <a href="${base}howItWorks.html">How It Works</a>
            <a href="${base}tutorProfile.html">Tutor Directory</a>
            <a href="${base}signupRequestTutor.html">Request a Tutor</a>
            <a href="${base}pricing.html">Pricing &amp; Currency Comparison</a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Support</div>
          <div class="footer-col-links">
            <a href="#" onclick="openFAQModal(); return false;">FAQ</a>
            <a href="${base}contactUs.html">Contact Us</a>
            <a href="${base}resourcesForParents.html">Resources for Parents</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom-copy">
        &copy; 2026 TutorBridge — Built for SP Front-End Web Dev CA2 (Group 3: Elisa, Zi Xuan, Shin, Kalai)
      </div>
    </footer>
  `;
}

// Floating Back-to-Top FAB Button
function renderFAB() {
  if (document.querySelector('.fab-profile')) return;
  const fab = document.createElement('div');
  fab.className = 'fab-profile';
  fab.title = 'Back to Top';
  fab.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>`;
  fab.addEventListener('click', scrollToTop);
  document.body.appendChild(fab);
}

// LocalStorage Shortlist Helpers
function getShortlist() {
  return JSON.parse(localStorage.getItem('tb_shortlist') || '[]');
}

function addToShortlist(tutorId) {
  let list = getShortlist();
  if (!list.includes(tutorId)) {
    list.push(tutorId);
    localStorage.setItem('tb_shortlist', JSON.stringify(list));
  }
  updateShortlistBadge();
}

function removeFromShortlist(tutorId) {
  let list = getShortlist().filter(id => id !== tutorId);
  localStorage.setItem('tb_shortlist', JSON.stringify(list));
  updateShortlistBadge();
}

function updateShortlistBadge() {
  const badge = document.getElementById('shortlist-count-badge');
  if (badge) {
    badge.textContent = getShortlist().length;
  }
}

// Global Modals (FAQ & Feedback)
function setupGlobalModals() {
  if (!document.getElementById('faq-modal-overlay')) {
    const faqModal = document.createElement('div');
    faqModal.id = 'faq-modal-overlay';
    faqModal.className = 'modal-overlay';
    faqModal.innerHTML = `
      <div class="modal-card">
        <button class="modal-close" onclick="closeFAQModal()">&times;</button>
        <h3 style="text-align:center; color:var(--teal-deep); margin-bottom:4px;">Frequently Asked Questions</h3>
        <p style="text-align:center; font-size:12px; color:var(--grey-dark); margin-bottom:16px;">Tap any question to expand details</p>
        <div id="faq-accordion-container" style="display:flex; flex-direction:column; gap:10px;"></div>
        <button class="btn btn-ghost" style="width:100%; margin-top:20px;" onclick="closeFAQModal()">Close FAQ</button>
      </div>
    `;
    document.body.appendChild(faqModal);
  }

  if (!document.getElementById('feedback-modal-overlay')) {
    const feedbackModal = document.createElement('div');
    feedbackModal.id = 'feedback-modal-overlay';
    feedbackModal.className = 'modal-overlay';
    feedbackModal.innerHTML = `
      <div class="modal-card">
        <button class="modal-close" onclick="closeFeedbackModal()">&times;</button>
        <h3 style="text-align:center; color:var(--teal-deep); margin-bottom:4px;">How was your session?</h3>
        <p style="text-align:center; font-size:12px; color:var(--grey-dark); margin-bottom:16px;">Rate your tutor to help us maintain quality standards</p>
        <div class="stars-select" id="feedback-stars" style="display:flex; justify-content:center; gap:8px; font-size:28px; color:var(--amber); margin:12px 0; cursor:pointer;">
          <span onclick="setRating(1)">★</span>
          <span onclick="setRating(2)">★</span>
          <span onclick="setRating(3)">★</span>
          <span onclick="setRating(4)">★</span>
          <span onclick="setRating(5)">★</span>
        </div>
        <div class="form-group">
          <label class="form-label">Comments (optional)</label>
          <textarea id="feedback-comment" class="form-textarea" rows="3" placeholder="What went well? Any areas for improvement?"></textarea>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="submitSessionFeedback()">Submit Feedback</button>
      </div>
    `;
    document.body.appendChild(feedbackModal);
  }
}

let selectedRatingValue = 5;
function setRating(val) {
  selectedRatingValue = val;
  const stars = document.querySelectorAll('#feedback-stars span');
  stars.forEach((star, idx) => {
    star.style.color = idx < val ? 'var(--amber)' : 'var(--grey-mid)';
  });
}

function openFAQModal() {
  const container = document.getElementById('faq-accordion-container');
  if (container && typeof FAQ_DATA !== 'undefined') {
    container.innerHTML = FAQ_DATA.map((item, index) => `
      <div style="border:1px solid var(--grey-mid); border-radius:8px; overflow:hidden;">
        <button style="width:100%; padding:12px; text-align:left; background:var(--grey-light); border:none; font-weight:600; font-size:13px; color:var(--teal-deep); cursor:pointer; display:flex; justify-content:space-between; align-items:center;" onclick="toggleFAQItem(${index})">
          <span>▸ ${item.question}</span>
          <span style="font-size:10px; color:var(--coral); font-weight:700;">${item.category}</span>
        </button>
        <div id="faq-ans-${index}" style="display:none; padding:12px; font-size:12.5px; color:var(--charcoal); background:#fff; border-top:1px solid var(--grey-mid);">
          ${item.answer}
        </div>
      </div>
    `).join('');
  }
  const overlay = document.getElementById('faq-modal-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeFAQModal() {
  const overlay = document.getElementById('faq-modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

function toggleFAQItem(idx) {
  const el = document.getElementById(`faq-ans-${idx}`);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

function openFeedbackModal() {
  setRating(5);
  const overlay = document.getElementById('feedback-modal-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeFeedbackModal() {
  const overlay = document.getElementById('feedback-modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

function submitSessionFeedback() {
  alert(`Thank you! Your ${selectedRatingValue}-star rating and feedback have been submitted successfully.`);
  closeFeedbackModal();
}
