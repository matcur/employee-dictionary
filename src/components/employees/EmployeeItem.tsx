import {Employee} from "../../models";
import {FC} from "react";

type Props = {
  employee: Employee
  onClick: (id: number) => void
  className: string
}

export const EmployeeItem: FC<Props> = ({employee, onClick, className = ''}) => {
  return (
    <tr className={'employee-item ' + className} onClick={() => onClick(employee.id)}>
      <td>{employee.fullName}</td>
      <td>{employee.gender}</td>
      <td>{employee.position}</td>
      <td>{employee.birthday}</td>
      <td>{employee.fired? 'да': 'нет'}</td>
    </tr>
  )
}