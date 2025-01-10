import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EnrollCourseRequest, GetCourses } from '../Services/userApiService';
import { ClipLoader } from 'react-spinners';
import Fuse from 'fuse.js';
import defualteImg from '../../public/Untitled design.png';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';

function Courses() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoggedIn,user } = useAuth()


  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await GetCourses(
        currentPage,
        itemsPerPage,
      );
      setData(res?.data?.data?.paginatedData || []);
      setTotalPages(res?.data?.data?.numberOfPages || 1);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (data?.length > 0) {
      const fuse = new Fuse(data, { keys: ['name', 'description', 'price'] });
      const results = fuse.search(query);
      setFilteredData(query ? results.map(result => result.item) : data);
    }
  }, [query, data]);


  useEffect(() => {
    getCourses();
  }, [currentPage, itemsPerPage]);

  const EnrollmentRequest = async (id) => { 
        try {
            const res = await EnrollCourseRequest({ "userId": user.id,
                "courseId": id});
           res?.data?.ispass? toast.success(res.data.message) : toast.info(res.data.message);
        } catch (err) { 
            console.error(err)
             toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
         }
    }

  console.log(currentPage, totalPages, data, filteredData)
  return (
    <section className="my-5 d-flex justify-content-center">
      <div className="container">
        <div className="searchBox mb-3 d-flex justify-content-center align-items-center w-75" style={{ margin: '150px auto' }}>
          <input
            type="text"
            className="form-control"
            placeholder="ابحث هنا..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

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
                  <div className="card border border-1 border-primary-subtle overflow-hidden">
                    <img src={course?.imageUrl} className="card-img-top" alt="Course Image" onError={(e) => e.target.src = defualteImg} />
                    <div className="card-body bg-body-secondary">
                      <h5 className="card-title">{course?.name}</h5>
                      <p className="card-text text-muted text-truncate">{course?.description}</p>
                      <div className="mb-3">
                        <span className="fw-bold">LE {course?.price}</span>
                      </div>
                      <div className="d-flex align-content-center">
                        {isLoggedIn &&
                          <button className="btn btn-primary btn-sm ms-3" onClick={()=>EnrollmentRequest(course?.id)}>اشترك</button>
                        }

                        <Link to={`/course-details/${course?.id}`}>
                          <button className="btn btn-outline-primary btn-sm ">عرض التفاصيل</button>
                        </Link>
                      </div>
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
                  onClick={() => setCurrentPage(currentPage - 1)}
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
                  onClick={() => setCurrentPage(currentPage + 1)}
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
  );
}

export default Courses;
