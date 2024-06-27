'use client';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Form from 'react-bootstrap/Form';

const styles = {
  navbar: {
    position: 'fixed' as 'fixed',
    top: 0,
    right: 0,
    padding: '1rem',
    backgroundColor: '#030422',
    color: 'white',
    fontSize: '1.25em',
    display: 'flex',
    alignItems: 'center',
  },
  navbarLink: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '1rem',
  },
  button: {
    backgroundColor: '#0056b3',
    borderColor: '#0056b3',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '8px',
    marginLeft: '1rem',
    transition: 'background-color 0.3s, border-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#003d80',
    borderColor: '#003d80',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',        
    backgroundColor: 'white',
    color: 'black',
    width: '400px',
    maxWidth: '90%',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  form: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
  },
  formInput: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
};

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [isLoginHover, setLoginHover] = useState(false);
  const [isRegisterHover, setRegisterHover] = useState(false);
  const [isCloseHover, setCloseHover] = useState(false);
  const [isSubmitHover, setSubmitHover] = useState({ login: false, register: false });

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try{
      const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message);
      if (response.ok) {
        console.log('Login successful:', result.message);
        window.location.href = '/problems';
      }   
      else {
        console.log('Login failed:', result.message);
      }
    }
    catch (error){
      console.error('Error during login:', error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try{
      const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.message);
    }
    catch (error){
      console.error('Error during registration:', error);
    }
    
  };

  return (
    <>
      <div style={styles.navbar}>
        <Button
          variant="primary"
          onClick={handleLoginShow}
          style={isLoginHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
        >
          Sign In
        </Button>
        <Button
          variant="secondary"
          onClick={handleRegisterShow}
          style={isRegisterHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setRegisterHover(true)}
          onMouseLeave={() => setRegisterHover(false)}
        >
          Sign Up
        </Button>
      </div>
  
      <Modal show={showLogin} onHide={handleLoginClose} centered style={styles.modal}>
          <strong>Login</strong>
          <Form onSubmit={handleLoginSubmit} style={styles.form}>
              <Form.Group controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" required style={styles.formInput}/>
            </Form.Group>
            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required style={styles.formInput}/>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={isSubmitHover.login ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setSubmitHover((prev) => ({ ...prev, login: true }))}
              onMouseLeave={() => setSubmitHover((prev) => ({ ...prev, login: false }))}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              onClick={handleLoginClose}
              style={isCloseHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
            >
              Close
            </Button>
          </Form>
      </Modal>
   

      <Modal show={showRegister} onHide={handleRegisterClose} centered style={styles.modal}>
          <strong>Register</strong>
          <Form onSubmit={handleRegisterSubmit} style={styles.form}>
            <Form.Group controlId="formRegisterEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" required style={styles.formInput}/>
            </Form.Group>
            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required style={styles.formInput}/>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={isSubmitHover.register ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setSubmitHover((prev) => ({ ...prev, register: true }))}
              onMouseLeave={() => setSubmitHover((prev) => ({ ...prev, register: false }))}
            >
              Register
            </Button>
            <Button
              variant="secondary"
              onClick={handleRegisterClose}
              style={isCloseHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
            >
              Close
            </Button>
          </Form>
      </Modal>
    </>
  );
};

export default Navbar;