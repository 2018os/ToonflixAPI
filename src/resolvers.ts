const dummyWebtoons = [
  {
    id: 'webtoon-1',
    title: 'webtoon1',
    description: 'desc',
    platform: 'NAVER',
    isFinish: true,
    isAdult: false,
    isPay: false,
    thumbnail: 'http:www.naver.com',
    source: 'http:www.naver.com',
    authors: [
      {
        id: 'author-1',
        name: 'author1'
      },
      {
        id: 'author-2',
        name: 'author2'
      }
    ]
  },
  {
    id: 'webtoon-2',
    title: 'webtoon2',
    description: 'desc2',
    platform: 'DAUM',
    isFinish: true,
    isAdult: false,
    isPay: false,
    thumbnail: 'http:www.daum.com',
    source: 'http:www.daum.com',
    authors: [
      {
        id: 'author-1',
        name: 'author1'
      },
      {
        id: 'author-2',
        name: 'author2'
      }
    ]
  }
];

const dummyAuthors = [
  {
    id: 'author-1',
    name: 'author1'
  },
  {
    id: 'author-2',
    name: 'author2'
  }
];

const resolvers = {
  Query: {
    webtoons: () => dummyWebtoons,
    authors: () => dummyAuthors
  }
};

export default resolvers;
