import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddList = () => {
  const [items, setItems] = useState([{ name: '', quantity: '' }]);
  const [category, setCategory] = useState('');
  const [optionalNote, setOptionalNote] = useState(''); // State for optional note
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle change for each item (name, quantity)
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add new item row
  const addItem = () => {
    setItems([...items, { name: '', quantity: '' }]);
  };

  // Validate form before submission
  const validateForm = () => {
    if (!category) {
      setError('Category is required.');
      return false;
    }
    for (const item of items) {
      if (!item.name || !item.quantity) {
        setError('All item fields are required.');
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Perform validation

    setLoading(true);
    setError(''); // Reset error state

    const listData = {
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
      })),
      category,
      optionalNote, // Include optional note in submission
    };

    try {
      const response = await fetch('http://localhost:5000/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData), // Send listData as payload
      });

      if (response.ok) {
        // Reset form
        setItems([{ name: '', quantity: '' }]);
        setCategory('');
        setOptionalNote(''); // Reset optional note
        navigate('/all'); // Redirect after successful submission
      } else {
        setError('Error submitting list. Please try again.');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Item Form</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}

      {items.map((item, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">Item Name:</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            placeholder="Item Name"
            required
          />

          <label className="block text-gray-700 mt-2">Quantity:</label>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
            required
          />
        </div>
      ))}

      <button type="button" className="text-blue-500 mb-4" onClick={addItem}>Add Item</button>

      <div className="mb-4">
        <label className="block text-gray-700">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select category</option>
          <option value="groceries">Groceries</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Optional Note:</label>
        <textarea
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={optionalNote}
          onChange={(e) => setOptionalNote(e.target.value)}
          placeholder="Optional Note"
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Items'}
      </button>
    </form>
  );
};

export default AddList;
