export interface Results {
  data: Result[];
  links: Links;
  meta: Meta;
}

export interface Result {
  id: string;
  name: string;
  type: number;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}

export interface Links {
  prev: null;
  last: string;
  next: string;
  first: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  perPage: number;
  lastPage: number;
  currentPage: number;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
