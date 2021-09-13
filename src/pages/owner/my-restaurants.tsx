import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { MyRestaurants } from "../../api-types";
import { Restaurant } from "../../components/Restaurant";
import { Spinner } from "../../components/Spinner";
import { RESTAURANT_FRAGMENT } from "../../fragments";

export const MY_RESTAURANTS = gql`
  query MyRestaurants {
    myRestaurants {
      error
      ok
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const MyRestaurantsPage = () => {
  const { data, loading } = useQuery<MyRestaurants>(MY_RESTAURANTS);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container my-5">
      <h1 className="text-2xl">My Restaurants</h1>
      {data?.myRestaurants.restaurants?.length === 0 ? (
        <div>
          <p className="text-xl text-gray-600">No restaurants found here.</p>
          <Link to="/add-restaurant" className="link">
            create one! &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mb-5 md:mb-10">
          {data?.myRestaurants?.restaurants?.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRestaurantsPage;
