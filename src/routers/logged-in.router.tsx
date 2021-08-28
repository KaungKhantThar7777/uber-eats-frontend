import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../api-types";
import { isLoggedInVar } from "../apollo";

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;
function LoggedInRouter() {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  if (loading) {
    return (
      <div className="  h-screen flex justify-center items-center">
        <svg className="animate-bounce h-7 w-7 bg-green-600 rounded-full" viewBox="0 0 24 24" />
      </div>
    );
  }

  if (error) {
    return <div className="  h-screen flex justify-center items-center">{error.message}</div>;
  }
  return (
    <div>
      {data?.me?.email}
      <button onClick={() => isLoggedInVar(false)}>Click to log out</button>
    </div>
  );
}

export default LoggedInRouter;
