/* Tutor Profile Swipe Deck Manager with Touch & Drag Support */

let currentSwipeIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let activeCardElement = null;

function initSwipeDeck() {
  const stackContainer = document.getElementById('swipe-stack');
  if (!stackContainer) return;
  renderSwipeCards();
}

function renderSwipeCards() {
  const stackContainer = document.getElementById('swipe-stack');
  if (!stackContainer || typeof TUTORS_DATA === 'undefined') return;

  if (currentSwipeIndex >= TUTORS_DATA.length) {
    stackContainer.innerHTML = `
      <div class="swipe-card top" style="justify-content:center; cursor:default; transform:none;">
        <h3 style="color:var(--teal-deep); margin-bottom:8px;">All Tutors Reviewed!</h3>
        <p style="font-size:13px; color:var(--grey-dark); margin-bottom:16px;">You have swiped through all available tutors in the directory.</p>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-ghost" onclick="resetSwipeDeck()">Reset Deck</button>
          <a href="shortlist.html" class="btn btn-primary">View Shortlist (${getShortlist().length})</a>
        </div>
      </div>
    `;
    return;
  }

  let html = '';
  for (let i = currentSwipeIndex; i < Math.min(currentSwipeIndex + 3, TUTORS_DATA.length); i++) {
    const t = TUTORS_DATA[i];
    const offset = i - currentSwipeIndex;
    let stackClass = 'top';
    if (offset === 1) stackClass = 'back-1';
    if (offset === 2) stackClass = 'back-2';

    html += `
      <div class="swipe-card ${stackClass}" id="swipe-card-${i}">
        <div class="swipe-card-badge like">SHORTLIST</div>
        <div class="swipe-card-badge nope">DISMISS</div>

        <img src="${t.avatar}" class="tutor-avatar" alt="${t.name}">
        <div>
          <h3 class="tutor-name">${t.name}</h3>
          <p class="tutor-meta">${t.subject} · ${t.level}</p>
          <span class="tutor-tag">${t.country}</span>
        </div>
        <div class="tutor-rate">SGD $${t.rate} / hr</div>
        <p style="font-size:12px; color:var(--grey-dark); line-height:1.4;">"${t.bio}"</p>
        <div style="font-size:11px; font-weight:600; color:var(--teal-deep); background:var(--teal-light); padding:4px 10px; border-radius:12px; margin-top:8px;">
          ★ ${t.rating} (${t.reviewsCount} verified reviews)
        </div>
      </div>
    `;
  }

  stackContainer.innerHTML = html;
  attachDragListeners();
}

function attachDragListeners() {
  activeCardElement = document.getElementById(`swipe-card-${currentSwipeIndex}`);
  if (!activeCardElement) return;

  // Mouse drag listeners
  activeCardElement.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', endDrag);

  // Touch drag listeners for mobile devices
  activeCardElement.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', drag, { passive: true });
  window.addEventListener('touchend', endDrag);
}

function startDrag(e) {
  if (currentSwipeIndex >= TUTORS_DATA.length) return;
  isDragging = true;
  startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  if (activeCardElement) {
    activeCardElement.classList.add('dragging');
  }
}

function drag(e) {
  if (!isDragging || !activeCardElement) return;
  currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const deltaX = currentX - startX;
  const rotateDeg = deltaX * 0.08;

  activeCardElement.style.transform = `translateX(${deltaX}px) rotate(${rotateDeg}deg)`;

  const likeBadge = activeCardElement.querySelector('.swipe-card-badge.like');
  const nopeBadge = activeCardElement.querySelector('.swipe-card-badge.nope');

  if (deltaX > 20) {
    if (likeBadge) likeBadge.style.opacity = Math.min(deltaX / 100, 1);
    if (nopeBadge) nopeBadge.style.opacity = '0';
  } else if (deltaX < -20) {
    if (nopeBadge) nopeBadge.style.opacity = Math.min(Math.abs(deltaX) / 100, 1);
    if (likeBadge) likeBadge.style.opacity = '0';
  } else {
    if (likeBadge) likeBadge.style.opacity = '0';
    if (nopeBadge) nopeBadge.style.opacity = '0';
  }
}

function endDrag() {
  if (!isDragging || !activeCardElement) return;
  isDragging = false;
  activeCardElement.classList.remove('dragging');

  const deltaX = currentX - startX;
  const threshold = 90;

  if (deltaX > threshold) {
    handleSwipe('right');
  } else if (deltaX < -threshold) {
    handleSwipe('left');
  } else {
    // Snap back
    activeCardElement.style.transform = 'translateX(0px) rotate(0deg)';
    const likeBadge = activeCardElement.querySelector('.swipe-card-badge.like');
    const nopeBadge = activeCardElement.querySelector('.swipe-card-badge.nope');
    if (likeBadge) likeBadge.style.opacity = '0';
    if (nopeBadge) nopeBadge.style.opacity = '0';
  }

  startX = 0;
  currentX = 0;
}

function handleSwipe(direction) {
  if (currentSwipeIndex >= TUTORS_DATA.length) return;
  const currentCard = document.getElementById(`swipe-card-${currentSwipeIndex}`);
  const t = TUTORS_DATA[currentSwipeIndex];

  if (currentCard) {
    if (direction === 'right') {
      currentCard.style.transform = 'translateX(400px) rotate(30deg)';
      currentCard.style.opacity = '0';
      addToShortlist(t.id);
    } else {
      currentCard.style.transform = 'translateX(-400px) rotate(-30deg)';
      currentCard.style.opacity = '0';
    }
  }

  setTimeout(() => {
    currentSwipeIndex++;
    renderSwipeCards();
  }, 220);
}

function resetSwipeDeck() {
  currentSwipeIndex = 0;
  renderSwipeCards();
}

document.addEventListener("DOMContentLoaded", () => {
    initSwipeDeck();
});