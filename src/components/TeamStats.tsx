import { SnapshotOptions, doc, getDoc } from "firebase/firestore";
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

const teamConverter = {
  toFirestore: (team: any) => {
    return {
      arbitre: team.arbitre,
      capitaine: team.capitaine,
      classe: team.classe,
      defaites: team.defaites,
      devise: team.devise,
      egalites: team.egalites,
      nom_participant: team.nom_participant,
      points: team.points,
      victoires: team.victoires,
    };
  },
  fromFirestore: (snapshot: any, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return {
      arbitre: data.arbitre,
      capitaine: data.capitaine,
      classe: data.classe,
      defaites: data.defaites,
      devise: data.devise,
      egalites: data.egalites,
      nom_participant: data.nom_participant,
      points: data.points,
      victoires: data.victoires,
    };
  },
};

const TeamStats: FC = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(TeamPattern);

  const getTeamData = async () => {
    const docRef = doc(db, "Equipes", `${teamId}`).withConverter(teamConverter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTeam(docSnap.data());
    } else {
      console.log("Team data not found");
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

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

