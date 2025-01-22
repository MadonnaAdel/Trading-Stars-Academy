import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    
        totalPages > 1 &&
         ( <nav aria-label="Page navigation example">
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
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)}
            >
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
    </nav>)
    
  
  );
};

export default Pagination;
