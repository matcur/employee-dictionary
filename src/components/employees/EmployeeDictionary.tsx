import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";
import {BaseEmployeeForm} from "./BaseEmployeeForm";
import {useState} from "react";
import {Employee} from "../../models";
import {validateEmployee} from "../../utils/validateEmloyee";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;
  const [selectedId, setSelectedId] = useState<number>();
  const [errors, setErrors] = useState({} as Errors)

  const addNewEmployee = () => {
    const selected = getEmployById(selectedId);
    const errors = validateEmployee(selected);
    if (selected && errors.has) {
      setErrors(errors);
      return;
    }

    const employee = employeeStore.add({
      id: -1,
      fullName: '',
      fired: false,
      position: 'position',
      gender: 'male',
      birthday: '1999-30-10',
      colleagues: []
    });
    setSelectedId(employee.id);
    setErrors({} as Errors);
  }
  const selectEmployeeId = (id: number) => {
    const selected = getEmployById(selectedId);
    const errors = validateEmployee(selected);
    if (selected && errors.has) {
      setErrors(errors)
      return;
    }

    setSelectedId(id);
    setErrors({} as Errors);
  }
  const getEmployById = (id?: number) => {
    return employees.find(e => e.id === id) as Employee;
  }

  return (
    <div className="employee-dictionary">
      <div className="row mb-3">
        <div className="col-md-">
          <button className="btn btn-outline-primary" onClick={addNewEmployee}>Add</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <EmployeeList
            employees={employees}
            onEmployeeClick={selectEmployeeId}/>
        </div>
        <div className="col-md-4">
          <BaseEmployeeForm
            initialErrors={errors}
            employeeStore={employeeStore}
            employee={getEmployById(selectedId)}/>
        </div>
      </div>
    </div>
  )
})

export type Errors = {
  fullName?: string
  has: boolean
}