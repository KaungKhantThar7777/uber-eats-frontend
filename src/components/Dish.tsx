interface IDishProps {
  name: string;
  description: string;
  photo: string | null;
  price: number;
}

export const Dish: React.FC<IDishProps> = ({ name, description, price, photo }) => {
  return (
    <div className="p-5 mt-4 border hover:border-gray-600 transition-all flex justify-between flex-1">
      <div className="w-3/4 ">
        <h3 className="text-xl font-medium">{name}</h3>
        <h4 className="text-lg font-thin mt-1 mb-4">{description}</h4>
        <h5 className="font-thin">${price}</h5>
      </div>
      <div className="w-2/4">
        <img src={photo ?? ""} alt="dish img" />
      </div>
    </div>
  );
};
