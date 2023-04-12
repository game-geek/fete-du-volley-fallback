import { doc, getDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import "../styles/style.css";

const Home: FC = () => {
  const [actualDate, setActualDate] = useState(new Date());
  const [startDate, setStartDate] = useState(actualDate);

  const getStartDate = async () => {
    const docRef = doc(db, "Parametres", "etat");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setStartDate(new Date(docSnap.data().heure_debut.seconds * 1000));
    } else {
      console.log("Event start date not found");
    }
  };

  useEffect(() => {
    getStartDate();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActualDate(new Date());
    }, 900);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const DTime = startDate.getTime() - actualDate.getTime();
  const DTimeSec = Math.floor(DTime / 1000) % 60;
  const DTimeMin = Math.floor(DTime / (1000 * 60)) % 60;
  const DTimeHour = Math.floor(DTime / (1000 * 60 * 60)) % 24;
  const DTimeDay = Math.floor(DTime / (1000 * 60 * 60 * 24));

  return (
    <div aria-label="index" className="container">
      {actualDate < startDate ? (
        <p className="title">
          Début de la Fête du Volley dans :<br />
          {DTimeDay} Jours {DTimeHour} Heures {DTimeMin} minutes et {DTimeSec}{" "}
          secondes
        </p>
      ) : (
        <>
          <Link to="/pool-list">
            <button aria-label="main">Feuilles de Matchs</button>
          </Link>

          <Link to="/rank">
            <button aria-label="main">Classement</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;

