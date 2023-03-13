import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";
import "../styles/style.css";

const TeamLabel = ({ teamID }: any) => {
  const [team, setTeam] = useState({}); // ! - champs a renseiger !!

  useEffect(
    () =>
      onSnapshot(doc(db, "Equipes", teamID), (snapshot: any) => {
        setTeam(snapshot.data());
      }),
    []
  );

  return <span>{team}</span>;
};

const MatchSheets = ({ poolID }: any) => {
  const [pool, setPool] = useState({ name: "", terrain: "" });
  const [matchs, setMatchs] = useState([]);

  useEffect(
    () =>
      onSnapshot(doc(db, "Poules", poolID), (snapshot: any) => {
        setPool(snapshot.data());
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, `Poules/${poolID}/matchs`), (snapshot: any) => {
        setMatchs(snapshot.docs.map((doc: any) => doc.data()));
      }),
    []
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
              <span>{match.equipes.Equ1}</span>
              <span>{pool.terrain}</span>
              <span>{match.equipes.Equ2}</span>
              <span>{match.heure}</span>
            </>
          ))}
        </div>
      </div>

      <div aria-label="result-grid" className="container">
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

