import React, { useState } from 'react';
import { searchPassengers } from '../api/passengers';


type TypePassenger = {
    Name: string,
    Age: number,
    Sex: string,
    Pclass: number,
    PassengerId: number,
    Cabin: string,
    Ticket: number,
    Survived: number
}
export default function WindowSearch() {
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [sexe, setSexe] = useState('female');
    const [classe, setClasse] = useState('classe 1');
    const [result, setResult] = useState([]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Nom:', nom);
        console.log('Age:', age);
        console.log('Sexe:', sexe);
        console.log('Classe:', classe);
        const p = await searchPassengers({ nom: nom, age: parseInt(age, 10), sexe: sexe, classe: parseInt(classe.slice(6), 10) })
        console.log("res : ", p);
        setResult(p);
    };

    return (

        <div className="search-container">
            <form onSubmit={handleSubmit} className='form-search'>
                <div>
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="age">Age :</label>
                    <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="sexe">Sexe :</label>
                    <select id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="classe">Classe :</label>
                    <select id="classe" value={classe} onChange={(e) => setClasse(e.target.value)}>
                        <option value="classe 1">Classe 1</option>
                        <option value="classe 2">Classe 2</option>
                        <option value="classe 3">Classe 3</option>
                    </select>
                </div>
                <button type="submit">Valider</button>
            </form>
            {result && (
                <><p>{result.length} résultat{result.length > 1 ? "s" : ""}</p>
                <div className="result">
                    
                    {result.map((e: TypePassenger) => (
                        <div className="result-card" key={e.PassengerId}>
                            <div className="result-card-content">
                                <p className="result-card-heading">{e.Name}</p>
                                <div className="result-card-details">
                                    <p>Age: {e.Age}</p>
                                    <p>Genre: {e.Sex}</p>
                                    <p>Classe: {e.Pclass}</p>
                                    <p>Numéro passager: {e.PassengerId}</p>
                                    <p>Cabine: {e.Cabin}</p>
                                    <p>Billet: {e.Ticket}</p>
                                    <p className={e.Survived === 0 ? "result-card-not-survived" : "result-card-survived"}>
                                        {e.Survived === 0 ? "N'a pas survécu" : "A survécu"}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}
