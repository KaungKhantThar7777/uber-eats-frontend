import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgotPassword, ForgotPasswordVariables } from "../../api-types";
import { Button } from "../../components/Button";

interface IForgotPassForm {
  email: string;
}

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      error
      ok
    }
  }
`;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassForm>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IForgotPassForm> = (data) => {
    forgotPassword({
      variables: {
        input: {
          email: data.email,
        },
      },
    });
  };

  const [forgotPassword, { data, error, loading }] = useMutation<
    ForgotPassword,
    ForgotPasswordVariables
  >(FORGOT_PASSWORD);

  return (
    <div className="w-full max-w-lg px-5 py-10 md:py-20 mx-auto">
      <h2 className="text-2xl text-center font-medium mb-5">Forgot Password</h2>
      {data?.forgotPassword.ok && (
        <p className="text-lime-500">
          We have sent a reset password link to your email. Pls, check and reset your password
        </p>
      )}
      {data?.forgotPassword.error && <p className="form-error">{data.forgotPassword.error}</p>}
      {error && <p className="form-error">{error.message}</p>}
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <span className="form-error">{errors.email?.message}</span>
        {errors.email?.type === "pattern" && (
          <span className="form-error">Please use a valid email address</span>
        )}
        <input
          {...register("email", {
            required: "Email is required",
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          placeholder="example@gmail.com"
          name="email"
          type="text"
          className="input mb-2"
        />
        <Button loading={loading} canClick={!loading} actionText={"Submit"} />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
