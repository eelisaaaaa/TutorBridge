/* Tutor Profile Swipe Deck Manager with Touch & Drag Support + Fisher-Yates Shuffle */

let currentSwipeIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let activeCardElement = null;


/* ============================================================
   Fisher-Yates Shuffle
   ============================================================ */

function shuffleTutors(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] =
    [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}


let shuffledTutors = [];


/* ============================================================
   Initialise Swipe Deck
   ============================================================ */

function initSwipeDeck() {

  const stackContainer = document.getElementById('swipe-stack');

  if (!stackContainer) return;

  if (typeof TUTORS_DATA !== 'undefined') {

    // Shuffle tutors once when page loads
    shuffledTutors = shuffleTutors(TUTORS_DATA);

  }

  renderSwipeCards();
}



/* ============================================================
   Render Cards
   ============================================================ */

function renderSwipeCards() {

  const stackContainer = document.getElementById('swipe-stack');

  if (!stackContainer || shuffledTutors.length === 0) return;


  if (currentSwipeIndex >= shuffledTutors.length) {

    stackContainer.innerHTML = `
      <article class="swipe-card swipe-empty top">

        <h3 class="swipe-empty-title">
          All Tutors Reviewed!
        </h3>

        <p class="swipe-empty-text">
          You have swiped through all available tutors in the directory.
        </p>

        <p class="swipe-empty-actions">

          <button class="btn btn-ghost" id="reset-deck-btn">
            Reset Deck
          </button>

          <a href="shortlist.html" class="btn btn-primary">
            View Shortlist (${getShortlist().length})
          </a>

        </p>

      </article>
    `;


    document
      .getElementById('reset-deck-btn')
      .addEventListener('click', resetSwipeDeck);


    return;
  }



  let html = '';


  for (
    let i = currentSwipeIndex;
    i < Math.min(currentSwipeIndex + 3, shuffledTutors.length);
    i++
  ) {


    const t = shuffledTutors[i];

    const offset = i - currentSwipeIndex;


    let stackClass = 'top';

    if (offset === 1) stackClass = 'back-1';

    if (offset === 2) stackClass = 'back-2';



    html += `

      <article class="swipe-card ${stackClass}" id="swipe-card-${i}">

        <span class="swipe-card-badge like">
          SHORTLIST
        </span>

        <span class="swipe-card-badge nope">
          DISMISS
        </span>


        <img 
          src="${t.avatar}" 
          class="tutor-avatar"
          alt="${t.name}"
        >


        <header class="tutor-info">

          <h3 class="tutor-name">
            ${t.name}
          </h3>


          <p class="tutor-meta">
            ${t.subject} · ${t.level}
          </p>


          <span class="tutor-tag">
            ${t.country}
          </span>

        </header>


        <div class="tutor-rate">
          SGD $${t.rate} / hr
        </div>


        <p class="swipe-card-bio">
          "${t.bio}"
        </p>


        <p class="swipe-card-rating">
          ★ ${t.rating} (${t.reviewsCount} verified reviews)
        </p>


      </article>

    `;
  }


  stackContainer.innerHTML = html;

  attachDragListeners();
}



/* ============================================================
   Drag Support
   ============================================================ */


function attachDragListeners() {

  activeCardElement =
  document.getElementById(`swipe-card-${currentSwipeIndex}`);


  if (!activeCardElement) return;


  activeCardElement.addEventListener(
    'mousedown',
    startDrag
  );


  window.addEventListener(
    'mousemove',
    drag
  );


  window.addEventListener(
    'mouseup',
    endDrag
  );


  activeCardElement.addEventListener(
    'touchstart',
    startDrag,
    { passive:true }
  );


  window.addEventListener(
    'touchmove',
    drag,
    { passive:true }
  );


  window.addEventListener(
    'touchend',
    endDrag
  );

}



function startDrag(e) {

  isDragging = true;


  startX =
  e.type.includes('touch')
  ? e.touches[0].clientX
  : e.clientX;


  if(activeCardElement){
    activeCardElement.classList.add('dragging');
  }

}



function drag(e){

  if(!isDragging || !activeCardElement) return;


  currentX =
  e.type.includes('touch')
  ? e.touches[0].clientX
  : e.clientX;


  const deltaX = currentX - startX;

  const rotateDeg = deltaX * 0.08;


  activeCardElement.style.transform =
  `translateX(${deltaX}px) rotate(${rotateDeg}deg)`;


  const likeBadge =
  activeCardElement.querySelector('.swipe-card-badge.like');


  const nopeBadge =
  activeCardElement.querySelector('.swipe-card-badge.nope');



  if(deltaX > 20){

    if(likeBadge)
      likeBadge.style.opacity =
      Math.min(deltaX / 100,1);

    if(nopeBadge)
      nopeBadge.style.opacity='0';

  }


  else if(deltaX < -20){

    if(nopeBadge)
      nopeBadge.style.opacity =
      Math.min(Math.abs(deltaX)/100,1);

    if(likeBadge)
      likeBadge.style.opacity='0';

  }


}



function endDrag(){

  if(!isDragging || !activeCardElement) return;


  isDragging=false;


  activeCardElement.classList.remove('dragging');


  const deltaX=currentX-startX;


  if(deltaX>90){

    handleSwipe('right');

  }

  else if(deltaX<-90){

    handleSwipe('left');

  }

  else{

    activeCardElement.style.transform =
    'translateX(0px) rotate(0deg)';

  }


  startX=0;
  currentX=0;

}



/* ============================================================
   Swipe Actions
   ============================================================ */


function handleSwipe(direction){

  if(currentSwipeIndex >= shuffledTutors.length)
    return;


  const currentCard =
  document.getElementById(
    `swipe-card-${currentSwipeIndex}`
  );


  const tutor =
  shuffledTutors[currentSwipeIndex];



  if(currentCard){

    if(direction==='right'){

      currentCard.style.transform =
      'translateX(400px) rotate(30deg)';

      currentCard.style.opacity='0';


      addToShortlist(tutor.id);

    }


    else{

      currentCard.style.transform =
      'translateX(-400px) rotate(-30deg)';

      currentCard.style.opacity='0';

    }

  }



  setTimeout(()=>{

    currentSwipeIndex++;

    renderSwipeCards();

  },220);

}



/* ============================================================
   Reset Deck
   ============================================================ */

function resetSwipeDeck(){

  currentSwipeIndex=0;

  shuffledTutors =
  shuffleTutors(TUTORS_DATA);

  renderSwipeCards();

}



/* ============================================================
   Buttons
   ============================================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{

  initSwipeDeck();


  const dismissBtn =
  document.getElementById('dismiss-btn');


  const shortlistBtn =
  document.getElementById('shortlist-btn');



  if(dismissBtn)
    dismissBtn.addEventListener(
      'click',
      ()=>handleSwipe('left')
    );



  if(shortlistBtn)
    shortlistBtn.addEventListener(
      'click',
      ()=>handleSwipe('right')
    );


});