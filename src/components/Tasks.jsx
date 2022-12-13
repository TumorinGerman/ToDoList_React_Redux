// @ts-check
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// BEGIN (write your solution here)
import { fetchTasks, deleteTask } from '../slices/tasksSlice.js';
import { selectors } from '../slices/tasksSlice.js';
// END

const Tasks = () => {
  const dispatch = useDispatch();
  // BEGIN (write your solution here)
 // useEffect(() => {
 //    dispatch(fetchTasks());
 // }, []);
  const tasks = useSelector(selectors.selectAll);

  const handleRemoveTask = (id) => {
    dispatch(deleteTask(id));
  }
  // END

  return tasks && (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, name }) => (
          <li key={id} className="list-group-item d-flex">
            <span className="mr-auto">{name}</span>
            <button type="button" className="close" onClick={() => handleRemoveTask(id)}>
              <span>&times;</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
