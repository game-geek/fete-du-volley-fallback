import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import db from "../firebase";
import "../styles/style.css";

const TeamsList: FC<{ poolId: string }> = ({ poolId }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "Equipes"), where("poule", "==", poolId)),
      (snapshot: any) => {
        setTeams(snapshot.docs.map((doc: any) => doc.data()));
      }
    );

    return () => {
      unsub();
    };
  }, [poolId]);

  return (
    <>
      {teams.map(
        (team: any): JSX.Element => (
          <h5 key={team.classe}>{team.classe}</h5>
        )
      )}
    </>
  );
};

const PoolList: FC = () => {
  const [isFinal, setIsFinal] = useState(false);
  const [pools, setPools] = useState([]);
  const [poolId, setPoolsId] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "Poules"), where("terrain", "!=", "")),
      (snapshot: any) => {
        setPools(snapshot.docs.map((doc: any) => doc.data()));
        setPoolsId(snapshot.docs.map((doc: any) => doc.id));
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
    <div aria-label="index" className="container" id="pool-list">
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
            <div className="card" key={poolId[i]}>
              <Link to={`/match-sheet/${poolId[i]}`}>
                <h3>{pool.name}</h3>
                <h4>Terrain : {pool.terrain}</h4>
                <TeamsList poolId={poolId[i]} />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PoolList;

