import { UilCheckCircle, UilEllipsisV, UilInfoCircle, UilTimesCircle } from '@iconscout/react-unicons';
import React, { useEffect, useState } from 'react';
import { ApproveAccount, getNotApprovedUsers, RejectAccount } from '../Services/userApiService';
import UserForm from '../sharedComponents/useForm';
import { toast } from 'react-toastify';
import ConfirmModal from '../sharedComponents/comfirmModal';

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
        console.log(reason,userId)
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
              <th className='text-nowrap'>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {joinRequests.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${user.fname} ${user.lname}`}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user?.identityImageFrontUrl}
                    alt="Card"
                    className="img-fluid"
                    width={50}
                  />
                </td>
                <td>
                  <img
                    src={user?.identityImageBackUrl}
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
                          className="btn"
                          onClick={() =>
                            setConfirmModal({ show: true, userId: user.id, action: 'approve' })
                          }
                        >
                          <UilCheckCircle size="18" className="ms-1" /> قبول
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn"
                          onClick={() =>
                            setConfirmModal({ show: true, userId: user.id, action: 'reject', reason: "" })
                          }

                        >
                          <UilTimesCircle size="18" className="ms-1" /> رفض
                        </button>
                      </li>

                      <li>
                        <button
                          className="btn"
                          onClick={() => setSelectedUser(user)}
                          data-bs-toggle="modal"
                          data-bs-target="#userDetailsModal"
                        >
                          <UilInfoCircle size="18" className="ms-1" /> التفاصيل
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
                    تفاصيل المستخدم
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-evenly align-items-center flex-wrap">
                    <div className=""> <p>البريد الالكتروني:</p> {selectedUser.email}</div>
                    <div className=""> <p> رقم الهاتف:</p> {selectedUser.phoneNumber}</div>
                    <div className=""> <p> اسم المستخدم:</p> {selectedUser.userName}</div>
                  </div> 
                  <div className="d-flex justify-content-evenly align-items-center mt-5 flex-wrap">
                    <div className=""> <p>صورة البطاقة الامامية:</p> <img src={selectedUser.identityImageFrontUrl} alt="" width={200}/></div>
                    <div className=""> <p> صورة البطاقة الخلفية:</p> <img src={selectedUser.identityImageBackUrl} alt="" width={200}/></div>
                    <div className=""> <p>  الصورة الشخصية:</p> <img src={selectedUser.personalImageUrl} alt="" width={200}/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
        />
      </div>
    </section>
  );
};

export default JoinRequests;
