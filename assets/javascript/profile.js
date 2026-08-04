document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Profile updated successfully!');
  });

  document.getElementById('avatar-input').addEventListener('change', previewAvatar);
});

function previewAvatar(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('avatar-preview').src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function wireAvatarUpload() {
  const input = document.getElementById('avatar-input');
  if (input) input.addEventListener('change', previewAvatar);
}

function wireProfileForm() {
  const form = document.getElementById('profile-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Profile updated successfully!');
  });
}