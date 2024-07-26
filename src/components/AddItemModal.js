import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItemModal = ({ onClose, onSave }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemStock, setNewItemStock] = useState('');

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

  const handleAddNewItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/items', { name: newItemName, stock: newItemStock });
      const updatedItems = [...items, response.data];
      const sortedItems = updatedItems.sort((a, b) => a.name.localeCompare(b.name));
      setItems(sortedItems);
      setFilteredItems(sortedItems);
      setIsAddingNewItem(false);
      setNewItemName('');
      setNewItemStock('');
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      const updatedItems = items.filter(item => item._id !== id);
      const sortedItems = updatedItems.sort((a, b) => a.name.localeCompare(b.name));
      setItems(sortedItems);
      setFilteredItems(sortedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingNewItem(false);
    setNewItemName('');
    setNewItemStock('');
  };

  const handleSaveItem = (item) => {
    onSave(item);
    onClose();
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
                Stock
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
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <button
                    onClick={() => handleSaveItem(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isAddingNewItem ? (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="New item name"
              className="border border-gray-300 px-2 py-1"
            />
            <input
              type="number"
              value={newItemStock}
              onChange={(e) => setNewItemStock(e.target.value)}
              placeholder="Stock"
              className="border border-gray-300 px-2 py-1"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddNewItem}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Item
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddingNewItem(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add New Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItemModal;
