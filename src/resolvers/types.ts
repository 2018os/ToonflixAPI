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

export interface Pagination {
  first: number;
  offset: number;
}

export interface WebtoonsArgument {
  page: Pagination;
  webtoon: Webtoon[];
}
