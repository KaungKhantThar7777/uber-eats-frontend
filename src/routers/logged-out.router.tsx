import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";
import { NotFound } from "../pages/not-found";
import ForgotPassword from "../pages/user/forgot-password";
import ResetPasswordPage from "../pages/user/reset-password";

function LoggedOutRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default LoggedOutRouter;
