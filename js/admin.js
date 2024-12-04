const loginForm = document.getElementById('admin-login-form');
const adminBtn = document.querySelector(".adminBtn");
const studentBtn = document.querySelector(".studentBtn");
const AloginBox = document.querySelector('.admin-login-box');
const SloginBox = document.querySelector('.student-login-box');


// Admin Registration
// document.getElementById('admin-register-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('admin-name').value;
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;
  
//     await fetch('http://localhost:5000/api/admin/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });
//     alert('Registration request sent!');
//   });
  





loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;

  try {
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful');
      localStorage.setItem('token', data.token); // Store the token
      window.location.href = '../views/dashboard.html'; // Redirect to admin dashboard
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Login failed. Please try again.');
  }
});



async function loadSomething(){
  try {
    const response = await fetch('http://localhost:5000/api/setup');
    const data = await response.json();
    document.documentElement.style.setProperty('--main-color', data.themeColor);
SloginBox.style.display = "none"
adminBtn.style.background = data.themeColor
    adminBtn.addEventListener("click", function(){
      AloginBox.style.display = "block"
      SloginBox.style.display = "none"
      adminBtn.style.background = data.themeColor 
      studentBtn.style.background = ""
    })


    studentBtn.addEventListener("click", function(){
      AloginBox.style.display = "none"
      SloginBox.style.display = "block"
      studentBtn.style.background = "grey"
      adminBtn.style.background = ""
    })
    
  } catch (error) {
    console.error('Error loading setup data:', error);
  }
}
loadSomething()

const bubbleContainer = document.querySelector('.bubbles-container');

// Function to create a bubble
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Randomize size and position
  const size = Math.random() * 50 + 10; // Between 10px and 60px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;

  // Randomize animation duration
  const duration = Math.random() * 5 + 5; // Between 5s and 10s
  bubble.style.animationDuration = `${duration}s`;

  bubbleContainer.appendChild(bubble);

  // Remove bubble after animation ends
  setTimeout(() => bubble.remove(), duration * 1000);
}

// Generate bubbles continuously
setInterval(createBubble, 500); // Add a bubble every 500ms






