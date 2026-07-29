/* TutorBridge Sessions Live Video, Real Camera & MediaRecorder Engine */

let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let isRecordingActive = false;
let recordTimerInterval = null;
let recordSeconds = 0;

// Start User Webcam Feed
async function startWebcamStream() {
  const videoElement = document.getElementById('user-webcam-feed');
  const placeholder = document.getElementById('webcam-placeholder');
  const camBtn = document.getElementById('cam-toggle-btn');

  if (mediaStream) {
    // Stop stream if already running
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
    if (videoElement) videoElement.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
    if (camBtn) {
      camBtn.textContent = '📷 Camera: Off';
      camBtn.classList.remove('btn-primary');
      camBtn.classList.add('btn-soft');
    }
    return;
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (videoElement) {
      videoElement.srcObject = mediaStream;
      videoElement.style.display = 'block';
    }
    if (placeholder) placeholder.style.display = 'none';
    if (camBtn) {
      camBtn.textContent = '📷 Camera: ON (Active)';
      camBtn.classList.remove('btn-soft');
      camBtn.classList.add('btn-primary');
    }
  } catch (err) {
    console.warn('Webcam permission or device error:', err);
    alert('Webcam access notice: Could not access physical camera. Make sure your browser has camera permissions granted, or use the Google Meet link!');
  }
}

// Toggle Real MediaRecorder Browser Recording
function toggleRealRecording() {
  const badge = document.getElementById('record-status-badge');
  const recBtn = document.getElementById('rec-toggle-btn');

  if (isRecordingActive) {
    // Stop Recording
    stopRecording();
    return;
  }

  if (!mediaStream) {
    // If no stream active, request webcam first or create fallback stream
    startWebcamStream().then(() => {
      if (mediaStream) startMediaRecorder();
    });
  } else {
    startMediaRecorder();
  }
}

function startMediaRecorder() {
  const badge = document.getElementById('record-status-badge');
  const recBtn = document.getElementById('rec-toggle-btn');
  recordedChunks = [];

  try {
    mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });
  } catch (e) {
    try {
      mediaRecorder = new MediaRecorder(mediaStream);
    } catch (err) {
      alert('MediaRecorder is not supported in this browser environment.');
      return;
    }
  }

  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const downloadBox = document.getElementById('recording-download-box');
    const downloadBtn = document.getElementById('download-video-btn');

    if (downloadBtn && downloadBox) {
      downloadBtn.href = url;
      downloadBtn.download = `TutorBridge_Session_Record_${Date.now()}.webm`;
      downloadBox.style.display = 'block';
    }
  };

  mediaRecorder.start(1000); // collect slice every 1 sec
  isRecordingActive = true;
  recordSeconds = 0;

  if (recBtn) recBtn.textContent = '⏹ Stop Recording';
  if (badge) {
    badge.style.background = '#e74c3c';
    badge.innerHTML = '🔴 REC <span id="rec-timer-count">00:00</span>';
  }

  recordTimerInterval = setInterval(() => {
    recordSeconds++;
    const mins = String(Math.floor(recordSeconds / 60)).padStart(2, '0');
    const secs = String(recordSeconds % 60).padStart(2, '0');
    const timerEl = document.getElementById('rec-timer-count');
    if (timerEl) timerEl.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  isRecordingActive = false;
  clearInterval(recordTimerInterval);

  const badge = document.getElementById('record-status-badge');
  const recBtn = document.getElementById('rec-toggle-btn');
  if (recBtn) recBtn.textContent = '🔴 Record Session';
  if (badge) {
    badge.style.background = '#7f8c8d';
    badge.innerHTML = 'RECORDING OFF';
  }
}

function sendChatMessage() {
  const input = document.getElementById('session-chat-input');
  const messagesBox = document.getElementById('session-chat-messages');
  if (!input || !messagesBox || !input.value.trim()) return;

  const userMsg = input.value.trim();
  input.value = '';

  const msgDiv = document.createElement('div');
  msgDiv.style.marginBottom = '10px';
  msgDiv.style.textAlign = 'right';
  msgDiv.innerHTML = `
    <span style="background:var(--teal-deep); color:#fff; padding:6px 12px; border-radius:12px 12px 0 12px; font-size:12px; display:inline-block;">
      ${userMsg}
    </span>
    <div style="font-size:9px; color:var(--grey-dark); margin-top:2px;">You &bull; Just now</div>
  `;
  messagesBox.appendChild(msgDiv);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  // Tutor auto reply simulation
  setTimeout(() => {
    const tutorMsgDiv = document.createElement('div');
    tutorMsgDiv.style.marginBottom = '10px';
    tutorMsgDiv.style.textAlign = 'left';
    tutorMsgDiv.innerHTML = `
      <span style="background:var(--grey-light); color:var(--charcoal); padding:6px 12px; border-radius:12px 12px 12px 0; font-size:12px; display:inline-block;">
        Great question! Let's work through this O-Level problem on the shared whiteboard step by step.
      </span>
      <div style="font-size:9px; color:var(--grey-dark); margin-top:2px;">Aisha Rahman (Tutor) &bull; Just now</div>
    `;
    messagesBox.appendChild(tutorMsgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, 1000);
}

function endSessionSimulation() {
  if (confirm("Are you sure you want to end this live session?")) {
    if (isRecordingActive) {
      stopRecording();
    }
    openFeedbackModal();
  }
}
