import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql` query Product($slug: ID!) {
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
	product(id: $slug, idType: SLUG) {
	  id
	  productId: databaseId
	  averageRating
	  slug
	  description
	  galleryImages {
          nodes {
            id
            title
            altText
            mediaItemUrl
          }
      }
	  image {
		id
		uri
		title
		srcSet
		sourceUrl
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
	}
  }
`;

export const PRODUCT_SLUGS = gql` query Products {
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
  products(first: 5000) {
    nodes {
      id
      slug
    }
  }
}
`;
