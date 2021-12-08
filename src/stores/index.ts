import {createContext, useContext} from "react";
import {EmployeeStore} from "./EmployeeStore";

const stores = {
  employee: new EmployeeStore(),
}

export const StoresContext = createContext({} as typeof stores);
export const StoresProvider = StoresContext.Provider;

export const useStores = () => useContext(StoresContext);