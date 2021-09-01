import { gql, useApolloClient, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { EditProfile, EditProfileVariables } from "../../api-types";
import { Button } from "../../components/Button";
import { useMe } from "../../hooks/useMe";

interface IEditForm {
  email: string;
}

export const EDIT_PROFILE = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      error
      ok
    }
  }
`;
const EditProfilePage = () => {
  const history = useHistory();
  const { data: meData, } = useMe();
  const { register, handleSubmit, getValues } = useForm<IEditForm>({
    defaultValues: {
      email: meData?.me?.email,
    },
  });
  const client = useApolloClient();
  const onCompleted = (data: EditProfile) => {
    const newEmail = getValues("email");
    if (data.editProfile.ok && newEmail !== meData?.me?.email) {
      client.writeFragment({
        id: `User:${meData?.me?.id}`,
        fragment: gql`
          fragment EditUser on User {
            email
            verified
          }
        `,
        data: {
          email: newEmail,
          verified: false,
        },
      });
      history.push("/");
    }
  };
  const [editProfile, { loading }] = useMutation<EditProfile, EditProfileVariables>(EDIT_PROFILE, {
    onCompleted,
  });

  const onSubmit: SubmitHandler<IEditForm> = (data) => {
    editProfile({
      variables: {
        input: data,
      },
    });
  };
  return (
    <div className="w-full max-w-lg px-5 py-10 md:py-20 mx-auto">
      <h2 className="text-2xl text-center font-medium mb-5">Change Email</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          type="text"
          className="input mb-2"
        />
        <Button loading={loading} canClick={!loading} actionText={"Save"} />
      </form>
    </div>
  );
};

export default EditProfilePage;
