import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit'

import axios from "axios";

const client = axios.create({
	baseURL: "http://localhost:5202/api"
});

const categoriesAdapter = createEntityAdapter()

const initialState = categoriesAdapter.getInitialState({
	status: 'idle',
})

// Thunk functions
export const fetchcategories = createAsyncThunk('categories/fetchcategories', async () => {

	const response = await client.get('/TaskCategory/all')
	return response.data
})

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchcategories.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchcategories.fulfilled, (state, action) => {

				categoriesAdapter.setAll(state, action.payload)
				state.status = 'idle'
			})
	}
})

export default categoriesSlice.reducer

export const {
	selectAll: selectCategories,
} = categoriesAdapter.getSelectors((state) => state.categories)