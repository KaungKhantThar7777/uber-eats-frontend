import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";
import { NotFound } from "../pages/not-found";
import { ConfirmEmail } from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";

const ClientRoutes = [
  <Route path="/" exact key="restaurants">
    <Restaurants />
  </Route>,
];
function LoggedInRouter() {
  const { data, loading, error } = useMe();

  if (loading) {
    return (
      <div className="  h-screen flex justify-center items-center">
        <span className="animate-spin w-7 h-7 border-b-2 border-green-600 rounded-full mr-3"></span>
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="  h-screen flex justify-center items-center">{error?.message}</div>;
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data?.me?.role === "Client" && ClientRoutes}
        <Route path="/confirm" key="confirm">
          <ConfirmEmail />
        </Route>
        <Route path="/edit-profile" key="editProfile">
          <EditProfile />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default LoggedInRouter;
