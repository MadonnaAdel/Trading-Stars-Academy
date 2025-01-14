import { toast } from "react-toastify"
import { GetUserEnrolledCourses } from "../Services/userApiService"
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";


export default function UserCourses() {
    
      const [data, setData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(12);
      const [loading, setLoading] = useState(true);
      const [totalPages, setTotalPages] = useState(1);
      const { isLoggedIn, user } = useAuth();

    const getUserEnrolledCourses = async () => {
        try {
            const res =await GetUserEnrolledCourses(user.id);
            if(res?.data?.isPass){
                setData(res.data.data);
            }
            
        } catch (err) {
            toast.error(err)
            console.error(err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getUserEnrolledCourses()
    },[data])
    return (
        <section className="my-5 d-flex justify-content-center">
            <div className="container">
                <div className="result mt-5">
                    {loading ? (
                        <div className="text-center">
                            <ClipLoader color="#00BFFF" loading={loading} size={50} />
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center">
                            <img src="/not found.svg" alt="not found result" width="60%" />
                        </div>
                    ) : (
                        <div className="row">
                            {filteredData.map((course) => (
                                <div key={course?.id} className="col-12 col-md-6 col-lg-3 mb-4">
                                    <div className="card border border-1 border-primary-subtle overflow-hidden rounded-4">
                                        <div className="overflow-hidden " style={{ maxHeight: '150px', minHeight: '150px' }}>
                                            <img
                                                src={course?.imageUrl}
                                                className="img-fluid w-100 h-100 object-fit-contain"
                                                alt="Course Image"
                                            />
                                        </div>
                                        <div className="card-body bg-body-secondary">
                                            <div className="d-flex">
                                                <h4 className="card-title">{course?.name}</h4>
                                            </div>
                                            <p className="card-text text-muted text-truncate">{course?.description}</p>
                                            <div className="d-flex justify-content-between my-2">
                                                <span>LE {course?.price}</span>
                                                <span>{course?.categoryName}</span>
                                            </div>
                                            <Link to={`/course-details/${course?.id}`}>
                                                <button className="btn btn-outline-primary btn-sm w-100 my-2">عرض التفاصيل</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {filteredData.length > 0 && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination d-flex justify-content-center">
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    &laquo;
                                </button>
                            </li>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </section>
    )
}
