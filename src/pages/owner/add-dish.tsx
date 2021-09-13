import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { CreateDish, CreateDishVariables } from "../../api-types";
import { Button } from "../../components/Button";
import { uploadImage } from "../../utils/uploadImage";
import { MY_RESTAURANT } from "./my-restaurant";

interface IParams {
  id: string;
}
interface IFormProps {
  name: string;
  description: string;
  price: string;
  file: FileList;
  [key: string]: any;
}

const CREATE_DISH = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      error
      ok
    }
  }
`;

const AddDish = () => {
  const history = useHistory();
  const { id: restaurantId } = useParams<IParams>();
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [choiceIds, setChoiceIds] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const onCompleted = () => {
    setLoading(false);
    history.goBack();
  };
  const [createDish] = useMutation<CreateDish, CreateDishVariables>(CREATE_DISH, {
    onCompleted,
    refetchQueries: [
      {
        query: MY_RESTAURANT,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<IFormProps> = async ({
    name,
    description,
    price,
    file,
    ...rest
  }) => {
    const options = optionIds.map((id) => {
      const choices = choiceIds
        .filter((cId) => cId.includes(id))
        .map((cId) => ({
          name: rest[`${cId}-choice-name`],
          extra: +rest[`${cId}-choice-extra`],
        }));
      return { name: rest[`${id}-option-name`], extra: +rest[`${id}-option-extra`], choices };
    });

    setLoading(true);
    const url = await uploadImage(file[0]);

    createDish({
      variables: {
        input: {
          description,
          name,
          photo: url,
          price: +price,
          restaurantId: +restaurantId,
          options,
        },
      },
    });
  };

  const addOption = () => {
    setOptionIds((arr) => [String(Date.now()), ...arr]);
  };
  const removeOption = (id: string) => {
    setOptionIds((ids) => ids.filter((i) => i !== id));
  };
  const addChoice = (id: string) => {
    setChoiceIds((ids) => [`${id}-${Date.now()}`, ...ids]);
  };
  const removeChoice = (id: string) => {
    setChoiceIds((ids) => ids.filter((i) => i !== id));
  };

  return (
    <div className="w-full max-w-xl px-5 py-10 md:py-20 mx-auto">
      <h2 className="text-2xl text-center font-medium mb-5">Add Dish</h2>
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
          <span className="form-error">{errors.description?.message}</span>
          <input
            type="text"
            placeholder="Description"
            className="input"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        <div className="mt-2">
          <span className="form-error">{errors.price?.message}</span>
          <input
            type="number"
            placeholder="Price"
            className="input"
            {...register("price", {
              required: "Price is required",
            })}
          />
        </div>

        <div className="my-2">
          <span className="form-error">{errors.file?.message}</span>
          <input type="file" className="input" {...register("file")} />
        </div>

        <div className="my-2">
          <button className="btn btn-secondary px-3 py-1" onClick={addOption} type="button">
            Add option
          </button>
        </div>

        <div className="my-2 ml-2">
          {optionIds.map((id) => (
            <div key={id}>
              <div className="flex mt-2">
                <input
                  {...register(`${id}-option-name`)}
                  placeholder="name"
                  type="text"
                  className=" w-1/4 px-2"
                />
                <input
                  {...register(`${id}-option-extra`)}
                  placeholder="extra"
                  className="mx-3 w-1/4 px-2"
                  type="number"
                />
                <button
                  className="btn btn-primary p-2 mr-3"
                  onClick={() => addChoice(id)}
                  type="button"
                >
                  Add choice
                </button>
                <button
                  className="btn bg-red-500 p-2"
                  onClick={() => removeOption(id)}
                  type="button"
                >
                  Remove option
                </button>
              </div>
              <div>
                {choiceIds.map((cId) =>
                  cId.includes(id) ? (
                    <div key={cId} className="mt-1 ml-5">
                      <input
                        {...register(`${cId}-choice-name`)}
                        placeholder="name"
                        type="text"
                        className=" w-1/4 px-2"
                      />
                      <input
                        {...register(`${cId}-choice-extra`)}
                        placeholder="extra"
                        className="mx-3 w-1/4 px-2"
                        type="number"
                      />
                      <button
                        className="btn bg-red-500 p-2"
                        onClick={() => removeChoice(cId)}
                        type="button"
                      >
                        Remove Choice
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>

        <Button loading={isLoading} canClick={isValid} actionText="Create Dish"></Button>
      </form>
    </div>
  );
};

export default AddDish;
