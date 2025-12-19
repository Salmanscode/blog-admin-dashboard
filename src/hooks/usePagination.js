import { useState, useEffect } from 'react';

// Custom hook for persistent pagination (Quick Logic Task)
export const usePagination = (totalItems, itemsPerPageDefault = 5) => {
    // Get initial values from localStorage
    const getStoredPage = () => {
        const stored = localStorage.getItem('blog_admin_currentPage');
        return stored ? parseInt(stored, 10) : 1;
    };

    const getStoredItemsPerPage = () => {
        const stored = localStorage.getItem('blog_admin_itemsPerPage');
        return stored ? parseInt(stored, 10) : itemsPerPageDefault;
    };

    const [currentPage, setCurrentPage] = useState(() => {
        const page = getStoredPage();
        return isNaN(page) || page < 1 ? 1 : page;
    });
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const items = getStoredItemsPerPage();
        return isNaN(items) || items < 1 ? itemsPerPageDefault : items;
    });

    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Persist to localStorage whenever values change
    useEffect(() => {
        localStorage.setItem('blog_admin_currentPage', currentPage.toString());
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('blog_admin_itemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    // Reset to page 1 if current page exceeds total pages
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const changeItemsPerPage = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Calculate start and end indices for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        changeItemsPerPage,
        startIndex,
        endIndex
    };
};
