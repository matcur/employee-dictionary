import {Employee} from "../../models";
import {FC} from "react";
import {EmployeeItem} from "./EmployeeItem";

type Props = {
  employees: Employee[]
}

export const EmployeeList: FC<Props> = ({employees}) => {
  return (
    <table className="employee-list">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Position</th>
          <th>Birthday</th>
          <th>Fired</th>
        </tr>
      </thead>
      <tbody>
        {
          employees.map(e => <EmployeeItem employee={e}/>)
        }
      </tbody>
    </table>
  )
}
//ФИО, пол, должность, датой рождения и признаком уволен