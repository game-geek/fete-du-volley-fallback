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

  return <th scope="row">{team.classe}</th>;
};

const MatchSheets: FC = () => {
  const [pool, setPool] = useState({ name: "", terrain: "" });
  const [matchs, setMatchs] = useState([]);
  const [matchsId, setMatchsId] = useState([]);
  let { id } = useParams();

  useEffect(() =>
    onSnapshot(doc(db, "Poules", `${id}`), (snapshot: any) => {
      setPool(snapshot.data());
    })
  );

  useEffect(() =>
    onSnapshot(collection(db, `Poules/${id}/matchs`), (snapshot: any) => {
      setMatchs(snapshot.docs.map((doc: any) => doc.data()));
      setMatchsId(snapshot.docs.map((doc: any) => doc.id));
    })
  );

  return (
    <div aria-label="index" className="container">
      <table aria-label="match">
        <caption>{pool.name}</caption>

        <thead aria-label="match">
          <tr>
            <th scope="col">Équipe 1</th>
            <th scope="col">Lieu</th>
            <th scope="col">Équipe 2</th>
            <th scope="col">Heure</th>
          </tr>
        </thead>

        <tbody aria-label="match">
          {matchs.map(
            (match: any, i: number): JSX.Element => (
              <tr key={matchsId[i]}>
                <TeamLabel teamID={match.equipes.Equ1} />
                <td>{pool.terrain}</td>
                <TeamLabel teamID={match.equipes.Equ2} />
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

