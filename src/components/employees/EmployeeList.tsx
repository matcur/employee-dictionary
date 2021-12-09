import {Employee} from "../../models";
import {FC} from "react";
import {EmployeeItem} from "./EmployeeItem";
import {observer} from "mobx-react";

type Props = {
  employees: Employee[]
  onEmployeeClick: (id: number) => void
  selectedEmployee: Employee
}

export const EmployeeList: FC<Props> = observer(({employees, onEmployeeClick, selectedEmployee}) => {
  const makeEmployee = (employee: Employee, index: number) => {
    const isSelected = employee === selectedEmployee;

    return <EmployeeItem
      key={index}
      employee={employee}
      onClick={onEmployeeClick}
      className={isSelected? 'selected-employee': ''}/>;
  }

  return (
    <table className="employee-list table table-hover table-bordered mr-2">
      <thead>
        <tr>
          <td>ФИО</td>
          <td>Пол</td>
          <td>Должность</td>
          <td>День рождения</td>
          <td>Уволен</td>
        </tr>
      </thead>
      <tbody>
        {employees.map(makeEmployee)}
      </tbody>
    </table>
  )
})