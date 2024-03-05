import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import EmployeeEditForm from './EmployeeEditForm'; // Make sure to import EmployeeEditForm if it's in a separate file
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const navigate = useNavigate();


  const handleEdit = (employee) => {
    setEditedEmployee(employee);
  };

  const handleAddNew = () => {
    setEditedEmployee({}); // Set editedEmployee as an empty object for a new employee
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.log("Error found ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      alert('Deleted successfully');
      fetchEmployee();
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  const handleSaveEdit = async (editedEmployeeDetails) => {
    try {
      if (editedEmployee && editedEmployee.id) {
        // Edit existing employee
        await axios.put(`http://localhost:8080/api/employees/${editedEmployee.id}`, editedEmployeeDetails);
      } else {
        // Add new employee
        await axios.post('http://localhost:8080/api/employees', editedEmployeeDetails);
      }
      fetchEmployee();
      setEditedEmployee(null);
      navigate('/');
    } catch (error) {
      console.log("Error saving edit:", error);
    }
  };

  return (
    <div>
     
      <h2 className='text-2xl text-center mt-5'>Employee List</h2>
      <table className='mx-auto mt-5 mb-20'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>
              First Name
            </th>
            <th className='border px-4 py-2'>
              Last Name
            </th>
            <th className='border px-4 py-2'>
              Email
            </th>
            <th colSpan="2" className='border px-4 py-2'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee.firstName}</td>
              <td className="border px-4 py-2">{employee.lastName}</td>
              <td className="border px-4 py-2">{employee.email}</td>
              <td className="border px-4 py-2">
                <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-700" onClick={() => handleEdit(employee)} type='button'>
                  Edit
                </button>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-red-700" onClick={() => handleDelete(employee.id)} type='button'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

      {editedEmployee && (
        <EmployeeEditForm
          employee={editedEmployee}
          onSave={handleSaveEdit}
          onCancel={() => setEditedEmployee(null)
          }
        />
      )}

     
    </div>
  );
};

export default EmployeeList;
