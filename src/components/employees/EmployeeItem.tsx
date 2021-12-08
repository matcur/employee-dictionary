import {Employee} from "../../models";
import {FC} from "react";

type Props = {
  employee: Employee
  onClick: (employee: Employee) => void
}

export const EmployeeItem: FC<Props> = ({employee, onClick}) => {
  return (
    <tr className="employee-item" onClick={() => onClick(employee)}>
      <th>{employee.fullName}</th>
      <th>{employee.gender}</th>
      <th>{employee.position}</th>
      <th>{employee.birthday}</th>
      <th>{employee.fired? 'yes': 'no'}</th>
    </tr>
  )
}