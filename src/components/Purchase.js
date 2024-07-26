import React, { useState, useEffect, useCallback } from 'react';
import PurchaseTable from './PurchaseTable';
import AddItemModal from './AddItemModal';

const Purchase = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [date, setDate] = useState('');
  const [billNo, setBillNo] = useState('');
  const [name, setName] = useState('');

  const [valueOfGoods, setValueOfGoods] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalGST, setTotalGST] = useState(0);
  const [invoiceValue, setInvoiceValue] = useState(0);

  const calculateTotals = useCallback(() => {
    let goodsValue = 0;
    let discountSum = 0;
    let gstSum = 0;

    items.forEach(item => {
      goodsValue += parseFloat(item.amount) || 0;
      discountSum += (parseFloat(item.amount) * parseFloat(item.discount) / 100) || 0;
      gstSum += (parseFloat(item.amount) * parseFloat(item.gst) / 100) || 0;
    });

    setValueOfGoods(goodsValue.toFixed(2));
    setTotalDiscount(discountSum.toFixed(2));
    setTotalGST(gstSum.toFixed(2));

    const invoiceValueCalc = Math.round(goodsValue + gstSum - discountSum);
    setInvoiceValue(invoiceValueCalc.toFixed(2));
  }, [items]);

  useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  const handleAddItem = () => {
    if (items.length === 0) {
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

  const handleSaveBill = () => {
    alert("Bill saved successfully!");
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4">
      <div className="text-lg font-bold mb-4">PURCHASE ENTRY</div>
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col">
            <label className="font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Bill No.</label>
            <input
              type="text"
              value={billNo}
              onChange={(e) => setBillNo(e.target.value)}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
        </div>
      </div>
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
      <div className="flex justify-end mt-4">
        <div className="w-1/2 p-4 border-t border-gray-300">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <div className="font-medium">Value of Goods</div>
              <div>{valueOfGoods}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Discount</div>
              <div>{totalDiscount}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">GST</div>
              <div>{totalGST}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Invoice Value</div>
              <div>{invoiceValue}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveBill}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Bill
        </button>
      </div>
    </div>
  );
};

export default Purchase;
