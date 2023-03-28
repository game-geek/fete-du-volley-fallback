import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Home: FC = () => (
  <div aria-label="index" className="container">
    <button aria-label="main" id="match-sheet">
      <Link to="/pool-list">Feuille de Match</Link>
    </button>

    <button aria-label="main" id="rank">
      <Link to="/rank">Classement</Link>
    </button>
  </div>
);

export default Home;

