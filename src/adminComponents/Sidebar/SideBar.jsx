import React, { useState } from "react";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./style.module.css";
import {
  UilUserPlus ,
  UilGraduationCap,
  UilFileAlt,
  UilUserCheck,
  UilUserExclamation,
  UilUserCircle,
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
      <Navbar className={`${styles.sidebar} col-md-3 col-sm-2 col-2 col-lg-3 `}>
        <Nav className={`flex-column w-100 ${styles.dashboardContainer}`}>
         
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>كورساتي</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "my-courses" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("my-courses", "/dashboard")}
            >
              {activeItem === "my-courses" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <UilGraduationCap />
              </span>
              <span className={`${styles.title}`}>
                كورساتي
              </span>
            </div>
          </OverlayTrigger>


          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>طلبات الاشتراك</Tooltip>}
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
                <UilFileAlt />
              </span>
              <span className={`${styles.title} text-left fs-6`}>
                طلبات الاشتراك
              </span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>معلومات المرشحين</Tooltip>}
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
                <UilUserPlus />
              </span>
              <span className={`${styles.title} text-left fs-6`}>
                معلومات المرشحين
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
                
                <UilUserCircle />
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
              <UilUserCheck />
              </span>
              <span className={`${styles.title}`} style={{ fontSize: "0.9rem" }}>
                المستخدمين المقبولين
              </span>
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>المستخدمين المرفوضين</Tooltip>}
          >
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "rejected-users" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("rejected-users", "rejected-users")}
            >
              {activeItem === "rejected-users" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <UilUserExclamation />
              </span>
              <span className={`${styles.title}`} style={{ fontSize: "0.88rem" }}>
                المستخدمين المرفوضين
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
                <UilCog />
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
              onClick={handleShow}
            >
              {activeItem === "log-out" && (
                <span className={styles.activeFlag}></span>
              )}
              <span className={`${styles.icon}`}>
                <UilSignout />
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
