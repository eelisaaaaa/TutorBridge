// requestTutor.js

document.addEventListener('DOMContentLoaded', () => {
  // Pre-fill tutor from query param if arriving from shortlist
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTutor = urlParams.get('tutor');
  if (requestedTutor) {
    const slotsInput = document.getElementById('req-slots');
    if (slotsInput) {
      slotsInput.value = `Preferred Tutor: ${requestedTutor}`;
    }
  }

  // Attach submit handler
  const form = document.getElementById('tutor-request-form');
  if (form) {
    form.addEventListener('submit', handleRequestSubmit);
  }
});

function handleRequestSubmit(e) {
  e.preventDefault();
  let isValid = true;

  const fields = [
    { id: 'req-name', errId: 'err-name' },
    { id: 'req-email', errId: 'err-email', type: 'email' },
    { id: 'req-phone', errId: 'err-phone', type: 'phone' },
    { id: 'req-level', errId: 'err-level' },
    { id: 'req-subject', errId: 'err-subject' },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.errId);

    if (!el) return;

    let value = el.value.trim();
    let valid = true;

    // Extra validation for email and phone
    if (f.type === 'email') {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      valid = emailPattern.test(value);
    } else if (f.type === 'phone') {
      const phonePattern = /^\+?\d{7,15}$/; // simple phone validation
      valid = phonePattern.test(value);
    } else {
      valid = value.length > 0;
    }

    if (!valid) {
      el.classList.add('field-error');
      if (errEl) errEl.style.display = 'block';
      isValid = false;
    } else {
      el.classList.remove('field-error');
      if (errEl) errEl.style.display = 'none';
    }
  });

  if (isValid) {
    alert("✅ Your request has been submitted! A TutorBridge coordinator will contact you via WhatsApp or email within 24 hours to arrange your free trial session.");
    e.target.reset();
  }
}
