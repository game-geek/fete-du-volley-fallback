import { FC, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "./Loading";
import "../styles/style.css";

const Layout: FC = () => (
  <>
    <header>
      <button aria-label="header">
        <Link to="/">
          <img
            src="./assets/images/ipic.png"
            alt="accueil"
            width="80px"
            height="80px"
          />
        </Link>
      </button>
    </header>

    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>

    <footer>
      {/* 
      <div aria-label="footer" className="button" id="admin"> 
        <Link to="/admin">Options Organisateurs</Link>
      </div>
      */}
      <button aria-label="footer">
        <a href="https://www.ipic-asso.fr/">En savoir plus sur nous</a>
      </button>

      <div className="container" aria-label="info">
        © copyright IPIC-ASSO 2023
      </div>
    </footer>
  </>
);

export default Layout;

