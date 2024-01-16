/* eslint-disable no-unused-vars */
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './components/Pagination';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const totalPosts = response.data.length;
        setTotalPages(Math.ceil(totalPosts / 10)); // Assuming 10 items per page
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching total pages:', error.message);
      }
    };

    fetchPosts(currentPage);
    fetchTotalPages();
  }, [currentPage]);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-4xl font-bold text-center mb-4">Pagination with Cards</h1>

      <div className="flex flex-wrap justify-around">
        {posts.map((post) => (
          <div key={post.id} className="max-w-sm rounded overflow-hidden hover:shadow-2xl m-2">
            <img className="w-full" src={`https://source.unsplash.com/400x200/?nature,${post.id}`} alt={`Image ${post.id}`} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{post.title}</div>
      <p className="text-gray-700 text-base">{post.body}</p>
    </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default App;
