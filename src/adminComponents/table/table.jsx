import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr >
            {columns.map((col, index) => (
              <th key={index} scope="col" className='text-nowrap'>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.type === 'image' ? (
                      <img
                        src={row[col.field]}
                        alt={col.alt || 'Image'}
                        style={{ maxWidth: '50px', height: 'auto' }}
                      />
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
