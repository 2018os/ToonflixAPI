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

export const SEARCH = gql`
  query {
    search {
      webtoonResult(first: 10) {
        count
        pageInfo {
          startCursor
        }
        edges {
          node {
            id
          }
        }
      }
      collectionResult(first: 10) {
        count
        pageInfo {
          startCursor
        }
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export const SEARCH_WEBTOONS_WITH_KEYWORD = gql`
  query($keyword: String) {
    search(keyword: $keyword) {
      webtoonResult(first: 10) {
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

export const SEARCH_WEBTOONS_WITH_WHERE = gql`
  query($where: SearchFiltering) {
    search(where: $where) {
      webtoonResult(first: 10) {
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

export const SEARCH_WEBTOONS_WITH_KEYWORD_AND_WHERE = gql`
  query($keyword: String, $where: SearchFiltering) {
    search(keyword: $keyword, where: $where) {
      webtoonResult(first: 10) {
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
