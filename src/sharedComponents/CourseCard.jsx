import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfirmModal from './modal/comfirmModal';


const CourseCard = ({ course, role = 'User', onDelete }) => {
  const [showModal, setShowModal] = useState(false); 
  const handleDeleteConfirm = () => {
    onDelete(course?.id);
    setShowModal(false); 
  };

  return (
    <div className="card border bg-body-secondary border-1 border-primary-subtle overflow-hidden rounded-4">
      <div className="overflow-hidden m-2 rounded-4" style={{ maxHeight: '165px', minHeight: '160px' }}>
        <img
          src={course?.imageUrl}
          className="img-fluid w-100 h-100 object-fit-contain"
          alt="Course Image"
        />
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-content-center">
          <h4 className="card-title text-truncate">{course?.name}</h4>
          {
            role === "Admin" &&
            <button
              className="btn text-danger p-2 d-flex justify-content-center align-items-center"
              onClick={() => setShowModal(true)}  
            >
              <FaTrashAlt size="18" className="me-1" />
            </button>
          }
        </div>
        <p className="card-text text-muted text-truncate">{course?.description}</p>

        <div className="my-2 border border-top-1 border-primary-subtle"></div>

        <div className="d-flex justify-content-between my-2">
          <span>LE {course?.price}</span>
          <span>{course?.categoryName}</span>
        </div>
        {role === "Admin" &&
          <Link to={`/course-details/${course?.id}`}>
            <button className="btn btn-outline-primary btn-sm w-100 my-2">
              عرض التفاصيل
            </button>
          </Link>}
      </div>

   
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}  
        onConfirm={handleDeleteConfirm}  
        title="تأكيد الحذف"  
        message="هل أنت متأكد من أنك تريد حذف هذا الكورس؟" 
      />
    </div>
  );
};

export default CourseCard;
