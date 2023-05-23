import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userReducer';
import { getAge, getClass, getSexe } from '../api/passengers';
import ChartComposant from './ChartComposant';
import { TypeData } from '../types/typesChart';
import { colorBorder, colorPalette } from '../lib/helpers/Color';
import WindowSearch from './windowSearch';


export default function Home() {
  const user = useSelector(selectUser);
  const [mode, setMode] = useState(0);
  const [visibleGrapheGlobal, setVisibleGrapheGlobal] = useState<boolean>(false);
  const [displayGraphe, setDisplayGraphe] = useState<TypeData>({
    labels: [""],
    datasets: [{
      label: "",
      data: [-1],
      backgroundColor: colorPalette,
      borderColor: colorBorder,
      borderWidth: 1
    }]
  });
  const [activeOngletPp, setActiveOngletPp] = useState(0);
  const [activeSousOnglet, setActiveSousOnglet] = useState(0);



  const extractNumericValue = (ageRange: string) => {
    const [start] = ageRange.split('-');
    return parseInt(start, 10);
  };


  const handleStatsAge = async () => {
    setVisibleGrapheGlobal(true);
    const agePassengers: [{ _id: string, count: number }] = await getAge();
    agePassengers.sort((a, b) => {
      const valueA = extractNumericValue(a._id);
      const valueB = extractNumericValue(b._id);
      return valueA - valueB;
    });
    const labels = agePassengers.map(({ _id }) => _id);
    const counts = agePassengers.map(({ count }) => count);
    displayStats(labels, counts, "Age des passagers");
  }

  const handleStatsSexe = async () => {
    setVisibleGrapheGlobal(true);
    const sexePassengers: [{ _id: string, count: number }] = await getSexe();
    const labels = sexePassengers.map(({ _id }) => _id);
    const counts = sexePassengers.map(({ count }) => count);
    displayStats(labels, counts, "Sexe des passagers");
  }

  const handleStatsClass = async () => {
    setVisibleGrapheGlobal(true);
    const classPassengers: [{ _id: number, count: number }] = await getClass();
    classPassengers.sort((a, b) => {
      const valueA = a._id
      const valueB = b._id
      return valueA - valueB;
    });
    const labels = classPassengers.map(({ _id }) => `Classe ${_id}`);
    const counts = classPassengers.map(({ count }) => count);
    displayStats(labels, counts, "Classes des passagers");
  }

  const displayStats = (labels: string[], counts: number[], titleGraphe: string) => {
    setDisplayGraphe(prevState => ({
      ...prevState,
      labels: labels,
      datasets: [{
        ...prevState.datasets[0],
        label: titleGraphe,
        data: counts
      }]
    }));
    document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }


  return (
    <div>
      <h1>Bienvenue {user.infos?.nickName}</h1>
      <div className="presentation-text">
        <h2>Bienvenue sur notre site de statistiques dédié au Titanic !</h2>
        <p>Découvrez les statistiques fascinantes du Titanic ! Explorez les données sur l'âge, le sexe et la classe des passagers. Plongez dans les graphiques interactifs et les visualisations captivantes pour en savoir plus sur cette tragédie maritime légendaire.</p>
        <p>Rejoignez-nous et explorez les histoires cachées derrière les chiffres du Titanic.</p>
      </div>

      <div className="windowsearch">
        {/* Filtres généraux */}
        <div className="onglets">
          <button
            className={`tab ${activeOngletPp === 0 ? 'active' : ''}`}
            onClick={() => setActiveOngletPp(0)}
          >
            Recherche
          </button>
          <button
            className={`tab ${activeOngletPp === 1 ? 'active' : ''}`}
            onClick={() => setActiveOngletPp(1)}
          >
            Statistiques générales
          </button>
        </div>

        {
          activeOngletPp === 0 ? <WindowSearch /> :
            <>
              <div className="contentWindow">
                <div className='filter-container'>
                  <button className='filter-button' onClick={handleStatsAge}>Age</button>
                  <button className='filter-button' onClick={handleStatsSexe}>Sexe</button>
                  <button className='filter-button' onClick={handleStatsClass}>Classe</button>
                </div>


                {visibleGrapheGlobal && <>
                  <div className="tabs-container" style={{ width: "100%", height: "400px", marginBottom: "100px" }} >

                    <div className="tabs">
                      <button className={`tab ${activeSousOnglet === 0 ? 'active' : ''}`} onClick={() => { setMode(0); setActiveSousOnglet(0) }}>Barres</button>
                      <button className={`tab ${activeSousOnglet === 1 ? 'active' : ''}`} onClick={() => { setMode(1); setActiveSousOnglet(1) }}>Camembert</button>
                    </div>
                    <div className="content">
                      <ChartComposant data={displayGraphe} mode={mode} />
                    </div>

                  </div>
                </>}
              </div>
          </>
        }

    </div>
    </div >
  )
}
