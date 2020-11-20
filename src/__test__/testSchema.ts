import { gql } from 'apollo-server-express';

export const WEBTOON_FRAGMENT = gql`
  fragment Webtoon on Webtoon {
    id
    title
    description
    genres {
      name
      code
    }
    platform
    isPay
    isAdult
    isFinish
  }
`;

export const SEARCH_WEBTOONS_WITH_KEYWORD = gql`
  query($keyword: String) {
    search(keyword: $keyword, webtoonPaging: { first: 10 }) {
      webtoonResult {
        counts
        pageInfo {
          startCursor
        }
        edges {
          node {
            ...Webtoon
          }
        }
      }
    }
  }
  ${WEBTOON_FRAGMENT}
`;

export const SEARCH_WEBTOONS_WITH_FILTERING = gql`
  query($where: SearchFiltering) {
    search(where: $where, webtoonPaging: { first: 10 }) {
      webtoonResult {
        edges {
          node {
            ...Webtoon
          }
        }
      }
    }
  }
  ${WEBTOON_FRAGMENT}
`;

export const SEARCH_WEBTOONS_WITH_GENRES = gql`
  query($where: SearchFiltering) {
    search(where: $where, webtoonPaging: { first: 10 }) {
      webtoonResult {
        edges {
          node {
            ...Webtoon
          }
        }
      }
    }
  }
  ${WEBTOON_FRAGMENT}
`;

export const SEARCH_WEBTOONS_WITH_PLATFORM = gql`
  query($where: SearchFiltering) {
    search(where: $where, webtoonPaging: { first: 10 }) {
      webtoonResult {
        edges {
          node {
            ...Webtoon
          }
        }
      }
    }
  }
  ${WEBTOON_FRAGMENT}
`;