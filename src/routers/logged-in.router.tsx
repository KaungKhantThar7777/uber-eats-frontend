import { isLoggedInVar } from "../apollo";

function LoggedInRouter() {
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={() => isLoggedInVar(false)}>Click to log out</button>
    </div>
  );
}

export default LoggedInRouter;
