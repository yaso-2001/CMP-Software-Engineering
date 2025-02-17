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
const submitbtn = document.getElementsByClassName("btn btn-primary mt-3")[0];
submitbtn.addEventListener("click",createEmployee);

// TODO
// add event listener to delete button
// Attach event listener to table body
document.getElementById('dataTable').addEventListener('click', function(event) {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('btn-danger')) {
    // Call deleteEmployee with the id of the clicked button's parent row
    const id = event.target.parentElement.parentElement.firstChild.textContent;
    deleteEmployee(id);
  }
});
const deletebtn = document.getElementsByClassName("btn btn-danger btn-sm");
for ( let i = 0; i < deletebtn.length; i++)
{
  deletebtn[i].addEventListener("click", () => deleteEmployee(idCell.value));
}


// TODO
function createEmployee (){
 // get data from input field
  const namefield = document.getElementById("name");
  const idfield = document.getElementById("id");
  const newname = namefield.value;
  const newid = idfield.value;
  if (newname === '' || newid === '')
  {
    alert("empty fields");
  }
  else
  {
    // send data to BE
    fetch('http://localhost:3000/api/v1/employee' , {
        method : 'POST',
        headers : {'Content-Type': 'application/json',},
        body : JSON.stringify({newname,newid}),});
    // call fetchEmployees
    if (response.ok)
    {
      fetchEmployees();
    }
    else
    {
      alert("this employee already exists");
    }
  }
}

// TODO
function deleteEmployee (id){
  // get id
  //const id = idCell.value;
  // send id to BE
  const response = fetch(`http://localhost:3000/api/v1/employee/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  // call fetchEmployees
  fetchEmployees();
}

fetchEmployees()
