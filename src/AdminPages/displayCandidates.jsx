import React, { useEffect, useState } from 'react'
import { GetAllCandidate } from '../Services/userApiService';
import ConfirmModal from '../sharedComponents/comfirmModal';
import UserForm from '../sharedComponents/useForm';
import { UilCheckCircle, UilEllipsisV, UilInfoCircle, UilTimesCircle } from '@iconscout/react-unicons';

export default function DisplayCandidates() {
    const [candidates, setCandidates] = useState([]);
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
  
    const fetchcandidates = async () => {
      try {
        const response = await GetAllCandidate(currentPage, itemsPerPage);
        setCandidates(response?.data?.data?.paginatedData || []);
        setTotalPages(response?.data?.data?.numberOfPages || 1);
      } catch (error) {
        console.error('Error fetching get candidate:', error);
        toast.error('حدث خطأ أثناء جلب البيانات');
      }
    };
  
    useEffect(() => {
      fetchcandidates();
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
        fetchcandidates();
      } catch (error) {
        console.error(error);
        toast.error('حدث خطأ أثناء تنفيذ العملية');
      }
    };
  
  
    return (
      <section style={{ width: "85%" }}>
        <div className="container mt-4">
          <table className="table table-striped table-hover table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم المرشح</th>
                <th>العمر</th>
                <th>رقم الهاتف</th>
                <th>رقم الواتساب</th>
                <th>المحافظة</th>
                <th> هل سمعت عن التداول من قبل؟</th>
                <th>هل سمعت عن الأكاديمية من قبل؟</th>
                <th>عدد الساعات التي يمكن العمل بها</th>
                <th>ما الذي ستفعله بعد النجاح؟</th>
              </tr>
            </thead>
            {/* <tbody>
              {candidates.map((user, index) => (
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
            </tbody> */}
          </table>
  
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
                    <UserForm
                      initialValues={{
                        Email: selectedUser.email || "",
                        Username: selectedUser.userName || "",
                        Fname: selectedUser.fname || "",
                        Lname: selectedUser.lname || "",
                        PhoneNumber: selectedUser.phoneNum || "",
                      }}
                    />
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
    
  )
}
