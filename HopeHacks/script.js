const carousel = document.getElementById('carousel');
const images = carousel.getElementsByTagName('img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showImage(index) {
  const offset = -index * 100;
  for (let img of images) {
    img.style.transform = `translateX(${offset}%)`;
  }
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  showImage(currentIndex);
});

showImage(currentIndex); 
