import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Image, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket, faCog } from '@fortawesome/free-solid-svg-icons';
import defualteUser from '/DefulteUser.svg'
import styles from './style.module.css'
import ConfirmModal from '../../sharedComponents/modal/comfirmModal';
function Navbar() {
  const { logout, isLoggedIn, user } = useAuth();
  const [showLogoutComfirm, setShowLogoutComfirm] = useState(false);
  
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
        zIndex: 100
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
              <Link to="/" className="nav-link active">
                الصفحة الرئيسية
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/courses" className="nav-link">
                الخدمات التعليمية
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                عن الاكاديمية
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customer-service" className="nav-link">
                تواصل معنا
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/founder" className="nav-link">
                مؤسس الاكاديمية
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
                >{
                    user.role === "Admin" ? (<Link to="/dashboard" className='text-decoration-none text-white'>
                      لوحة التحكم
                      <FontAwesomeIcon icon={faReceipt} className="me-2" />
                    </Link>) : (<Link to="/my-courses" className='text-decoration-none text-white'>
                      اشتراكاتي
                      <FontAwesomeIcon icon={faReceipt} className="me-2" />
                    </Link>)
                  }


                </button>
                {user.role === "User" &&
                  <button
                    className="btn "
                  >
                    <Link to="/settings" className='text-decoration-none text-white'>
                      الاعدادات
                      <FontAwesomeIcon icon={faCog} className="me-2" />
                    </Link>
                  </button>
                }

                <button
                  onClick={() => setShowLogoutComfirm(true)}
                  className="btn "
                >
                  تسجيل خروج
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
                </button>
              </NavDropdown>
            ) : (
              <>
                <Link to="/signin">
                  <button className={styles.btn}>تسجيل دخول</button>
                </Link>
                <Link to="/signup">
                  <button className={`${styles.btn} me-3`} type="button">
                    تسجيل
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showLogoutComfirm}
        onHide={() => setShowLogoutComfirm(false)}
        onConfirm={()=>{ logout(); setShowLogoutComfirm(false) }}
        title="تأكيد تسجيل الخروج"
        message="هل أنت متأكد أنك تريد  تسجيل خروج؟"
      >
        <img src="/Logout.svg" alt="" height="260vh" />
      </ConfirmModal>
    </nav>
  );
}

export default Navbar;