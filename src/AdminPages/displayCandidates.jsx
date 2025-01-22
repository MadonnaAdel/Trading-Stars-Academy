import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { DeleteCandidate, GetAllCandidate } from '../Services/adminApiService';
import HeaderDashboard from '../adminComponents/HeaderDashboard';
import Pagination from '../sharedComponents/Pagination';
import ActionBtn from '../adminComponents/ActionBtn';
import ConfirmModal from '../sharedComponents/modal/comfirmModal';
export default function DisplayCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [candidatedeletedId, setCandidateDeletedId] = useState('');
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
    const deleteCandidates = async () => {
        try {
            const response = await DeleteCandidate(candidatedeletedId);
            if (response?.data?.isPass) {
                toast.success(response.data.message);
            } else toast.info(response.data.message);
            fetchcandidates()
        } catch (error) {
            console.error('Error fetching get candidate:', error);
            toast.error('حدث خطأ أثناء جلب البيانات');
        }
    };

    useEffect(() => {
        fetchcandidates();
    }, [currentPage]);

    return (
        <section style={{ width: "85%" }}>
            <div className="container mt-4">
                <HeaderDashboard title="ادارة المرشحسن" />
                <div className="table-responsive">
                    <table className="table table-striped table-hover w-100">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-nowrap">اسم المرشح</th>
                                <th className="text-nowrap">العمر</th>
                                <th className="text-nowrap">رقم الهاتف</th>
                                <th className="text-nowrap">رقم الواتساب</th>
                                <th className="text-nowrap">المحافظة</th>
                                <th className="text-nowrap">حالة الدراسة</th>
                                <th className="text-nowrap">هل سمعت عن التداول من قبل؟</th>
                                <th className="text-nowrap">هل سمعت عن الأكاديمية من قبل؟</th>
                                <th className="text-nowrap">عدد الساعات التي يمكن العمل بها</th>
                                <th className="text-nowrap ">ما الذي ستفعله بعد النجاح؟</th>
                                <th>العمليات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-nowrap">{`${candidate?.fullName}`}</td>
                                    <td className="text-nowrap">{candidate.age}</td>
                                    <td className="text-nowrap">{candidate.mobileNumber}</td>
                                    <td className="text-nowrap">{candidate.whatsAppNumber}</td>
                                    <td className="text-nowrap">{candidate.governomate}</td>
                                    <td className="text-nowrap">{candidate.studyStatus === 1 ? "خريج" : "طالب"}</td>
                                    <td className="text-nowrap">{candidate.isHearedAboutTradingBefore ? "نعم" : "لا"}</td>
                                    <td className="text-nowrap">{candidate.isHearedAboutAcademyBefore ? "نعم" : "لا"}</td>
                                    <td className="text-nowrap">{candidate.numOfHoursCanWork}</td>
                                    <td className="text-wrap ">{candidate.thingsWillDoAfterSuccess}</td>
                                    <td className="text-nowrap">
                                        <ActionBtn onClick={() => {
                                            setShowDeleteConfirm(true);
                                            setCandidateDeletedId(candidate?.id)
                                        }}
                                         />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <ConfirmModal
                    show={showDeleteConfirm}
                    onHide={() => setShowDeleteConfirm(false)}
                    onConfirm={deleteCandidates}
                    title="تأكيد الحذف"
                    message="هل أنت متأكد أنك تريد حذف هذه الفئة؟"
                />
            </div>
        </section>
    )
}
