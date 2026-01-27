import { CastMember, CastMemberParams, Result, Results } from "../../types/cast-members";
import { apiSlice } from "../api/api-slice";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: null
};

function parseQueryParams(params: CastMemberParams) {
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
  if (params.type) {
    query.append("type", params.type.toString());
  }

  return query.toString();
}

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params;

  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type
  })}`
}

function getCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET"
  };
}

function deleteCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE"
  };
}

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: "POST",
    body: castMember
  };
}

function updateCastMember(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    body: castMember
  };
}

const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"] //Essa tag será associada aos dados em cache retornados por essa consulta.
    }),
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"]
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"] //Quando uma mutação ocorre, os dados em cache associados a essa tag serão invalidados.
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"]
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"]
    })
  })
});

export const {
  useGetCastMemberQuery,
  useGetCastMembersQuery,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation,
  useCreateCastMemberMutation,
} = castMembersApiSlice;

