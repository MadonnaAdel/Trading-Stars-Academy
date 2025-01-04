import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'
function Info() {
  return (
    <section className={`py-5 ${style.heroSection}`}>
      <div className="container z-2">
        {/* Hero content */}
        <div className="text-center">
          {/* Section header */}
          <div className="mb-5">
            <h1
              className="display-4 fw-bold mb-4"
              data-aos="fade-up"
            >
              TRADING STARS ACADEMY
            </h1>
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
                تصفح الكورسات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info