import {EmployeeFormData} from "../models";
import {Errors} from "../components/employees/EmployeeDictionary";

export const validateEmployee = (employee: EmployeeFormData) => {
  const errors = {has: false} as Errors;
  if (!employee || employee?.fullName === '') {
    errors.fullName = 'Full name is required';
    errors.has = true;
  }

  return errors;
}