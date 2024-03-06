import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format before making the API call
    if (!isEmailValid(employee.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/employees', employee);
      alert('Employee added Successfully');
      navigate('/employeelist');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Employee add failed');
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              value={employee.firstName}
              onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              value={employee.lastName}
              onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            type="submit"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
