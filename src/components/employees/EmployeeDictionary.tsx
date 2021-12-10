import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeTable} from "./EmployeeTable";
import {EmployeeForm} from "../forms/EmployeeForm";
import {useState} from "react";
import {Employee} from "../../models";
import {validateEmployee} from "../../utils/validateEmloyee";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;
  const [selectedId, setSelectedId] = useState<number>();
  const [errors, setErrors] = useState({} as Errors)

  const tryAddNewEmployee = () => {
    if(hasErrors()) {
      return;
    }

    const employee = employeeStore.add({
      id: -1,
      fullName: '',
      fired: false,
      position: 'разработчик',
      gender: 'женщина',
      birthday: '',
      colleagues: []
    });
    setSelectedId(employee.id);
  }
  const trySetSelectedId = (id: number) => {
    if(hasErrors()) {
      return;
    }

    setSelectedId(id);
  }
  const getEmployById = (id?: number) => {
    return employees.find(e => e.id === id) as Employee;
  }
  const hasErrors = () => {
    const selected = getEmployById(selectedId);
    const errors = validateEmployee(selected);
    if (selected && errors.has) {
      setErrors(errors);

      return true;
    }

    setErrors({has: false});

    return false;
  }

  const handleInput = () => {
    const selected = getEmployById(selectedId);

    if (selected === undefined) {
      return;
    }

    const errors = validateEmployee(selected);
    setErrors(errors);
  }

  return (
    <div className="employee-dictionary">
      <div className="row mb-3">
        <div className="col-md-8 new-employee-btn-wrap">
          <button className="btn btn-outline-primary" onClick={tryAddNewEmployee}>Добавить</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <EmployeeTable
            selectedEmployee={getEmployById(selectedId)}
            employees={employees}
            onEmployeeClick={trySetSelectedId}/>
        </div>
        <div className="col-md-4">
          <EmployeeForm
            setErrors={setErrors}
            errors={errors}
            employeeStore={employeeStore}
            employee={getEmployById(selectedId)}
            onInput={handleInput}/>
        </div>
      </div>
    </div>
  )
})

export type Errors = {
  fullName?: string
  has: boolean
}