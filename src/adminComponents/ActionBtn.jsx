import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default function ActionBtn({ title = "حذف", onClick, btnClass = "btn-outline-danger ", icon = <FaTrash size={15} /> }) {
  return (
    <button
      className={`btn ${btnClass} rounded-4 w-100`}
      onClick={onClick}
    >
      {title}
      {icon}
    </button>
  );
}
