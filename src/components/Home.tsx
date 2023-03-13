import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Home: FC = () => (
  <div aria-label="index" className="container">
    <div aria-label="main" className="button" id="match-sheet">
      <Link to="/pool-list">Feuille de Match</Link>
    </div>
    <div aria-label="main" className="button" id="rank">
      <Link to="/rank">Classement</Link>
    </div>
  </div>
);

export default Home;

