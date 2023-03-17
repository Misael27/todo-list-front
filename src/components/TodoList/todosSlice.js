import {
	createSlice,
	createSelector,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit'

import { StatusFilters } from '../Filters/filterSlice'
import axios from "axios";

const client = axios.create({
	baseURL: "http://localhost:5202/api"
});

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
	status: 'idle',
})

// Thunk functions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const response = await client.get('/Task/all')
	return response.data
})

export const saveNewTodo = createAsyncThunk(
	'todos/saveNewTodo',
	async (todo) => {
		const response = await client.post('/Task', todo)
		return response.data
	}
)

export const updateTodo = createAsyncThunk(
	'todos/updateTodo',
	async (todo) => {
		const response = await client.put(`/Task/${todo.id}`, todo)
		return response.data
	}
)

export const changeStateTodo = createAsyncThunk('todos/changeStateTodo', async (id) => {
	const response = await client.patch(`/Task/${id}/state`)
	return response.data
})

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
	const response = await client.delete(`/Task/${id}`)
	return response.status === 200 ? id : 0
})

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		todoToggled(state, action) {
			const todoId = action.payload
			const todo = state.entities[todoId]
			todo.taskState.id = todo.taskState.id === 2 ? 1 : 2;
		},
		todoDeleted: todosAdapter.removeOne
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				todosAdapter.setAll(state, action.payload)
				state.status = 'idle'
			})
			.addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
			.addCase(changeStateTodo.fulfilled,(state, action) => {
				todosAdapter.setOne(state, action.payload)
			})
			.addCase(removeTodo.fulfilled,(state, action) => {
				todosAdapter.removeOne(state, action.payload)
			})
			.addCase(updateTodo.fulfilled,(state, action) => {
				todosAdapter.setOne(state, action.payload)
			})
	}
})

export const {
	allTodosCompleted,
	completedTodosCleared,
	todoAdded,
	todoColorSelected,
	todoDeleted,
	todoToggled,
} = todosSlice.actions

export default todosSlice.reducer

export const {
	selectAll: selectTodos,
	selectById: selectTodoById,
} = todosAdapter.getSelectors((state) => state.todos)

export const selectTodoIds = createSelector(
	// First, pass one or more "input selector" functions:
	selectTodos,
	// Then, an "output selector" that receives all the input results as arguments
	// and returns a final result value
	(todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
	// First input selector: all todos
	selectTodos,
	// Second input selector: all filter values
	(state) => state.filters,
	// Output selector: receives both values
	(todos, filters) => {
		const { status } = filters
		const showAllCompletions = status === StatusFilters.All
		if (showAllCompletions) {
			return todos
		}

		const completedStatus = status === StatusFilters.Completed
		// Return either active or completed todos based on filter
		return todos.filter((todo) => {
			const statusMatches =
				showAllCompletions || (completedStatus && !todo.isActive)
			return statusMatches
		})
	}
)

export const selectFilteredTodoIds = createSelector(
	// Pass our other memoized selector as an input
	selectFilteredTodos,
	// And derive data in the output selector
	(filteredTodos) => filteredTodos.map((todo) => todo.id)
)