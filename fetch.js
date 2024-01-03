document.addEventListener('DOMContentLoaded', function () {
    fetchData();
  
    function fetchData() {
      fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
          displayUserNames(data.users);
          displayData(data.users[0]);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function displayUserNames(users) {
      const selectElement = document.getElementById('user-select');
  
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select a name';
      selectElement.appendChild(defaultOption);
  
      users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.firstName;
        selectElement.appendChild(option);
      });
  
      selectElement.addEventListener('change', function () {
        const selectedUserId = parseInt(selectElement.value, 10);
  
        if (selectedUserId) {
          fetch(`https://dummyjson.com/users/${selectedUserId}`)
            .then(response => response.json())
            .then(selectedUserData => {
              displayData(selectedUserData);
            })
            .catch(error => console.error('Error fetching selected user data:', error));
        } else {
          const dataContainer = document.getElementById('data-container');
          dataContainer.innerHTML = '';
        }
      });
    }
  
    function displayData(user) {
      const dataContainer = document.getElementById('data-container');
  
      if (user) {
        const address = user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : 'N/A';
        const userInfoHTML = `
          <div class="user-info">
            <h2>${user.firstName}</h2>
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Company:</strong> ${user.company ? user.company.name : 'N/A'}</p>
          </div>
        `;
  
        dataContainer.innerHTML = userInfoHTML;
      } else {
        dataContainer.innerHTML = '<p>No user data available.</p>';
      }
    }
  });
  