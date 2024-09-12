import React, { useState } from 'react';

const SimpleForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });

  // Handler for input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    
    // Clear the form
    setFormData({
      name: '',
      number: '',
      email: ''
    });
  };

  // Inline styles for the form
  const formStyles = {
    container: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '300px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '20px',
      fontSize: '20px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.header}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={formStyles.formGroup}>
          <label htmlFor="name" style={formStyles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={formStyles.input}
            required
          />
        </div>
        <div style={formStyles.formGroup}>
          <label htmlFor="number" style={formStyles.label}>Contact Number</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            style={formStyles.input}
            required
          />
        </div>
        <div style={formStyles.formGroup}>
          <label htmlFor="email" style={formStyles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={formStyles.input}
            required
          />
        </div>
        <div style={formStyles.formGroup}>
          <button
            type="submit"
            style={formStyles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = formStyles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = formStyles.button.backgroundColor)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
