import {Employee, NewEmployee} from "../../models";
import {FC} from "react";
import {BaseEmployeeForm} from "./BaseEmployeeForm";

type Props = {
  addEmployee: (employee: NewEmployee) => void
  employees?: Employee[]
}

export const NewEmployeeForm: FC<Props> = ({addEmployee, employees = []}) => {
  return (
    <BaseEmployeeForm
      onSave={addEmployee}
      employees={employees}/>
  )
}