import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userReducer';
import { getAge, getClass, getSexe } from '../api/passengers';

export default function Home() {
  const user = useSelector(selectUser);
  const [result, setResult] = useState<string>("")

  const handleStatsAge = async () => {
    const agePassengers = await getAge();
    setResult(JSON.stringify(agePassengers));
  }

  const handleStatsSexe = async () => {
    const sexePassengers = await getSexe();
    setResult(JSON.stringify(sexePassengers));
  }

  const handleStatsClass = async () => {
    const classPassengers = await getClass();
    setResult(JSON.stringify(classPassengers));
  }
  return (
    <div>
      <h1>Bienvenue {user.infos?.nickName}</h1>
      <h2>Bienvenue sur notre site de statistiques dédié au Titanic !</h2>

      <p>Plongez dans l'histoire fascinante du légendaire paquebot et explorez des données uniques sur les passagers qui ont embarqué à bord. Notre site vous offre un aperçu captivant des caractéristiques démographiques de ces voyageurs exceptionnels.</p>

      <p>Grâce à notre interface conviviale, vous pourrez accéder à une multitude d'informations pertinentes. Vous pourrez explorer les données en fonction de l'âge des passagers, vous permettant de découvrir les différentes tranches d'âge représentées à bord du Titanic. Que vous soyez curieux de connaître la moyenne d'âge des passagers ou que vous souhaitiez découvrir les plus jeunes ou les plus âgés à bord, nos statistiques vous révéleront tous les détails fascinants.</p>

      <p>Vous pourrez également plonger dans les différences de genre parmi les passagers. Notre site vous fournira des informations détaillées sur la répartition entre hommes et femmes à bord du Titanic. Vous pourrez ainsi explorer les proportions respectives des deux sexes et en apprendre davantage sur les disparités éventuelles.</p>

      <p>En outre, notre site vous permettra d'explorer les données relatives aux classes des passagers. Vous pourrez découvrir les différents niveaux de confort offerts à bord et observer comment les passagers étaient répartis entre ces classes. Que vous soyez intéressé par la première classe luxueuse, la deuxième classe raffinée ou la troisième classe plus modeste, nos statistiques vous dévoileront des détails passionnants sur les choix de voyage des passagers.</p>

      <p>Nous mettons à votre disposition des graphiques interactifs, des tableaux et des visualisations captivantes pour vous aider à explorer ces données historiques de manière immersive. Vous aurez la possibilité de filtrer et de trier les informations selon vos préférences, vous permettant ainsi de plonger dans les détails qui vous intéressent le plus.</p>

      <p>Que vous soyez un passionné d'histoire, un chercheur ou simplement curieux d'en savoir plus sur les passagers du Titanic, notre site de statistiques est l'endroit idéal pour satisfaire votre soif de connaissances. Nous vous invitons à vous embarquer dans cette aventure captivante et à découvrir les secrets que renferment les données du Titanic.</p>

      <p>N'hésitez pas à commencer votre exploration dès maintenant et à vous laisser captiver par les histoires et les statistiques uniques de l'épopée du Titanic !</p>
      
      {/* Filtres généraux */}
      <ul>
        <li onClick={handleStatsAge}>Age</li>
        <li onClick={handleStatsSexe}>Sexe</li>
        <li onClick={handleStatsClass}>Classe</li>
      </ul>

      <div>
      {result && <p>{result}</p>} 
      </div>
    </div>
  )
}
