import React from 'react';
import backgroundImage from '../assets/shoppingListBg.jpg'; 

const Home = () => {
  return (
    <section
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,  
      //   backgroundSize: 'cover',                    
      //   backgroundRepeat: 'no-repeat',              
      //   height: '100vh',                            
      // }}
      className="flex justify-center items-center " 
    >
      <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 p-6 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Make Shopping Stress-Free and Organized
        </h1>
        <h3 className="text-lg text-gray-200 mb-6 text-center">
          Easily manage your shopping lists and keep track of your items.
        </h3>
        

        {/* Summary Card */}
        <div className="bg-blue-100 bg-opacity-90 rounded-lg shadow-md p-6 w-full max-w-lg text-center mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About This App
          </h2>
          <p className="text-gray-600">
            Our Shopping List App helps you organize and manage all your shopping lists effortlessly. 
            You can add items, update quantities, and categorize your lists to ensure you never miss an item. The Application
            is designed to be user-friendly and accessible on all devices. You can share your list with friends also.

          </p>
        </div>
        <div className="flex space-x-4 mb-8">
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
          >
            Go Ahead
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
