import React from "react";
import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { MyRestaurant, MyRestaurantVariables, PendingOrder } from "../../api-types";
import { Dish } from "../../components/Dish";
import { Spinner } from "../../components/Spinner";
import { DISH_FRAGMENT, ORDER_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

interface IParams {
  id: string;
}

export const MY_RESTAURANT = gql`
  query MyRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      error
      ok
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDER_FRAGMENT}
`;

const PENDING_ORDER = gql`
  subscription PendingOrder {
    pendingOrders {
      ...OrderParts
    }
  }
  ${ORDER_FRAGMENT}
`;
const MyRestaurantPage = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const { data: newData } = useSubscription<PendingOrder>(PENDING_ORDER);
  const { data, loading } = useQuery<MyRestaurant, MyRestaurantVariables>(MY_RESTAURANT, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  console.log(newData);
  React.useEffect(() => {
    if (newData) {
      history.push(`/order/${newData.pendingOrders.id}`);
    }
  }, [history, newData]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className="bg-gray-800 py-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container my-5">
        <h2 className="text-2xl font-medium">{data?.myRestaurant.restaurant?.name}</h2>
        <div className="my-3">
          <Link to={`/restaurants/${id}/add-dish`} className="btn btn-primary mr-3 px-3">
            Add dish &rarr;
          </Link>
          <button className="btn btn-secondary px-3">Buy Promotion &rarr; </button>
        </div>
        {data?.myRestaurant.restaurant?.menu.length === 0 ? (
          <div>
            <p className="text-xl text-gray-600">No dishes found here.</p>
            <Link to={`/restaurants/${id}/add-dish`} className="link">
              create one! &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mb-5 md:mb-10">
            {data?.myRestaurant?.restaurant?.menu?.map(
              ({ id, name, photo, price, description }) => (
                <Dish
                  id={id}
                  key={id}
                  name={name}
                  description={description}
                  price={+price}
                  photo={photo}
                />
              )
            )}
          </div>
        )}

        <div>
          <h2 className="text-center text-2xl font-medium">Sales</h2>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            width={window.innerWidth}
            height={400}
            containerComponent={<VictoryVoronoiContainer labels={({ datum }) => ` $${datum.y}`} />}
          >
            <VictoryLine
              interpolation="natural"
              data={data?.myRestaurant.restaurant?.orders.map((o) => ({
                x: o.createdAt,
                y: o.total,
              }))}
            ></VictoryLine>
            <VictoryAxis dependentAxis tickFormat={(y) => `$${y}`} />

            <VictoryAxis tickFormat={(x) => new Date(x).toLocaleDateString()} />
          </VictoryChart>
        </div>
      </div>
    </>
  );
};

export default MyRestaurantPage;
