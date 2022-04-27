import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/admin/Admin/Admin';
import AllBookings from './pages/admin/AllBookings/AllBookings';
import Settings from './pages/admin/Settings/Settings';
import BookASchedule from './pages/BookASchedule/BookASchedule';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import ThankYou from './pages/ThankYou/ThankYou';
export const FormContext = createContext("form");
function App() {

  const [values, setValues] = useState({});

  useEffect(() =>
    fetch('https://secret-river-49503.herokuapp.com/default-values')
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
            <Route path='' element={<BookASchedule />} />
            <Route path='admin' element={<Admin />} />
            <Route path='admin/login' element={<Login />} />
            <Route path='thank-you' element={<ThankYou />} />
            <Route path='admin/bookings' element={<AllBookings />} />
            <Route path='admin/settings' element={<Settings />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </FormContext.Provider>
  );
}

export default App;
