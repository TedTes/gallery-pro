import "./App.css";
import axios from "axios";
import React from "react";

function Pagination(props) {
  const currentPage = props.currentPage;
  const pageCount = props.pageCount;
  const navigate = props.navigate;

  const getPageNumbers = () => {
    if (props.pageCount < 4) {
      return [...Array(pageCount + 1).keys()].slice(1);
    } else if (currentPage <= 4) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage > pageCount - 4) {
      return [...Array(5).keys()].reverse().map((v) => pageCount - v);
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  return (
    <div className="pagination-btn">
      <button
        onClick={() => navigate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {currentPage > 4 && (
        <div>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => navigate(1)}
          >
            1
          </button>
          <span className="h4">...</span>
        </div>
      )}
      {getPageNumbers().map((num, index) => (
        <button onClick={() => navigate(num)} key={index}>
          {num}
        </button>
      ))}
      {currentPage <= pageCount - 4 && (
        <div>
          <span>...</span>
          <button onClick={() => navigate(pageCount)}>{pageCount}</button>
        </div>
      )}
      <button
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
