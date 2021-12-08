import {Employee} from "../../models";
import {FC} from "react";
import {EmployeeItem} from "./EmployeeItem";
import {observer} from "mobx-react";

type Props = {
  employees: Employee[]
  onEmployeeClick: (employee: Employee) => void
}

export const EmployeeList: FC<Props> = observer(({employees, onEmployeeClick}) => {
  function makeEmployee(employee: Employee, index: number) {
    return <EmployeeItem
      key={index} employee={employee}
      onClick={onEmployeeClick}/>;
  }

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
        {employees.map(makeEmployee)}
      </tbody>
    </table>
  )
})