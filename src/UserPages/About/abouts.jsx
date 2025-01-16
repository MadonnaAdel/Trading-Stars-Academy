import React from 'react';
import styles from './style.module.css';
import { Row, Col, Container } from 'react-bootstrap';
import logo from "/logo.svg";
import Header from '../../userComponents/Header';
import { FaBroadcastTower, FaMapMarkerAlt, FaLaptop, FaTv, FaUser, FaCogs, FaStar } from "react-icons/fa";
import { FaChartLine, FaUniversity, FaLanguage, FaPaintBrush, FaBriefcase } from "react-icons/fa";
import { Link } from 'react-router-dom';
const AboutUsPage = () => {
  return (
    <>
      <Row className={`${styles.fullWidthBackground} justify-content-center pt-5`}>
        <Col md={8} className={`${styles.fullWidthText} text-center mt-5`}>
          <h2 className={styles.header}>مرحبًا بكم في Trading Stars Academy</h2>
          <p className={styles.subHeader}>
            بوابتك لعالم التداول الناجح!
            <br /> من نحن؟
          </p>
        </Col>
      </Row>
      <Container >
        <section className={`${styles.descriptionSection} pt-4`}>
          <Row className="align-items-center">
            <Col md={6} className={`${styles.textContent} mb-4`}>
              <div className={styles.caresrs}>
                <div className={styles.caresrs1}>
                  <span className="py-3 ps-3">
                    <img src={logo} alt="logo" width="25%" height="100%" />
                  </span>
                  نحن Trading Stars Academy، الأكاديمية الرائدة في تعليم التداول وتطوير المهارات المهنية.
                </div>
                <div className={styles.caresrs1}>
                  تأسست في 11 أغسطس 2023 على يد المؤسس د. مينا سعد، أحد أبناء محافظة أسيوط.
                </div>
                <div className={styles.caresrs1}>
                  هدفنا الأساسي هو تمكين الأفراد من تحقيق أحلامهم في مجال التداول وريادة الأعمال، من خلال تقديم محتوى تعليمي متنوع ومتميز.
                </div>
              </div>
            </Col>

            <Col md={6} className="text-center">
              <div className={styles.img}>
                <img
                  src="../../../public/11663371_20944400.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Container>

      <section className='bg-dark-subtle py-5'>
        <Header title="إنجازات نفتخر بها" width="200px" />
        <Container >
          <Row className="justify-content-center pt-5">
            <Col md={10} className="d-flex flex-column gap-4">

              <div className={styles.achievementItem}>
                <FaBroadcastTower size={50} className="text-primary mb-3" />
                تنظيم مؤتمرات كبرى في القاهرة، أسيوط، سوهاج، والمنيا، شهدت حضور الآلاف.
              </div>
              <div className={styles.achievementItem}>
                <FaMapMarkerAlt size={50} className="text-primary mb-3" />
                افتتاح مقرات في القاهرة (المهندسين) والمنيا لتكون قريبة من الجميع.
              </div>
              <div className={styles.achievementItem}>
                <FaLaptop size={50} className="text-primary mb-3" />
                تقديم تدريبات أونلاين وأوفلاين تناسب احتياجات كل المتعلمين محليًا ودوليًا.
              </div>
              <div className={styles.achievementItem}>
                <FaTv size={50} className="text-primary mb-3" />
                مشاركتنا في لقاءات حصرية على قنوات شهيرة مثل:
                ( HBC,الحدث اليوم,CTV, قناة الشمس)
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className=' py-5'>
        <Header title="  ماذا نقدم" width="150px" />
        <Container className={`${styles.servicesSection} my-5`}>
      <Row className="text-center">
        <Col md={6} className="mb-4">
          <div className={`${styles.serviceItem} p-3`}>
            <FaChartLine size={50} className="text-primary mb-3" />
            <h4>تدريبات شاملة في مجال التداول</h4>
            <p>كورسات عملية تناسب جميع المستويات، من المبتدئين إلى المحترفين.</p>
            <p>جروبات توصيات لاتخاذ قرارات تداول مدروسة.</p>
            <p>خدمة Copy Trade: استثمر أموالك بسهولة ودع خبراءنا يديرون استثماراتك بنجاح.</p>
          </div>
        </Col>

        <Col md={6} className="mb-4">
          <div className={`${styles.serviceItem} p-3`}>
            <FaUniversity size={50} className="text-primary mb-3" />
            <h4>كورسات إضافية متنوعة</h4>
            <p><FaUniversity /> البورصة المصرية: كورسات متخصصة مع خبراء لديهم أكثر من 15 سنة خبرة في المجال.</p>
            <p><FaLanguage /> لغات متعددة: دورات تعليمية لتعلم جميع اللغات العالمية لتأهيلك لسوق العمل.</p>
            <p><FaPaintBrush /> تصميم الجرافيك: كورسات متقدمة لتطوير مهاراتك في التصميم باستخدام أحدث الأدوات.</p>
            <p><FaBriefcase /> ريادة الأعمال: تعلم كيف تبدأ وتدير مشروعك بنجاح، من التخطيط إلى التنفيذ.</p>
          </div>
        </Col>
      </Row>
    </Container>
      </section>
      <section className={` py-5 ${styles.heroSection}`}>
        <Header title="   رؤيتنا" width="50px" />
        <Container className={`${styles.visionSection} my-2`}>
      <Row className="text-center">
        <Col md={12}>
          <div className={`${styles.visionItem} p-4 fs-5 fw-bold`}>
            <p>
              أن نكون منصة تعليمية متكاملة، تقدم محتوى تعليميًا مبتكرًا وشاملًا في مجالات متعددة مثل التداول، البورصة، التصميم، وريادة الأعمال.
              هدفنا أن نساعد الأفراد على بناء مستقبلهم وتحقيق الحرية المالية بثقة ومعرفة.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
      </section>
      <section className={` py-5 `}>
        <Header title="لماذا Trading Stars Academy؟
" width="250px" />
        <Container className={`${styles.whyUsSection} my-5`}>

      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <div className="p-4 rounded shadow-sm" style={{ border: '1px solid rgba(0, 123, 255, 0.5)',
        borderRadius: '8px',
        height:"200px",
        boxShadow: '0 0px 40px 0 rgba(0, 123, 255, 0.4)',}}>
            <FaUser size={50} className="text-primary mb-3" />
            <h5>فريق عالمي</h5>
            <p>نخبة من الخبراء يقدمون الدعم من داخل وخارج مصر.</p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="p-4 rounded shadow-sm" style={{ border: '1px solid rgba(0, 123, 255, 0.5)',
        borderRadius: '8px',
        height:"200px",

        boxShadow: '0 0px 40px 0 rgba(0, 123, 255, 0.4)',}}>
            <FaCogs size={50} className="text-primary mb-3" />
            <h5>تنوع المحتوى</h5>
            <p>نوفر حلول تعليمية متكاملة تغطي مختلف المجالات.</p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="p-4 rounded shadow-sm" style={{ border: '1px solid rgba(0, 123, 255, 0.5)',
        borderRadius: '8px',
        height:"200px",

        boxShadow: '0 0px 40px 0 rgba(0, 123, 255, 0.4)',}}>
            <FaStar size={50} className="text-primary mb-3" />
            <h5>قصص نجاح حقيقية</h5>
            <p>ليس مجرد تعليم، بل رحلة لتحقيق النجاح.</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={12}>
          <Link to="/courses" className='fw-bold text-primary'> 
             انضم إلينا الآن
          </Link>
         
          
        </Col>
      </Row>
    </Container>
      </section>
    </>
  );
};

export default AboutUsPage;
