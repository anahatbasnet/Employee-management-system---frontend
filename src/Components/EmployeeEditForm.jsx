import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeEditForm = ({ employee, onSave, onCancel }) => {
  const { id } = useParams();
  const [editedEmployee, setEditedEmployee] = useState({
    id: employee?.id || id,
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    email: employee?.email || '',
  });

  const isEmailValid = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format before saving
    if (!isEmailValid(editedEmployee.email)) {
      alert('Please enter a valid email address');
      return;
    }

    onSave(editedEmployee);
  };

  return (
    <div className="flex justify-center min-w-10 mb-20">
      <form onSubmit={handleSubmit}>
        <h2 className='font-bold text-2xl pl-28 mt-[-3rem] mb-10'>Edit Employee</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input
            className="w-full md:w-96 px-3 py-2 border rounded-md"
            type="text"
            name="firstName"
            value={editedEmployee.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input
            className="w-full md:w-96 px-3 py-2 border rounded-md"
            type="text"
            name="lastName"
            value={editedEmployee.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            className="w-full md:w-96 px-3 py-2 border rounded-md"
            type="text"
            name="email"
            value={editedEmployee.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue active:bg-green-700"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-500"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
