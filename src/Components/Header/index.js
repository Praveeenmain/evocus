import { Link, withRouter } from 'react-router-dom';
import CartContext from '../../Context/cartcontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';
import LogoutButton from '../Logout';
import { useState } from 'react';

const Header = (props) => {
  const { history } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const onClickProfile = () => {
    history.push('/profile');
  };

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const cartItemCount = cartList.length;

        return (
          <nav className="navbar navbar-expand-lg navbar-light nav-header">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand d-flex align-items-center text-white">
                <img
                  src={require('../../assets/Logo.png')}
                  alt="website logo"
                  className="me-2"
                  style={{ height: '50px' }}
                />
                <span>EvoBuz</span>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <div className="d-flex ms-auto align-items-center">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/" className="nav-link text-white">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/services" className="nav-link text-white">
                        Services
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/products" className="nav-link text-white">
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link text-white">
                        Cart {cartItemCount > 0 && `(${cartItemCount})`}
                      </Link>
                    </li>
                  </ul>
                  
                  {/* Profile Section with Dropdown */}
                  <div className="dropdown ms-3">
                    <button
                      type="button"
                      className="btn text-white dropdown-toggle d-flex align-items-center"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <FaUserCircle size={28} className="me-2" />
                    </button>
                    <ul 
                      className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} 
                      aria-labelledby="profileDropdown"
                    >
                      <li>
                        <button className="dropdown-item" onClick={onClickProfile}>
                          Profile
                        </button>
                      </li>
                      <li>
                        <LogoutButton />
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </nav>
        );
      }}
    </CartContext.Consumer>
  );
};

export default withRouter(Header);
