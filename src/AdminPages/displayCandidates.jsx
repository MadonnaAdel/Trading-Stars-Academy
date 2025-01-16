import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { DeleteCandidate, GetAllCandidate } from '../Services/adminApiService';
export default function DisplayCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

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
    const deleteCandidates = async (id) => {
        try {
            const response = await DeleteCandidate(id);
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
                                <th className="text-nowrap">ما الذي ستفعله بعد النجاح؟</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-nowrap">{`${user?.fullName}`}</td>
                                    <td className="text-nowrap">{user.age}</td>
                                    <td className="text-nowrap">{user.mobileNumber}</td>
                                    <td className="text-nowrap">{user.whatsAppNumber}</td>
                                    <td className="text-nowrap">{user.governomate}</td>
                                    <td className="text-nowrap">{user.studyStatus === 1 ? "خريج" : "طالب"}</td>
                                    <td className="text-nowrap">{user.isHearedAboutTradingBefore ? "نعم" : "لا"}</td>
                                    <td className="text-nowrap">{user.isHearedAboutAcademyBefore ? "نعم" : "لا"}</td>
                                    <td className="text-nowrap">{user.numOfHoursCanWork}</td>
                                    <td className="text-nowrap">{user.thingsWillDoAfterSuccess}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => deleteCandidates(user?.id)}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    totalPages > 1 && <nav aria-label="Page navigation example">
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
                }

            </div>
        </section>
    )
}
