import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { AllRestaurants, AllRestaurantsVariables } from "../../api-types";
import { Pagination } from "../../components/Pagination";
import { Restaurant } from "../../components/Restaurant";
import { Spinner } from "../../components/Spinner";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const ALL_RESTAURANTS = gql`
  query AllRestaurants($input: AllRestaurantsInput!) {
    allRestaurants(input: $input) {
      error
      ok
      totalPages
      restaurants {
        ...RestaurantParts
      }
    }

    allCategories {
      error
      ok
      categories {
        id
        name
        img
        slug
      }
    }
  }

  ${RESTAURANT_FRAGMENT}
`;
interface ISearchForm {
  searchTerm: string;
}

const Restaurants = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { data, loading, error } = useQuery<AllRestaurants, AllRestaurantsVariables>(
    ALL_RESTAURANTS,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const onSubmit: SubmitHandler<ISearchForm> = (data) => {
    history.push({
      pathname: "/search",
      search: `?term=${data.searchTerm}`,
    });
  };
  return (
    <div className=" h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-gray-800 py-10 md:py-32  flex justify-center"
      >
        <input
          {...register("searchTerm", {
            required: "Search term is required",
          })}
          type="search"
          className="px-3 py-2 md:p-5 w-3/4 md:w-2/3 outline-none rounded-lg"
          placeholder="Search Restaurants..."
        />
      </form>

      <div className="container">
        <div className="my-3 md:my-10 flex flex-wrap justify-around w-full max-w-lg mx-auto">
          {data?.allCategories?.categories?.map((category) => {
            return (
              <div
                key={category.id}
                className="flex flex-col hover:bg-gray-100 cursor-pointer bg-gray-200 flex-wrap flex-1 mr-2 mb-3 md:mr-4"
              >
                <Link to={`/category/${category.slug}`}>
                  <span className="font-medium mx-3 capitalize">{category.name}</span>
                  <div
                    className=" w-16 h-16 bg-cover ml-auto"
                    style={{ backgroundImage: `url(${category.img})` }}
                  ></div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mb-5 md:mb-10">
          {data?.allRestaurants?.restaurants?.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        <div>
          <Pagination current={page} toPage={setPage} total={data?.allRestaurants.totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
