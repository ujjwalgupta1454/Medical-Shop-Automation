import React, { useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [view, setView] = useState(''); 
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBills = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/${type}`);
      const sortedBills = response.data.sort((a, b) => a.billNo - b.billNo);
      setBills(sortedBills);
      setFilteredBills(sortedBills);
    } catch (error) {
      console.error(`Error fetching ${type} bills:`, error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBills(bills);
    } else {
      const filtered = bills.filter(bill => bill.billNo.toLowerCase().includes(query.toLowerCase()));
      setFilteredBills(filtered);
    }
  };

  const handleViewChange = (type) => {
    setView(type);
    fetchBills(type);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Reports Page</h2>
      <div className="flex w-full justify-between mb-4">
        <button
          onClick={() => handleViewChange('sales')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sales
        </button>
        <button
          onClick={() => handleViewChange('purchase')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Purchase
        </button>
      </div>
      {view && (
        <div className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search ${view === 'sales' ? 'Sales' : 'Purchase'} Bill No...`}
            className="border px-2 py-1 mb-4 w-full"
          />
          <table className="min-w-full divide-y divide-gray-200 mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Party Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill, index) => (
                <tr key={bill._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.billNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.partyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.invoiceAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBills.length === 0 && (
            <p className="text-red-500">No bills found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
