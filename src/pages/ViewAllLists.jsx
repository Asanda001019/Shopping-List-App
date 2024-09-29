import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../features/listSlice';

const ViewAllLists = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl">All Lists</h1>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>{list.name} - {list.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllLists;
