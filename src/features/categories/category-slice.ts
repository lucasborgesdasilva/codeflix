import { Category, CategoryParams, Result, Results } from "../../types/category";
import { apiSlice } from "../api/api-slice";

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }
  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }
  if (params.search) {
    query.append("search", params.search);
  }
  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category
  }
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  }
}

function getCategoryQuery({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"]
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategoryQuery,
      providesTags: ["Categories"]
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, { id: string }>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation
} = categoriesApiSlice