import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <h2 className="text-2xl font-medium mb-3">Page not found.</h2>
      <h4 className="text-xl mb-3">The page you are looking for does not exist anymore.</h4>
      <Link to="/" className="link">
        Go back home &rarr;
      </Link>
    </div>
  );
};
