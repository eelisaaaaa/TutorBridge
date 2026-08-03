document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('home-featured-tutors');
  if (container && typeof TUTORS_DATA !== 'undefined') {
    container.innerHTML = TUTORS_DATA.slice(0, 3).map(t => `
      <li class="tutor-card">
        <img src="${t.avatar}" class="tutor-avatar" alt="${t.name}">
        <div class="tutor-name">${t.name}</div>
        <div class="tutor-meta">${t.subject}</div>
        <span class="tutor-tag">${t.country}</span>
        <div class="tutor-rate">SGD $${t.rate} / hr</div>
        <a href="pages/tutorProfile.html" class="btn btn-soft btn-small">View Profile</a>
      </li>
    `).join('');
  }
});

function toggleVolunteerExpand() {
  const section = document.getElementById('volunteer-expandable-section');
  const arrow = document.getElementById('vol-expand-arrow');
  const tutorSection = document.getElementById('tutor-app-expandable-section');

  if (tutorSection && tutorSection.classList.contains('expanded')) {
    tutorSection.classList.remove('expanded');
    document.getElementById('tutor-expand-arrow').textContent = '▼';
  }

  if (section) {
    section.classList.toggle('expanded');
    if (arrow) arrow.textContent = section.classList.contains('expanded') ? '▲' : '▼';
  }
}

function toggleTutorAppExpand() {
  const section = document.getElementById('tutor-app-expandable-section');
  const arrow = document.getElementById('tutor-expand-arrow');
  const volSection = document.getElementById('volunteer-expandable-section');

  if (volSection && volSection.classList.contains('expanded')) {
    volSection.classList.remove('expanded');
    document.getElementById('vol-expand-arrow').textContent = '▼';
  }

  if (section) {
    section.classList.toggle('expanded');
    if (arrow) arrow.textContent = section.classList.contains('expanded') ? '▲' : '▼';
  }
}

function switchVolTab(type) {
  const tabs = document.querySelectorAll('#volunteer-tabs .tab');
  tabs.forEach(t => t.classList.remove('active'));
  const localContent = document.getElementById('vol-local-content');
  const foreignContent = document.getElementById('vol-foreign-content');

  if (type === 'local') {
    tabs[0].classList.add('active');
    localContent.hidden = false;
    foreignContent.hidden = true;
  } else {
    tabs[1].classList.add('active');
    localContent.hidden = true;
    foreignContent.hidden = false;
  }
}