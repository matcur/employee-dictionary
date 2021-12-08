import {FormEvent, useState} from "react";

export const useInput = (initialState = '') => {
  const [value, setValue] = useState(initialState)

  const onChange = (e: FormEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setValue(e)

      return
    }

    setValue(e.currentTarget.value)
  }

  return {
    value,
    onChange
  }
}