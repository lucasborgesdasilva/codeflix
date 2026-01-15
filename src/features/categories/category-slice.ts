import { createSlice } from "@reduxjs/toolkit";

interface ICategory {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const category: ICategory = {
  "id": "bc4d8830-9652-4475-adfd-148e73520b51",
  "name": "Cornsilk",
  "description": "Voluptatibus dolor reprehenderit qui commodi est fugiat.",
  "is_active": true,
  "deleted_at": null,
  "created_at": "2026-01-15T01:45:33+0000",
  "updated_at": "2026-01-15T01:45:33+0000"
}

export const initialState = [
  category,
  { ...category, id: "bc4d8830-9652-4475-adfd-148e73520b51", name: "Peach" },
  { ...category, id: "bc5d8830-9652-4475-adfd-148e73520b51", name: "Apple" },
  { ...category, id: "bc6d8830-9652-4475-adfd-148e73520b51", name: "Banana" },
]

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) { },
    updateCategory(state, action) { },
    deleteCategory(state, action) { }
  }
})

export default categoriesSlice.reducer;