import {NewEmployee} from "../../models";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {useInput} from "../../hooks/useInput";

type Props = {
  addEmployee: (employee: NewEmployee) => void
}

export const NewEmployeeForm: FC<Props> = ({addEmployee}) => {
  const fullName = useInput('');
  const gender = useInput('');
  const birthday = useInput('');
  const position = useInput('');
  const [fired, setFired] = useState(false);

  const positions = ['manager', 'developer', 'header'];

  function handlePositionChange(e: ChangeEvent<HTMLSelectElement>) {
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
    });
    clearForm();
  }
  const handleFiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFired(e.currentTarget.checked);
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
        <button type="submit">Add</button>
      </form>
    </div>
  )
}