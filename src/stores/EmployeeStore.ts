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
      birthday: '30-12-1999',
      gender: 'male',
      fired: true,
      colleagues: [],
    },
    {
      id: 2,
      fullName: 'Ivanov Ivan Ivanovich',
      position: 'developer',
      birthday: '30-12-1999',
      gender: 'male',
      fired: false,
      colleagues: [],
    },
    {
      id: 3,
      fullName: 'Sergey Petrovich Nestarnak',
      position: 'manager',
      birthday: '30-12-1999',
      gender: 'male',
      fired: true,
      colleagues: [],
    },
    {
      id: 4,
      fullName: 'Alexandr Maximovich Relivin',
      position: 'header',
      birthday: '30-12-1999',
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
    this.employees.push({...employee, id: maxId(this.employees)});
  }

  @action
  remove(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }

  @action
  update(employee: Employee) {
    this.remove(employee.id);
    this.add(employee);
  }
}

