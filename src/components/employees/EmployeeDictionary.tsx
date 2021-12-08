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
      <button onClick={addNewEmployee}>Add</button>
      <div className="employee-dictionary__body">
        <EmployeeList
          employees={employees}
          onEmployeeClick={setSelectedEmployee}/>
        <BaseEmployeeForm
          onSave={employeeStore.update.bind(employeeStore)}
          employees={employees}
          initialEmployee={selectedEmployee}/>
      </div>
    </div>
  )
})