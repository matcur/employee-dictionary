import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";
import {BaseEmployeeForm} from "./BaseEmployeeForm";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;

  return (
    <div className="employee-dictionary">
      <BaseEmployeeForm
        onSave={employeeStore.add.bind(employeeStore)}
        employees={employees}/>
      <EmployeeList employees={employees}/>
      <BaseEmployeeForm
        onSave={employeeStore.update.bind(employeeStore)}
        employees={employees}/>
    </div>
  )
})