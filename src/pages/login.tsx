import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginMutation, LoginMutationVariables } from "../api-types";
import { Button } from "../components/Button";
import { Helmet } from "react-helmet";
import uberLogo from "../images/uber-eat-logo.svg";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCATSTORAGE_TOKEN } from "../constants";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;
function Login() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onBlur",
  });

  const onCompleted = ({ login: { token } }: LoginMutation) => {
    if (token) {
      localStorage.setItem(LOCATSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };
  const [login, { loading, error }] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );
  <Helmet>
    <title>Login | Uber-eats</title>
  </Helmet>;
  const onSubmit: SubmitHandler<ILoginForm> = ({ email, password }) => {
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className="  h-screen flex justify-center">
      <div className=" bg-white w-full max-w-lg px-5 py-10 md:py-20">
        <img src={uberLogo} alt="uber-eats-logo" className="mx-auto mb-8 h-8" />

        <h4 className="text-2xl font-medium mb-8">Welcome back</h4>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className="form-error">{errors.email?.message}</span>
            <input
              type="text"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          <div className="my-3">
            {errors.password?.type === "minLength" && (
              <span className="form-error">Password must be more than 5 characters</span>
            )}
            <span className="form-error">{errors.password?.message}</span>
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: "Password is required",
                minLength: 5,
              })}
            />
          </div>
          <Button canClick={isValid} loading={loading} actionText="Log in" />

          <span className="form-error mt-2">{error?.message}</span>
        </form>

        <div className="text-center mt-5">
          New to Uber?{" "}
          <Link to="/create-account" className="link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
