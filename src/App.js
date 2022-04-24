import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './componants/layouts/Main/Main';
import Admin from './pages/admin/Admin/Admin';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
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
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='' element={<Main />} />
            <Route path='admin' element={<Admin />} />
            <Route path='admin/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </FormContext.Provider>
  );
}

export default App;
