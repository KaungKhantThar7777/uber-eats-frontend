import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { OneCategory, OneCategoryVariables } from "../../api-types";
import { Restaurant } from "../../components/Restaurant";
import { Spinner } from "../../components/Spinner";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const ONE_CATEGORY = gql`
  query OneCategory($input: CategoryInput!) {
    oneCategory(input: $input) {
      error
      ok
      totalPages
      category {
        id
        name
        slug
        restaurants {
          ...RestaurantParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  slug: string;
}

const Category = () => {
  const { slug } = useParams<IParams>();
  const { loading, data, error } = useQuery<OneCategory, OneCategoryVariables>(ONE_CATEGORY, {
    variables: {
      input: {
        slug,
        page: 1,
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
    <div className="container mt-5">
      <h1 className="text-3xl font-medium">{slug.toUpperCase()}</h1>
      {data?.oneCategory.category?.restaurants?.length === 0 ? (
        <h3 className="text-xl text-gray-400">No restaurants found</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mb-5 md:mb-10">
          {data?.oneCategory.category?.restaurants?.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
