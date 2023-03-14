import { collection, doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import db from "../firebase";
import "../styles/style.css";
import { useParams } from "react-router-dom";

const TeamLabel: FC<{ teamID: string }> = ({ teamID }) => {
  const [team, setTeam] = useState({ classe: "" });

  useEffect(() =>
    onSnapshot(doc(db, "Equipes", teamID), (snapshot: any) => {
      setTeam(snapshot.data());
    })
  );

  return <span>{team.classe}</span>;
};

const MatchSheets: FC = () => {
  const [pool, setPool] = useState({ name: "", terrain: "" });
  const [matchs, setMatchs] = useState([]);
  let { id } = useParams();

  useEffect(() =>
    onSnapshot(doc(db, "Poules", `${id}`), (snapshot: any) => {
      setPool(snapshot.data());
    })
  );

  useEffect(() =>
    onSnapshot(collection(db, `Poules/${id}/matchs`), (snapshot: any) => {
      setMatchs(snapshot.docs.map((doc: any) => doc.data()));
    })
  );

  return (
    <div aria-label="index" className="container">
      <h1>{pool.name}</h1>

      <div aria-label="match-calc" className="container">
        <div aria-label="match-label" className="container">
          <span id="place-label">Lieu</span>
          <span id="time-label">heure</span>
        </div>
        <div aria-label="match-grid" className="container">
          {matchs.map((match: any) => (
            <>
              <TeamLabel teamID={match.equipes.Equ1} />
              <span>{pool.terrain}</span>
              <TeamLabel teamID={match.equipes.Equ2} />
              <span>{match.heure}</span>
            </>
          ))}
        </div>
      </div>

      <div aria-label="result-grid" className="container">
        {
          // TODO: Manage the result grid !
        }
        <span>1er</span>
        <span></span>
        <span>Qualifié</span>

        <span>2eme</span>
        <span></span>
        <span>Qualifié</span>

        <span>3eme</span>
        <span></span>

        <span>4eme</span>
        <span></span>
      </div>
    </div>
  );
};

export default MatchSheets;

