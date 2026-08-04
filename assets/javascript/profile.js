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