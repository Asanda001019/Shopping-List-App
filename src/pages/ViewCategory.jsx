// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchLists } from '../features/listSlice';

// const ViewCategory = () => {
//   const { category } = useParams();
//   const dispatch = useDispatch();
//   const lists = useSelector((state) => state.lists.lists);

//   useEffect(() => {
//     dispatch(fetchLists());
//   }, [dispatch]);

//   const filteredLists = lists.filter(list => list.category === category);

//   return (
//     <div>
//       <h1 className="text-2xl">Category: {category}</h1>
//       <ul>
//         {filteredLists.map((list) => (
//           <li key={list.id}>{list.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ViewCategory;
