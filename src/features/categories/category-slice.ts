import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Category, Result, Results } from "../../types/category";
import { apiSlice } from "../api/api-slice";

export interface ICategory {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: () => `${endpointUrl}`,
      providesTags: ["Categories"]
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"]
    })
  })
})

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

//O Redux trabalha com um cara que se chama IME, ele faz com que nosso state fique imutável, parece que mudamos o state
//Mas por de baixo dos panos ele cria uma cópia do state pra fazer as mutações.
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(category => category.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(category => category.id === action.payload.id);
      state.splice(index, 1);
    }
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
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation
} = categoriesApiSlice