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
    <div className="card card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input {...fullName} className="form-control" name="full-name"/>
          <span className="text-danger">{errors.fullName}</span>
        </div>
        <div className="form-check">
          <input {...gender} type="radio" value="male" id="male" name="gender" className="form-check-input" defaultChecked/>
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check mb-3">
          <input {...gender} type="radio" value="female" id="female" name="gender" className="form-check-input"/>
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
        <div className="mb-3">
          <label>Position</label>
          <select name="position" className="form-select" onChange={handlePositionChange}>
            {positions.map(makePositionOption)}
          </select>
        </div>
        <div className="mb-3">
          <label>Birthday</label>
          <input {...birthday} type="date" className="form-select"/>
        </div>
        <div className="input-group mb-3">
          <input checked={fired} className="form-check-input" onChange={handleFiredChange} type="checkbox"/>
          <label> Fired</label>
        </div>
        <label>
          Colleagues
          <select className="form-select" onChange={handleColleagueChange} multiple>
            {employees.map((e, i) => <option key={i} value={e.id}>{e.fullName}</option>)}
          </select>
        </label>
        <button type="submit" className="btn btn-outline-primary">Save</button>
      </form>
    </div>
  )
})