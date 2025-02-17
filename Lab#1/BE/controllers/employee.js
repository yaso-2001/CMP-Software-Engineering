const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => { 
  const id = req.params.id;
  employee.forEach((emp, index) => 
  {
    if (emp.id === id)
    {
      employee.splice(index, 1);
    }
  });
  res.status(201).json({data:employee});
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const {newname,newid}=req.body;
  const newEmp ={
    id : newid.toString(),
    name : newname
  };
  const bool = employee.some(emp => emp.id === newEmp.id);
  if (bool === true)
  {
    res.status(404).json({ error: 'this employee already exists'});
  }
  else 
  {
    employee.push(newEmp);
    res.status(201).json({data:employee});
  }
};
