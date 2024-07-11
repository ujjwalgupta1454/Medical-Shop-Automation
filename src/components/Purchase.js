import React, { useState } from 'react';
import PurchaseTable from './PurchaseTable';
import AddItemModal from './AddItemModal';

const Purchase = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddItem = () => {
    if (items.length === 0) {
      // If no items are present, add the first item row
      setItems([
        {
          productName: '--Select Item--',
          batchNo: '',
          quantity: 0,
          rate: 0.0000,
          discount: 0.00,
          gst: 0,
          mrp: 0.00,
          amount: 0.00
        }
      ]);
    } else {
      const lastItem = items[items.length - 1];
      if (lastItem.productName !== '--Select Item--' && lastItem.quantity > 0 && lastItem.rate > 0) {
        // If the last item is valid, add a new item row
        setItems(prevItems => [
          ...prevItems,
          {
            productName: '--Select Item--',
            batchNo: '',
            quantity: 0,
            rate: 0.0000,
            discount: 0.00,
            gst: 0,
            mrp: 0.00,
            amount: 0.00
          }
        ]);
      } else {
        alert('Please select a product name and ensure quantity and rate are non-zero.');
      }
    }
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (updatedItems) => {
    setItems(updatedItems);
  };

  const handleOpenModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  const handleSaveItem = (item) => {
    const updatedItems = [...items];
    updatedItems[currentIndex].productName = item.name;
    setItems(updatedItems);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4">
      <div className="text-lg font-bold mb-4">PURCHASE ENTRY</div>
      <PurchaseTable
        items={items}
        onChange={handleChange}
        onDelete={handleDelete}
        onAddItem={handleAddItem}
        onOpenModal={handleOpenModal}
      />
      {isModalOpen && (
        <AddItemModal
          onClose={handleCloseModal}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
};

export default Purchase;
