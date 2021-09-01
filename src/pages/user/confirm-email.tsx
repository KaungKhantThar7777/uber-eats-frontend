import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { VerifyEmail, VerifyEmailVariables } from "../../api-types";
import { useMe } from "../../hooks/useMe";

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($code: String!) {
    verifyEmail(code: $code) {
      error
      ok
    }
  }
`;
export const ConfirmEmail = () => {
  const { data: meData } = useMe();
  const history = useHistory();
  const client = useApolloClient();
  const onCompleted = ({ verifyEmail: { ok } }: VerifyEmail) => {
    if (ok) {
      client.writeFragment({
        id: `User:${meData?.me!.id}`,
        fragment: gql`
          fragment Verified on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push("/");
    }
  };
  const [verifyEmail] = useMutation<VerifyEmail, VerifyEmailVariables>(VERIFY_EMAIL, {
    onCompleted,
  });

  const [, code] = window.location.href.split("code=");

  verifyEmail({
    variables: {
      code: code,
    },
  });

  return (
    <div className="mt-52 container text-center">
      <h2 className="text-3xl font-medium mb-3">Confirming email address!</h2>
      <h4 className="text-2xl font-thin">
        Please wait, don't leave the page. It will take only a few seconds.
      </h4>
    </div>
  );
};
