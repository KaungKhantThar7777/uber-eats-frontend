import { Link } from "react-router-dom";
import { AllRestaurants_allRestaurants_restaurants } from "../api-types";

interface IRestaurantProp {
  restaurant: AllRestaurants_allRestaurants_restaurants;
}

export const Restaurant: React.FC<IRestaurantProp> = ({ restaurant }) => {
  return (
    <div className="my-3">
      <Link to={`/restaurants/${restaurant.id}`}>
        <div
          className="py-28 bg-cover mb-3 bg-center"
          style={{ backgroundImage: `url(${restaurant.coverImg})` }}
        ></div>
        <h3 className="text-md font-medium">{restaurant.name}</h3>
        <p className="border-t border-gray-200 text-sm text-gray-500 mt-2">
          {restaurant.category?.name}
        </p>
      </Link>
    </div>
  );
};
