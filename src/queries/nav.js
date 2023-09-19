import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const NAV_QUERY = gql`
  query {
    mainMenu: menus(where: { location: PRIMARY }) {
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
    mobileMenu: menus(where: { location: PRIMARY_MOBILE }) {
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
    footerMenu: menus(where: { location: FOOTER }) {
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
    footerMenu2: menus(where: { location: FOOTER_MENU_2 }) {
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
          description
          caption
        }
        siteName
        homeUrl
      }
    }
    productCategories(
      where: {
        hideEmpty: true
        hierarchical: true
        order: DESC
        orderby: COUNT
      }
    ) {
      nodes {
        id
        name
        slug
        count
        image {
          id
          sourceUrl
          altText
        }
        products(where: { stockStatus: IN_STOCK, supportedTypesOnly: true }) {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export default NAV_QUERY;
