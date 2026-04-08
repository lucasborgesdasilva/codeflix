import { Category } from "./category";

export interface Results {
    data:  Genre[];
    links: Links;
    meta:  Meta;
}

export interface Result {
    data:  Genre;
    links: Links;
    meta:  Meta;
}

export interface Genre {
  id:           string;
  name:         string;
  isActive:     boolean;
  deleted_at:    null;
  created_at:    string;
  updated_at:    string;
  categories?:  Category[];
  description?: null | string;
  pivot?:       Pivot;
}

export interface Pivot {
  genre_id:    string;
  category_id: string;
}

export interface Links {
  first: string;
  last:  string;
  prev:  null;
  next:  string;
}

export interface Meta {
  currentPage?: number;
  from?: number;
  lastPage?: number;
  path?: string;
  perPage?: number;
  to?: number;
  total?: number;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface GenrePayload {
  id: string
  name: string;
  categories_id?: string[];
}