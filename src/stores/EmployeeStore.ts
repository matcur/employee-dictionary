import {action, makeAutoObservable, observable} from "mobx";
import {Employee, EmployeeFormData} from "../models";
import {maxId} from "../utils/maxId";

export class EmployeeStore {
  @observable
  employees: Employee[] = [
    {
      id: 1,
      fullName: 'Алексеев Алексей Алексеевич',
      position: 'разработчик',
      birthday: '1998-07-12',
      gender: 'мужчина',
      fired: true,
      colleagues: [],
    },
    {
      id: 2,
      fullName: 'Иванов Иван Иванович',
      position: 'разработчик',
      birthday: '1999-12-01',
      gender: 'мужчина',
      fired: false,
      colleagues: [],
    },
    {
      id: 3,
      fullName: 'Нестерак Сергей Петрович',
      position: 'менеджер',
      birthday: '1999-08-30',
      gender: 'мужчина',
      fired: true,
      colleagues: [],
    },
    {
      id: 4,
      fullName: 'Релевин Максим Алексеевич',
      position: 'рекрутер',
      birthday: '1989-11-30',
      gender: 'мужчина',
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

