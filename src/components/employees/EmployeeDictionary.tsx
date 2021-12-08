import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";
import {BaseEmployeeForm} from "./BaseEmployeeForm";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;

  const addNewEmployee = () => {
    employeeStore.add({
      id: -1,
      fullName: '',
      fired: false,
      position: 'position',
      gender: 'male',
      birthday: '1999-30-10',
      colleagues: []
    })
  }

  return (
    <div className="employee-dictionary">
      <button onClick={addNewEmployee}>Add</button>
      <div className="employee-dictionary__body">
        <EmployeeList employees={employees}/>
        <BaseEmployeeForm
          onSave={employeeStore.update.bind(employeeStore)}
          employees={employees}/>
      </div>
    </div>
  )
})