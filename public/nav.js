document.addEventListener('DOMContentLoaded', () => {
  const subscribeBtn = document.getElementById('subscribe-btn');
  const subscribeForm = document.getElementById('subscribe-form');
  const closeBtn = document.getElementById('close-btn');
  const overlay = document.getElementById('overlay');
  const formElement = subscribeForm.querySelector('form');

  // Show the subscribe form and overlay when the button is clicked
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      subscribeForm.style.display = 'block';
      overlay.style.display = 'block';
    });
  }
  // Hide the subscribe form and overlay when the close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      subscribeForm.style.display = 'none';
      overlay.style.display = 'none';
    });
  }

  // Hide the subscribe form and overlay when clicking outside of the form
  if (overlay) {
    overlay.addEventListener('click', () => {
      subscribeForm.style.display = 'none';
      overlay.style.display = 'none';
    });
  }

  // Prevent overlay from closing form when clicked inside form
  if (subscribeForm) {
    subscribeForm.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Handle form submission
  if (formElement) {
    formElement.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission
      console.log('Subscribe button clicked');

      const formData = new FormData(formElement);
      try {
        const response = await fetch('/subscribe', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          console.log('Subscription successful');
          hideSubscribeForm();
          alert('Thank you for subscribing!');
        } else {
          console.error('Subscription failed');
        }
      } catch (error) {
        console.error('Error during subscription:', error);
      }
    });
  }

  function hideSubscribeForm() {
    subscribeForm.style.display = 'none';
    overlay.style.display = 'none';
  }
});
