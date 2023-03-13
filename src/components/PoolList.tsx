import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import db from "../firebase";
import "../styles/style.css";

const PoolList: FC = () => {
  const [finalState, setFinalState] = useState(0);
  const [pools, setPools] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Poules"), where("terrain", "!=", "")),
        (snapshot: any) => {
          setPools(snapshot.docs.map((doc: any) => doc.data()));
        }
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "Poules", "finale"), (snapshot: any) => {
        // TODO : get the correct state value
        setFinalState(snapshot.data());
      }),
    []
  );

  return (
    <div aria-label="index" className="container">
      {finalState !== 0 && (
        <div aria-label="main" className="button" id="final">
          <Link to="/Final">Écran Final</Link>
        </div>
      )}
      <div aria-label="pool-list" className="container">
        {pools.map(
          (pool: any, i: number): JSX.Element => (
            <div className="card" key={pool.name}>
              <Link to={"/match-sheet"}>
                <h3>{pool.name}</h3>
                <h4>terrain : {pool.terrain}</h4>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PoolList;

