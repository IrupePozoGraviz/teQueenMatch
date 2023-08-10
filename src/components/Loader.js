// components/Loader.js
import React from 'react';
import { useSelector } from 'react-redux';
import './css/Loader.css';

const Loader = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) {
    return null; // Render nothing if not loading
  }

  return (
    <div className="loader">
      <img src="./../assets/loading.svg" alt="Loading..." />
    </div>
  );
};

export default Loader;
