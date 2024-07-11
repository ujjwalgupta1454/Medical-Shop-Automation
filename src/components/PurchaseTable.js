import React from 'react';

const PurchaseTable = ({ items, onChange, onDelete, onAddItem, onOpenModal }) => {

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const quantity = parseFloat(updatedItems[index].quantity) || 0;
    const rate = parseFloat(updatedItems[index].rate) || 0;

    if (field === 'quantity' || field === 'rate') {
      let amount = quantity * rate;
      amount = Math.round(amount * 100) / 100; // Round to 2 decimal places

      updatedItems[index].amount = amount.toFixed(2); // Ensure it's displayed with 2 decimal places
    }

    if (field === 'mrp') {
      const mrp = parseFloat(updatedItems[index].mrp) || 0;
      if (rate > mrp && mrp !== 0) {
        alert('MRP should be greater than or equal to the rate.');
        updatedItems[index].mrp = '';
      }
    }

    onChange(updatedItems);
  };
  const handleExpDateChange = (index, value) => {
  const updatedItems = [...items];
  updatedItems[index].expDate = value;
  onChange(updatedItems);
};


  const handleBlur = (index, field) => {
    const updatedItems = [...items];
    let value = parseFloat(updatedItems[index][field]) || 0;

    switch (field) {
      case 'rate':
        updatedItems[index][field] = value.toFixed(4);
        break;
      case 'quantity':
        updatedItems[index][field] = value.toFixed(0);
        break;
      case 'discount':
      case 'mrp':
        updatedItems[index][field] = value.toFixed(2);
        break;
      case 'expDate':
        const parts = value.split('/');
        const month = parseInt(parts[0]);
        const year = parseInt(parts[1]);
        if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 1900 || year > 2100) {
          alert('Please enter a valid expiry date in the format mm/yyyy and within the range 01/1900 to 12/2100.');
          updatedItems[index].expDate = '';
        } else {
          updatedItems[index].expDate = value;
        }
        break;
      default:
        break;
    }
    

    const quantity = parseFloat(updatedItems[index].quantity) || 0;
    const rate = parseFloat(updatedItems[index].rate) || 0;

    if (field === 'quantity' || field === 'rate') {
      let amount = quantity * rate;
      amount = Math.round(amount * 100) / 100; // Round to 2 decimal places

      updatedItems[index].amount = amount.toFixed(2); // Ensure it's displayed with 2 decimal places
    }

    onChange(updatedItems);
  };

  return (
    <div className="py-2 align-middle inline-block min-w-full">
      <div className="shadow overflow-hidden border border-black rounded-md">
        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-black">
          <thead className="bg-gray-50 border border-black">
            <tr className="border-b border-black">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Serial No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Batch No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Discount (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                GST (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                MRP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border-r border-black text-right">
                  {index + 1}
                </td>
                <td className="border-r border-black">
                  <input
                    type="text"
                    value={item.productName || '--Select Item--'}
                    onClick={() => onOpenModal(index)}
                    className="border-b border-gray-300 w-full px-2 py-1"
                    readOnly
                  />
                </td>
                <td className="border-r border-black">
                  <input
                    type="text"
                    value={item.batchNo}
                    onChange={(e) => handleInputChange(index, 'batchNo', e.target.value)}
                    className="border-b border-gray-300 w-full px-2 py-1"
                  />
                </td>
                <td className="border-r border-black">
  <input
    type="text"
    value={item.expDate ? item.expDate.substring(0, 2) : ''}
    onChange={(e) => handleExpDateChange(index, e.target.value)}
    className="border-b border-gray-300 w-12 px-2 py-1 text-right"
    placeholder="mm"
    maxLength="2"
  />
  <span>/</span>
  <input
    type="text"
    value={item.expDate ? item.expDate.substring(3) : ''}
    onChange={(e) => handleExpDateChange(index, e.target.value)}
    className="border-b border-gray-300 w-16 px-2 py-1 text-right"
    placeholder="yyyy"
    maxLength="4"
  />
</td>
<td className="border-r border-black">
  <input
    type="number"
    value={item.quantity}
    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
    onFocus={(e) => e.target.select()}
    onBlur={() => handleBlur(index, 'quantity')}
    className="border-b border-gray-300 w-full px-2 py-1 text-right"
    min="0"
  />
</td>
<td className="border-r border-black">
  <input
    type="number"
    value={item.rate}
    onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
    onFocus={(e) => e.target.select()}
    onBlur={() => handleBlur(index, 'rate')}
    className="border-b border-gray-300 w-full px-2 py-1 text-right"
    step="0.0001"
  />
</td>
<td className="border-r border-black">
  <input
    type="number"
    value={item.discount}
    onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
    onFocus={(e) => e.target.select()}
    onBlur={() => handleBlur(index, 'discount')}
    className="border-b border-gray-300 w-full px-2 py-1 text-right"
    step="0.01"
  />
</td>
<td className="border-r border-black">
  <select
    value={item.gst}
    onChange={(e) => handleInputChange(index, 'gst', e.target.value)}
    className="border-b border-gray-300 w-full px-2 py-1"
  >
    <option value="0">0%</option>
    <option value="5">5%</option>
    <option value="12">12%</option>
    <option value="18">18%</option>
    <option value="28">28%</option>
  </select>
</td>
<td className="border-r border-black">
  <input
    type="number"
    value={item.mrp}
    onChange={(e) => handleInputChange(index, 'mrp', e.target.value)}
    onFocus={(e) => e.target.select()}
    onBlur={() => handleBlur(index, 'mrp')}
    className="border-b border-gray-300 w-full px-2 py-1 text-right"
    step="0.01"
  />
</td>

                <td className="border-r border-black">
                  <input
                    type="number"
                    value={item.amount}
                    readOnly
                    className="border-b border-gray-300 w-full px-2 py-1 text-right"
                  />
                </td>
                <td className="border-r border-black">
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end px-4 py-2">
          <button
            onClick={onAddItem}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTable;
