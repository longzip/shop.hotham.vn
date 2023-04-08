import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      productId: databaseId
      averageRating
      slug
      description
      shortDescription
      galleryImages {
        nodes {
          id
          title
          altText
          mediaItemUrl
          sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          url: sourceUrl(size: WOOCOMMERCE_SINGLE)
        }
      }
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
        id
        regularPrice
        seo {
          fullHead
        }
      }
      ... on VariableProduct {
        price
        id
        regularPrice
        seo {
          fullHead
        }
      }
      ... on ExternalProduct {
        price
        id
        regularPrice
        externalUrl
        seo {
          fullHead
        }
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
              regularPrice
              seo {
                fullHead
              }
            }
          }
        }
        id
      }
      productCategories {
        nodes {
          products(first: 5, where: { stockStatus: IN_STOCK }) {
            nodes {
              id
              productId: databaseId
              averageRating
              slug
              image {
                id
                uri
                title
                srcSet
                sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
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
    }
  }
`;

export const PRODUCT_SLUGS = gql`
  query Products {
    products(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`;
