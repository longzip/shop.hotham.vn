import { gql } from "@apollo/client";

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      image {
        id
        altText
        sourceUrl(size: MEDIUM)
      }
      seo {
        fullHead
      }
      products(first: 1000, where: { stockStatus: IN_STOCK }) {
        nodes {
          id
          productId: databaseId
          averageRating
          slug
          description
          image {
            id
            uri
            title
            srcSet
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
            regularPrice
            id
          }
          ... on ExternalProduct {
            price
            id
            regularPrice
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  regularPrice
                  price
                }
              }
            }
            id
          }
        }
      }
    }
  }
`;

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories {
      nodes {
        id
        slug
      }
    }
  }
`;
