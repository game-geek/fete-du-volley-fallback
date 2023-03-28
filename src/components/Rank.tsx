import { collection, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";

const Rank: FC = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Equipes"), (snapshot: any) => {
      setTeams(snapshot.docs.map((doc: any) => doc.data()));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div aria-label="index" className="container">
      <table aria-label="rank">
        <thead aria-label="rank">
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
            (team: any): JSX.Element => (
              <tr key={team}>
                <th scope="row">
                  <Link className="table-row" to={`/match-sheet/${team.poule}`}>
                    {team.classe}
                  </Link>
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

