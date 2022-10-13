import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const CUA_HANG_QUERY = gql`query {
  mainMenu: menus(where: {location: PRIMARY}) {
    nodes {
      menuItems {
        nodes {
          path
          url
          label
          id
        }
      }
      name
    }
  }
  mobileMenu: menus(where: {location: HANDHELD}) {
    nodes {
      menuItems {
        nodes {
          url
          label
          id
          path
        }
      }
      name
    }
  }
  footerMenu: menus(where: {location: SECONDARY}) {
    nodes {
      menuItems {
        nodes {
          url
          label
          id
          path
        }
      }
      name
    }
  }
  siteSeo: seo {
    schema {
      logo {
        id
        altText
        sourceUrl(size: THUMBNAIL)
      }
      siteName
      homeUrl
    }
  }
  products(first: 1000, where: {stockStatus: IN_STOCK}) {
    nodes {
      id
      productId: databaseId
      averageRating
      slug
      description
      image {
        id
        altText
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
