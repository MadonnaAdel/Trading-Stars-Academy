import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetCourses } from '../../Services/userApiService';
import { ClipLoader } from 'react-spinners';
import { UilPlus } from '@iconscout/react-unicons'; // استيراد أيقونة الإضافة
import defualteImg from '/Untitled design.png';
import style from './style.module.css';

function MyCourses() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false); // حالة التحكم في عرض الـ Modal

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await GetCourses(currentPage, itemsPerPage);
      setData(res?.data?.data?.paginatedData || []);
      setTotalPages(res?.data?.data?.numberOfPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, [currentPage, itemsPerPage]);

  const handleAddCourse = () => {
    // منطق إرسال بيانات النموذج
    console.log('Course added!');
    setShowModal(false); // إغلاق النافذة المنبثقة
  };

  return (
    <section className="my-5">
      <div className="container">
        {/* زر الإضافة */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowModal(true)} // فتح النافذة المنبثقة
          >
            <UilPlus className="me-2" /> إضافة دورة تعليمية جديدة
          </button>
        </div>

        {/* محتوى الصفحة */}
        <div className="result mt-5">
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#00BFFF" loading={loading} size={50} />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center">
              <img src="/not found.svg" alt="No Results" style={{ width: '60%' }} />
            </div>
          ) : (
            <div className={`row ${style.cardsCourse}`}>
              {data.map((course, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="card border border-primary-subtle overflow-hidden rounded-4"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={course?.imageUrl}
                      className="card-img-top"
                      alt="Course"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = defualteImg)}
                    />
                    <div className="card-body bg-body-secondary">
                      <h5 className="card-title text-truncate">{course?.name}</h5>
                      <p className="card-text text-muted text-truncate">
                        {course?.description}
                      </p>
                      <span className="fw-bold">LE {course?.price}</span>
                      <Link to={`/course-details/${course?.id}`}>
                        <button
                          className="btn btn-outline-primary btn-sm w-100 my-2"
                          style={{ fontSize: '14px' }}
                        >
                          عرض التفاصيل
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* النافذة المنبثقة */}
        {showModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header ">
                  <h5 className="modal-title">إضافة دورة تعليمية جديدة</h5>
                  <button
                    type="button"
                    className="btn-close me-2"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="courseName" className="form-label">
                        اسم الدورة
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="courseName"
                        placeholder="أدخل اسم الدورة"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="courseDescription" className="form-label">
                        وصف الدورة
                      </label>
                      <textarea
                        className="form-control"
                        id="courseDescription"
                        rows="3"
                        placeholder="أدخل وصف الدورة"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="coursePrice" className="form-label">
                        سعر الدورة
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="coursePrice"
                        placeholder="أدخل سعر الدورة"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddCourse}
                  >
                    إضافة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyCourses;
