import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from '../sharedComponents/modal/comfirmModal';
import { ApproveEnrollmentRequest, GetNotApprovedEnrollmentRequests, RejectEnrollmentRequest } from '../Services/adminApiService';
import HeaderDashboard from '../adminComponents/HeaderDashboard';
import Pagination from '../sharedComponents/Pagination';
import ActionBtn from '../adminComponents/ActionBtn';
import { FaCheck, FaEllipsisV, FaTimes } from 'react-icons/fa';
import Table from '../adminComponents/table/table';

export default function SubscriptionRequests() {
  const [subscriptionRequests, setSubscriptionRequests] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    reqId: null,
    action: null,
    reason: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const fetchSubscriptionRequests = async () => {
    try {
      const response = await GetNotApprovedEnrollmentRequests(currentPage,itemsPerPage);
      if (response?.data?.isPass) {
        setSubscriptionRequests(response?.data?.data?.paginatedData);
        setTotalPages(response.data.data.numberOfPages)
      } 
    } catch (error) {
      console.error('Error fetching join requests:', error);
      toast.error('حدث خطأ أثناء جلب البيانات');
    }
  };

  useEffect(() => {
    fetchSubscriptionRequests();
  }, []);

  const handleAction = async () => {
    const { reqId, action } = confirmModal;
    try {
      if (action === 'approve') {
        const AppeoveReq= await ApproveEnrollmentRequest(reqId);
        if(AppeoveReq?.data?.isPass){
           toast.success(AppeoveReq?.data?.message);
        fetchSubscriptionRequests()
        } else toast.info(AppeoveReq?.data?.message)
       
      } else if (action === 'reject') {
        const RejectReq= await RejectEnrollmentRequest(reqId);
        if(RejectReq?.data?.isPass){
           toast.success(RejectReq?.data?.message);
        fetchSubscriptionRequests()
        } else toast.info(RejectReq?.data?.message)
       
      }
      setConfirmModal({ show: false, reqId: null, action: null });
      fetchSubscriptionRequests();
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء تنفيذ العملية');
    }
  };

  const columns = [
    { header: '#', field: 'index' },
    { header: 'اسم الدورة التدريبية', field: 'courseName' },
    { header: 'سعر الدورة', field: 'coursePrice' },
    { header: 'البريد الالكتروني', field: 'userEmail' },
    { header: 'اسم المشترك', field: 'userFullName' },
    { header: 'اسم المستخدم', field: 'userName' },
    { header: 'العمليات', field: 'actions' },
  ];

  const data = subscriptionRequests?.map((user, index) => ({
    index: index + 1,
    courseName: user.courseName,
    coursePrice: user.coursePrice,
    userEmail: user.userEmail,
    userFullName: `${user.userFirstName} ${user.userLastName}`,
    userName: user.userName,
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
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton${index}`}
        >
          <li className="w-100 px-4">
            <ActionBtn
              btnClass="btn-outline-success mb-3"
              onClick={() =>
                setConfirmModal({
                  show: true,
                  reqId: user.id,
                  action: 'approve',
                })
              }
              title="قبول"
              icon={<FaCheck />}
            />
          </li>
          <li className="w-100 px-4">
            <ActionBtn
              icon={<FaTimes />}
              title="رفض"
              onClick={() =>
                setConfirmModal({
                  show: true,
                  reqId: user.id,
                  action: 'reject',
                })
              }
            />
          </li>
        </ul>
      </div>
    ),
  }));

  return (
    <section style={{ width: "85%" }}>
      <div className="container mt-4">
        <HeaderDashboard title="ادارة طلبات الاشتراك" />
        <Table columns={columns} data={data}/>
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        <ConfirmModal
          show={confirmModal.show}
          onHide={() => setConfirmModal({ show: false, reqId: null, action: null })}
          onConfirm={handleAction}
          title="تأكيد العملية"
          message={
            confirmModal.action === 'approve'
              ? 'هل أنت متأكد من قبول طلب الاشتراك؟'
              : 'هل أنت متأكد من رفض طلب الاشتراك؟'
          }
        >  <img src={ confirmModal.action === 'approve'?"/approve user.svg":"/delete user.svg"} alt="" />
                </ConfirmModal>
      </div>
    </section>
  );
}
