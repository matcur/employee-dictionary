export type Employee = {
  id: number
  fullName: string
  position: string
  birthday: string
  gender: string
  fired: boolean
  colleagues?: Employee[]
};

export type EmployeeFormData = Employee & {id?: number}