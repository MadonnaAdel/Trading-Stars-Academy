import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import { DeleteAccount, GetApprovedUsers, UpdateUserAccountForAdmin } from '../Services/adminApiService';
import HeaderDashboard from '../adminComponents/HeaderDashboard';
import Pagination from '../sharedComponents/Pagination';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import ActionBtn from '../adminComponents/ActionBtn';
import ConfirmModal from '../sharedComponents/modal/comfirmModal';

const ApprovedUsers = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmModal, setConfirmModal] = useState({ show: false, userId: null });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        const res = await DeleteAccount(userId);
        if (res?.data?.isPass) {
          toast.success(res.data.message);
        } else toast.info(res.data.message);
        setShowDeleteConfirm(false)
        fetchApprovedUsers();
        setConfirmModal({ show: false, userId: null });
      }
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء تنفيذ العملية');
    }
  };

  const updateUser = async (values) => {
    try {
      if (selectedUser) {
        const res = await UpdateUserAccountForAdmin(selectedUser.id, values);

        if (res?.data?.isPass) {
          toast.success(res?.data?.message);
          fetchApprovedUsers();
        } else toast.info(res?.data?.message);
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
        <HeaderDashboard title="ادارةالمستخدمين" />
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
                        className="btn text-white dropdown-toggle p-1"
                        type="button"
                        id={`dropdownMenuButton${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FaEllipsisV size="15" />
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${index}`}
                      >
                        <li className='w-100 px-4'>
                          <ActionBtn onClick={() => {
                            setConfirmModal({ show: true, userId: user.id })
                            setShowDeleteConfirm(true);
                          }} />
                        </li>
                        <li className='w-100 px-4'>
                          <ActionBtn onClick={() => setSelectedUser(user)} btnClass='btn-outline-light mt-3' title='تعديل' icon={ <FaEdit />}/>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
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
                        <div className="my-2 w-75">
                          <img src={formik?.values?.IdentityImageFront} alt="" width="100%" />
                        </div>
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
                        <div className="my-2 w-75">
                          <img src={formik?.values?.IdentityImageBack} alt="" width="100%" />
                        </div>
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
                        <div className="my-2 w-75">
                          <img src={formik?.values?.PersonalImage} alt="" width="100%" />
                        </div>
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

       
        <ConfirmModal
          show={showDeleteConfirm}
          onHide={() => setShowDeleteConfirm(false)}
          onConfirm={handleAction}
          title="تأكيد الحذف"
          message="هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
        />
      </div>
    </section>
  );
};

export default ApprovedUsers; 