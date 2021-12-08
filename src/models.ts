export type Employee = {
  id: number
  fullName: string
  position: string
  birthday: string
  gender: 'male' | 'female'
  fired: boolean
  colleagues?: Employee[]
}