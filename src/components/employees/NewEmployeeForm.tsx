import {Employee, NewEmployee} from "../../models";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {useInput} from "../../hooks/useInput";

type Props = {
  addEmployee: (employee: NewEmployee) => void
  employees?: Employee[]
}

export const NewEmployeeForm: FC<Props> = ({addEmployee, employees = []}) => {
  const fullName = useInput('');
  const gender = useInput('');
  const birthday = useInput('');
  const position = useInput('');
  const [fired, setFired] = useState(false);
  const [colleagues, setColleagues] = useState<Employee[]>([])

  const positions = ['manager', 'developer', 'header'];

  const handlePositionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    position.onChange(e.currentTarget.value);
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEmployee({
      fullName: fullName.value,
      gender: gender.value,
      position: position.value,
      birthday: birthday.value,
      fired: fired,
      colleagues: colleagues,
    });
    clearForm();
  }
  const handleFiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFired(e.currentTarget.checked);
  }
  const handleColleagueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = e.currentTarget.selectedOptions;
    const ids: string[] = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      ids.push(selectedOptions[i].value)
    }
    setColleagues(employees.filter(e => ids.includes(e.id.toString())))
  }
  const clearForm = () => {
    fullName.onChange('');
    gender.onChange('');
    position.onChange('manager');
    birthday.onChange('');
    setFired(false);
  }

  const makePositionOption = (value: string, index: number) => {
    return (
      <option
        selected={value === position.value}
        key={index}
        value={value}>{value}</option>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input {...fullName}/>
        </label>
        <label htmlFor="">
          Male
          <input {...gender} type="radio" value="male" name="gender"/>
        </label>
        <label htmlFor="">
          Female
          <input {...gender} type="radio" value="female" name="gender"/>
        </label>
        <label>
          Position
          <select onChange={handlePositionChange}>
            {positions.map(makePositionOption)}
          </select>
        </label>
        <label>
          Birthday
          <input {...birthday} type="date"/>
        </label>
        <label>
          Fired
          <input checked={fired} onChange={handleFiredChange} type="checkbox"/>
        </label>
        <label>
          Colleagues
          <select onChange={handleColleagueChange} multiple>
            {employees.map(e => <option value={e.id}>{e.fullName}</option>)}
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}