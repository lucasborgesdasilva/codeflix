import { Category } from "./category";

export interface Genre {
    data:  Genre[];
    links: Links;
    meta:  Meta;
}

export interface Genre {
  id:           string;
  name:         string;
  isActive:     boolean;
  deletedAt:    null;
  createdAt:    string;
  updatedAt:    string;
  categories?:  Category[];
  description?: null | string;
  pivot?:       Pivot;
}

export interface Pivot {
  genreID:    string;
  categoryID: string;
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