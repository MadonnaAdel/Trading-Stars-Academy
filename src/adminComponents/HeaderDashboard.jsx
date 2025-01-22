import React from 'react';
import BackButton from './backBtn';

export default function HeaderDashboard({ title }) {
  return (
    <>  
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fs-2  pb-2">{title}</h3>
        <BackButton />
      </div>
      <div className="w-100 border-top border-primary my-4"></div>

    </>
  );
}
