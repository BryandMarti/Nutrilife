document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.getElementById('subscribe-btn');
    const subscribeForm = document.getElementById('subscribe-form');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    // Shows the subscribe form and overlay when the button is clicked
    subscribeBtn.addEventListener('click', () => {
        subscribeForm.style.display = 'block';
        overlay.style.display = 'block';
    });
    // Hides the subscribe form and overlay when the close button is clicked
    closeBtn.addEventListener('click', () => {
        subscribeForm.style.display = 'none';
        overlay.style.display = 'none';
    });
    // Hides the subscribe form and overlay when clicking outside of the form
    overlay.addEventListener('click', () => {
        subscribeForm.style.display = 'none';
        overlay.style.display = 'none';
    });
    // Prevents overlay from closing form when clicked inside form
    subscribeForm.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    // Handles form submission (you might need to implement this part)
    const subscribeSubmitBtn = document.getElementById('subscribe-submit');
    subscribeSubmitBtn.addEventListener('click', (event) => {
        // Handles form submission logic here (e.g., send email)
        //event.preventDefault(); // Prevents default form submission
        console.log('Subscribe button clicked');
    });
});