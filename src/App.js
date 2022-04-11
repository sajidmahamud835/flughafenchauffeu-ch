import { createContext } from 'react';
import './App.css';
import Home from './pages/Home/Home';
export const FormContext = createContext("form");
function App() {
  return (
    <FormContext.Provider value='FormData'>
      <div>
        <Home />
      </div>
    </FormContext.Provider>
  );
}

export default App;
