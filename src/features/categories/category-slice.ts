import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
  "id": "bc3d8830-9652-4475-adfd-148e73520b51",
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

//Selectors
//O RootState é um tipo que já vem criado na store, e com ele temos acesso a todos os nossos estados
//então quando criamos um Slice, adicionamos o Reducer dentro do store e a partir desse momento temos acesso aos estados.
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string | undefined) => {
  const category = state.categories.find(category => category.id === id);
  return (
    category || {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: null,
      created_at: "",
      updated_at: ""
    }
  );
}

export default categoriesSlice.reducer;