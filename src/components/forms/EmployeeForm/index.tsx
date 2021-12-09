import {FC, useEffect, useState} from "react";
import {Employee} from "../../../models";
import {observer} from "mobx-react";
import {EmployeeStore} from "../../../stores/EmployeeStore";
import {Errors} from "../../employees/EmployeeDictionary";
import {validateEmployee} from "../../../utils/validateEmloyee";
import {EmployeeFormInputs} from "./EmployeeFormInputs";

type Props = {
  employeeStore: EmployeeStore
  employee: Employee
  initialErrors: Errors
}

export const EmployeeForm: FC<Props> = observer(
  ({employee, employeeStore, initialErrors}) => {
  const [errors, setErrors] = useState<Errors>(initialErrors);

  useEffect(() => {
    setErrors(initialErrors);
  }, [initialErrors])

  const handleRemoveClick = () => {
    const errors = validateEmployee(employee)
    if (!errors.has) {
      employeeStore.remove(employee.id);
    }

    setErrors(errors);
  }

  return (
    <div className="card card-body">
      <div>
        <EmployeeFormInputs
          employeeStore={employeeStore}
          employee={employee}
          errors={errors}/>
        <button
          disabled={employee === undefined}
          onClick={handleRemoveClick}
          className="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  )
})