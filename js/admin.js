const loginForm = document.getElementById('admin-login-form');
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


const adminBtn = document.querySelector(".adminBtn");
const studentBtn = document.querySelector(".studentBtn");
const AloginBox = document.querySelector('.admin-login-box');
const SloginBox = document.querySelector('.student-login-box');
SloginBox.style.display = "none"
adminBtn.style.background = "red"


adminBtn.addEventListener("click", function(){
  AloginBox.style.display = "block"
  SloginBox.style.display = "none"
  adminBtn.style.background = "red"
  studentBtn.style.background = ""
})

studentBtn.addEventListener("click", function(){
  AloginBox.style.display = "none"
  SloginBox.style.display = "block"
  studentBtn.style.background = "grey"
  adminBtn.style.background = ""
})

