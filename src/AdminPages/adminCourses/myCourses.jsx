import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetCourses } from '../../Services/userApiService';
import { ClipLoader } from 'react-spinners';
import style from './style.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AddNewCourse, DeleteCourse } from '../../Services/adminApiService';
import AddBtn from '../../adminComponents/addBtn/AddBtn';
import BackButton from '../../adminComponents/backBtn';
import Pagination from '../../sharedComponents/Pagination';
import CourseCard from '../../sharedComponents/CourseCard';
import ConfirmModal from '../../sharedComponents/modal/comfirmModal';


function MyCourses() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await GetCourses(currentPage, itemsPerPage, id);
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

  const handleAddCourse = async (values) => {
    try {
      const res = await AddNewCourse({ ...values, 'CategoryId': id })
      if (res?.data?.isPass) {
        toast.success(res?.data?.message);
      } else toast.info(res?.data?.message)
      setShowModal(false);
      getCourses()
    } catch (err) {
      toast.error(err)
      console.error(err);
    }

  };
  const handleDeleteCourse = async (courseId) => {
    try {
      const res = await DeleteCourse(courseId)
      if (res?.data?.isPass) {
        toast.success(res?.data?.message);
      } else toast.info(res?.data?.message)
      getCourses()
    } catch (err) {
      toast.error(err)
      console.error(err);
    }
  };


  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('اسم الدورة مطلوب'),
    Description: Yup.string().required('وصف الدورة مطلوب'),
    Price: Yup.number().required('سعر الدورة مطلوب').positive('يجب أن يكون السعر رقمًا موجبًا'),
    ImageFile: Yup.mixed().required('صورة الدورة مطلوبة'),
  });

  return (
    <section className="my-5">
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4 " style={{ width: "85%" }} >

          <AddBtn onClick={() => setShowModal(true)} label=' إضافة دورة تعليمية جديدة' />
          <BackButton />
        </div>
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
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <CourseCard course={course} role='Admin' onDelete={handleDeleteCourse} />

                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">إضافة دورة تعليمية جديدة</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <Formik
                  initialValues={{ Name: '', Description: '', ImageFile: null, Price: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleAddCourse}
                >
                  {({ setFieldValue, errors, touched }) => (
                    <Form>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">اسم الدورة</label>
                          <Field type="text" name="Name" className="form-control" />
                          {errors.Name && touched.Name && (
                            <div className="text-danger">{errors.Name}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">وصف الدورة</label>
                          <Field as="textarea" name="Description" className="form-control" rows="3" />
                          {errors.Description && touched.Description && (
                            <div className="text-danger">{errors.Description}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="price" className="form-label">سعر الدورة</label>
                          <Field type="number" name="Price" className="form-control" />
                          {errors.Price && touched.Price && (
                            <div className="text-danger">{errors.Price}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="image" className="form-label">غلاف الدورة</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={(event) =>
                              setFieldValue('ImageFile', event.target.files[0])
                            }
                          />
                          {errors.ImageFile && touched.ImageFile && (
                            <div className="text-danger">{errors.ImageFile}</div>
                          )}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          إلغاء
                        </button>
                        <button type="submit" className="btn btn-primary">
                          إضافة
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </section>
  );
}

export default MyCourses;
