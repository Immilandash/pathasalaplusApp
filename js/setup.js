document.getElementById('setup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch('http://localhost:5000/api/setup', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert('Setup updated successfully!');
      console.log(data);
    } else {
      alert('Failed to update setup.');
      console.error(data);
    }
  } catch (error) {
    console.error('Error submitting setup form:', error);
  }
});
