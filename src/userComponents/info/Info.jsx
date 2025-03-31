import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'
function Info() {
  return (
    <section className={`py-5 ${style.heroSection}`}>
      <div className="container p-4 ">

        <div className="text-center ">

          <div className="mb-5 text-black  ">
            <h1
              className="display-4 fw-bold mb-4"
              data-aos="fade-up"
            >
              LEARNNOVA ACADEMY
            </h1>
            <p className='fw-bold '>نقدّم لك مجموعة متنوّعة من الكورسات المصممة بعناية لتناسب جميع اهتماماتك ومستوياتك. سواء كنت تسعى لتطوير مهاراتك المهنية، تعلم هواية جديدة، أو الاستعداد لمستقبلك الأكاديمي، لدينا ما يناسبك!

              تعلم من خبراء متخصصين واستمتع بتجربة تعليمية مرنة تجمع بين الجودة والراحة. انطلق الآن وابدأ رحلتك نحو النجاح معنا!"</p>
            <div
              className="text-white btn me-3 fw-bold border-secondary "
              style={{
                boxShadow: 'rgb(0 123 255 / 27%) 0px 0px 20px 5px',
                transition: 'box-shadow 0.3s ease-in-out',
                backdropFilter: 'blur(3px)',
              }}
            >
              <Link
                to="/courses"
                className="text-black text-decoration-none me-3 fw-bold"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                }}
              >
                تصفح الخدمات التعليمية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info