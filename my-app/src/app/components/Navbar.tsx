'use client';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

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
    transition: 'background-color 0.3s, border-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#003d80',
    borderColor: '#003d80',
  },
  modal: {
    backgroundColor: '#003366',
    color: 'white',
  },
  modalHeader: {
    borderBottom: '1px solid white',
  },
  modalFooter: {
    borderTop: '1px solid white',
  },
  modalTitle: {
    color: 'white',
  },
};

const Navbar: React.FC<NavbarProps> = () => {
    const [show, setShow] = useState(false);
    const [hover, setHover] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
  
    return (
      <>
        <div style={styles.navbar}>
            <Button
              style={{ ...styles.button, ...(hover ? styles.buttonHover : {}) }}
              variant="primary"
              onClick={handleShow}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Sign in
            </Button>
        </div>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title style={styles.modalTitle}>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modal}>
            {/* Add your form here */}
          </Modal.Body>
          <Modal.Footer style={styles.modalFooter}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default Navbar;