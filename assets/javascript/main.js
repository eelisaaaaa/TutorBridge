/* TutorBridge Global JavaScript Engine */

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  renderFAB();
  updateShortlistBadge();
  setupGlobalModals();
});

// Render Global Top Navigation Bar with Chrome-Style Right-Side Hamburger Dropdown
function renderNavbar() {
  const navContainer = document.getElementById('global-navbar');
  if (!navContainer) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About Us' },
    { href: 'how-it-works.html', label: 'How It Works' },
    { href: 'tutor-profile.html', label: 'Find Tutors' },
    { href: 'shortlist.html', label: 'Shortlist', badge: true },
    { href: 'pricing.html', label: 'Pricing & Savings' },
    { href: 'request-tutor.html', label: 'Request Tutor' },
    { href: 'testimonials.html', label: 'Success Stories' },
    { href: 'sessions.html', label: 'Sessions' },
    { href: 'resources.html', label: 'Resources for Parents' },
    { href: 'contact.html', label: 'Contact' },
  ];

  let linksHTML = links.map(link => {
    const activeClass = (currentPath === link.href || (currentPath === '' && link.href === 'index.html')) ? 'active' : '';
    const badgeHTML = link.badge ? `<span id="shortlist-count-badge" class="nav-badge">0</span>` : '';
    return `<li><a href="${link.href}" class="${activeClass}"><span>${link.label}</span>${badgeHTML}</a></li>`;
  }).join('');

  navContainer.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="brand">
        <div class="brand-icon">TB</div>
        TutorBridge
      </a>
      
      <!-- Right-side Container with Account Button and Chrome 3-line/dot Hamburger Icon -->
      <div class="nav-right-container">
        <a href="profile.html" class="btn btn-ghost" style="padding:6px 14px; font-size:12.5px; border-color:#fff; color:#fff;">Account</a>
        
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

  footerContainer.innerHTML = `
    <footer class="footer-dark">
      <div class="footer-dark-inner">
        <div>
          <div class="footer-dark-brand">
            <div class="brand-icon" style="width:30px; height:30px; font-size:15px;">TB</div>
            TutorBridge
          </div>
          <p class="footer-dark-desc">
            Affordable, quality tuition for Singapore secondary students — matched with vetted tutors abroad.
          </p>
        </div>

        <div>
          <div class="footer-col-title">Explore</div>
          <div class="footer-col-links">
            <a href="about.html">About Us</a>
            <a href="how-it-works.html">How It Works</a>
            <a href="tutor-profile.html">Tutor Directory</a>
            <a href="request-tutor.html">Request a Tutor</a>
            <a href="pricing.html">Pricing &amp; Currency Comparison</a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Support</div>
          <div class="footer-col-links">
            <a href="#" onclick="openFAQModal(); return false;">FAQ</a>
            <a href="contact.html">Contact Us</a>
            <a href="resources.html">Resources for Parents</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom-copy">
        &copy; 2026 TutorBridge — Built for SP Front-End Web Dev CA2 (Group 3: Elisa, Zi Xuan, Shin, Kalai)
      </div>
    </footer>
  `;
}

// Floating Profile FAB Button
function renderFAB() {
  if (document.querySelector('.fab-profile')) return;
  const fab = document.createElement('div');
  fab.className = 'fab-profile';
  fab.title = 'My Profile & Billing';
  fab.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>`;
  fab.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });
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
