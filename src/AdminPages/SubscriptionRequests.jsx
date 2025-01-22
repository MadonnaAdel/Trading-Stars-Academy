import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from '../sharedComponents/modal/comfirmModal';
import { ApproveEnrollmentRequest, GetNotApprovedEnrollmentRequests, RejectEnrollmentRequest } from '../Services/adminApiService';
import HeaderDashboard from '../adminComponents/HeaderDashboard';
import Pagination from '../sharedComponents/Pagination';
import ActionBtn from '../adminComponents/ActionBtn';
import { FaCheck, FaEllipsisV, FaTimes } from 'react-icons/fa';

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
      } else toast.info(response?.data?.message)


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


  return (
    <section style={{ width: "85%" }}>
      <div className="container mt-4">
        <HeaderDashboard title="ادارة طلبات الاشتراك" />
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th className="text-nowrap">اسم الدورة التدريبية</th>
                <th className="text-nowrap">سعر الدورة</th>
                <th className="text-nowrap">البريد الالكتروني</th>
                <th className="text-nowrap">اسم المشترك</th>
                <th className="text-nowrap">اسم المستخدم</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(subscriptionRequests) && subscriptionRequests?.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="text-nowrap">{user.courseName}</td>
                  <td className="text-nowrap">{user.coursePrice}</td>
                  <td className="text-nowrap">{user.userEmail}</td>
                  <td className="text-nowrap">{`${user.userFirstName} ${user.userLastName}`}</td>
                  <td className="text-nowrap">{user.userName}</td>
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
                          <ActionBtn
                          btnClass='btn-outline-success mb-3'
                           onClick={() =>
                            setConfirmModal({
                              show: true,
                              reqId: user.id,
                              action: "approve",
                            })
                          } title='قبول' icon={<FaCheck />} />
                        </li>
                        <li className='w-100 px-4'>
                          <ActionBtn icon={<FaTimes />} title='رفض' onClick={() =>
                            setConfirmModal({
                              show: true,
                              reqId: user.id,
                              action: "reject",
                            })
                          } />                                  
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
        />
      </div>
    </section>
  );
}
