import { collection, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import db from "../firebase";
import { Link } from "react-router-dom";

const Rank: FC = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() =>
    onSnapshot(collection(db, "Equipes"), (snapshot: any) => {
      setTeams(snapshot.docs.map((doc: any) => doc.data()));
    })
  );

  return (
    <div aria-label="index" className="container" id="rank-table">
      <span>Équipe</span>
      <span>Victoires</span>
      <span>Défaites</span>
      <span>Égalités</span>
      <span>Points</span>
      {
        // TODO: Afficher le classement des équipes
      }
      {teams.map(
        (team: any): JSX.Element => (
          <Link to={`match-sheet/${team.poule}`}>
            <span>{team.classe}</span>
            <span>{team.victoires}</span>
            <span>{team.defaites}</span>
            <span>{team.egalites}</span>
            <span>{team.points}</span>
          </Link>
        )
      )}
    </div>
  );
};

export default Rank;

