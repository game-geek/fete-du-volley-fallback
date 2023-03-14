import "../styles/pageNotFound.css";
import "../styles/style.css";

const PageNotFound = () => (
  <div aria-label="index" className="container">
    <div id="message">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <p>
        The specified file was not found on this website. Please check the URL
        for mistakes and try again.
      </p>
    </div>
  </div>
);

export default PageNotFound;

