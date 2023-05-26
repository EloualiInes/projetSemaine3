import React, { useState, ReactElement } from 'react'
import { loginUser } from '../../api/user';
import { useDispatch } from 'react-redux';
import { loginUserReducer } from '../../lib/redux/userReducer';
import { useNavigate } from 'react-router-dom';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TypeLoginUser } from '../../types/typesUsers';

export default function Register(): ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        const data: TypeLoginUser = {
            email: email,
            password: password
        }

        loginUser(data)
            .then((res) => {
                if (res.status === 200) {
                    // login ok => localstorage token + redux infos user + navigate home
                    localStorage.setItem("token", res.data.token);
                    dispatch(loginUserReducer(res.data.user._doc));
                    navigate("/home");
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
                {error && <p style={{ color: "red" }}><FontAwesomeIcon icon={faExclamationCircle} /> {error}</p>}
                <div className="form-title">
                    <label>Se connecter</label>
                </div>
                
                <div className="form-group">
                    <input
                        className="form-input"
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
                    Connexion
                </button>
            </form>
        </div>
    )
}
