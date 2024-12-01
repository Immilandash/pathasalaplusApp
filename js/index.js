async function loadSetupData() {
  try {
    const response = await fetch('http://localhost:5000/api/setup');
    const data = await response.json();

    // Apply color theme
    document.documentElement.style.setProperty('--main-color', data.themeColor);
    
    const logo = document.getElementById('brand-logo');

    logo.innerHTML = `<img src="http://localhost:5000/uploads/${data.logo}" alt="Slider Image">
`
    // Update Brand Name
    document.getElementById('brand-name').innerText = "Welcome to: " + data.brandName;

    // Update About Us section
    document.getElementById('about-content').innerText = data.aboutUs;

    // Update Social Media Links
    document.getElementById('twitter-link').href = data.socialMedia.twitter;
    document.getElementById('instagram-link').href = data.socialMedia.instagram;
    document.getElementById('youtube-link').href = data.socialMedia.youtube;

    // Update Slider
    const slider = document.getElementById('slider');
    slider.innerHTML = data.sliders.map(img => `
      <img src="http://localhost:5000/uploads/${img}" alt="Slider Image">
    `).join('');
    initializeSlider();
  } catch (error) {
    console.error('Error loading setup data:', error);
  }
}

function initializeSlider() {
  const slider = document.getElementById('slider');
  const slides = slider.querySelectorAll('img');
  let currentIndex = 0;

  document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

  document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  });
}

loadSetupData();
