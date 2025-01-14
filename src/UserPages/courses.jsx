import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  getCategoriesName, GetCourses } from '../Services/userApiService';
import { ClipLoader } from 'react-spinners';
import Fuse from 'fuse.js';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';

function Courses() {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoggedIn, user } = useAuth();

  const getCourses = async () => {
    console.log(categoryId)
    try {
      setLoading(true);
      const res = await GetCourses(currentPage, itemsPerPage, categoryId);
      console.log(res)
      setData(res?.data?.data?.paginatedData);
      setTotalPages(res?.data?.data?.numberOfPages);
      const categoriesRes = await getCategoriesName();
      setCategories(categoriesRes?.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  
    getCourses();
  }, [currentPage, itemsPerPage, categoryId]);

  useEffect(() => {
    if (data?.length > 0) {
      const fuse = new Fuse(data, { keys: ['name', 'description', 'price'] });
      const results = fuse.search(query);
      let filtered = query ? results.map(result => result.item) : data;
      setFilteredData(filtered);
    }
  }, [query, data]);



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
            style={{
              maxHeight: '150px',
              overflowY: 'auto',
            }}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">كل الفئات</option>
            {categories.length === 0 ? (
              <option disabled>لا توجد فئات حالياً</option>
            ) : (
              categories.map((cat, index) => (
                <option key={index} value={cat?.id}>
                  {cat?.name}
                </option>
              ))
            )}
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
  );
}

export default Courses;
