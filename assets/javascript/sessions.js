/* TutorBridge Sessions Live Video, Real Camera & MediaRecorder Engine */

let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let isRecordingActive = false;
let recordTimerInterval = null;
let recordSeconds = 0;

document.addEventListener('DOMContentLoaded', () => {
  wireSessionsPageEvents();
});

function wireSessionsPageEvents() {
  const camBtn = document.getElementById('cam-toggle-btn');
  const webcamPlaceholderBtn = document.getElementById('webcam-placeholder-start-btn');
  const recBtn = document.getElementById('rec-toggle-btn');
  const endBtn = document.getElementById('end-session-btn');
  const joinBtn = document.getElementById('join-room-btn');
  const chatInput = document.getElementById('session-chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (camBtn) camBtn.addEventListener('click', startWebcamStream);
  if (webcamPlaceholderBtn) webcamPlaceholderBtn.addEventListener('click', startWebcamStream);
  if (recBtn) recBtn.addEventListener('click', toggleRealRecording);
  if (endBtn) endBtn.addEventListener('click', endSessionSimulation);
  if (joinBtn) joinBtn.addEventListener('click', joinCustomRoomCode);
  if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
  if (chatInput) {
    chatInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') sendChatMessage();
    });
  }
}

// Start User Webcam Feed
async function startWebcamStream() {
  const videoElement = document.getElementById('user-webcam-feed');
  const placeholder = document.getElementById('webcam-placeholder');
  const camBtn = document.getElementById('cam-toggle-btn');

  if (mediaStream) {
    // Stop stream if already running
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
    if (videoElement) videoElement.hidden = true;
    if (placeholder) placeholder.hidden = false;
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
      videoElement.hidden = false;
    }
    if (placeholder) placeholder.hidden = true;
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
  if (isRecordingActive) {
    stopRecording();
    return;
  }

  if (!mediaStream) {
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
      downloadBox.hidden = false;
    }
  };

  mediaRecorder.start(1000); // collect slice every 1 sec
  isRecordingActive = true;
  recordSeconds = 0;

  if (recBtn) recBtn.textContent = '⏹ Stop Recording';
  if (badge) {
    badge.classList.add('recording-active');
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
    badge.classList.remove('recording-active');
    badge.innerHTML = 'RECORDING OFF';
  }
}

function sendChatMessage() {
  const input = document.getElementById('session-chat-input');
  const messagesBox = document.getElementById('session-chat-messages');
  if (!input || !messagesBox || !input.value.trim()) return;

  const userMsg = input.value.trim();
  input.value = '';

  const msgItem = document.createElement('li');
  msgItem.className = 'chat-bubble-row user';
  msgItem.innerHTML = `
    <span class="chat-bubble user">${userMsg}</span>
    <p class="chat-timestamp">You &bull; Just now</p>
  `;
  messagesBox.appendChild(msgItem);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  // Tutor auto reply simulation
  setTimeout(() => {
    const tutorMsgItem = document.createElement('li');
    tutorMsgItem.className = 'chat-bubble-row tutor';
    tutorMsgItem.innerHTML = `
      <span class="chat-bubble tutor">Great question! Let's work through this O-Level problem on the shared whiteboard step by step.</span>
      <p class="chat-timestamp">Aisha Rahman (Tutor) &bull; Just now</p>
    `;
    messagesBox.appendChild(tutorMsgItem);
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

function joinCustomRoomCode() {
  const code = document.getElementById('join-room-input')?.value.trim();
  if (!code) {
    alert('Please enter a room code (e.g. TB-8842).');
    return;
  }
  alert(`Connected to Room ${code}! Tutor Aisha Rahman has dialed into the virtual classroom.`);
  startWebcamStream();
}