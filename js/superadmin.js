// Fetch admin requests
async function fetchAdminRequests() {
    const response = await fetch('http://localhost:5000/api/superadmin/admin-requests');
    const admins = await response.json();
  
    const adminRequests = document.getElementById('admin-requests');
    adminRequests.innerHTML = admins.map(admin => `
      <div>
        <p>${admin.name} - ${admin.email}</p>
        <button onclick="handleRequest('${admin._id}', 'approve')">Approve</button>
        <button onclick="handleRequest('${admin._id}', 'reject')">Reject</button>
      </div>
    `).join('');
  }
  
  // Handle approve/reject
  async function handleRequest(id, action) {
    await fetch('http://localhost:5000/api/superadmin/admin-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    fetchAdminRequests();
  }
  
  // On page load
  fetchAdminRequests();
  