function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('submitButton').addEventListener('click', createEmployee);

// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-danger')) {
    const row = event.target.closest('tr');
    const id = row.querySelector('td:first-child').textContent;
    deleteEmployee(id);
  }
});



// TODO
function createEmployee (){
  // get data from input field
  const nameInput = document.getElementById('employeeName');
  const name = nameInput.value.trim(); // Trim whitespace

  if (!name) {
    console.error('Please enter a valid employee name');
    return;
  }

  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  .then(response => {
    if (response.ok) {
      console.log('Employee created successfully');
      nameInput.value = ''; // Clear the input field after successful creation
      fetchEmployees(); // Refresh the employee list after creation
    } else {
      console.error('Failed to create employee');
    }
  })
  .catch(error => console.error(error));
}

fetchEmployees(); // Initial fetch when the page loads
}

// TODO
function deleteEmployee() {
// get id
// send id to BE
 fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      console.log('Employee deleted successfully');
      fetchEmployees(); // Refresh the employee list after deletion
    } else {
      console.error('Failed to delete employee');
    }
  })
  .catch(error => console.error(error));
}



fetchEmployees()
