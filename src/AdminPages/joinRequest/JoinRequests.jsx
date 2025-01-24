import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ApproveAccount, getNotApprovedUsers, RejectAccount } from '../../Services/adminApiService';
import HeaderDashboard from '../../adminComponents/HeaderDashboard';
import Pagination from '../../sharedComponents/Pagination';
import { FaCheck, FaEllipsisV, FaInfoCircle, FaTimes } from 'react-icons/fa';
import ActionBtn from '../../adminComponents/ActionBtn';
import ConfirmModal from '../../sharedComponents/modal/comfirmModal';
import Modal from 'react-modal';
import style from './joinRequestStyle.module.css';
import Table from '../../adminComponents/table/table';
Modal.setAppElement('#root');



const JoinRequests = () => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    userId: null,
    action: null,
    reason: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserDetails = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const fetchJoinRequests = async () => {
    try {
      const response = await getNotApprovedUsers(currentPage, itemsPerPage);
      setJoinRequests(response?.data?.data?.paginatedData || []);
      setTotalPages(response?.data?.data?.numberOfPages || 1);
    } catch (error) {
      console.error('Error fetching join requests:', error);
      toast.error('حدث خطأ أثناء جلب البيانات');
    }
  };

  useEffect(() => {
    fetchJoinRequests();
  }, [currentPage]);

  const handleAction = async () => {
    const { userId, action, reason } = confirmModal;
    try {
      if (action === 'approve') {
        await ApproveAccount(userId);
        toast.success('تم قبول المستخدم بنجاح');
      } else if (action === 'reject') {
        if (!reason.trim()) {
          toast.error("يجب إدخال سبب الرفض!");
          return;
        }
        await RejectAccount(userId, reason);
        toast.success('تم رفض المستخدم بنجاح');
      }
      setConfirmModal({ show: false, userId: null, action: null, reason: "" });
      fetchJoinRequests();
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء تنفيذ العملية');
    }
  };

  const columns = [
    { header: '#', field: 'index' },
    { header: 'اسم المستخدم', field: 'username' },
    { header: 'البريد الإلكتروني', field: 'email' },
    { header: 'صورة البطاقة الأمامية', field: 'identityImageFront', type: 'image' },
    { header: 'صورة البطاقة الخلفية', field: 'identityImageBack', type: 'image' },
    { header: 'رقم الهاتف', field: 'phoneNumber' },
    { header: 'العمليات', field: 'actions' },
  ];
  const data = joinRequests.map((user, index) => ({
    index: index + 1,
    username: `${user.fname} ${user.lname}`,
    email: user.email,
    identityImageFront: user.identityImageFrontUrl,
    identityImageBack: user.identityImageBackUrl,
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
              btnClass="btn-outline-success mb-3"
              onClick={() => setConfirmModal({ show: true, userId: user.id, action: 'approve' })}
              title="قبول"
              icon={<FaCheck />}
            />
          </li>
          <li className="w-100 px-4">
            <ActionBtn
              icon={<FaTimes />}
              title="رفض"
              onClick={() => setConfirmModal({ show: true, userId: user.id, action: 'reject', reason: '' })}
            />
          </li>
          <li className="w-100 px-4">
            <ActionBtn
              icon={<FaInfoCircle />}
              title="تفاصيل"
              onClick={() => openUserDetails(user)}
              btnClass="btn-outline-light mt-3"
            />
          </li>
        </ul>
      </div>
    ),
  }));
  return (
    <section style={{ width: "85%" }}>
      <div className="container mt-4">
        <HeaderDashboard title="ادارة طلبات الانضمام" />
        <Table columns={columns} data={data}/>
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

        <Modal
          isOpen={!!selectedUser}
          onRequestClose={closeModal}
          contentLabel="تفاصيل المستخدم"
          className={style.modalContent}  
          overlayClassName={`${style.modalBackdrop} fade show`}
        >
          {selectedUser && (
            <div>
              <div className={style.modalHeader}>
                <h5 className={style.modalTitle} id="userDetailsModalLabel">
                  تفاصيل المستخدم
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className={style.modalBody}>
                <div className="d-flex">
                  <div>
                    <p>البريد الالكتروني:</p> {selectedUser.email}
                  </div>
                  <div className='mx-5'>
                    <p>رقم الهاتف:</p> {selectedUser.phoneNumber}
                  </div>
                  <div>
                    <p>اسم المستخدم:</p> {selectedUser.userName}
                  </div>
                </div>
                <div className="d-flex mt-5">
                  <div>
                    <p>صورة البطاقة الامامية:</p>
                    <img src={selectedUser.identityImageFrontUrl} alt="Front" width={200} />
                  </div>
                  <div className='mx-5'>
                    <p>صورة البطاقة الخلفية:</p>
                    <img src={selectedUser.identityImageBackUrl} alt="Back" width={200} />
                  </div>
                  <div>
                    <p>الصورة الشخصية:</p>
                    <img src={selectedUser.personalImageUrl} alt="Personal" width={200} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <ConfirmModal
          show={confirmModal.show}
          onHide={() => setConfirmModal({ show: false, userId: null, action: null, reason: "" })}
          onConfirm={handleAction}
          title="تأكيد العملية"
          message={
            confirmModal.action === 'approve'
              ? 'هل أنت متأكد من قبول هذا المستخدم؟'
              : 'هل أنت متأكد من رفض هذا المستخدم؟'
          }
          children={confirmModal.action === 'reject' && (
            <div className="mt-3">
              <label htmlFor="rejectReason" className="form-label">سبب الرفض:</label>
              <textarea
                id="rejectReason"
                rows={6}
                type="text"
                className="form-control"
                value={confirmModal.reason}
                onChange={(e) => setConfirmModal({ ...confirmModal, reason: e.target.value })}
                placeholder="يرجى إدخال سبب الرفض"
              />
            </div>
          )}
        > <img src={ confirmModal.action === 'approve'?"/approve user.svg":"/delete user.svg"} alt="" />
                </ConfirmModal>
      </div>
    </section>
  );
};

export default JoinRequests;
