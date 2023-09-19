import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const CUA_HANG_QUERY = gql`
  query {
    products(first: 10, where: { stockStatus: IN_STOCK }) {
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

export default CUA_HANG_QUERY;
