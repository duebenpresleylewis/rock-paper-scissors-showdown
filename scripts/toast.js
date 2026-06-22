// export function showToast(message, type = 'success', duration = 3000) {
export function showToast(message, type = 'success', duration = 3000) {
  // 1. Grab the container
  const container = document.getElementById('toast-container');
  if (!container) return;

  // 2. Create the toast element dynamically
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.textContent = message;

  // 3. Append it to the container to show it instantly
  container.appendChild(toast);

  // 4. Start a timer to trigger the fade-out animation right before removal
  setTimeout(() => {
    toast.classList.add('hide');
    
    // 5. Wait for the 0.5s fadeOut CSS animation to finish, then delete it from DOM
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, duration);
}

    