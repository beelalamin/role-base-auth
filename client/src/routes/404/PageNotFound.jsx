import { Link } from "react-router-dom";
import "./pagenotfound.scss"
function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h1>404!</h1>
      <span> Page Not Found</span>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default PageNotFound;
