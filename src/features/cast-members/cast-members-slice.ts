import { CastMember, CastMemberParams } from "../../types/cast-members";
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
  return null;
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({})
});

export { };

