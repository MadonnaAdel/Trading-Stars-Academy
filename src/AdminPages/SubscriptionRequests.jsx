import { UilCheckCircle, UilEllipsisV, UilInfoCircle, UilTimesCircle } from '@iconscout/react-unicons';
import React, { useEffect, useState } from 'react';
import { ApproveAccount, ApproveEnrollmentRequest, GetNotApprovedEnrollmentRequests, RejectAccount, RejectEnrollmentRequest } from '../Services/userApiService';
import UserForm from '../sharedComponents/useForm';
import { toast } from 'react-toastify';
import ConfirmModal from '../sharedComponents/comfirmModal';

export default function SubscriptionRequests() {
  const [subscriptionRequests, setSubscriptionRequests] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    reqId: null,
    action: null,
    reason: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchSubscriptionRequests = async () => {
    try {
      const response = await GetNotApprovedEnrollmentRequests();
      if (response?.data?.isPass) {
        setSubscriptionRequests(response?.data?.data);

      } else toast.info(response?.data?.message)


    } catch (error) {
      console.error('Error fetching join requests:', error);
      toast.error('حدث خطأ أثناء جلب البيانات');
    }
  };

  useEffect(() => {
    fetchSubscriptionRequests(); console.log(subscriptionRequests)
  }, []);

  const handleAction = async () => {
    const { reqId, action, reason } = confirmModal;
    try {
      if (action === 'approve') {
        await ApproveEnrollmentRequest(reqId);
        toast.success('تم قبول طلب الاشتراك بنجاح');
      } else if (action === 'reject') {
        await RejectEnrollmentRequest(reqId);
        toast.success('تم رفض طلب الاشتراك بنجاح');
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
        <th>#</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(subscriptionRequests)  && subscriptionRequests?.map((user, index) => (
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
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id={`dropdownMenuButton${index}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdownMenuButton${index}`}
              >
                <li>
                  <button
                    className="btn w-100"
                    onClick={() =>
                      setConfirmModal({
                        show: true,
                        reqId: user.id,
                        action: "approve",
                      })
                    }
                  >
                    <i className="fas fa-check-circle me-1"></i> قبول
                  </button>
                </li>
                <li>
                  <button
                    className="btn w-100"
                    onClick={() =>
                      setConfirmModal({
                        show: true,
                        reqId: user.id,
                        action: "reject",
                      })
                    }
                  >
                    <i className="fas fa-times-circle me-1"></i> رفض
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
