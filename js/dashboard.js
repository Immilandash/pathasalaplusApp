const loadDashboard = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/setup'); // API endpoint for setup details
      const setup = await response.json();
  
      // Update Slider
      const sliderContainer = document.getElementById('slider-container');
      sliderContainer.innerHTML = setup.sliders
        .map(image => `<img src="http://localhost:5000/uploads/${image}" alt="Slider Image" class="slider-image">`)
        .join('');
  
      // Update About Us
      document.getElementById('about-text').textContent = setup.aboutUs;
  
      // Update Footer Contact Info
      const contactInfo = `
        <p>WhatsApp: ${setup.contactInfo.whatsappNumber}</p>
        <p>Landline: ${setup.contactInfo.landline}</p>
        <p>Email: ${setup.contactInfo.email}</p>
        <p>Address: ${setup.contactInfo.address}</p>
      `;
      document.getElementById('contact-info').innerHTML = contactInfo;
  
      // Update Footer Social Media Links
      const socialLinks = `
        <a href="${setup.socialMediaLinks.twitter}" target="_blank">Twitter</a>
        <a href="${setup.socialMediaLinks.instagram}" target="_blank">Instagram</a>
        <a href="${setup.socialMediaLinks.youtube}" target="_blank">YouTube</a>
      `;
      document.getElementById('social-links').innerHTML = socialLinks;
  
      // Update Charts
      loadCharts(); // Assuming you fetch student data for charts
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };
  
  const loadCharts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students/all-students'); // API endpoint for students
      const students = await response.json();
  
      // Calculate Campus Ratios
      const campusCounts = [1, 2, 3].map(campusNumber =>
        students.filter(student => student.campusNumber === campusNumber).length
      );
  
      // Pie Chart
      const pieChartCtx = document.getElementById('studentPieChart').getContext('2d');
      new Chart(pieChartCtx, {
        type: 'pie',
        data: {
          labels: ['Campus 1', 'Campus 2', 'Campus 3'],
          datasets: [
            {
              data: campusCounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
      });
  
      // Column Chart
      const columnChartCtx = document.getElementById('studentColumnChart').getContext('2d');
      new Chart(columnChartCtx, {
        type: 'bar',
        data: {
          labels: ['Campus 1', 'Campus 2', 'Campus 3'],
          datasets: [
            {
              label: 'Student Count',
              data: campusCounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
      });
    } catch (error) {
      console.error('Error loading charts:', error);
    }
  };
  
  document.addEventListener('DOMContentLoaded', loadDashboard);
  