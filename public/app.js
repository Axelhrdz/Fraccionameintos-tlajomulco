document.addEventListener('DOMContentLoaded', () => {
    const condoList = document.getElementById('condoList');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
  
    // Load condos on page load
    loadCondos();
  
    // Refresh button event
    refreshBtn.addEventListener('click', loadCondos);
  
    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterCondos(searchTerm);
    });
  
    async function loadCondos() {
      try {
        const response = await fetch('/api/condos');
        const condos = await response.json();
        renderCondos(condos);
      } catch (error) {
        console.error('Error loading condos:', error);
        condoList.innerHTML = '<p>Error loading condo data</p>';
      }
    }
  
    function renderCondos(condos) {
      condoList.innerHTML = '';
      if (condos.length === 0) {
        condoList.innerHTML = '<p>No condos found</p>';
        return;
      }
  
      condos.forEach(condo => {
        const condoElement = document.createElement('div');
        condoElement.className = 'condo-item';
        condoElement.innerHTML = `
          <h3>${condo.name}</h3>
          <p>Address: ${condo.address}</p>
          <p class="status-${condo.status}">Status: ${condo.status}</p>
          <p>Last Verified: ${new Date(condo.last_verified).toLocaleDateString()}</p>
        `;
        condoList.appendChild(condoElement);
      });
    }
  
    function filterCondos(searchTerm) {
      const condoItems = document.querySelectorAll('.condo-item');
      condoItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    }
  });