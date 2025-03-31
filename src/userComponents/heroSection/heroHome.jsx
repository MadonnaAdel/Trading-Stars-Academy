import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function HeroHome() {
  return (
    <section className={`py-5 ${style.heroSection}`}>
      <div className="container ">
        
        <div className="row align-items-center mt-5">
        
          <div className="col-12 col-md-4 text-center text-md-end mt-5 mt-md-0 ">
            <h1
              className="display-4 fw-bold mb-2 fs-3 "
              data-aos="fade-up"
            >
              TRADING STARTS ACADEMY
            </h1>
            <p
              className="lead mb-4"
              data-aos="fade-up"
            >
              انطلق في عالم التداول واكتشف فرص الربح المذهلة!
              تداول الأسهم، العملات، والسلع بأدوات مبتكرة واستراتيجيات ذكية لتحقق النجاح في الأسواق المالية. 
              لا تفوت الفرصة، فالتداول هو مفتاحك لتحقيق أهدافك المالية!
            </p>
            <div
              className="text-white btn me-3 fw-bold border-secondary"
              style={{
                boxShadow: '0 0px 15px 0 rgba(0, 123, 255, 0.8)',
                transition: 'box-shadow 0.3s ease-in-out',
                backdropFilter: 'blur(15px)',
              }}
            >
              <Link
                to="/courses"
                className="text-white text-decoration-none me-3 fw-bold"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                }}
              >
                تصفح الخدمات التعليمية
              </Link>
            </div>
          </div>

       
          <div className="col-12 col-md-8 mb-5 text-center ">
            <img 
              src="/heroImage.svg" 
              alt="Hero Image" 
              className="img-fluid" 
              width="100%" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
