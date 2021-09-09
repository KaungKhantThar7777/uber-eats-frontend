import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { OneRestaurant, OneRestaurantVariables } from "../../api-types";
import { Spinner } from "../../components/Spinner";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const ONE_RESTAURANT = gql`
  query OneRestaurant($input: OneRestaurantInput!) {
    oneRestaurant(input: $input) {
      error
      ok
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  id: string;
}
const RestaurantPage = () => {
  const { id } = useParams<IParams>();
  const { loading, error, data } = useQuery<OneRestaurant, OneRestaurantVariables>(ONE_RESTAURANT, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div className="form-error">{error.message}</div>;
  }
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
    </div>
  );
};

export default RestaurantPage;
