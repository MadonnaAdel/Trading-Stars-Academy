import React, { useState } from "react";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./style.module.css";
import {
  FaUserPlus,
  FaGraduationCap,
  FaFileAlt,
  FaUserCheck,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";



import { useAuth } from "../../context/authContext";

const SideBar = ({ activee }) => {
  const {logout } = useAuth();

  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(activee);
  const Logout = () => {
    logout()
    navigate('/signin')
  }
  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <>
      <Navbar className={`${styles.sidebar} col-md-3 col-sm-2 col-2 col-lg-3 `}>
        <Nav className={`flex-column w-100 ${styles.dashboardContainer}`}>

          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>الفئات</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "categories" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("categories", "/dashboard")}
            >
              {activeItem === "categories" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <FaGraduationCap />
              </span>
              <span className={`${styles.title}`}>
                الفئات
              </span>
            </div>
          </OverlayTrigger>


          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>معلومات المرشحين</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "candidates" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("candidates", "candidates")}
            >
              {activeItem === "candidates" && (
                <span className={`${styles.activeFlag} d-none d-sm-block`}></span>
              )}
              <span className={`${styles.icon}`}>
                <FaFileAlt />
              </span>
              <span className={`${styles.title} text-left fs-6`}>
                معلومات المرشحين

              </span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            overlay={<Tooltip> طلبات الاشتراك</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "subscription-requests" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("subscription-requests", "subscription-requests")}
            >
              {activeItem === "subscription-requests" && (
                <span className={`${styles.activeFlag} d-none d-sm-block`}></span>
              )}
              <span className={`${styles.icon}`}>
                <FaUserPlus />
              </span>
              <span className={`${styles.title} text-left fs-6`}>
                طلبات الاشتراك
              </span>
            </div>
          </OverlayTrigger>


          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>طلبات الانضمام</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "join-requests" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("join-requests", "join-requests")}
            >
              {activeItem === "join-requests" && (
                <span className={`${styles.activeFlag}  d-none d-sm-block `}></span>
              )}
              <span className={`${styles.icon}`}>

                <FaUserCircle />
              </span>
              <span className={`${styles.title} fs-6`}>
                طلبات الانضمام
              </span>
            </div>
          </OverlayTrigger>


          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>المستخدمين المقبولين</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "approved-users" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("approved-users", "approved-users")}
            >
              {activeItem === "approved-users" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <FaUserCheck />
              </span>
              <span className={`${styles.title}`} style={{ fontSize: "0.9rem" }}>
                المستخدمين المقبولين
              </span>
            </div>
          </OverlayTrigger>



          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>الإعدادات</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "setting" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("setting", "settings")}
            >
              {activeItem === "setting" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <FaCog />
              </span>
              <span className={`${styles.title}`}>
                الإعدادات
              </span>
            </div>
          </OverlayTrigger>


          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>تسجيل الخروج</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "log-out" ? styles.active : ""
                }`}
              onClick={() => Logout()}
            >
              {activeItem === "log-out" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <FaSignOutAlt />
              </span>
              <span className={`${styles.title}`}>
                تسجيل الخروج
              </span>
            </div>
          </OverlayTrigger>
        </Nav>
      </Navbar>
    </>
  );
};

export default SideBar;
