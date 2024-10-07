import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, updateList, deleteList } from '../features/listSlice';

const ListDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector((state) => state.lists.lists.find((item) => item.id === id));
  const [editList, setEditList] = useState(list);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (!list) dispatch(fetchLists());
    else setEditList(list);
  }, [dispatch, list]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateList(editList));
    navigate('/all');
  };

  const handleDelete = () => {
    dispatch(deleteList(id));
    navigate('/all');
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = { name: newItemName, quantity: newItemQuantity };
    const updatedItems = [...editList.items, newItem];
    setEditList({ ...editList, items: updatedItems });
    setNewItemName('');
    setNewItemQuantity('');
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
  };

  const handleSaveItem = (index) => {
    const updatedItems = [...editList.items];
    updatedItems[index] = { ...updatedItems[index] }; // Clone item
    setEditList({ ...editList, items: updatedItems });
    setEditingIndex(null);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = editList.items.filter((_, i) => i !== index);
    setEditList({ ...editList, items: updatedItems });
  };

  if (!editList) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">List Details</h2>

      <div className="mb-4">
        <label className="block font-semibold">Category:</label>
        <input
          type="text"
          value={editList.category}
          onChange={(e) => setEditList({ ...editList, category: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Add New Item Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-2">Add New Item</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Quantity"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      <form onSubmit={handleUpdate}>
        <h3 className="text-lg font-bold mb-2">Items:</h3>
        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Item Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editList.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const updatedItems = [...editList.items];
                        updatedItems[index] = { ...updatedItems[index], name: e.target.value };
                        setEditList({ ...editList, items: updatedItems });
                      }}
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const updatedItems = [...editList.items];
                        updatedItems[index] = { ...updatedItems[index], quantity: e.target.value };
                        setEditList({ ...editList, items: updatedItems });
                      }}
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingIndex === index ? (
                    <button
                      type="button"
                      onClick={() => handleSaveItem(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleEditItem(index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete List
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListDetail;
