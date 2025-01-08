import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./style.module.css";
import {
  UilFileCheckAlt,
  UilTachometerFastAlt,
  UilUser,
  UilFileLandscape,
  UilBookmark,
  UilCog,
  UilSignout,
} from "@iconscout/react-unicons";
import { useAuth } from "../../context/authContext";
const SideBar = ({ activee }) => {
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(activee);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <>
      <Navbar className={`${styles.sidebar} col-md-3 col-sm-2 col-2 col-lg-3 bg-white`}>
        <Nav className={`flex-column mt-4 w-100 ${styles.dashboardContainer}`}>

          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "dashboard" ? styles.active : ""
              }`}
            onClick={() => handleItemClick("dashboard", "dashboard-info")}
          >
            {activeItem === "dashboard" && (
              <span className={styles.activeFlag}></span>
            )}
            <span className={`${styles.icon}`} >
              <UilTachometerFastAlt />
            </span>
            <span className={`${styles.title}`}>
              Dashboard

            </span>
          </div>

          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "profile" ? styles.active : ""
              }`}
            onClick={() => handleItemClick("profile", "my-Profile")}
          >
            {activeItem === "profile" && (
              <span className={styles.activeFlag}></span>
            )}
            <span className={`${styles.icon}`} >
              <UilUser />
            </span>
            <span className={`${styles.title}`}>
              My Profile
            </span>
          </div>
          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "manage-cv" ? styles.active : ""
              }`}
            onClick={() => handleItemClick("manage-cv", "manage-cv")}
          >
            {activeItem === "manage-cv" && (
              <span className={`${styles.activeFlag} d-none d-sm-block`}></span>
            )}
            <span className={`${styles.icon}`} >
              <UilFileLandscape />
            </span>
            <span className={`${styles.title}`}>
              Manage CV

            </span>
          </div>

          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "applied-jobs" ? styles.active : ""
              }`}
            onClick={() => handleItemClick("applied-jobs", "applied-jobs")}
          >
            {activeItem === "applied-jobs" && (
              <span className={`${styles.activeFlag}  d-none d-sm-block `}></span>
            )}
            <span className={`${styles.icon}`} >
              <UilFileCheckAlt />
            </span>
            <span className={`${styles.title}`}>
              Applied Jobs

            </span>

          </div>
          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "saved-jobs" ? styles.active : ""
              }`}
            onClick={() => handleItemClick("saved-jobs", "saved-Jobs")}
          >
            {activeItem === "saved-jobs" && (
              <span className={styles.activeFlag}></span>
            )}

            <span className={`${styles.icon}`} >
              <UilBookmark />

            </span>
            <span className={`${styles.title}`}>
              Saved Jobs
            </span>
          </div>
          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "setting" ? styles.active : ""
              }`}
            onClick={() => handleItemClick("setting", "settings")}
          >
            {activeItem === "setting" && (
              <span className={styles.activeFlag}></span>
            )}
            <span className={`${styles.icon}`} >
              <UilCog />
            </span>
            <span className={`${styles.title}`}>
              Settings
            </span>
          </div>
          <div
            className={`d-flex align-items-center ${styles.element} ${activeItem === "log-out" ? styles.active : ""
              }`}
            onClick={handleShow}
          >
            {activeItem === "log-out" && (
              <span className={styles.activeFlag}></span>
            )}
            <span className={`${styles.icon}`} >
              <UilSignout />
            </span>
            <span className={`${styles.title}`}>
              Log Out
            </span>
          </div>
        </Nav>
      </Navbar>
    </>
  );
};

export default SideBar;

