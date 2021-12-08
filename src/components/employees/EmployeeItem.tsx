import {Employee} from "../../models";
import {FC} from "react";

type Props = {
  employee: Employee
  onClick: (id: number) => void
}

export const EmployeeItem: FC<Props> = ({employee, onClick}) => {
  return (
    <tr className="employee-item" onClick={() => onClick(employee.id)}>
      <td>{employee.fullName}</td>
      <td>{employee.gender}</td>
      <td>{employee.position}</td>
      <td>{employee.birthday}</td>
      <td>{employee.fired? 'yes': 'no'}</td>
    </tr>
  )
}