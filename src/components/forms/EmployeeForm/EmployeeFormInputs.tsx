import {observer} from "mobx-react";
import {FC} from "react";
import {Employee} from "../../../models";
import {EmployeeStore} from "../../../stores/EmployeeStore";
import {Errors} from "../../employees/EmployeeDictionary";

type Props = {
  employeeStore: EmployeeStore
  employee: Employee
  errors: Errors
  onInput: () => void
}

export const EmployeeFormInputs: FC<Props> = observer(
  ({employee, employeeStore, errors, onInput}) => {
  const positions = ['разработчик', 'менеджер', 'рекрутер'];
  const employees = employeeStore.employees;
  const possibleColleagues = employees.filter(e => e.id !== employee?.id);

  const handleFullNameInput = (fullName: string) => {
    employeeStore.update({...employee, fullName});
    onInput();
  }
  const handleGenderChange = (gender: string) => {
    employeeStore.update({...employee, gender});
    onInput();
  }
  const handlePositionChange = (position: string) => {
    employeeStore.update({...employee, position});
    onInput();
  }
  const handleFiredChange = (fired: boolean) => {
    employeeStore.update({...employee, fired});
    onInput();
  }
  const handleBirthdayChange = (birthday: string) => {
    employeeStore.update({...employee, birthday});
    onInput();
  }
  const handleColleagueChange = (selectedOptions: HTMLCollectionOf<HTMLOptionElement>) => {
    const ids: string[] = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      ids.push(selectedOptions[i].value);
    }

    const colleagues = employees.filter(e => ids.includes(e.id.toString()));
    employeeStore.update({...employee, colleagues})
    onInput();
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
    <>
      <div className="mb-3">
        <label className="form-label">ФИО</label>
        <input
          value={employee?.fullName?? ''}
          onInput={e => handleFullNameInput(e.currentTarget.value)}
          className="form-control" name="full-name"/>
        <span className="text-danger">{errors.fullName}</span>
      </div>
      <div className="form-check">
        <input
          checked={employee?.gender === 'мужчина'}
          onChange={e => handleGenderChange(e.currentTarget.value)}
          type="radio"
          value="мужчина"
          id="male"
          name="gender"
          className="form-check-input"/>
        <label className="form-check-label" htmlFor="male">Мужчина</label>
      </div>
      <div className="form-check mb-3">
        <input
          checked={employee?.gender === 'женщина'}
          onChange={e => handleGenderChange(e.currentTarget.value)}
          type="radio"
          value="женщина"
          id="female"
          name="gender"
          className="form-check-input"/>
        <label className="form-check-label" htmlFor="female">Женщина</label>
      </div>
      <div className="mb-3">
        <label>Должность</label>
        <select
          name="position"
          className="form-select"
          onChange={e => handlePositionChange(e.currentTarget.value)}>
          {positions.map(makePositionOption)}
        </select>
      </div>
      <div className="mb-3">
        <label>День рождения</label>
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
          type="checkbox"
          id="fired"/>
        <label htmlFor="fired">Уволен</label>
      </div>
      <label>
        Коллеги
        <select
          className="form-select colleagues-select"
          onChange={e => handleColleagueChange(e.currentTarget.selectedOptions)}
          multiple>
          {possibleColleagues.map(makeColleague)}
        </select>
      </label>
    </>
  )
})