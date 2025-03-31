import React, { useEffect, useState } from "react";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
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
import ConfirmModal from "../../sharedComponents/modal/comfirmModal";

const SideBar = ({ active }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(active);
  const [showLogoutComfirm, setShowLogoutComfirm] = useState(false);

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    setActiveItem(lastSegment || "dashboard");
  }, [location]);

  const Logout = () => {
    logout();
    navigate('/signin');
  };

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };


  return (
      <Navbar className={`${styles.sidebar} col-md-3 col-sm-2 col-2 col-lg-3 `}>
        <Nav className={`flex-column w-100 ${styles.dashboardContainer}`}>
          <OverlayTrigger placement="right" overlay={<Tooltip>الفئات</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "dashboard" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("dashboard", "/dashboard")}
            >
              {activeItem === "dashboard" && <span className={styles.activeFlag}></span>}
              <span className={`${styles.icon}`}>
                <FaGraduationCap />
              </span>
              <span className={`${styles.title}`}>الفئات</span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip>معلومات المرشحين</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "candidates" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("candidates", "candidates")}
            >
              {activeItem === "candidates" && <span className={`${styles.activeFlag} d-none d-sm-block`}></span>}
              <span className={`${styles.icon}`}>
                <FaFileAlt />
              </span>
              <span className={`${styles.title} text-left fs-6`}>معلومات المرشحين</span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip>طلبات الاشتراك</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "subscription-requests" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("subscription-requests", "subscription-requests")}
            >
              {activeItem === "subscription-requests" && <span className={`${styles.activeFlag} d-none d-sm-block`}></span>}
              <span className={`${styles.icon}`}>
                <FaUserPlus />
              </span>
              <span className={`${styles.title} text-left fs-6`}>طلبات الاشتراك</span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip>طلبات الانضمام</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "join-requests" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("join-requests", "join-requests")}
            >
              {activeItem === "join-requests" && <span className={`${styles.activeFlag} d-none d-sm-block`}></span>}
              <span className={`${styles.icon}`}>
                <FaUserCircle />
              </span>
              <span className={`${styles.title} fs-6`}>طلبات الانضمام</span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip>المستخدمين المقبولين</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "approved-users" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("approved-users", "approved-users")}
            >
              {activeItem === "approved-users" && <span className={styles.activeFlag}></span>}
              <span className={`${styles.icon}`}>
                <FaUserCheck />
              </span>
              <span className={`${styles.title}`} style={{ fontSize: "0.9rem" }}>المستخدمين المقبولين</span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip>الإعدادات</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element} ${activeItem === "settings" ? styles.active : ""
                }`}
              onClick={() => handleItemClick("settings", "settings")}
            >
              {activeItem === "settings" && <span className={styles.activeFlag}></span>}
              <span className={`${styles.icon}`}>
                <FaCog />
              </span>
              <span className={`${styles.title}`}>الإعدادات</span>
            </div>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip>تسجيل الخروج</Tooltip>}>
            <div
              className={`d-flex align-items-center ${styles.element}`}
              onClick={() => setShowLogoutComfirm(true)}
            >
              <span className={`${styles.icon}`}>
                <FaSignOutAlt />
              </span>
              <span className={`${styles.title}`}>تسجيل الخروج</span>
            </div>
          </OverlayTrigger>
        </Nav>
        <ConfirmModal
  show={showLogoutComfirm}
  onHide={() => setShowLogoutComfirm(false)}
  onConfirm={Logout}
  title="تأكيد تسجيل الخروج"
  message="هل أنت متأكد أنك تريد  تسجيل خروج؟"
>
  <img src="/Logout.svg" alt="" />
  </ConfirmModal>
      </Navbar>
  );
};

export default SideBar;
