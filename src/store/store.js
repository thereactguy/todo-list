import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../reducers/todos';

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
}); 