import { OneRestaurant_oneRestaurant_restaurant_menu_options } from "../api-types";

interface IDishProps {
  name: string;
  id: number;
  description: string;
  photo: string | null;
  price: number;
  options?: OneRestaurant_oneRestaurant_restaurant_menu_options[] | null;
  handleSelectItem?: (dishId: number) => void;
  handleSelectChoice?: (dishId: number, name: string, choice?: string) => void;
  isItemSelected?: boolean;
  choices?: { name?: string; choice?: string }[];
}

export const Dish: React.FC<IDishProps> = ({
  id,
  name,
  description,
  price,
  photo,
  options,
  handleSelectItem,
  handleSelectChoice,
  isItemSelected,
  choices,
}) => {
  return (
    <div
      className={`p-5 mt-4 border ${
        isItemSelected ? " border-lime-600 border-2" : null
      } hover:border-gray-600 transition-all flex justify-between flex-1`}
      onClick={() => handleSelectItem && handleSelectItem(id)}
    >
      <div className="w-3/4 ">
        <h3 className="text-xl font-medium">{name}</h3>
        <h4 className="text-lg font-thin mt-1 mb-4">{description}</h4>
        <h5 className="font-thin">${price}</h5>

        <div>
          {options?.map((option) => (
            <div className="border-b-2 my-1">
              <div
                className={`flex cursor-pointer ${
                  Boolean(choices?.find((c) => c.name === option.name && c.choice === undefined))
                    ? " border-lime-600 border-2"
                    : null
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectChoice && handleSelectChoice(id, option.name);
                }}
              >
                <p className="mr-3">{option.name}</p>
                <p>{option.extra !== 0 ? option.extra : null}</p>
              </div>
              {option.choices?.map((c) => (
                <p
                  key={c.name}
                  className={`ml-3 my-1 cursor-pointer ${
                    Boolean(choices?.find((choice) => choice.choice === c.name))
                      ? " border-lime-600 border-2"
                      : null
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();

                    handleSelectChoice && handleSelectChoice(id, option.name, c.name);
                  }}
                >
                  {c.name} {c.extra}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/4">
        <img src={photo ?? ""} alt="dish img" />
      </div>
    </div>
  );
};
