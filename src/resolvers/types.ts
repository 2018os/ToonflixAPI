enum Platform {
  Naver = 'NAVER',
  Daum = 'DAUM'
}

export interface Webtoon {
  id: number;
  title: string;
  description: string;
  platform: Platform;
  isFinish: boolean;
  isAdult: boolean;
  isPay: boolean;
  thumbnail: string;
  url: string;
}

interface Pagination {
  first: number;
  take: number;
}

interface Filter {
  title: string;
}

interface Input {
  title: string;
  description: string;
  webtoons: number[];
}

export interface WebtoonsArgument {
  pagination: Pagination;
  filter: Filter;
}

export interface CollectionArgument {
  input: Input;
}
