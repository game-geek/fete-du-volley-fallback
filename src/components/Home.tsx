import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

// TODO : Add a timer before the start of the "party"
const Home: FC = () => (
  <div aria-label="index" className="container">
    <Link to="/pool-list">
      <button aria-label="main">Feuille de Match</button>
    </Link>

    <Link to="/rank">
      <button aria-label="main">Classement</button>
    </Link>
  </div>
);

export default Home;

