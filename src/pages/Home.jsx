import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Welcome to My Shopping List App
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Easily manage your shopping lists and keep track of your items.
      </p>
      <div className="flex space-x-4">
        <a
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add New List
        </a>
        <a
          href="all"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          View All Lists
        </a>
      </div>
    </div>
  );
};

export default Home;
