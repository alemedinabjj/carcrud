import { RootState } from './../../app/store';
import { createSlice } from "@reduxjs/toolkit"

interface Category {
  id: string
  name: string
  description: string | null
  is_active: boolean
  deleted_at: string | null
  created_at: string
  updated_at: string
}

const category: Category = {
  id: '1',
  name: 'Category 1',
  description: 'Category 1 description',
  is_active: true,
  deleted_at: null,
  created_at: '2021-01-01 00:00:00',
  updated_at: '2021-01-01 00:00:00',
}


export const initialState = [
  category,
  {...category, id: '2', name: 'Category 2', description: 'Category 2 description'},
  {...category, id: '3', name: 'Category 3', description: 'Category 3 description'},
  {...category, id: '4', name: 'Category 4', description: 'Category 4 description'}
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
  }
})

// Selectors

export const selectCategories = (state: RootState) => state.categories

//select category by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find(category => category.id === id)
  return category || {
    id: '',
    name: '',
    description: '',
    is_active: false,
    deleted_at: null,
    created_at: '',
    updated_at: ''
  }
}

export default categoriesSlice.reducer;