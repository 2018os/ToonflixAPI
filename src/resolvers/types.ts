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

interface Pagination {
  first: number;
  take: number;
}

interface Filter {
  title: string;
}

export interface WebtoonsArgument {
  pagination: Pagination;
  filter: Filter;
}
