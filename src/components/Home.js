import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const handleLogout = () => {
    setShowExitConfirmation(true);
  };

  const handleExitConfirmation = (confirmed) => {
    setShowExitConfirmation(false);
    if (confirmed) {
      // Handle logout logic here (e.g., clearing tokens or user data)
      navigate('/signin');
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 w-48 flex flex-col justify-between items-center h-screen text-white">
        <div className="flex flex-col justify-start items-center mt-10">
          <Link to="/purchase" className="p-4 hover:bg-gray-700 w-full text-center">
            Purchase
          </Link>
          <Link to="/sales" className="p-4 hover:bg-gray-700 w-full text-center">
            Sales
          </Link>
          <Link to="/inventory" className="p-4 hover:bg-gray-700 w-full text-center">
            Inventory
          </Link>
          <Link to="/reports" className="p-4 hover:bg-gray-700 w-full text-center">
            Reports
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="p-4 hover:bg-gray-700 w-full text-center"
        >
          Exit
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4">Medical Store Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main content goes here */}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <p className="text-xl font-bold mb-4">Exit Confirmation</p>
            <p className="mb-4">Are you sure you want to exit?</p>
            <div className="flex justify-end">
              <button
                onClick={() => handleExitConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
              >
                No
              </button>
              <button
                onClick={() => handleExitConfirmation(true)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
