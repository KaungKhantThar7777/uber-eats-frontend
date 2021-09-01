import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { CreateAccountMutationVariables, CreateAccountMutation, UserRole } from "../api-types";
import { Button } from "../components/Button";
import uberLogo from "../images/uber-eat-logo.svg";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

function CreateAccount() {
  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    if (data.createAccount.ok) {
      history.push("/");
    }
  };
  const [createAccount, { loading, error, data }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<ICreateAccountForm> = (data) => {
    createAccount({
      variables: {
        input: {
          ...data,
        },
      },
    });
  };

  <Helmet>
    <title>Create Account | Uber-eats</title>
  </Helmet>;
  return (
    <div className=" h-screen flex justify-center">
      <div className=" bg-white w-full max-w-lg px-5 py-10 md:py-20">
        <img src={uberLogo} alt="uber-eats-logo" className="mx-auto mb-8 h-8" />

        <h4 className="text-2xl font-medium mb-8">Let's get started</h4>
        {data?.createAccount.error && (
          <span className="form-error">{data?.createAccount.error}</span>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className="form-error">{errors.email?.message}</span>
            {errors.email?.type === "pattern" && (
              <span className="form-error">Please use a valid email address</span>
            )}
            <input
              type="text"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: "Email is required",
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          <div>
            <select
              {...register("role", {
                required: "Role is required",
              })}
              className="input mb-3"
            >
              {Object.keys(UserRole).map((role, i) => (
                <option key={role + i}>{role}</option>
              ))}
            </select>
          </div>
          <Button canClick={isValid} loading={loading} actionText="Create account" />

          <span className="form-error mt-2">{error?.message}</span>
        </form>

        <div className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/" className="link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
