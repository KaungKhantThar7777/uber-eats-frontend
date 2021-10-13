import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  OneRestaurant,
  OneRestaurantVariables,
  CreateOrder,
  CreateOrderVariables,
  CreateOrderItemInput,
} from "../../api-types";
import { Dish } from "../../components/Dish";
import { Spinner } from "../../components/Spinner";
import { RESTAURANT_FRAGMENT, DISH_FRAGMENT } from "../../fragments";
import _ from "lodash";

const ONE_RESTAURANT = gql`
  query OneRestaurant($input: OneRestaurantInput!) {
    oneRestaurant(input: $input) {
      error
      ok
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      error
      ok
      id
    }
  }
`;

interface IParams {
  id: string;
}
type ItemTypes = {
  [Key: number]: {
    name?: string;
    choice?: string;
  }[];
};
const RestaurantPage = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const [orderStarted, setOrderStarted] = React.useState(false);
  const [items, setItems] = React.useState<ItemTypes>({});
  const { loading, error, data } = useQuery<OneRestaurant, OneRestaurantVariables>(ONE_RESTAURANT, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });
  const [createOrder] = useMutation<CreateOrder, CreateOrderVariables>(CREATE_ORDER, {
    onCompleted: (data) => {
      history.push(`/order/${data.createOrder.id}`);
    },
  });
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div className="form-error">{error.message}</div>;
  }

  const handleSelectItem = (dishId: number) => {
    if (orderStarted) {
      const exist = items[dishId];
      if (exist) {
        const newItems = _.omit(items, dishId);
        setItems(newItems);
      } else {
        const newItems = { ...items };
        newItems[dishId] = [];
        setItems(newItems);
      }
    }
  };

  const handleSelectChoice = (dishId: number, name?: string, choice?: string) => {
    if (orderStarted) {
      const dishExist = items[dishId];

      if (dishExist) {
        const newItems = { ...items };
        const choiceExist = newItems[dishId].find((c) => c.name === name);
        if (choiceExist) {
          const newChoices = newItems[dishId].filter((c) => c.name !== name);
          newItems[dishId] = newChoices;
        } else {
          const newChoices = [...newItems[dishId], { name, choice }];
          newItems[dishId] = newChoices;
        }
        setItems(newItems);
      }
    }
  };

  const toSubmit = Object.entries(items).map(([dishId, choices]) => {
    return {
      dishId: +dishId,
      choices,
    };
  });

  const submitOrder = () => {
    createOrder({
      variables: {
        input: {
          restaurantId: +id,
          items: toSubmit as CreateOrderItemInput[],
        },
      },
    });
  };

  const handleSubmit = () => {
    submitOrder();
    setItems({});
  };
  return (
    <div>
      <div
        className="bg-gray-800 py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.oneRestaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="md:w-1/3 w-1/2 md:pl-36 py-10 bg-white">
          <h3 className="text-2xl">{data?.oneRestaurant.restaurant?.name}</h3>
          <h5 className="text-gray-400">{data?.oneRestaurant.restaurant?.category?.name}</h5>
        </div>
      </div>
      <div className="container my-5">
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium">{data?.oneRestaurant.restaurant?.name}</h2>
          {orderStarted ? (
            <div>
              <button
                className="btn bg-gray-600 px-3 mr-3"
                onClick={() => {
                  setOrderStarted(false);
                  setItems({});
                }}
              >
                Cancel Order
              </button>
              <button className="btn btn-primary px-3" onClick={handleSubmit}>
                Submit Order
              </button>
            </div>
          ) : (
            <button className="btn btn-primary px-3" onClick={() => setOrderStarted(true)}>
              Start Order
            </button>
          )}
        </div>

        {data?.oneRestaurant.restaurant?.menu.length === 0 ? (
          <div>
            <p className="text-xl text-gray-600">No dishes found here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mb-5 md:mb-10">
            {data?.oneRestaurant?.restaurant?.menu?.map(
              ({ id, name, photo, price, description, options }) => (
                <Dish
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  price={+price}
                  photo={photo}
                  options={options}
                  choices={items[id]}
                  isItemSelected={Boolean(items[id])}
                  handleSelectItem={handleSelectItem}
                  handleSelectChoice={handleSelectChoice}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
