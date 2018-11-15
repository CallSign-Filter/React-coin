import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
    const { totalPages, page, handlePaginationClick } = props;
    return (
        <div className="Pagination">
            <button 
            className="Pagination-button"
            onClick={() => handlePaginationClick('back')}
            disabled={page <= 1}
            >
                &larr;
            </button>

            <span className="Pagination-info"><b>Page</b> {page} <b>of</b> {totalPages}</span>

            <button 
            className="Pagination-button" 
            onClick={() => handlePaginationClick('next')}  
            disabled={page >= totalPages}          
            >
                &rarr;
            </button>
        </div>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired
}

export default Pagination;