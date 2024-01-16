/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Pagination.js
import React, { useMemo } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationButtons = useMemo(() => {
    return (
      <ul className="flex space-x-2 mb-4">
        <li>
          <button
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1}>
            <button
              className={`px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    );
  }, [currentPage, totalPages, onPageChange]);

  return <nav className="inline-block mt-4">{paginationButtons}</nav>;
};

export default Pagination;
