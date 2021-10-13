import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { Spinner } from "../components/Spinner";
import { useMe } from "../hooks/useMe";
import Category from "../pages/client/category";
import RestaurantPage from "../pages/client/restaurant";
import Restaurants from "../pages/client/restaurants";
import Search from "../pages/client/search";
import { NotFound } from "../pages/not-found";
import Order from "../pages/order";
import AddDish from "../pages/owner/add-dish";
import AddRestaurant from "../pages/owner/add-restaurant";
import MyRestaurantPage from "../pages/owner/my-restaurant";
import MyRestaurantsPage from "../pages/owner/my-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";

const ClientRoutes = [
  <Route path="/" exact key="restaurants">
    <Restaurants />
  </Route>,
  <Route path="/search" key="search">
    <Search />
  </Route>,
  <Route path="/category/:slug" key="category">
    <Category />
  </Route>,
  <Route path="/restaurants/:id" key="restaurant">
    <RestaurantPage />
  </Route>,
];

const OwnerRoutes = [
  <Route path="/" exact key="my-restaurants">
    <MyRestaurantsPage />
  </Route>,
  <Route path="/restaurants/:id" key="my-restaurant" exact>
    <MyRestaurantPage />
  </Route>,
  <Route path="/add-restaurant" key="add-restaurant">
    <AddRestaurant />
  </Route>,
  <Route path="/restaurants/:id/add-dish" key="add-dish">
    <AddDish />
  </Route>,
];
function LoggedInRouter() {
  const { data, loading, error } = useMe();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="  h-screen flex justify-center items-center">{error?.message}</div>;
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data?.me?.role === "Client" && ClientRoutes}
        {data?.me?.role === "Owner" && OwnerRoutes}
        <Route path="/confirm">
          <ConfirmEmail />
        </Route>
        <Route path="/edit-profile">
          <EditProfile />
        </Route>

        <Route path="/order/:id">
          <Order />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default LoggedInRouter;
