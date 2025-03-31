import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { DeleteCandidate, GetAllCandidate } from '../Services/adminApiService';
import HeaderDashboard from '../adminComponents/HeaderDashboard';
import Pagination from '../sharedComponents/Pagination';
import ActionBtn from '../adminComponents/ActionBtn';
import ConfirmModal from '../sharedComponents/modal/comfirmModal';
import Table from '../adminComponents/table/table';
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
    const columns = [
        { header: '#', field: 'index' },
        { header: 'اسم المرشح', field: 'fullName' },
        { header: 'العمر', field: 'age' },
        { header: 'رقم الهاتف', field: 'mobileNumber' },
        { header: 'رقم الواتساب', field: 'whatsAppNumber' },
        { header: 'المحافظة', field: 'governomate' },
        { header: 'حالة الدراسة', field: 'studyStatus' },
        { header: 'هل سمعت عن التداول من قبل؟', field: 'isHearedAboutTradingBefore' },
        { header: 'هل سمعت عن الأكاديمية من قبل؟', field: 'isHearedAboutAcademyBefore' },
        { header: 'عدد الساعات التي يمكن العمل بها', field: 'numOfHoursCanWork' },
        { header: 'ما الذي ستفعله بعد النجاح؟', field: 'thingsWillDoAfterSuccess' },
        { header: 'العمليات', field: 'actions' },
    ];

    const data = candidates.map((candidate, index) => ({
        index: index + 1,
        fullName: candidate.fullName,
        age: candidate.age,
        mobileNumber: candidate.mobileNumber,
        whatsAppNumber: candidate.whatsAppNumber,
        governomate: candidate.governomate,
        studyStatus: candidate.studyStatus === 1 ? 'خريج' : 'طالب',
        isHearedAboutTradingBefore: candidate.isHearedAboutTradingBefore ? 'نعم' : 'لا',
        isHearedAboutAcademyBefore: candidate.isHearedAboutAcademyBefore ? 'نعم' : 'لا',
        numOfHoursCanWork: candidate.numOfHoursCanWork,
        thingsWillDoAfterSuccess: candidate.thingsWillDoAfterSuccess,
        actions: (
            <ActionBtn
                onClick={() => {
                    setShowDeleteConfirm(true);
                    setCandidateDeletedId(candidate.id);
                }}
            />
        ),
    }));
    return (
        <section style={{ width: "85%" }}>
            <div className="container mt-4">
                <HeaderDashboard title="ادارة المرشحين" />
                <Table columns={columns} data={data} />
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <ConfirmModal
                    show={showDeleteConfirm}
                    onHide={() => setShowDeleteConfirm(false)}
                    onConfirm={deleteCandidates}
                    title="تأكيد الحذف"
                    message="هل أنت متأكد أنك تريد حذف هذه الفئة؟"
                >
                    <img src="/delete user.svg" alt="" />
                </ConfirmModal>
            </div>
        </section>
    )
}
