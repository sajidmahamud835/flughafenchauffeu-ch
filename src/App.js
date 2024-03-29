import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LocationPicker from './componants/LocationPicker/LocationPicker';
import Admin from './pages/admin/Admin/Admin';
import AllBookings from './pages/admin/AllBookings/AllBookings';
import Settings from './pages/admin/Settings/Settings';
import SingleBooking from './pages/admin/SingleBooking/SingleBooking';
import BookASchedule from './pages/BookASchedule/BookASchedule';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ThankYou from './pages/ThankYou/ThankYou';

export const FormContext = createContext("form");
function App() {
  const [values, setValues] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [userID, setUserID] = useState("");
  const [noFooter, setNoFooter] = useState(true);
  useEffect(() =>
    fetch(`${process.env.REACT_APP_SERVER_URL}/default-values`)
      .then(res => res.json())
      .then(data => setValues(data))
    , []);

  return (
    <FormContext.Provider value={{
      values: values,
      setValues: setValues,
      suggestions: suggestions,
      setSuggestions: setSuggestions,
      userID: userID,
      setUserID: setUserID,
      noFooter: noFooter,
      setNoFooter: setNoFooter
    }}>
      <div>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='' element={<BookASchedule />} />
            <Route path='map' element={<LocationPicker />} />
            <Route path='admin' element={<Admin />} />
            <Route path='admin/login' element={<Login />} />
            <Route path='confirm/:id' element={<ThankYou />} />
            <Route path='admin/bookings' element={<AllBookings />} />
            <Route path='admin/booking/:id' element={<SingleBooking />} />
            <Route path='admin/settings' element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </FormContext.Provider>
  );
}

export default App;
