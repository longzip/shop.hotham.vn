import { gql } from "@apollo/client";

const CLEAR_CART_MUTATION = gql`
  mutation CLEAR_CART_MUTATION($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
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

export default CLEAR_CART_MUTATION;
