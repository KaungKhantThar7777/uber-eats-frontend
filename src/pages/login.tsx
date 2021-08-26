import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginMutation, LoginMutationVariables } from "../api-types";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;
function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const [login, { data, error }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION);

  const onSubmit: SubmitHandler<ILoginForm> = ({ email, password }) => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className=" bg-gray-800 h-screen flex items-center justify-center">
      <div className=" bg-white w-full max-w-sm p-10">
        <h3 className=" text-3xl text-center mb-10">Log In</h3>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className="form-error">{errors.email?.message}</span>
            <input
              type="text"
              placeholder="Email"
              className="input w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          <div className="my-3">
            {errors.password?.type === "minLength" && (
              <span className="form-error">
                Password must be more than 5 characters
              </span>
            )}
            <span className="form-error">{errors.password?.message}</span>
            <input
              type="password"
              placeholder="Password"
              className="input w-full"
              {...register("password", {
                required: "Password is required",
                minLength: 5,
              })}
            />
          </div>
          <button className="btn">Submit</button>

          <span className="form-error">{error}</span>
        </form>
      </div>
    </div>
  );
}

export default Login;
