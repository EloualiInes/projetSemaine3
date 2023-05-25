import React, { useState } from 'react';
import { searchPassengers } from '../../api/passengers';
import SwitchButton from '../SwitchButton';
import { TypePassengers } from '../../types/components/typePassengers';



export default function WindowSearch() {
    const [nom, setNom] = useState('');
    const [age, setAge] = useState({ value: "", visible: false });
    const [sexe, setSexe] = useState({ value: 'female', visible: false });
    const [classe, setClasse] = useState({ value: 'classe 1', visible: false });
    const [survivant, setSurvivant] = useState({ value: 0, visible: false });
    const [result, setResult] = useState({ value: [], visible: false });
    const [visibleBtnFiltre, setVisibleBtnFiltre] = useState<boolean>(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let data = {};
        if (nom.trim()) data = { ...data, nom: nom };
        if (age.value && age.visible) data = { ...data, age: parseInt(age.value, 10) };
        if (sexe.value && sexe.visible) data = { ...data, sexe: sexe.value };
        if (classe.value && classe.visible) data = { ...data, classe: parseInt(classe.value.slice(6), 10) };
        if (survivant.visible) data = { ...data, survivant: survivant.value };
        const p = await searchPassengers(data);
        setResult({ value: p, visible: true });
    };

    return (

        <div className="search-container">
            <form onSubmit={handleSubmit} className='form-search'>
                <div>
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>

                <div className="filtres-container">
                    <button type="button" onClick={() => setVisibleBtnFiltre(!visibleBtnFiltre)}>Filtres complémentaires</button>
                    {visibleBtnFiltre && <div>
                        <button type="button" onClick={() => setAge({ ...age, visible: !age.visible })}>Age</button>
                        <button type="button" onClick={() => setSexe({ ...sexe, visible: !sexe.visible })}>Sexe</button>
                        <button type="button" onClick={() => setClasse({ ...classe, visible: !classe.visible })}>Classe</button>
                        <button type="button" onClick={() => setSurvivant({ ...survivant, visible: !survivant.visible })}>Survivants</button>
                    </div>}
                </div>


                {age.visible && (<div>
                    <label htmlFor="age">Age :</label>
                    <input type="text" id="age" value={age.value} onChange={(e) => setAge({ ...age, value: e.target.value })} />
                </div>)}

                {sexe.visible && (<div>
                    <label htmlFor="sexe">Sexe :</label>

                    <select id="sexe" value={sexe.value} onChange={(e) => setSexe({ ...sexe, value: e.target.value })}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>

                </div>)}

                {survivant.visible &&
                    <div className='toggleSurvivant'>
                        Survivants
                        <SwitchButton label="survivant"
                            onChange={() => setSurvivant({ ...survivant, value: survivant.value === 0 ? 1 : 0 })}
                        />
                    </div>

                }
                {classe.visible && (<div>
                    <label htmlFor="classe">Classe :</label>
                    <select id="classe" value={classe.value} onChange={(e) => setClasse({ ...classe, value: e.target.value })}>
                        <option value="classe 1">Classe 1</option>
                        <option value="classe 2">Classe 2</option>
                        <option value="classe 3">Classe 3</option>
                    </select>
                </div>)}
                <button type="submit">Valider</button>
            </form>
            {result && result.visible && (
                <>
                    <p>{result.value.length} résultat{result.value.length > 1 ? "s" : ""}</p>
                    <div className="result">

                        {result.value.map((e: TypePassengers) => (
                            <div className="result-card" key={e.PassengerId}>
                                <div className="result-card-content">
                                    <p className="result-card-heading">{e.Name}</p>
                                    <div className="result-card-details">
                                        <p>Age: {e.Age || " /"}</p>
                                        <p>Genre: {(e.Sex && e.Sex === "male" ? "Homme" : "Femme") || " /"}</p>
                                        <p>Classe: {e.Pclass || " /"}</p>
                                        <p>Numéro passager: {e.PassengerId || " /"}</p>
                                        <p>Cabine: {e.Cabin || " / "}</p>
                                        <p>Billet: {e.Ticket || " /"}</p>
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
