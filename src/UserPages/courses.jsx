import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EnrollCourseRequest, getCategoriesName, GetCourses } from '../Services/userApiService';
import { ClipLoader } from 'react-spinners';
import Fuse from 'fuse.js';
import defualteImg from '/Untitled design.png';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';

function Courses() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(''); 
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoggedIn, user } = useAuth();

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await GetCourses(currentPage, itemsPerPage);
      setData(res?.data?.data?.paginatedData || []);
      setTotalPages(res?.data?.data?.numberOfPages || 1);
      const categories= await getCategoriesName();
      setCategories(categories?.data?.data || []); 
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
      let filtered = query ? results.map(result => result.item) : data;
      if (category) {
        filtered = filtered.filter(course => course.category === category);
      }
      setFilteredData(filtered);
    }
  }, [query, category, data]);

  useEffect(() => {
    getCourses();
  }, [currentPage, itemsPerPage]);

  const EnrollmentRequest = async (id) => {
    try {
      const res = await EnrollCourseRequest({ userId: user.id, courseId: id });
      res?.data?.ispass ? toast.success(res.data.message) : toast.info(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section className="my-5 d-flex justify-content-center">
      <div className="container">
        <div className="searchBox mb-3 d-flex justify-content-center align-items-center w-75" style={{ margin: '150px auto' }}>
          <input
            type="text"
            className="form-control ms-2"
            placeholder="ابحث هنا..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="form-select w-25"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">كل التصنيفات</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
                  <div className="card border border-1 border-primary-subtle overflow-hidden rounded-4">
                    <img src={course?.imageUrl} className="card-img-top" alt="Course Image" onError={(e) => (e.target.src = defualteImg)} />
                    <div className="card-body bg-body-secondary">
                      <div className="d-flex">
                        <h4 className="card-title ">{course?.name}</h4>
                      </div>
                      <p className="card-text text-muted text-truncate">{course?.description}</p>
                      <span className=""> LE {course?.price}</span>
                      {isLoggedIn && (
                        <button className="btn btn-primary btn-sm ms-3 w-100" onClick={() => EnrollmentRequest(course?.id)}>
                          اشترك
                        </button>
                      )}
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
