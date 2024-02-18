import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsuranceLogin = () => {
  const [insuranceUUID, setInsuranceUUID] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Move useNavigate outside of handleLogin

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/insurance/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ insurance_uuid: insuranceUUID }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log("entered here")
        navigate(`/home/${insuranceUUID}`);
        // Redirect or perform actions upon successful login
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>Insurance Company Login</h2>
        <label htmlFor="insuranceUUID" style={{ marginBottom: '10px' }}>
          Insurance UUID:
        </label>
        <input
          type="text"
          id="insuranceUUID"
          name="insuranceUUID"
          value={insuranceUUID}
          onChange={(e) => setInsuranceUUID(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
        <p
          id="message"
          style={{
            marginTop: '10px',
            color: 'red',
          }}
        >
          {message}
        </p>
      </form>
    </div>
  );
};

export default InsuranceLogin;
