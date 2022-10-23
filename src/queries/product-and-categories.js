import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`query {
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
  mobileMenu: menus(where: {location: PRIMARY_MOBILE}) {
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
  footerMenu: menus(where: {location: FOOTER}) {
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
  footerMenu2: menus(where: {location: FOOTER_MENU_2}) {
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
  pageBy(uri: "/") {
    seo {
      fullHead
    }
  }
  heroCarousel: productCategories(where: {slug: "offers"}) {
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
          }
        }
      }
    }
  }
  productCategories(where: {hideEmpty: true, hierarchical: true}) {
    nodes {
      id
      name
      slug
      parentId
      image {
        id
        sourceUrl(size: WOOCOMMERCE_SINGLE)
        srcSet
        title
      }
    }
  }
  productOnSales: products(where: {onSale: true, stockStatus: IN_STOCK}) {
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
  products(where: {featured: true, stockStatus: IN_STOCK}) {
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
