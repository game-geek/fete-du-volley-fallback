import { FC, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "./Loading";
import "../styles/style.css";

const Layout: FC = () => (
  <>
    <header>
      <Link to="/" aria-label="header" className="button">
        <img
          src="./assets/images/ipic.png"
          alt="accueil"
          width="80px"
          height="80px"
        />
      </Link>
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
      <div aria-label="footer" className="button" id="about">
        <a href="https://www.ipic-asso.fr/">En savoir plus sur nous</a>
      </div>
    </footer>
  </>
);

export default Layout;

