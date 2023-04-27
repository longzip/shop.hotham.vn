import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
  mutation ADD_TO_CART($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        appliedCoupons {
          code
        }
        contents {
          itemCount
          nodes {
            key
            product {
              node {
                id
                databaseId
                name
                type
                image {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
            variation {
              node {
                id
                databaseId
                name
                description
                type
                onSale
                price
                regularPrice
                salePrice
                featuredImage {
                  node {
                    id
                    sourceUrl
                  }
                }
                attributes {
                  nodes {
                    id
                    name
                    value
                  }
                }
              }
            }
            quantity
            total
            subtotal
            subtotalTax
          }
        }
        subtotal
        subtotalTax
        shippingTax
        shippingTotal
        total
        totalTax
        feeTax
        feeTotal
        discountTax
        discountTotal
      }
    }
  }
`;

export default ADD_TO_CART;
