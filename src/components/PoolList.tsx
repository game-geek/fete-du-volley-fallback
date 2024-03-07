import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import "../styles/style.css";

const TeamsList: FC<{ poolId: string }> = ({ poolId }) => {
  const [teams, setTeams] = useState([]);
  const teamsQuery = query(
    collection(db, "Equipes"),
    where("poule", "==", poolId)
    // orderBy("classe") // For some reason it doesn't work :/
  );

  useEffect(() => {
    const unsub = onSnapshot(teamsQuery, (snapshot: any) => {
      setTeams(snapshot.docs.map((doc: any) => doc.data()));
    }); 

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
  const poolsQuery = query(collection(db, "Poules"), orderBy("name"));

  useEffect(() => {
    const unsub = onSnapshot(poolsQuery, (snapshot: any) => {
      setPools(snapshot.docs.map((doc: any) => doc.data()));
      setPoolsId(snapshot.docs.map((doc: any) => doc.id));
      console.log("DATA")
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Parametres", "etat"), (doc: any) => {
      setIsFinal(doc.data().finale);
      console.log("DATA2")
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div aria-label="index" className="container" id="pool-list">
      {isFinal && (
        <Link to="/final">
          <div aria-label="main" role="button" className="card" id="final">
            <h3>Écran Final</h3>
          </div>
        </Link>
      )}

      <div aria-label="pool-list" className="container">
        {pools.map(
          (pool: any, i: number): JSX.Element => (
            <Link to={`/match-sheet/${poolId[i]}`} key={poolId[i]}>
              <div className="card" role="button">
                <h3>{pool.name}</h3>
                <h4>Terrain : {pool.terrain}</h4>
                <TeamsList poolId={poolId[i]} />
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default PoolList;

