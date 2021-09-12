import { faArrowCircleRight, faUser, faFish } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { authToken, client, isLoggedInVar } from "../apollo";
import { LOCATSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import uberLogo from "../images/uber-eat-logo.svg";

export const logout = () => {
  localStorage.removeItem(LOCATSTORAGE_TOKEN);
  isLoggedInVar(false);
  authToken(undefined);
  client.clearStore();
};

export const Header = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me?.verified && (
        <div className="py-4 text-center bg-red-500 text-white">
          Please verify your email address.
        </div>
      )}
      <header className="py-6 shadow-md">
        <div className="flex justify-between container">
          <Link to="/" className="w-32">
            <img src={uberLogo} alt="uber-eat-logo" />
          </Link>
          <div className="flex justify-between w-20 md:w-28">
            {data?.me?.role === "Owner" && (
              <Link to="/add-restaurant">
                <FontAwesomeIcon icon={faFish} />
              </Link>
            )}
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <button onClick={logout}>
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
