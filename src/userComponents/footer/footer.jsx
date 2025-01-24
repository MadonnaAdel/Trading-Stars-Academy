import React from "react";
import { Link } from "react-router-dom";
import styles from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>عنا</h6>
            <p className="text-justify">Trading.com   هو مبادرة تهدف إلى مساعدة الأفراد على فهم أساسيات التسوق الإلكتروني والتداول بشكل بسيط وفعال. يركز الموقع على تقديم نصائح وأدوات عملية تساعد المستخدمين على اتخاذ قرارات ذكية، سواء كانوا يبحثون عن أفضل الصفقات في التسوق أو يسعون لدخول عالم التداول بمهارات مبنية على أسس صحيحة. نسعى لتوفير محتوى مميز يغطي مجالات متعددة مثل إدارة الأموال، تحليل السوق، استخدام منصات التداول، وأسرار الشراء الذكي.</p>
          </div>

          <div className="col-xs-6 col-md-3 px-5 ">
            <h6>روابط سريعة </h6>
            <ul className={styles.footerLinks}>
              <li><Link to="/about-us">عن الاكاديمي</Link ></li>
              <li><Link to="/customer-service">تواصل معنا</Link ></li>
              <li><Link to="/courses">الدورات التدريبية</Link ></li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-2 w-25">
           <img src="/public/logo.svg" alt="" width="100%" />
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className={styles.copyrightText}>Copyright &copy; 2025 All Rights Reserved by
              <a href="#">Trading Stars Academy</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className={styles.socialIcons}>
              <li><a className={styles.facebook} href="#"><FontAwesomeIcon icon={faFacebook} />
              </a></li>
              
              <li><a className={styles.twitter} href="#"><FontAwesomeIcon icon={faTwitter}  /></a></li>
              <li><a className={styles.dribbble} href="#"><FontAwesomeIcon icon={faInstagram}  /></a></li>
              <li><a className={styles.linkedin} href="#"><FontAwesomeIcon icon={faTiktok}  /></a></li>
              <li><a className={styles.youtube} href="#"> <FontAwesomeIcon icon={faYoutube}  /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
