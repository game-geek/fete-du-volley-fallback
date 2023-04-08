import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

  return (
    <Link to={`/team-stats/${teamId}`}>
      <th scope="row">{team.classe}</th>
    </Link>
  );
};

export const MatchSheet: FC<{ id: any }> = ({ id }) => {
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
      setMatchs(snapshot.docs.map((doc: any) => doc.data()));
      setMatchsId(snapshot.docs.map((doc: any) => doc.id));
    });

    return () => {
      unsub();
    };
  }, [id, matchsQuery]);

  return (
    <>
      <table aria-label="match">
        {pool.name && <caption aria-label="main">{pool.name}</caption>}

        {pool.terrain && (
          <caption aria-label="sub">Terrain : {pool.terrain}</caption>
        )}

        <tbody aria-label="match">
          {matchs.map(
            (match: any, i: number): JSX.Element =>
              match.equipes.Equ1 &&
              match.equipes.Equ2 && (
                <tr key={matchsId[i]}>
                  <TeamLabel teamId={match.equipes.Equ1} />
                  <td>{match.score.Equ1}</td>
                  <td>-</td>
                  <td>{match.score.Equ2}</td>
                  <TeamLabel teamId={match.equipes.Equ2} />
                  {match.heure && (
                    <td>
                      {new Date(
                        match.heure.seconds * 1000
                      ).toLocaleTimeString()}
                    </td>
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>

      {/*
        <table aria-label="result">
          // TODO: Manage the result grid !
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
                      */}
    </>
  );
};

const MatchSheetPage: FC = () => {
  const { id } = useParams();

  return (
    <div aria-label="index" className="container">
      <MatchSheet id={id} />
    </div>
  );
};

export default MatchSheetPage;

