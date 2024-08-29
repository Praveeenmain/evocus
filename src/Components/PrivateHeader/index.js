import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateHeader = () => {
  const navbarStyle = {
    backgroundImage: 'linear-gradient(to right, #04162d, #030b18)',
    padding: '0.5rem', // Adjust padding if needed
  };

  const navbarText = {
    color: 'white',
    marginRight: 'auto',
    textAlign: 'justify',
    marginTop: '9px',
  };

  const imageStyle = {
    height: '50px', // Adjust the height as needed
    width: '80px', // Maintain aspect ratio
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="container-fluid d-flex align-items-center">
        <img
          src={require('../../assets/Logo.png')}
          alt="Logo"
          style={imageStyle}
        />
        <span className="navbar-brand" style={navbarText}>Evobuz</span>
      </div>
    </nav>
  );
};

export default PrivateHeader;
