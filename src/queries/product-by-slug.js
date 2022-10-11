import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql` query Product($slug: ID!) {
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
  products(first: 5000) {
    nodes {
      id
      slug
    }
  }
}
`;
