import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import EmployeeList from './Components/Employeelist';
import EmployeeForm from './Components/EmployeeForm';
import Home from './Pages/Home';
import EmployeeEditForm from './Components/EmployeeEditForm';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        {/* Your main content */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/employeeform' element={<EmployeeForm />} />
          <Route path='/employeelist' element={<EmployeeList />} />
          <Route path='/employeeEdit' element={<EmployeeEditForm />} />
        </Routes>
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
