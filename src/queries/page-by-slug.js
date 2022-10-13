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
