import React, {useState} from 'react';
import styles from '../styles/Pagination.module.scss';

interface IPagination {
    total: number;
    currentPage?: number;
    pageLimit?: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({
                                               total,
                                               currentPage = 1,
                                               pageLimit = 6,
                                               onPageChange,
                                           }) => {
    const [activePage, setActivePage] = useState(currentPage);
    const totalPages = Math.ceil(total / pageLimit);

    const handlePageChange = (page: number) => {
        setActivePage(page);
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, activePage - 2);
        const endPage = Math.min(totalPages, activePage + 2);

        // Prev button
        pageNumbers.push(
            <li
                key="prev"
                className={`${styles.pageList} ${styles.prev} ${activePage > 1 ? '' : styles.disabled}`}
                onClick={() => activePage > 1 && handlePageChange(activePage - 1)}
            >
                &lt;
            </li>
        );

        // First page
        if (startPage > 1) {
            pageNumbers.push(
                <li
                    key={1}
                    className={`${styles.pageList} ${activePage === 1 ? styles.disabled : ''}`}
                    onClick={() => activePage !== 1 && handlePageChange(1)}
                >
                    1
                </li>
            );

            if (startPage > 2) {
                pageNumbers.push(<span key="start-ellipsis" className={styles.ellipsis}>...</span>);
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={`${styles.pageList} ${i === activePage ? styles.active : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </li>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span key="end-ellipsis" className={styles.ellipsis}>...</span>);
            }

            pageNumbers.push(
                <li
                    key={totalPages}
                    className={`${styles.pageList} ${activePage === totalPages ? styles.disabled : ''}`}
                    onClick={() => activePage !== totalPages && handlePageChange(totalPages)}
                >
                    {totalPages}
                </li>
            );
        }

        // Next button
        pageNumbers.push(
            <li
                key="next"
                className={`${styles.pageList} ${styles.next} ${activePage < totalPages ? '' : styles.disabled}`}
                onClick={() => activePage < totalPages && handlePageChange(activePage + 1)}
            >
                &gt;
            </li>
        );

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            {renderPageNumbers()}
        </div>
    );
};

export default Pagination;
