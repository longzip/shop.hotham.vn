import { gql } from "@apollo/client";
const PRODUCTS_QUERY = gql`
  query GetProducts(
    $first: Int
    $after: String
    $where: RootQueryToProductUnionConnectionWhereArgs
  ) {
    products(first: $first, after: $after, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        productId: databaseId
        averageRating
        slug
        description
        image {
          id
          altText
          sourceUrl(size: WOOCOMMERCE_SINGLE)
        }
        name
        ... on SimpleProduct {
          price
          regularPrice
          id
        }
        ... on VariableProduct {
          price
          id
          regularPrice
        }
        ... on ExternalProduct {
          price
          id
          externalUrl
          regularPrice
        }
        ... on GroupProduct {
          id
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
                regularPrice
              }
            }
          }
        }
      }
    }
  }
`;
export default PRODUCTS_QUERY;
