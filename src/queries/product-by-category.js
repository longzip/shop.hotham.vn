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
    }
  }
`;

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories(where: { orderby: COUNT, hideEmpty: true }, first: 1) {
      nodes {
        id
        slug
      }
    }
  }
`;
