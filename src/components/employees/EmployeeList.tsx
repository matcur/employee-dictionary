import {Employee} from "../../models";
import {FC} from "react";
import {EmployeeItem} from "./EmployeeItem";
import {observer} from "mobx-react";

type Props = {
  employees: Employee[]
}

export const EmployeeList: FC<Props> = observer(({employees}) => {
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
        {employees.map((e, i) => <EmployeeItem key={i} employee={e}/>)}
      </tbody>
    </table>
  )
})