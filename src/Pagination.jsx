import { useState, useEffect } from 'react';

const Pagination = (apiUrl, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}?_page=${currentPage}&_limit=${itemsPerPage}`);
        const totalCount = response.headers.get('X-Total-Count');
        const result = await response.json();
        setData(result);
        setTotalItems(Number(totalCount));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    data,
    loading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
};

export default Pagination;
