import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ResetPassword, ResetPasswordVariables } from "../../api-types";
import { Button } from "../../components/Button";

interface IResetForm {
  password: string;
}

const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      error
      ok
    }
  }
`;

const ResetPasswordPage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm<IResetForm>();
  const code = window.location.href.split("?code=")[1];
  const onCompleted = (data: ResetPassword) => {
    if (data.resetPassword.ok) {
      // logout();
      history.push("/");
    }
  };

  const [resetPassword, { data, loading }] = useMutation<ResetPassword, ResetPasswordVariables>(
    RESET_PASSWORD,
    { onCompleted }
  );
  const onSubmit: SubmitHandler<IResetForm> = (data) => {
    resetPassword({
      variables: {
        input: { ...data, code },
      },
    });
  };

  return (
    <div className="w-full max-w-lg px-5 py-10 md:py-20 mx-auto">
      <h2 className="text-2xl text-center font-medium mb-5">Reset Password</h2>
      <p className="form-error">{data?.resetPassword.error}</p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("password", {
            required: "Password is required.",
          })}
          placeholder="********"
          name="password"
          type="password"
          className="input mb-2"
        />
        <Button loading={loading} canClick={!loading} actionText={"reset"} />
      </form>
    </div>
  );
};

export default ResetPasswordPage;
