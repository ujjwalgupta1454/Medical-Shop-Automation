import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItemModal = ({ onClose, onSave }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items');
        const sortedItems = response.data.sort((a, b) => a.name.localeCompare(b.name)); // Sort items lexicographically
        setItems(sortedItems);
        setFilteredItems(sortedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredItems(items); // Reset filtered items if search query is empty
    } else {
      const filtered = items.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <div className="text-lg font-bold mb-4">Select Item</div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Item..."
          className="border px-2 py-1 mb-4 w-full"
        />
        <table className="min-w-full divide-y divide-gray-200 mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span className={item.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ? 'text-blue-500 font-bold' : ''}>
                    {item.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onSave(item)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredItems.length === 0 && (
          <p className="text-red-500">No items found</p>
        )}
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddItemModal;
