import React, {useState, ReactElement} from 'react'
import { loginUser } from '../../api/user';
import {useDispatch, useSelector} from 'react-redux';
import { loginUserReducer } from '../../lib/redux/userReducer';
import { useNavigate } from 'react-router-dom';

export default function Register(): ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>(""); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitForm = (e: any)=>{
        e.preventDefault();
        const data: {email: string, password: string} = {      
            email: email,
            password: password
        }

        loginUser(data)
            .then((res)=>{
                if(res.status === 200) {
                    // login ok => localstorage token + redux infos user + navigate home
                    console.log(res);
                    localStorage.setItem("token", res.data.token);
                    dispatch(loginUserReducer(res.data.user));
                    navigate("/home");
                }
            }).catch((err: any) => {
                console.log(err)
                setError(err); 
            });


    }

    return (
        <div>
            {error && <p>{error}</p>} 
            <form
                onSubmit={onSubmitForm}
                className="block custom-form"
            >   
                <div>
                    <label>Se connecter</label>
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Mot de passe" 
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <button
                    type="submit"
                >
                    Envoyer
                </button>
            </form>
        </div>
    )
}
