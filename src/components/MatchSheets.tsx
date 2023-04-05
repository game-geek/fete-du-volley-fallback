import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import "../styles/style.css";

const TeamLabel: FC<{ teamId: string }> = ({ teamId }) => {
  const [team, setTeam] = useState({ classe: "" });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Equipes", teamId), (snapshot: any) => {
      setTeam(snapshot.data());
    });

    return () => {
      unsub();
    };
  }, [teamId]);

  return <th scope="row">{team.classe}</th>;
};

const MatchSheets: FC = () => {
  let { id } = useParams();
  const [pool, setPool] = useState({ name: "", terrain: "" });
  const [matchs, setMatchs] = useState([]);
  const [matchsId, setMatchsId] = useState([]);
  const matchsQuery = query(
    collection(db, `Poules/${id}/matchs`),
    orderBy("passage")
  );

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Poules", `${id}`), (snapshot: any) => {
      setPool(snapshot.data());
    });

    return () => {
      unsub();
    };
  }, [id]);

  useEffect(() => {
    const unsub = onSnapshot(matchsQuery, (snapshot: any) => {
      snapshot.docs.sort();
      setMatchs(snapshot.docs.map((doc: any) => doc.data()));
      setMatchsId(snapshot.docs.map((doc: any) => doc.id));
    });

    return () => {
      unsub();
    };
  }, [id]);

  return (
    <div aria-label="index" className="container">
      <table aria-label="match">
        <caption aria-label="main">{pool.name}</caption>
        <caption aria-label="sub">Terrain : {pool.terrain}</caption>

        <tbody aria-label="match">
          {matchs.map(
            (match: any, i: number): JSX.Element => (
              <tr key={matchsId[i]}>
                <TeamLabel teamId={match.equipes.Equ1} />
                <td>{match.score.Equ1}</td>
                <td>-</td>
                <td>{match.score.Equ2}</td>
                <TeamLabel teamId={match.equipes.Equ2} />
                <td>{match.heure}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <table aria-label="result">
        {
          // TODO: Manage the result grid !
        }
        <tbody>
          <tr>
            <th scope="row">1er</th>
            <td></td>
            <td>Qualifié</td>
          </tr>

          <tr>
            <th scope="row">2eme</th>
            <td></td>
            <td>Qualifié</td>
          </tr>

          <tr>
            <th scope="row">3eme</th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">4eme</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MatchSheets;

