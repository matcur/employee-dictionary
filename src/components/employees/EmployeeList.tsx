import {Employee} from "../../models";
import {FC} from "react";
import {EmployeeItem} from "./EmployeeItem";
import {observer} from "mobx-react";

type Props = {
  employees: Employee[]
  onEmployeeClick: (id: number) => void
}

export const EmployeeList: FC<Props> = observer(({employees, onEmployeeClick}) => {
  function makeEmployee(employee: Employee, index: number) {
    return <EmployeeItem
      key={index}
      employee={employee}
      onClick={onEmployeeClick}/>;
  }

  return (
    <table className="employee-list table table-hover table-bordered mr-2">
      <thead>
        <tr>
          <td>Full Name</td>
          <td>Gender</td>
          <td>Position</td>
          <td>Birthday</td>
          <td>Fired</td>
        </tr>
      </thead>
      <tbody>
        {employees.map(makeEmployee)}
      </tbody>
    </table>
  )
})