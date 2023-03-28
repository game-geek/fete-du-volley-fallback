import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import db from "../firebase";
import "../styles/style.css";

const PoolList: FC = () => {
  const [isFinal, setIsFinal] = useState(false);
  const [pools, setPools] = useState([]);
  const [poolsID, setPoolsID] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "Poules"), where("terrain", "!=", "")),
      (snapshot: any) => {
        setPools(snapshot.docs.map((doc: any) => doc.data()));
        setPoolsID(snapshot.docs.map((doc: any) => doc.id));
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Parametres", "etat"), (doc: any) => {
      setIsFinal(doc.data().finale);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div aria-label="index" className="container">
      {isFinal && (
        <div aria-label="main" className="card" id="final">
          <Link to="/Final">
            <h3>Écran Final</h3>
          </Link>
        </div>
      )}

      <div aria-label="pool-list" className="container">
        {pools.map(
          (pool: any, i: number): JSX.Element => (
            <div className="card" key={poolsID[i]}>
              <Link to={`/match-sheet/${poolsID[i]}`}>
                <h3>{pool.name}</h3>
                <h4>terrain : {pool.terrain}</h4>
                {
                  // TODO : display the list of the team
                }
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PoolList;

