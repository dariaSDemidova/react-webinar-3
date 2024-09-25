// import { memo } from 'react';
// import PropTypes from 'prop-types';
// import { cn as bem } from '@bem-react/classname';
// import './style.css';

// function Pagination({ totalPages, currentPage, onPageChange }) {
//     const cn = bem('Pagination');

//     return (
//         <div className={cn()}>
//         {[...Array(totalPages)].map((_, index) => (
//             <button
//             key={index}
//             className={currentPage === index + 1 ? 'active' : ''}
//             onClick={() => onPageChange(index + 1)}
//             >
//             {index + 1}
//             </button>
//         ))}
//         </div>
//     );
// }

// Pagination.propTypes = {
//     totalPages: PropTypes.number.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
// };

// export default memo(Pagination);


import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function getVisiblePages(totalPages, currentPage) {
    const pages = [];

    pages.push(1);

    if (currentPage === 1) {
        pages.push(2, 3);
        if (totalPages > 4) {
        pages.push('...');
        }
    } else if (currentPage === totalPages) {
        if (totalPages > 3) {
        pages.push('...');
        }
        pages.push(totalPages - 2, totalPages - 1);
    } else {
        if (currentPage > 3) {
        pages.push('...');
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
        }

        if (currentPage < totalPages - 2) {
        pages.push('...');
        }
    }

    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
}

function Pagination({ totalPages, currentPage, onPageChange }) {
    const pages = getVisiblePages(totalPages, currentPage);

    return (
        <div className="pagination">
        {pages.map((page, index) => (
            typeof page === "number" ? (
            <button
                key={index}
                className={currentPage === page ? "active" : ""}
                onClick={() => onPageChange(page)}
            >
                {page}
            </button>
            ) : (
            <span key={index} className="pagination-dots">...</span>
            )
        ))}
        </div>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);


