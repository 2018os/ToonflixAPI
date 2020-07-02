enum Platform {
  Naver = 'NAVER',
  Daum = 'DAUM'
}

export interface Webtoon {
  id: String;
  title: String;
  description: String;
  platform: Platform;
  isFinish: Boolean;
  isAdult: Boolean;
  isPay: Boolean;
  thumbnail: String;
  url: String;
}

interface Pagination {
  first: number;
  take: number;
}

interface Filter {
  title: string;
}

interface Input {
  pagination: Pagination;
  filter: Filter;
}

export interface WebtoonsArgument {
  input: Input;
}
