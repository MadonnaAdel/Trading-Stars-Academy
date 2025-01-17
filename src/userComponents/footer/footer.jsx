import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './style.module.css'
import { getCategoriesName } from "../../Services/userApiService";
const Footer = () => {
    const [categories, setCategories] = useState([]);
  
   const getCourses = async () => {
      try {
        const categoriesRes = await getCategoriesName();
        setCategories(categoriesRes?.data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    
      getCourses();
    }, []);
    return (
    <footer class={styles.siteFooter}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>عنا</h6>
            <p class="text-justify">Trading.com   هو مبادرة تهدف إلى مساعدة الأفراد على فهم أساسيات التسوق الإلكتروني والتداول بشكل بسيط وفعال. يركز الموقع على تقديم نصائح وأدوات عملية تساعد المستخدمين على اتخاذ قرارات ذكية، سواء كانوا يبحثون عن أفضل الصفقات في التسوق أو يسعون لدخول عالم التداول بمهارات مبنية على أسس صحيحة. نسعى لتوفير محتوى مميز يغطي مجالات متعددة مثل إدارة الأموال، تحليل السوق، استخدام منصات التداول، وأسرار الشراء الذكي.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>الفئات</h6>
            <ul class={styles.footerLinks}>
              {categories && categories.map((cat,index)=>{
 <li key={index}>{cat}</li>
              })}
             
             
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>روابط سريعة </h6>
            <ul class={styles.footerLinks}>
              <li><Link  to="/about">عن الاكاديمي</Link ></li>
              <li><Link  to="/customer-service">تواصل معنا</Link ></li>
              <li><Link  to="/courses">الدورات التدريبية</Link ></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class={styles.copyrightText}>Copyright &copy; 2025 All Rights Reserved by 
         <a href="#">Trading Stars Academy</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class={styles.socialIcons}>
              <li><a class={styles.facebook} href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class={styles.twitter} href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class={styles.dribbble} href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class={styles.linkedin} href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
    );
};

export default Footer;
