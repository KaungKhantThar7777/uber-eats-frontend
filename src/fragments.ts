import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    address
    coverImg
    category {
      name
      slug
    }
    isPromoted
  }
`;
