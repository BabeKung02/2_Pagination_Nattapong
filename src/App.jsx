import React from 'react';
import './App.css';
import Pagination from './Pagination';

const App = () => {
  const { data, loading, currentPage, totalPages, nextPage, prevPage } = Pagination(
    'https://jsonplaceholder.typicode.com/posts',
    5
  );

  return (
    <div className="App">
      <h1>Pagination</h1>

      {loading && <p>Loading...</p>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
