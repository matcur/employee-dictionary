import {Employee} from "../../models";
import {FC} from "react";

type Props = {
  employee: Employee
}

export const EmployeeItem: FC<Props> = ({employee}) => {
  return (
    <tr className="employee-item">
      <th>{employee.fullName}</th>
      <th>{employee.gender}</th>
      <th>{employee.position}</th>
      <th>{employee.birthday}</th>
      <th>{employee.fired? 'yes': 'no'}</th>
    </tr>
  )
}