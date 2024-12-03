const cards = document.getElementById('student-cards');
const singlecard = document.getElementById('single-student-cards');
const form = document.getElementById('student-edit-form');
const campusFilter = document.getElementById('campus-filter');
let allStudents = []; // To store all students for filtering

async function loadProfile() {
  const response = await fetch('http://localhost:5000/api/students/all-students');
  const students = await response.json();

  // Store all students in a global variable
  allStudents = students;

  // Initially display all students
  displayStudents(students);
}

// Function to display students
function displayStudents(students) {
  cards.innerHTML = students.map(student => `
    <div class="student-card">
      <div class="profile-pic">
        <img src="http://localhost:5000/uploads/${student.profilePicture}" alt="Image" />
      </div>
      <h3 style= "text-transform: uppercase">${student.name}</h3>    
      <p>Seat Number: ${student.seatNumber}</p>
      <p>Campus Number: ${student.campusNumber}</p>
      <p>WhatsApp: ${student.whatsappNumber}</p>
      <strong class="view-details" onclick="viewStudentDetails('${student._id}')"> View Details </strong>
    </div>
  `).join('');
}

// Function to filter students
function filterStudents() {
  const selectedCampus = campusFilter.value; // Dropdown value is a string

  if (selectedCampus === 'all') {
    displayStudents(allStudents); // Show all students
  } else {
    const filteredStudents = allStudents.filter(
      student => student.campusNumber === parseInt(selectedCampus) // Convert string to number for comparison
    );
    displayStudents(filteredStudents);
  }
}

// Load students on page load
loadProfile();




// render students into page 


function viewStudentDetails(studentId) {
  // Navigate to single student profile page with studentId as a query parameter
  window.location.href = `singleprofile.html?id=${studentId}`;
}


// show single student 


async function singlestudent() {
  // Extract student ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id');
  const title = document.querySelector("title")

  const response = await fetch(`http://localhost:5000/api/students/${studentId}`);
  const student = await response.json();

  singlecard.innerHTML = `
    <div class="single-student-card">
      <div class="single-profile-pic">
        <img src="http://localhost:5000/uploads/${student.profilePicture}" alt="Image" />
      </div>
      <h1 style= "text-transform: uppercase"><u>${student.name}</u></h1>   
      <p>Email: ${student.email}</p>
      <p>WhatsApp: ${student.whatsappNumber}</p>
      <p>Alternate Number: ${student.altMobileNumber}</p>
      <p>Address: ${student.address}</p>
      <p>Zip Code: ${student.zipCode}</p>
      <p>Aadhar Number: ${student.aadharNumber}</p>
      <p>Fahter's Name: ${student.fatherName}</p>
      <p>Campus Number: ${student.campusNumber}</p>
      <p>Seat Number: ${student.seatNumber}</p>
      <p>Admission Date: ${student.date}</p>
      <p>Last Renewal Date: ${student.updatedAt}</p>
      <strong class="view-details" onclick="editStudentDetails('${student._id}')"> Edit Details </strong>

    </div>
  `;
  title.innerHTML = `${student.name}'s Profile`
}

// Load the single student profile when the page loads
document.addEventListener('DOMContentLoaded', singlestudent);


function editStudentDetails(studentId) {
  // Navigate to single student profile page with studentId as a query parameter
  window.location.href = `editprofile.html?id=${studentId}`;
}







// edit student details 

// Get student ID from URL
// Get student ID from URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Function to load student data into form fields
async function loadStudentData() {
  const title = document.querySelector("title")
  const response = await fetch(`http://localhost:5000/api/students/${studentId}`);
  const student = await response.json();

  document.getElementById('name').value = student.name;
  document.getElementById('email').value = student.email;
  document.getElementById('whatsappNumber').value = student.whatsappNumber;
  document.getElementById('altMobileNumber').value = student.altMobileNumber;
  document.getElementById('address').value = student.address;
  document.getElementById('zipCode').value = student.zipCode;
  document.getElementById('aadharNumber').value = student.aadharNumber;
  document.getElementById('fatherName').value = student.fatherName;
  document.getElementById('campusNumber').value = student.campusNumber;
  document.getElementById('seatNumber').value = student.seatNumber;
  document.getElementById('date').value = student.date;
  title.innerHTML = `Editing ${student.name}'s Profile`
}
// Load student data when page loads
document.addEventListener('DOMContentLoaded', loadStudentData);

// Form submission handler to save changes

document.getElementById('edit-student-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Create FormData object to handle both text and file data
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('whatsappNumber', document.getElementById('whatsappNumber').value);
  formData.append('altMobileNumber', document.getElementById('altMobileNumber').value);
  formData.append('address', document.getElementById('address').value);
  formData.append('zipCode', document.getElementById('zipCode').value);
  formData.append('aadharNumber', document.getElementById('aadharNumber').value);
  formData.append('fatherName', document.getElementById('fatherName').value);
  formData.append('campusNumber', document.getElementById('campusNumber').value);
  formData.append('seatNumber', document.getElementById('seatNumber').value);
  formData.append('date', document.getElementById('date').value);

  // Append the profile picture if a new one is selected
  const profilePictureInput = document.getElementById('profilePicture');
  if (profilePictureInput.files[0]) {
    formData.append('profilePicture', profilePictureInput.files[0]);
  }

  try {
    const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
      method: 'PATCH',
      body: formData, // Send formData, not JSON
    });

    if (response.ok) {
      alert('Profile updated successfully!');
      window.location.href = `singleprofile.html?id=${studentId}`; // Redirect back to profile page
    } else {
      alert('Failed to update profile.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An error occurred while updating the profile.');
  }
});
