import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Col, Image, NavDropdown } from 'react-bootstrap';
import img from '/public/Untitled design.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCog } from '@fortawesome/free-solid-svg-icons';
import defualteUser from '/DefulteUser.svg'
function Navbar() {
  const { logout, isLoggedIn, user } = useAuth();
  

  return (
    <nav
      className="navbar navbar-expand-lg bg-transparent navbar-light text-white"
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        right: '10px',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(0, 123, 255, 0.5)',
        borderRadius: '8px',
        boxShadow: '0 0px 40px 0 rgba(0, 123, 255, 0.4)',
        zIndex: '1000',
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.svg" alt="logo" width={50} />
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="" className="nav-link active">
                الصفحة الرئيسية
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link">
                عن الاكاديمي
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link">
                الخدمات التعليمية
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link">
                تواصل معنا
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
                <NavDropdown
                  title={
                    <div className=" ms-3 d-flex align-items-center justify-content-center rounded-circle overflow-hidden " style={{ width: "40px", height: "40px" }}>
                      <Image
                        src={user?.personalImageUrl}

                        onError={(e) => (e.target.src = defualteUser)}
                        width={70}
                        className="me-3"
                      />
                      
                    </div>
                  }
                  id="basic-nav-dropdown"
                >
                  <button
                    className="btn "
                  >
                    <Link to="/settings" className='text-decoration-none text-white'>
                      الاعدادات
                      <FontAwesomeIcon icon={faCog} className="me-2" />
                    </Link>
                  </button>
                  <button
                    onClick={logout}
                    className="btn "
                  >
                    تسجيل خروج
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
                  </button>
                </NavDropdown>
            ) : (
              <>
                <Link to="/signin">
                  <button className="btn btn-outline-primary" type="button">
                    تسجيل دخول
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-primary me-2" type="button">
                    تسجيل
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;