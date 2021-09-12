import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CreateRestaurant, CreateRestaurantVariables } from "../../api-types";
import { Button } from "../../components/Button";
import { MY_RESTAURANTS } from "./my-restaurants";

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
      slug
      coverImg
    }
  }
`;
const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const data = client.readQuery({
    query: MY_RESTAURANTS,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<IFormProps>({
    mode: "onBlur",
  });

  const [isLoading, setLoading] = useState(false);
  const onCompleted = ({
    createRestaurant: { restaurantId, slug, coverImg },
  }: CreateRestaurant) => {
    setLoading(false);
    const { address, categoryName, name } = getValues();

    client.writeQuery({
      query: MY_RESTAURANTS,
      data: {
        myRestaurants: {
          ...data.myRestaurants,
          restaurants: [
            ...data.myRestaurants.restaurants,
            {
              __typename: "Restaurant",
              address,
              category: { __typename: "Category", name: categoryName, slug },
              coverImg,
              id: restaurantId,
              isPromoted: false,
              name,
            },
          ],
        },
      },
    });
    history.push("/");
  };
  const [createRestaurant] = useMutation<CreateRestaurant, CreateRestaurantVariables>(
    CREATE_RESTAURANT,
    {
      onCompleted,
    }
  );
  const onSubmit: SubmitHandler<IFormProps> = async ({ file, ...rest }) => {
    const actualFile = file[0];
    const formData = new FormData();
    formData.append("file", actualFile);
    setLoading(true);
    const { url }: { url: string } = await (
      await fetch("http://localhost:4000/uploads", {
        method: "POST",
        body: formData,
      })
    ).json();
    createRestaurant({
      variables: {
        input: {
          ...rest,
          coverImg: url,
        },
      },
    });
  };
  return (
    <div className="w-full max-w-lg px-5 py-10 md:py-20 mx-auto">
      <h2 className="text-2xl text-center font-medium mb-5">Add Restaurant</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span className="form-error">{errors.name?.message}</span>
          <input
            type="text"
            placeholder="Name"
            className="input"
            {...register("name", {
              required: "Name is required",
            })}
          />
        </div>

        <div className="mt-2">
          <span className="form-error">{errors.address?.message}</span>
          <input
            type="text"
            placeholder="Address"
            className="input"
            {...register("address", {
              required: "Address is required",
            })}
          />
        </div>

        <div className="mt-2">
          <span className="form-error">{errors.categoryName?.message}</span>
          <input
            type="text"
            placeholder="Category Namme"
            className="input"
            {...register("categoryName", {
              required: "Category Name is required",
            })}
          />
        </div>

        <div className="my-2">
          <span className="form-error">{errors.file?.message}</span>
          <input type="file" className="input" {...register("file")} />
        </div>

        <Button loading={isLoading} canClick={isValid} actionText="Create Restaurant"></Button>
      </form>
    </div>
  );
};

export default AddRestaurant;
