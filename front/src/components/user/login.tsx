import React, {useState, ReactElement} from 'react'
// import { loginUser } from '../../api/user';
// import { useAppDispatch, useAppSelector } from '../../lib/redux/hook';
// import { loginUserReducer } from '../../lib/redux/user/userReducer';
import { useNavigate } from 'react-router-dom';

export default function Register(): ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const onSubmitForm = (e: any)=>{
        e.preventDefault();
        // const data: {email: string, password: string} = {      
        //     email: email,
        //     password: password
        // }

        // loginUser(data)
        //     .then((res)=>{
        //         console.log(res);
        //         if(res.data.token) {
        //             window.localStorage.setItem("token-forum", res.data.token);
        //             dispatch(loginUserReducer(res.data.user))
        //             return navigate('/')
        //         }
        //     })


    }

    return (
        <div>
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
