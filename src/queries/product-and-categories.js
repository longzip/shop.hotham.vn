import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`
  query {
    pageBy(uri: "/") {
      seo {
        fullHead
      }
    }
    heroCarousel: productCategories(where: { slug: "offers" }) {
      nodes {
        id
        children {
          nodes {
            id
            name
            slug
            databaseId
            description
            slug
            image {
              id
              sourceUrl
              srcSet
              title
              altText
              description
            }
          }
        }
      }
    }
    productOnSales: products(where: { onSale: true, stockStatus: IN_STOCK }) {
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
    products(where: { featured: true, stockStatus: IN_STOCK }) {
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

export default PRODUCTS_AND_CATEGORIES_QUERY;
