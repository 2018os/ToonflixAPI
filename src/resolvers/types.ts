enum Platform {
  Naver = 'NAVER',
  Daum = 'DAUM'
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

interface Filter {
  title: string;
}

interface Input {
  title: string;
  description: string;
  webtoons: string[];
}

export interface WebtoonsArgument {
  page: Pagination;
}

export interface CollectionsArgument {
  page: Pagination;
}

export interface CollectionInputArgument {
  input: Input;
}
