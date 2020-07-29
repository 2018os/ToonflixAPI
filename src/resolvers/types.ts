enum Platform {
  Naver = 'NAVER',
  Daum = 'DAUM'
}

enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

enum WebtoonOrderByField {
  Title = 'title'
}

enum CollectionOrderByField {
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export interface Webtoon {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  isFinish: boolean;
  isAdult: boolean;
  isPay: boolean;
  thumbnail: string;
  url: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  webtoons: Webtoon[];
  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  take: number;
  cursor: string;
}

interface Input {
  title: string;
  description: string;
  webtoons: string[];
}

interface CollectionOrdering {
  orderBy: OrderBy;
  field: CollectionOrderByField;
}

interface WebtoonOrdering {
  orderBy: OrderBy;
  field: WebtoonOrderByField;
}

interface SearchFiltering {
  isPay: boolean;
  isAdult: boolean;
  isFinish: boolean;
  platforms: Platform[];
  genres: string[];
}

export interface WebtoonsArgument {
  page: Pagination;
  ordering: WebtoonOrdering;
}

export interface CollectionsArgument {
  page: Pagination;
  ordering: CollectionOrdering;
}

export interface CollectionInputArgument {
  input: Input;
}

export interface QueryDetailArgument {
  id: string;
}

export interface SearchArgument {
  keyword: string;
  where: SearchFiltering;
}
