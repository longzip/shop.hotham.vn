import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const HEADER_FOOTER_QUERY = gql`query {
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
}
`;

export default HEADER_FOOTER_QUERY;
