import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";

function LoggedOutRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default LoggedOutRouter;
