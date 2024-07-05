const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email')
const textArea = document.getElementById('subject');
const form = document.getElementById('form');
const btn = document.getElementById('submit-btn');
const rstBtn = document.getElementById('reset-btn');
//event listener for form submission,this will stop the page from refreshing when we submit
function validatefirstName(){
    if(!fname.value){
        fname.style.border = '3px solid';
        fname.style.borderColor = 'red';
        fname.style.placeholder ='Please fill out text area'
}
}
function validatelasttName(){
    if(!lname.value){
        lname.style.border = '3px solid';
        lname.style.borderColor = 'red';
        lname.style.placeholder ='Please fill out text area'
}
}
function validateEmail(){
    if(!email.value){
        email.style.border = '3px solid';
        email.style.borderColor = 'red';
        email.style.placeholder ='Please fill out text area'
}}
function validatextArea(){
    if(!textArea.value){
        textArea.style.border = '3px solid';
        textArea.style.borderColor = 'red';
        textArea.style.placeholder ='Please fill out text area'
 }
}
btn.addEventListener('click',(e) =>{
 
    validatefirstName();
    validatelasttName();
    validateEmail();
    validatextArea();
})
//reload form
rstBtn.addEventListener('click',()=>{
    window.location.reload();
})
// // JAVASCRIPT FOR NAV BAR
// document.addEventListener('DOMContentLoaded', () => {
//     const subscribeBtn = document.getElementById('subscribe-btn');
//     const subscribeForm = document.getElementById('subscribe-form');
//     const closeBtn = document.getElementById('close-btn');
//     const overlay = document.getElementById('overlay');
//     // Shows the subscribe form and overlay when the button is clicked
//     subscribeBtn.addEventListener('click', () => {
//         subscribeForm.style.display = 'block';
//         overlay.style.display = 'block';
//     });
//     // Hides the subscribe form and overlay when the close button is clicked
//     closeBtn.addEventListener('click', () => {
//         subscribeForm.style.display = 'none';
//         overlay.style.display = 'none';
//     });
//     // Hides the subscribe form and overlay when clicking outside of the form
//     overlay.addEventListener('click', () => {
//         subscribeForm.style.display = 'none';
//         overlay.style.display = 'none';
//     });
//     // Prevents overlay from closing form when clicked inside form
//     subscribeForm.addEventListener('click', (e) => {
//         e.stopPropagation();
//     });
//     // Handles form submission (you might need to implement this part)
//     const subscribeSubmitBtn = document.getElementById('subscribe-submit');
//     subscribeSubmitBtn.addEventListener('click', (event) => {
//         // Handles form submission logic here (e.g., send email)
//         event.preventDefault(); // Prevents default form submission
//         console.log('Subscribe button clicked');
//     });
// });







