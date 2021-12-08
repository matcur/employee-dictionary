import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";
import {BaseEmployeeForm} from "./BaseEmployeeForm";
import {useState} from "react";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const addNewEmployee = () => {
    const employee = employeeStore.add({
      id: -1,
      fullName: '',
      fired: false,
      position: 'position',
      gender: 'male',
      birthday: '1999-30-10',
      colleagues: []
    });
    setSelectedEmployee(employee);
  }

  return (
    <div className="employee-dictionary">
      <div className="row mb-3">
        <div className="col-md-">
          <button className="btn btn-outline-primary" onClick={addNewEmployee}>Add</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <EmployeeList
            employees={employees}
            onEmployeeClick={setSelectedEmployee}/>
        </div>
        <div className="col-md-4">
          <BaseEmployeeForm
            onSave={employeeStore.update.bind(employeeStore)}
            employees={employees}
            initialEmployee={selectedEmployee}/>
        </div>
      </div>
    </div>
  )
})