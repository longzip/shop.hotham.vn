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
          "cG9zdDoxMA=="
          "cG9zdDo5"
          "cG9zdDo3"
          "cG9zdDo1"
          "cG9zdDo2"
          "cG9zdDo0"
          "cG9zdDozNzcw"
          "cG9zdDozNzcz"
        ]
      }
      first: 1
    ) {
      nodes {
        id
        slug
      }
    }
  }
`;
