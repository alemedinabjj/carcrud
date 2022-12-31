export interface Results {
  map(arg0: (car: any) => { id: any; name: any; description: any; is_active: any; createdAt: any; }): readonly import("@mui/x-data-grid").GridValidRowModel[];
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  data: Category;
  meta: Meta;
  links: Links;
}

export interface Category {
  id: string;
  name: string;
  deleted_at?: string;
  is_active?: boolean;
  created_at: string;
  updated_at?: string;
  description: null | string;
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
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

