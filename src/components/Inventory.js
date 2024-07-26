import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
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
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Page</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Item..."
        className="border px-2 py-1 mb-4 w-full max-w-md"
      />
      <table className="min-w-full divide-y divide-gray-200 mb-4 max-w-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredItems.length === 0 && (
        <p className="text-red-500">No items found</p>
      )}
    </div>
  );
};

export default Inventory;
