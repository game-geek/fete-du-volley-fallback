import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";

const Rank: FC = () => {
  const [teams, setTeams] = useState([]);
  const [teamsId, setTeamsId] = useState([]);
  const teamsQuery = query(collection(db, "Equipes"), orderBy("classe"));

  useEffect(() => {
    const unsub = onSnapshot(teamsQuery, (snapshot: any) => {
      setTeams(snapshot.docs.map((doc: any) => doc.data()));
      setTeamsId(snapshot.docs.map((doc: any) => doc.id));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div aria-label="index" className="container">
      <table aria-label="rank">
        <thead>
          <tr>
            <th scope="col">Équipe</th>
            <th scope="col">Victoires</th>
            <th scope="col">Défaites</th>
            <th scope="col">Égalités</th>
            <th scope="col">Points</th>
          </tr>
        </thead>

        <tbody>
          {teams.map(
            (team: any, i: number): JSX.Element => (
              <tr key={teamsId[i]}>
                <th scope="row">
                  <Link to={`/team-stats/${teamsId[i]}`}>{team.classe}</Link>
                </th>
                <td>{team.victoires}</td>
                <td>{team.defaites}</td>
                <td>{team.egalites}</td>
                <td>{team.points}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Rank;

