import {useInput} from "../../hooks/useInput";
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {Employee, EmployeeFormData} from "../../models";
import {observer} from "mobx-react";

type Props = {
  onSave: (employee: EmployeeFormData) => void
  employees: Employee[]
  initialEmployee: Employee
}

type Errors = {
  position?: string;
  fullName?: string
  has: boolean
}

export const BaseEmployeeForm: FC<Props> = observer(({onSave, employees, initialEmployee}) => {
  const fullName = useInput('');
  const gender = useInput('male');
  const birthday = useInput('');
  const position = useInput('manager');
  const [fired, setFired] = useState(false);
  const [colleagues, setColleagues] = useState<Employee[]>([]);
  const [errors, setErrors] = useState<Errors>({} as Errors);

  useEffect(() => {
    fullName.onChange(initialEmployee.fullName)
    gender.onChange(initialEmployee.gender)
    birthday.onChange(initialEmployee.birthday)
    setFired(initialEmployee.fired)
    setColleagues(initialEmployee.colleagues?? [])
  }, [initialEmployee])
  const positions = ['manager', 'developer', 'header'];

  const handlePositionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    position.onChange(e.currentTarget.value);
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const employee = {
      id: initialEmployee.id,
      fullName: fullName.value,
      gender: gender.value,
      position: position.value,
      birthday: birthday.value,
      fired: fired,
      colleagues: colleagues,
    };
    const errors = validate(employee);
    if (errors.has) {
      setErrors(errors);
      return;
    }
    onSave(employee);
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
        key={index}
        value={value}>{value}</option>
    )
  }
  const validate = (employee: EmployeeFormData) => {
    const errors = {has: false} as Errors;
    if (employee.fullName === '') {
      errors.fullName = 'Full name is required';
      errors.has = true;
    }

    return errors;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input {...fullName}/>
          <strong>{errors.fullName}</strong>
        </label>
        <label htmlFor="">
          Male
          <input {...gender} type="radio" value="male" name="gender" defaultChecked/>
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
            {employees.map((e, i) => <option key={i} value={e.id}>{e.fullName}</option>)}
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  )
})