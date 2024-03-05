import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeList from "./Employeelist";
import EmployeeForm from "./EmployeeForm";

export default function Navbar() {
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const toggleEmployee = () => {
    setShowEmployeeList(!showEmployeeList);
    setShowEmployeeForm(false);
  };

  const toggleAddEmployee = () => {
    setShowEmployeeForm(!showEmployeeForm);
    setShowEmployeeList(false);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-between">

        <div className="cursor-pointer flex items-start ">
          <Link to="/">Employee Management System</Link>
        </div>

        <div className="nav flex list-none justify-center items-center space-x-7 cursor-pointer">
          <Link to="/EmployeeList" onClick={toggleEmployee}>
            Employee List
          </Link>
          <Link to="/Employeeform" onClick={toggleAddEmployee}>
            Add Employee Form
          </Link>
        </div>

      </div>
    </nav>
  );
}
