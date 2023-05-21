import { gql } from "@apollo/client";

export const PAGE_BY_SLUG_QUERY = gql`
  query Page($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      slug
      title
      uri
      seo {
        fullHead
      }
      pageId: databaseId
      content
    }
  }
`;

export const PAGE_SLUGS = gql`
  query Pages {
    pages(
      where: {
        notIn: [
          "cG9zdDo0"
          "cG9zdDozNDY="
          "cG9zdDoxMA=="
          "cG9zdDozNTM="
          "cG9zdDo1NQ=="
          "cG9zdDo1"
        ]
      }
      first: 5000
    ) {
      nodes {
        id
        slug
      }
    }
  }
`;
