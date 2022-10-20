import { gql } from "@apollo/client";

export const PAGE_BY_SLUG_QUERY = gql` query Page($slug: ID!) {
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

export const PAGE_SLUGS = gql` query Pages {
  pages(first: 5000) {
    nodes {
      id
      slug
    }
  }
}
`;
