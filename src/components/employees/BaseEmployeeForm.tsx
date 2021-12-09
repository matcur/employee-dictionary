import {FC, useEffect, useState} from "react";
import {Employee} from "../../models";
import {observer} from "mobx-react";
import {EmployeeStore} from "../../stores/EmployeeStore";
import {Errors} from "./EmployeeDictionary";
import {validateEmployee} from "../../utils/validateEmloyee";

type Props = {
  employeeStore: EmployeeStore
  employee: Employee
  initialErrors: Errors
}

export const BaseEmployeeForm: FC<Props> = observer(
  ({employee, employeeStore, initialErrors}) => {
  const positions = ['manager', 'developer', 'header'];
  const employees = employeeStore.employees;
  const possibleColleagues = employees.filter(e => e.id !== employee?.id);
  const [errors, setErrors] = useState<Errors>(initialErrors);

  useEffect(() => {
    setErrors(initialErrors);
  }, [initialErrors])

  const handleFullNameInput = (fullName: string) => {
    employeeStore.update({...employee, fullName});
  }
  const handleGenderChange = (gender: string) => {
    employeeStore.update({...employee, gender});
  }
  const handlePositionChange = (position: string) => {
    employeeStore.update({...employee, position});
  }
  const handleFiredChange = (fired: boolean) => {
    employeeStore.update({...employee, fired});
  }
  const handleBirthdayChange = (birthday: string) => {
    employeeStore.update({...employee, birthday});
  }
  const handleColleagueChange = (selectedOptions: HTMLCollectionOf<HTMLOptionElement>) => {
    const ids: string[] = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      ids.push(selectedOptions[i].value);
    }
    const colleagues = employees.filter(e => ids.includes(e.id.toString()));
    employeeStore.update({...employee, colleagues})
  }
  const handleRemoveClick = () => {
    const errors = validateEmployee(employee)
    if (!errors.has) {
      employeeStore.remove(employee.id);
    }

    setErrors(errors);
  }

  const makePositionOption = (value: string, index: number) => {
    return (
      <option
        key={index}
        value={value}
        selected={employee?.position === value}>{value}</option>
    )
  }
  const makeColleague = (possibleColleague: Employee, index: number) => {
    const isColleague = employee?.colleagues?.includes(possibleColleague)

    return (
      <option
        key={index}
        value={possibleColleague.id}
        selected={isColleague}>{possibleColleague.fullName}</option>
    )
  }

  return (
    <div className="card card-body">
      <div>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            value={employee?.fullName?? ''}
            onInput={e => handleFullNameInput(e.currentTarget.value)}
            className="form-control" name="full-name"/>
          <span className="text-danger">{errors.fullName}</span>
        </div>
        <div className="form-check">
          <input
            checked={employee?.gender === 'male'}
            onChange={e => handleGenderChange(e.currentTarget.value)}
            type="radio"
            value="male"
            id="male"
            name="gender"
            className="form-check-input"/>
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check mb-3">
          <input
            checked={employee?.gender === 'female'}
            onChange={e => handleGenderChange(e.currentTarget.value)}
            type="radio"
            value="female"
            id="female"
            name="gender"
            className="form-check-input"/>
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
        <div className="mb-3">
          <label>Position</label>
          <select
            name="position"
            className="form-select"
            onChange={e => handlePositionChange(e.currentTarget.value)}>
            {positions.map(makePositionOption)}
          </select>
        </div>
        <div className="mb-3">
          <label>Birthday</label>
          <input
            value={employee?.birthday?? ''}
            onChange={e => handleBirthdayChange(e.currentTarget.value)}
            type="date"
            className="form-select"/>
        </div>
        <div className="input-group mb-3">
          <input
            checked={employee?.fired?? ''}
            className="form-check-input"
            onChange={e => handleFiredChange(e.currentTarget.checked)}
            type="checkbox"/>
          <label> Fired</label>
        </div>
        <label>
          Colleagues
          <select
            className="form-select"
            onChange={e => handleColleagueChange(e.currentTarget.selectedOptions)}
            multiple>
            {possibleColleagues.map(makeColleague)}
          </select>
        </label>
        <button
          disabled={employee === undefined}
          onClick={handleRemoveClick}
          className="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  )
})