import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '../components/TodoList/todosSlice'
import filtersReducer from '../components/Filters/filterSlice'
import categoriesReducer from '../components/Category/categoriesSlice'

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
    categories: categoriesReducer
  }
})

export default store