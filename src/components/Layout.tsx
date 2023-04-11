import { FC, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "./Loading";
import "../styles/style.css";

const logoAS = require("../assets/logoAS.jpg");

const Layout: FC = () => (
  <>
    <header>
      <Link to="/">
        <button aria-label="header">
          <img src={logoAS} alt="accueil" width="80px" height="80px" />
        </button>
      </Link>
    </header>

    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>

    <footer>
      <a href="https://www.ipic-asso.fr/">
        <button aria-label="footer">En savoir plus sur nous</button>
      </a>

      <div className="container" aria-label="info">
        <span>
          <span>&#169;</span> copyright IPIC-ASSO 2023
        </span>
      </div>
    </footer>
  </>
);

export default Layout;

