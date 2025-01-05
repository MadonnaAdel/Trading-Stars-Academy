import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
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
          </Link >
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
                <Link to="" className="nav-link active" href="#">
                  الصفحة الرئيسية
                </Link >
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link" href="#">
                  عن الاكاديمي
                </Link >
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-link" href="#">
                  الخدمات التعليمية
                </Link >
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link" href="#">
                  تواصل معنا
                </Link >
              </li>
            </ul>
            <div className="d-flex">
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

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
