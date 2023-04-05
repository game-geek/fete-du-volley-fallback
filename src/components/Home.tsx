import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

// TODO : Add a timer before the start of the "party"
const Home: FC = () => (
  <div aria-label="index" className="container">
    <button aria-label="main">
      <Link to="/pool-list">Feuille de Match</Link>
    </button>

    <button aria-label="main">
      <Link to="/rank">Classement</Link>
    </button>
  </div>
);

export default Home;

