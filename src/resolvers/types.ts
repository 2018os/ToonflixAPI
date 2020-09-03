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

export interface FieldArgument {
  page: Pagination;
}

export interface Author {
  id: string;
  name: string;
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
  authors: Author[];
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

interface CollectionInput {
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

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export interface Node {
  id: string;
}

export interface RandomWebtoonsArgument {
  take: number;
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
  input: CollectionInput;
}

export interface QueryDetailArgument {
  id: string;
}

export interface SearchArgument {
  keyword: string;
  where: SearchFiltering;
}

export interface SignupArgument {
  input: SignupInput;
}

export interface LoginArgument {
  input: LoginInput;
}

export interface ConnectionTypeRootArgument {
  delegate: any; // TODO: Change type any
  data: Node[];
}
export interface FieldConnectionInterface {
  data: Node[];
  edges: Node[];
  args: Pagination;
}
