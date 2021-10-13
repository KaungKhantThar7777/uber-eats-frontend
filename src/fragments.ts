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

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderParts on Order {
    id
    createdAt
    total
  }
`;
export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
    id
    createdAt
    updatedAt
    customer {
      email
      id
    }
    driver {
      email
      id
    }
    total
    status
    restaurant {
      name
      owner {
        id
      }
    }
  }
`;
