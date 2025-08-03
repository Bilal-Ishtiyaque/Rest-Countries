import { Link, useRouteError } from "react-router-dom";
import Header from "../components/Header";


const NotFound = () => {
  const error = useRouteError();
  return (
    <>
      <Header />
      <div className="notFound">
        <h1>{error?.statusText} {error?.status || "404"}</h1>
        <h3>Oops! The page you're looking for doesn't exist.</h3>
        <p>{error?.data}</p>
        <button className="backButton"><Link to="/" className="">Go back home</Link></button>
      </div>
    </>
  );
};

export default NotFound;
