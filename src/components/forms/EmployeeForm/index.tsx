import {FC, useEffect, useState} from "react";
import {Employee} from "../../../models";
import {observer} from "mobx-react";
import {EmployeeStore} from "../../../stores/EmployeeStore";
import {Errors} from "../../employees/EmployeeDictionary";
import {EmployeeFormInputs} from "./EmployeeFormInputs";

type Props = {
  employeeStore: EmployeeStore
  employee: Employee
  initialErrors: Errors
  onInput: () => void
}

export const EmployeeForm: FC<Props> = observer(
  ({employee, employeeStore, initialErrors, onInput}) => {
  const [errors, setErrors] = useState<Errors>(initialErrors);

  useEffect(() => {
    setErrors(initialErrors);
  }, [initialErrors])

  const handleRemoveClick = () => {
    employeeStore.remove(employee.id);
    setErrors({has: false});
  }

  return (
    <div className="card card-body">
      <div>
        <EmployeeFormInputs
          employeeStore={employeeStore}
          employee={employee}
          errors={errors}
          onInput={onInput}/>
        <button
          disabled={employee === undefined}
          onClick={handleRemoveClick}
          className="btn btn-outline-danger">Удалить</button>
      </div>
    </div>
  )
})