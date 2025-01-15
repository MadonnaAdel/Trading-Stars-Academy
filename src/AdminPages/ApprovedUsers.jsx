import React, { useEffect, useState } from 'react';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { DeleteAccount, GetApprovedUsers, UpdateUserAccountForAdmin } from '../Services/userApiService';
import { toast } from 'react-toastify';
import ConfirmModal from '../sharedComponents/comfirmModal';
import * as Yup from "yup";
import { useFormik } from "formik";

const ApprovedUsers = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmModal, setConfirmModal] = useState({ show: false, userId: null, action: null, reason: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch approved users
  const fetchApprovedUsers = async () => {
    try {
      const response = await GetApprovedUsers(currentPage, itemsPerPage);
      setApprovedUsers(response?.data?.data?.paginatedData || []);
      setTotalPages(response?.data?.data?.numberOfPages || 1);
    } catch (error) {
      console.error('Error fetching approved users:', error);
      toast.error('حدث خطأ أثناء جلب البيانات');
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
  }, [currentPage]);

  const handleAction = async () => {
    const { userId } = confirmModal;
    try {
      if (userId) {
        await DeleteAccount(userId);
        toast.success('تم حذف المستخدم بنجاح');
        fetchApprovedUsers();
        setConfirmModal({ show: false, userId: null, action: null, reason: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء تنفيذ العملية');
    }
  };


  const updateUser = async (values) => {
    try {
      if (selectedUser) {
        const res = await UpdateUserAccountForAdmin(selectedUser.id,values );
        console.log(selectedUser)
        if(res?.data?.isPass){
             toast.success(res?.data?.message);
        fetchApprovedUsers(); 
        }else toast.info(res?.data?.message);
      }
    } catch (err) {
      toast.error('حدث خطأ أثناء تحديث البيانات');
      console.error(err);
    }
  };

  const validationSchema = Yup.object({
    Fname: Yup.string()
      
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    Lname: Yup.string()
      
      .min(2, "الرجاء إدخال أكثر من حرفين")
      .max(15, "الرجاء إدخال أقل من 15 حرف"),
    IdentityImageFront: Yup.mixed(),
    IdentityImageBack: Yup.mixed(),
    PersonalImage: Yup.mixed(),
    PhoneNumber: Yup.string()
      
      .matches(/^01[0125][0-9]{8}$/, "الرجاء إدخال رقم هاتف صحيح"),
  });

  const formik = useFormik({
    initialValues: {
      Fname: "",
      Lname: "",
      IdentityImageFront: '',
      IdentityImageBack: '',
      PersonalImage: '',
      PhoneNumber: "",
    },
    validationSchema,
    onSubmit: updateUser,
  });


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    formik.setFieldValue(name, files[0]);
  };


  useEffect(() => {
    if (selectedUser) {
      formik.setValues({
        Fname: selectedUser.fname || "",
        Lname: selectedUser.lname || "",
        IdentityImageFront: selectedUser.identityImageFrontUrl || '',
        IdentityImageBack: selectedUser.identityImageBackUrl || 
        '',
        PersonalImage: selectedUser.personalImageUrl || '',
        PhoneNumber: selectedUser.phoneNumber || "",
      });
    }
  }, [selectedUser]);

  return (
    <section style={{ width: "85%" }}>
      <div className="container mt-4">
        <div className="overflow-x-auto">
          <table className="table table-striped table-hover table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th className='text-nowrap'>اسم المستخدم</th>
                <th className='text-nowrap'>البريد الإلكتروني</th>
                <th className='text-nowrap'>صورة البطاقة الأمامية</th>
                <th className='text-nowrap'>صورة البطاقة الخلفية</th>
                <th className='text-nowrap'>رقم الهاتف</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {approvedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${user.fname} ${user.lname}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={user?.IdentityImageFront}
                      alt="Card"
                      className="img-fluid"
                      width={50}
                    />
                  </td>
                  <td>
                    <img
                      src={user?.IdentityImageBack}
                      alt="Card"
                      className="img-fluid"
                      width={50}
                    />
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <UilEllipsisV size="20" />
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${index}`}
                      >
                        <li>
                          <button
                            className="btn w-100"
                            onClick={() =>
                              setConfirmModal({ show: true, userId: user.id, action: 'reject', reason: "" })
                            }
                          >
                            حذف
                          </button>
                        </li>

                        <li>
                          <button
                            className="btn w-100"
                            onClick={() => setSelectedUser(user)}
                            data-bs-toggle="modal"
                            data-bs-target="#userDetailsModal"
                          >
                            تعديل
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>

        {selectedUser && (
          <div
            className="modal fade"
            id="userDetailsModal"
            tabIndex="-1"
            aria-labelledby="userDetailsModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="userDetailsModalLabel">
                    تعديل بيانات المستخدم
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <label>الاسم الأول</label>
                        <input
                          type="text"
                          name="Fname"
                          value={formik.values.Fname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control"
                        />
                        {formik.errors.Fname && formik.touched.Fname && (
                          <div className="text-danger">{formik.errors.Fname}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label>الاسم الأخير</label>
                        <input
                          type="text"
                          name="Lname"
                          value={formik.values.Lname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control"
                        />
                        {formik.errors.Lname && formik.touched.Lname && (
                          <div className="text-danger">{formik.errors.Lname}</div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>صورة البطاقة الأمامية</label>
                        <input
                          type="file"
                          name="IdentityImageFront"
                          onChange={handleFileChange}
                          className="form-control"
                        />
                        {formik.errors.IdentityImageFront && formik.touched.IdentityImageFront && (
                          <div className="text-danger">{formik.errors.IdentityImageFront}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label>صورة البطاقة الخلفية</label>
                        <input
                          type="file"
                          name="IdentityImageBack"
                          onChange={handleFileChange}
                          className="form-control"
                        />
                        {formik.errors.IdentityImageBack && formik.touched.IdentityImageBack && (
                          <div className="text-danger">{formik.errors.IdentityImageBack}</div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>صورة شخصية</label>
                        <input
                          type="file"
                          name="PersonalImage"
                          onChange={handleFileChange}
                          className="form-control"
                        />
                        {formik.errors.PersonalImage && formik.touched.PersonalImage && (
                          <div className="text-danger">{formik.errors.PersonalImage}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label>رقم الهاتف</label>
                        <input
                          type="text"
                          name="PhoneNumber"
                          value={formik.values.PhoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control"
                        />
                        {formik.errors.PhoneNumber && formik.touched.PhoneNumber && (
                          <div className="text-danger">{formik.errors.PhoneNumber}</div>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        إغلاق
                      </button>
                      <button type="submit" className="btn btn-primary">
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {confirmModal.show && (
          <ConfirmModal
            action={confirmModal.action}
            userId={confirmModal.userId}
            onConfirm={handleAction}
            onCancel={() => setConfirmModal({ show: false, userId: null })}
            reason={confirmModal.reason}
            setReason={(value) => setConfirmModal({ ...confirmModal, reason: value })}
          />
        )}
      </div>
    </section>
  );
};

export default ApprovedUsers; 