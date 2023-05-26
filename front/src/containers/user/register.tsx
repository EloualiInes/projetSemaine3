import React, { useState, ReactElement } from 'react';
import { saveUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { TypeRegisterUser } from '../../types/typesUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function Register(): ReactElement {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate()

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        const data: TypeRegisterUser = {
            firstName: firstName,
            lastName: lastName,
            nickName: nickName,
            email: email,
            password: password
        }
        saveUser(data)
            .then((res) => {
                if (res.status === 200) {
                    return navigate('/login')
                }

            }).catch((err: any) => {
                setError(err);
            });

    }


    return (
        <div className='user-container'>
            <form
                onSubmit={onSubmitForm}
                className="form-container"
            >
                <div className="form-title">
                    <label>S'enregistrer</label>
                </div>
                {error && <p style={{ color: "red" }}><FontAwesomeIcon icon={faExclamationCircle} /> {error}</p>}
                <div className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Prénom"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        required
                        type="text"
                        placeholder="Nom"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        required
                        type="text"
                        placeholder="Pseudo"
                        value={nickName}
                        onChange={(e) => {
                            setNickName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        required
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <button
                    className="form-submit"
                    type="submit"
                >
                    Envoyer
                </button>

            </form>

        </div>
    )
}
