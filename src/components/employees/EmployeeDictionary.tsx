import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;

  return (
    <div className="employee-dictionary">
      <EmployeeList employees={employeeStore.employees}/>
    </div>
  )
})