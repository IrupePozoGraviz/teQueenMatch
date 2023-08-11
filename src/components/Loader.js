// components/Loader.js
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) {
    return null; // Render nothing if not loading
  }

  return (
    <div className="loader">
      <img src="/assets/loading.svg" alt="loader" />
    </div>
  );
};

export default Loader;
