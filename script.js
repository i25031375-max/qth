// scroll reveal
const hiddenElements = document.querySelectorAll('section, .asym-grid, .gallery-zigzag, .insight-card, .interactive-module, .qr-center, footer');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

hiddenElements.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

function openLightbox(src) {
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeLightboxModal() {
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
}
if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxModal);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightboxModal(); });

function bindLightboxToImages() {
  const clickable = document.querySelectorAll('.img-box img, .zigzag-grid img, .full-bleed img');
  clickable.forEach(img => {
    img.removeEventListener('click', lightboxHandler);
    img.addEventListener('click', lightboxHandler);
    img.style.cursor = 'pointer';
  });
}
function lightboxHandler(e) { openLightbox(e.currentTarget.src); }

// Random facts for Zhengzhou
const cityFacts = [
  "🏺 Zhengzhou is one of China’s “Eight Ancient Capitals” – capital of the Shang Dynasty over 3600 years ago.",
  "🚆 The city is the largest railway hub in Asia, with the famous Zhengzhou North Marshalling Yard.",
  "🏯 The Shang Dynasty City Wall in Zhengzhou is over 7 km long and still visible today.",
  "🌊 Just 30 km north, the Yellow River – “Mother River of China” – flows through the Zhengzhou region.",
  "🥋 Shaolin Temple, birthplace of Kung Fu, is only 90 km from Zhengzhou.",
  "📚 Zhengzhou is home to Henan Museum, one of China’s finest with over 170,000 artifacts.",
  "🍜 Huimian (Henan braised noodles) was created by a chef who missed his mother’s cooking.",
  "🌉 The Zhengzhou East Station is a mega transport hub shaped like a giant “Zhong” character."
];

const foodFacts = [
  "🍜 Huimian noodles are hand‑pulled into wide, thick ribbons – the chewiness is a signature.",
  "🌶️ Hulatang (Spicy Pepper Soup) contains more than 20 herbs and spices – it’s a local breakfast legend.",
  "🥟 Henan dumplings often use fillings like Chinese chives, egg, and glass noodles.",
  "🔥 Zhengzhou’s night markets are famous for “kao mian jin” (grilled wheat gluten) and stinky tofu.",
  "🍠 Baked sweet potatoes from street carts are a winter comfort staple.",
  "🍯 “Daokou Roast Chicken” is a famous Henan dish with over 300 years of history.",
  "🥣 Mung bean noodles with sesame sauce are a cooling summer favorite.",
  "🍻 Zhengzhou has a thriving craft beer scene – try “Yellow River” ale."
];

function initRandomFact(buttonId, factArray, displayId) {
  const btn = document.getElementById(buttonId);
  const displayPara = document.getElementById(displayId);
  if (btn && displayPara) {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      const randomIdx = Math.floor(Math.random() * factArray.length);
      displayPara.textContent = factArray[randomIdx];
      displayPara.style.transform = 'scale(1.02)';
      setTimeout(() => { if(displayPara) displayPara.style.transform = ''; }, 200);
    });
  }
}

// detect page
setTimeout(() => {
  const isFoodPage = document.body.classList.contains('food-subpage') || document.querySelector('.hero-food') !== null;
  if (isFoodPage) {
    initRandomFact('randomFoodFactBtn', foodFacts, 'funFactText');
  } else {
    initRandomFact('randomFactBtn', cityFacts, 'funFactText');
  }
  bindLightboxToImages();

  const observerImages = new MutationObserver(() => bindLightboxToImages());
  observerImages.observe(document.body, { childList: true, subtree: true });
}, 50);

window.addEventListener('load', () => bindLightboxToImages());