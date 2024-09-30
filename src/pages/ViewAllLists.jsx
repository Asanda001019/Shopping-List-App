import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faLaptop, faTshirt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, deleteList, updateList } from '../features/listSlice'; 

const categoryIcons = {
  groceries: faShoppingCart,
  electronics: faLaptop,
  clothing: faTshirt,
};

const ViewAllList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.lists.lists); 
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchLists()); 
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteList(id)); 
  };

  const openEditModal = (list) => {
    setEditItem({ ...list }); 
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setEditItem(null);
    setModalOpen(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editItem) return;

    
    dispatch(updateList(editItem));
    closeEditModal();
  };

  const filteredItems = items.filter((item) =>
    item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!items.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Items</h2>
      <input
        type="text"
        placeholder="Search items..."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((list) => (
          <div key={list.id} className="shadow-lg rounded-lg p-4 bg-white">
            <h3 className="font-bold text-lg flex items-center">
              <FontAwesomeIcon icon={categoryIcons[list.category]} className="mr-2" />
              Category: {list.category.charAt(0).toUpperCase() + list.category.slice(1)}
            </h3>
            <p>Optional Note: {list.optionalNote}</p>

            {list.items && list.items.map((item) => (
              <div key={item.id} className="mt-2">
                <p>Item Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}

            <button
              onClick={() => openEditModal(list)}
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(list.id)}
              className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {modalOpen && editItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl mb-4">Edit Item</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block">Item Name:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block">Quantity:</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={editItem.quantity}
                  onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block">Category:</label>
                <select
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="groceries">Groceries</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block">Optional Note:</label>
                <textarea
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={editItem.optionalNote}
                  onChange={(e) => setEditItem({ ...editItem, optionalNote: e.target.value })}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllList;
