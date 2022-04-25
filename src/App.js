import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './componants/layouts/Main/Main';
import Admin from './pages/admin/Admin/Admin';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import ThankYou from './pages/ThankYou/ThankYou';
export const FormContext = createContext("form");
function App() {

  const [values, setValues] = useState({});

  useEffect(() =>
    fetch('http://localhost:5000/default-values')
      .then(res => res.json())
      .then(data => setValues(data))
    , [])

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
            <Route path='thank-you' element={<ThankYou />} />
            <Route path='admin/bookings' element={<ThankYou />} />
            <Route path='admin/settings' element={<ThankYou />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </FormContext.Provider>
  );
}

export default App;
