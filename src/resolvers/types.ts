enum Platform {
  NAVER = 'NAVER',
  DAUM = 'DAUM'
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
  source: String;
  // authors: [Author]
  // genres: [Genre!]
}

export interface pagination {
  first: number;
  offset: number;
}

export interface WebtoonsArgument {
  page: pagination;
  webtoon: [Webtoon];
}
