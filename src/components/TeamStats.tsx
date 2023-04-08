import { doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import DonutChart from "react-donut-chart";

const TeamPattern = {
  arbitre: "",
  capitaine: "",
  classe: "",
  defaites: 0,
  devise: "",
  egalites: 0,
  nom_participant: [],
  points: 0,
  victoires: 0,
};

const TeamStats: FC = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(TeamPattern);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "Equipes", `${teamId}`),
      (snapshot: any) => {
        setTeam(snapshot.data());
      }
    );

    return () => {
      unsub();
    };
  }, [teamId]);

  return (
    <div aria-label="index" className="container">
      <h1>{team.classe}</h1>

      <h2>
        <span className="underline">Capitaine</span> : {team.capitaine}
      </h2>
      <h2>
        <span className="underline">Arbitre</span> : {team.arbitre}
      </h2>

      <h3>
        <span className="underline">Devise</span> : {team.devise}
      </h3>

      <ul aria-label="Liste des joueurs">
        {team.nom_participant.map((name: string) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <DonutChart
        data={[
          {
            label: "Victoires",
            value: team.victoires,
          },
          {
            label: "Defaites",
            value: team.defaites,
          },
          {
            label: "Egalite",
            value: team.egalites,
          },
        ]}
      />
    </div>
  );
};

export default TeamStats;

