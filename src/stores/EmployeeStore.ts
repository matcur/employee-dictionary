import {action, makeAutoObservable, observable} from "mobx";
import {Employee, EmployeeFormData} from "../models";
import {maxId} from "../utils/maxId";

export class EmployeeStore {
  @observable
  employees: Employee[] = [
    {
      id: 1,
      fullName: 'Alexeyevich Alexey Alexev',
      position: 'manager',
      birthday: '1998-07-12',
      gender: 'male',
      fired: true,
      colleagues: [],
    },
    {
      id: 2,
      fullName: 'Ivanov Ivan Ivanovich',
      position: 'developer',
      birthday: '1999-12-1',
      gender: 'male',
      fired: false,
      colleagues: [],
    },
    {
      id: 3,
      fullName: 'Sergey Petrovich Nestarnak',
      position: 'manager',
      birthday: '1999-08-30',
      gender: 'male',
      fired: true,
      colleagues: [],
    },
    {
      id: 4,
      fullName: 'Alexandr Maximovich Relivin',
      position: 'header',
      birthday: '1989-11-30',
      gender: 'male',
      fired: false,
      colleagues: [],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  add(employee: EmployeeFormData) {
    let newEmployee = {...employee, id: maxId(this.employees) + 1};
    this.employees.push(newEmployee);

    return newEmployee;
  }

  @action
  remove(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }

  @action
  update(employee: Employee) {
    const index = this.employees.findIndex(e => e.id === employee.id);
    this.employees[index] = employee;
  }
}

