import { FC } from "react";
import "../styles/loading.css";

const Loading: FC = () => (
  <div aria-label="index" className="container" id="loading">
    <h1 id="loading">Chargement</h1>
    <div className="newtons-cradle">
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
    </div>
  </div>
);

export default Loading;

