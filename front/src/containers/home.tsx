import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userReducer';
import { getAge, getClass, getSexe, getSurvived } from '../api/passengers';
import ChartComposant from '../components/ChartComposant';
import { TypeData } from '../types/typesChart';
import { colorBorder, colorPalette } from '../lib/helpers/Color';
import WindowSearch from '../components/windowSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
  const [showAverage, setShowAverage] = useState(false);
  const [showDeviation, setShowDeviation] = useState(false);
  const [visibleAverageAge, setVisibleAverageAge] = useState(false);

  const extractNumericValueStart = (ageRange: string) => {
    const [start] = ageRange.split('-');
    return parseInt(start, 10);
  };

  const extractNumericValueEnd= (ageRange: string) => {
    const [, end] = ageRange.split('-');
    return parseInt(end, 10);
  };


  const handleStatsAge = async () => {
    setVisibleGrapheGlobal(true);
    setVisibleAverageAge(true);
    const agePassengers: [{ _id: string, count: number }] = await getAge();
    agePassengers.sort((a, b) => {
      const valueA = extractNumericValueStart(a._id);
      const valueB = extractNumericValueStart(b._id);
      return valueA - valueB;
    });
    const labels = agePassengers.map(({ _id }) => _id);
    const counts = agePassengers.map(({ count }) => count);
    displayStats(labels, counts, "Age des passagers");
  }

  const handleStatsSexe = async () => {
    setVisibleGrapheGlobal(true);
    setVisibleAverageAge(false);
    const sexePassengers: [{ _id: string, count: number }] = await getSexe();
    const labels = sexePassengers.map(({ _id }) => _id);
    const counts = sexePassengers.map(({ count }) => count);
    displayStats(labels, counts, "Sexe des passagers");
  }

  const handleStatsClass = async () => {
    setVisibleGrapheGlobal(true);
    setVisibleAverageAge(false);
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

  const handleStatsSurvived = async () => {
    setVisibleGrapheGlobal(true);
    setVisibleAverageAge(false);
    const survivedPassengers: [{ _id: number, count: number }] = await getSurvived();
    survivedPassengers.sort((a, b) => {
      const valueA = a._id
      const valueB = b._id
      return valueA - valueB;
    });
    const labels = survivedPassengers.map(({ _id }) => _id === 0 ? "N'a pas survécu pas" : "Survécu");
    const counts = survivedPassengers.map(({ count }) => count);
    displayStats(labels, counts, "Les survivants");
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

  const calculateAverage = (data: number[]) => {
    const total = data.reduce((acc, value) => acc + value, 0);
    return total / data.length;
  };

  const calculateAverageAge = (data: number[], labels : string[]) => {
   console.log("data : ", data);
   console.log("labels : ", labels);
   const averageAgeCategories = labels.map((e, i ) =>{
    if(i !== labels.length - 1){
      const borneS = extractNumericValueStart(e);
      const borneE = extractNumericValueEnd(e);
      return Math.ceil(((borneE - borneS)/2) + borneS)
    }
    return 60;
   }) 

  //  const sumPassengers = data.reduce((acc, value) => acc + value, 0);

   console.log("averageAge :", averageAgeCategories)
   let averageAgePassengers = 0;
   for(let i = 0; i < data.length; i++){
    averageAgePassengers += data[i] * averageAgeCategories[i]
   }
   return averageAgePassengers / data.reduce((acc, value) => acc + value, 0);
  };

  function calculateStandardDeviation(values: number[]): number {
    const n: number = values.length;
    const mean: number = values.reduce((acc, value) => acc + value, 0) / n;
    const squaredDifferences: number[] = values.map(value => Math.pow(value - mean, 2));
    const sumSquaredDifferences: number = squaredDifferences.reduce((acc, value) => acc + value, 0);
    const variance: number = sumSquaredDifferences / n;
    const standardDeviation: number = Math.sqrt(variance);
    console.log("standard : ", standardDeviation);
    return standardDeviation;
  }

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };


  return (
    <div>
      <div className="presentation-container">
        <h1>Bienvenue {user.infos?.nickName}</h1>
        <div className="presentation-text">
          <h2>Bienvenue sur notre site de statistiques dédié au Titanic !</h2>
          <p>Découvrez les statistiques fascinantes du Titanic ! Explorez les données sur l'âge, le sexe et la classe des passagers. Plongez dans les graphiques interactifs et les visualisations captivantes pour en savoir plus sur cette tragédie maritime légendaire.</p>
          <p>Rejoignez-nous et explorez les histoires cachées derrière les chiffres du Titanic.</p>
        </div>
        <div className="scroll-down" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={handleScrollDown}>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>

      <div className='contentPrincipal'>


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
                    <button className='filter-button' onClick={handleStatsSurvived}>Survivants</button>
                  </div>


                  {visibleGrapheGlobal && <>
                    <div className="tabs-container" style={{ width: "100%", height: "400px", marginBottom: "100px" }} >

                      <div className="tabs">
                        <button className={`tab ${activeSousOnglet === 0 ? 'active graph' : ''}`} onClick={() => { setMode(0); setActiveSousOnglet(0); setShowAverage(false) }}>Barres</button>
                        <button className={`tab ${activeSousOnglet === 1 ? 'active graph' : ''}`} onClick={() => { setMode(1); setActiveSousOnglet(1); setShowAverage(false) }}>Camembert</button>
                        <div className="separator"></div>
                        <button className="tab" onClick={() => setShowAverage(!showAverage)}> <FontAwesomeIcon icon={faChartLine} /> Moyenne</button>
                        {showAverage &&
                          <div className={`average-display ${showAverage ? 'show' : ''}`}>
                            <p className="average-value">{!visibleAverageAge ? calculateAverage(displayGraphe.datasets[0].data).toFixed(2) : `${calculateAverageAge(displayGraphe.datasets[0].data, displayGraphe.labels).toFixed(0)} ans`}</p>
                          </div>
                        }

                        <button className="tab" onClick={() => setShowDeviation(!showDeviation)}> <FontAwesomeIcon icon={faChartBar} /> L'écart type</button>
                        {showDeviation &&
                          <div className={`average-display ${showDeviation ? 'show' : ''}`}>
                            <p className="average-value">{calculateStandardDeviation(displayGraphe.datasets[0].data).toFixed(2)}</p>
                          </div>
                        }
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
      </div>
    </div >
  )
}
