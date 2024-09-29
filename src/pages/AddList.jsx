import React, { useState } from 'react';

const AddList = () => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [note, setNote] = useState('');

  const handleAddItem = () => {
    if (itemName.trim() === '' || quantity <= 0) {
      alert('Please enter a valid item name and quantity');
      return;
    }

    const newItem = {
      id: Date.now(), // Unique ID based on timestamp
      name: itemName,
      quantity: quantity,
      category: category,
      note: note,
    };

    setItems([...items, newItem]);
    setItemName(''); // Clear item name
    setQuantity(''); // Clear quantity
    setCategory('Groceries'); // Reset category
    setNote(''); // Clear note
  };

  const handleSubmitList = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }), // Send items to json-server
    });

    if (response.ok) {
      alert('List submitted successfully!');
      setItems([]); // Clear the items after submission
    } else {
      alert('Failed to submit the list.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Items to Your List</h2>
      {items.map((item) => (
        <div key={item.id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h3 className="font-semibold">{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Category: {item.category}</p>
          {item.note && <p>Note: {item.note}</p>}
        </div>
      ))}

      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-2">Add New Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
          required
        />
        <div className="flex justify-between mb-2">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded p-2 w-full mr-2"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="Groceries">Groceries</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        <textarea
          placeholder="Additional Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        ></textarea>
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white font-bold py-2 rounded w-full"
        >
          Add Item
        </button>
      </div>

      <button
        onClick={handleSubmitList}
        className="bg-green-500 text-white font-bold py-2 rounded w-full"
      >
        Submit List
      </button>
    </div>
  );
};

export default AddList;
