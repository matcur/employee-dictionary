import {FC} from "react";
import {Employee} from "../../../models";
import {observer} from "mobx-react";
import {EmployeeStore} from "../../../stores/EmployeeStore";
import {Errors} from "../../employees/EmployeeDictionary";
import {EmployeeFormInputs} from "./EmployeeFormInputs";

type Props = {
  employeeStore: EmployeeStore
  employee: Employee
  errors: Errors
  onInput: () => void
  setErrors: (value: Errors) => void
}

export const EmployeeForm: FC<Props> = observer(
  ({employee, employeeStore, errors, setErrors, onInput}) => {
  const handleRemoveClick = () => {
    employeeStore.remove(employee.id);
    setErrors({has: false});
  }

  return (
    <div className="card card-body employee-form">
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