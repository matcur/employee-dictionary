import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";
import {NewEmployeeForm} from "./NewEmployeeForm";
import {NewEmployee} from "../../models";
import {maxId} from "../../utils/maxId";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;

  const addEmployee = (newEmployee: NewEmployee) => {
    const employee = {...newEmployee, id: maxId(employees)};
    employeeStore.add(employee);
  }

  return (
    <div className="employee-dictionary">
      <NewEmployeeForm
        addEmployee={addEmployee}
        employees={employees}/>
      <EmployeeList employees={employees}/>
    </div>
  )
})