import React from 'react';
import './App.css';
import { StoresProvider } from './stores';
import {EmployeeStore} from "./stores/EmployeeStore";
import {EmployeeDictionary} from "./components/employees/EmployeeDictionary";

function App() {
  const employeeStore = new EmployeeStore();

  return (
    <StoresProvider value={{employee: employeeStore}}>
      <div className="App">
        <EmployeeDictionary/>
      </div>
    </StoresProvider>
  );
}

export default App;
