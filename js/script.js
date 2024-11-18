const form = document.getElementById('addStudentForm');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

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
      formData.append('profilePicture', document.getElementById('profilePicture').files[0]);

      const response = await fetch('http://localhost:5000/api/students/add-student', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Student added successfully');
        loadProfile();
      } else {
        alert('Failed to add student');
      }
    });
