const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => { const employeeId = req.params.id;

  // Find the index of the employee with the given id
  const index = employee.findIndex(emp => emp.id === employeeId);

  if (index !== -1) {
    // Remove the employee from the array
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => { const { name } = req.body;

  // Generate a unique id (you might want to use a library for this in a real-world scenario)
  const newEmployeeId = (employee.length + 1).toString();

  // Create a new employee object
  const newEmployee = { id: newEmployeeId, name };

  // Add the new employee to the array
  employee.push(newEmployee);

  res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
};
