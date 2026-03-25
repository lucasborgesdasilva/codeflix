import { Results } from "../../types/category";
import { Genre, GenreParams, GenrePayload } from "../../types/genres";
import { apiSlice } from "../api/api-slice";

const endpointUrl = "/genres";

export const initialState = {
    id: "",
    name: "",
    isActive: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
    categories: [],
    description: "",
    pivot: { genre_id: "", category_id: "" },
}

function parseQueryParams(params: GenreParams) {
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

function createGenreMutation(genre: GenrePayload) {
  return {
    url: endpointUrl,
    method: "POST",
    body: genre,
  };
}

function getCategories() {
  return `categories?all=true`;
}

export const genreSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: getCategories,
    }),
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ["Genres"],
    })
  }),
});

export const { useCreateGenreMutation, useGetCategoriesQuery } = genreSlice;