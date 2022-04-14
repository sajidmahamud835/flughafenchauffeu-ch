import { createContext, useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
export const FormContext = createContext("form");
function App() {
  const [values, setValues] = useState({
    start_address: "",
    destination_01: "",
    destination_02: "",
    destination_03: "",
    destination_04: "",
    destination_05: "",
    time_pickup: "",
    date_pickup: "",
    flight_number: "",
    total_people: 1,
    luggage_weight: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    phone: "",
    email: "",
  });

  return (
    <FormContext.Provider value={{
      values: values,
      setValues: setValues
    }}>
      <div>
        <Home />
      </div>
    </FormContext.Provider>
  );
}

export default App;
