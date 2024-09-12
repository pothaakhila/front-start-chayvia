import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddContactFromLink = ({ setUsers }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newUserEmail = params.get('newUserEmail');
    const token = params.get('token');

    if (newUserEmail && token) {
      setName(newUserEmail.split('@')[0]); // Default name from email
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add contact to the backend
      await axios.post('http://localhost:3030/addcontact', {
        name,
        contactNumber
      });

      // Update users state (if needed, you might handle this in a parent component)
      setUsers((prevUsers) => [
        ...prevUsers,
        { name, contactNumber }
      ]);

      toast.success('Contact added successfully.');
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      toast.error('Error adding contact.');
    }
  };

  return (
    <div className="p-4">
      <h4>Complete Your Registration</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            className="form-control"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddContactFromLink;
 