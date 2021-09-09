import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SearchRestaurants, SearchRestaurantsVariables } from "../../api-types";
import { Restaurant } from "../../components/Restaurant";
import { Spinner } from "../../components/Spinner";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const SEARCH_RESTAURANTS = gql`
  query SearchRestaurants($input: SearchRestaurantsInput!) {
    searchRestaurants(input: $input) {
      error
      ok
      totalPages
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const [fetch, { loading, data }] = useLazyQuery<SearchRestaurants, SearchRestaurantsVariables>(
    SEARCH_RESTAURANTS
  );

  const [, query] = location.search.split("?term=");
  useEffect(() => {
    if (!query) {
      history.replace("/");
    } else {
      fetch({
        variables: {
          input: {
            query,
            page: 1,
          },
        },
      });
    }
  }, [history, location.search, fetch, query]);
  if (loading) {
    return <Spinner />;
  }
  console.log(data);
  return (
    <div className="container mt-3">
      <h1 className="text-2xl">Search results for "{query}"</h1>
      {data?.searchRestaurants.restaurants?.length === 0 ? (
        <h3>No results found</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mb-5 md:mb-10">
          {data?.searchRestaurants?.restaurants?.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
