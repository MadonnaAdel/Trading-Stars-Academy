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
import Table from '../adminComponents/table/table';
import Modal from 'react-modal';
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
          setSelectedUser(null)
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

  const columns = [
    { header: '#', field: 'index' },
    { header: 'اسم المستخدم', field: 'username' },
    { header: 'البريد الإلكتروني', field: 'email' },
    { header: 'صورة البطاقة الأمامية', field: 'identityImageFront', type: 'image' },
    { header: 'صورة البطاقة الخلفية', field: 'identityImageBack', type: 'image' },
    { header: 'رقم الهاتف', field: 'phoneNumber' },
    { header: 'العمليات', field: 'actions' },
  ];

  const data = approvedUsers.map((user, index) => ({
    index: index + 1,
    username: `${user.fname} ${user.lname}`,
    email: user.email,
    identityImageFront: user.identityImageBackUrl,
    identityImageBack: user.identityImageFrontUrl,
    phoneNumber: user.phoneNumber,
    actions: (
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
        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
          <li className="w-100 px-4">
            <ActionBtn
              onClick={() => {
                setConfirmModal({ show: true, userId: user.id });
                setShowDeleteConfirm(true);
              }}
            />
          </li>
          <li className="w-100 px-4">
            <ActionBtn
              onClick={() => setSelectedUser(user)}
              btnClass="btn-outline-light mt-3"
              title="تعديل"
              icon={<FaEdit />}
            />
          </li>
        </ul>
      </div>
    ),
  }));

  return (
    <section style={{ width: "85%" }}>
      <div className="container mt-4">
        <HeaderDashboard title="ادارةالمستخدمين" />
        <Table columns={columns} data={data} />
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        <UserModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} formik={formik} handleFileChange={handleFileChange} />
        <ConfirmModal
          show={showDeleteConfirm}
          onHide={() => setShowDeleteConfirm(false)}
          onConfirm={handleAction}
          title="تأكيد الحذف"
          message="هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
        > <img src={ "/delete user.svg"} alt="" />
                </ConfirmModal>
      </div>
    </section>
  );
};

export default ApprovedUsers;

const UserModal = ({ selectedUser, setSelectedUser, formik, handleFileChange }) => {
  return (
    <>
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onRequestClose={() => setSelectedUser(null)}
          contentLabel="تعديل بيانات المستخدم"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 1000,
            },
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">تعديل بيانات المستخدم</h5>
            <button
              onClick={() => setSelectedUser(null)}
              className="btn-close"
              style={{ color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}
            >
              &times;
            </button>
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
                    style={{
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                    }}
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
                    style={{
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                    }}
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
                  onClick={() => setSelectedUser(null)}
                  style={{
                    backgroundColor: "#444",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};


