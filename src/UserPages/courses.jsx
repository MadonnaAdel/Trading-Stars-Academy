import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetCourses } from '../Services/userApiService';

function Courses() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // تغيير العدد ليكون 4 كروت لكل صفحة

  useEffect(() => {
    setData([
      { id: 1, title: "Ultimate AWS Certified Cloud Practitioner CLF-C02", price: 300, instructor: "Stephane Maarek" },
      { id: 2, title: "React for Beginners", price: 200, instructor: "John Doe" },
      { id: 3, title: "Advanced JavaScript Concepts", price: 350, instructor: "Jane Smith" },
      { id: 4, title: "Full Stack Development with MERN", price: 500, instructor: "Michael Brown" },
      { id: 5, title: "Python for Data Science", price: 250, instructor: "Emma White" },
      { id: 6, title: "Introduction to Machine Learning", price: 400, instructor: "David Lee" },
      { id: 7, title: "HTML & CSS: From Zero to Hero", price: 150, instructor: "Sarah Johnson" },
      { id: 8, title: "Docker and Kubernetes for DevOps", price: 450, instructor: "Chris Green" },
      { id: 9, title: "Mastering SQL Databases", price: 320, instructor: "Olivia Taylor" },
      { id: 10, title: "React Native for Mobile Development", price: 380, instructor: "Liam Williams" },
      { id: 11, title: "Android App Development", price: 300, instructor: "Lucas Harris" },
      { id: 12, title: "Data Analysis with Pandas", price: 270, instructor: "Mia Clark" }
    ]);
    getCourses()
    setFilteredData([
      { id: 1, title: "Ultimate AWS Certified Cloud Practitioner CLF-C02", price: 300, instructor: "Stephane Maarek" },
      { id: 2, title: "React for Beginners", price: 200, instructor: "John Doe" },
      { id: 3, title: "Advanced JavaScript Concepts", price: 350, instructor: "Jane Smith" },
      { id: 4, title: "Full Stack Development with MERN", price: 500, instructor: "Michael Brown" },
      { id: 5, title: "Python for Data Science", price: 250, instructor: "Emma White" },
      { id: 6, title: "Introduction to Machine Learning", price: 400, instructor: "David Lee" },
      { id: 7, title: "HTML & CSS: From Zero to Hero", price: 150, instructor: "Sarah Johnson" },
      { id: 8, title: "Docker and Kubernetes for DevOps", price: 450, instructor: "Chris Green" },
      { id: 9, title: "Mastering SQL Databases", price: 320, instructor: "Olivia Taylor" },
      { id: 10, title: "React Native for Mobile Development", price: 380, instructor: "Liam Williams" },
      { id: 11, title: "Android App Development", price: 300, instructor: "Lucas Harris" },
      { id: 12, title: "Data Analysis with Pandas", price: 270, instructor: "Mia Clark" }
    ]);
  }, []);

  const getCourses = async () => {
    try {
      const res = GetCourses();
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }
  const handleSearchFilter = (query) => {
    const filtered = data.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };
  const handlePageChangeFilter = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = () => {
    if (query === "") {
      setFilteredData(data);
    } else {
      handleSearchFilter(query);
    }
  };

  return (

    <section className='my-5 d-flex justify-content-center'>
      <div className="container">
        <div className="searcBox mb-3 d-flex justify-content-center align-items-center w-75" style={{ margin: '150px auto' }}>
          <input
            type="text"
            className="form-control"
            placeholder="ابحث هنا..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary me-2" onClick={handleSearch}>
            بحث
          </button>
        </div>

        <div className="result mt-5">
          {filteredData.length > 0 ? (
            <div className="row">
              {currentItems.map((course) => (
                <div key={course.id} className="col-12 col-md-6 col-lg-3 mb-4">
                  <div className="card border border-1 border-primary-subtle overflow-hidden">
                    <img src="/Untitled design.png" className="card-img-top" alt="Course Image" />
                    <div className="card-body bg-body-secondary">
                      <h5 className="card-title text-truncate">{course.title}</h5>
                      <p className="card-text text-muted">{course.instructor}</p>
                      <div className="mb-3">
                        <span className="fw-bold">LE {course.price}</span>
                      </div>
                      <div className="d-flex align-content-center">
                        <button className="btn btn-primary btn-sm">اشترك</button>
                        <Link to={`/course-details/${course.id}`}>
                          <button className="btn btn-outline-primary btn-sm me-3">عرض التفاصيل</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            query && <p>لا توجد دورات مطابقة للبحث</p>
          )}
        </div>

        <nav aria-label="Page navigation example ">
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChangeFilter(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChangeFilter(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChangeFilter(currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Courses;
