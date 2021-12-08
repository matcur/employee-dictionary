import {observer} from "mobx-react";
import {useStores} from "../../stores";
import {EmployeeList} from "./EmployeeList";
import {BaseEmployeeForm} from "./BaseEmployeeForm";
import {useState} from "react";
import {Employee} from "../../models";

export const EmployeeDictionary = observer(() => {
  const stores = useStores();
  const employeeStore = stores.employee;
  const employees = employeeStore.employees;
  const [selectedId, setSelectedId] = useState(employees[0].id);

  const addNewEmployee = () => {
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
  }

  const getEmployById = (id: number) => {
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
            onEmployeeClick={setSelectedId}/>
        </div>
        <div className="col-md-4">
          <BaseEmployeeForm
            employeeStore={employeeStore}
            employees={employees}
            employee={getEmployById(selectedId)}/>
        </div>
      </div>
    </div>
  )
})