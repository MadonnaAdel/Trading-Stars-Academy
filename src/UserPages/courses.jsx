import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesName, GetCourses } from '../Services/userApiService';
import { ClipLoader } from 'react-spinners';
import Fuse from 'fuse.js';
import CourseCard from '../sharedComponents/CourseCard';
import Pagination from '../sharedComponents/Pagination';

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

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await GetCourses(currentPage, itemsPerPage, categoryId);
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
            {categories?.length === 0 ? (
              <option disabled>لا توجد فئات حالياً</option>
            ) : (
              categories?.map((cat, index) => (
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
              {filteredData?.map((course) => (
                <div key={course?.id} className="col-12 col-md-6 col-lg-3 mb-4">
                  <Link to={`/course-details/${course?.id}`} className="text-decoration-none">
                    <CourseCard course={course} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
       
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        
      </div>
    </section>
  );
}

export default Courses;
