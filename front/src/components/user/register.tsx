import React, {useState, ReactElement} from 'react'
// import { UserQuery } from '../../types/user-types';
import { saveUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';

export default function Register(): ReactElement {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>(""); 
    const navigate = useNavigate()

    const onSubmitForm = (e: any)=>{
        e.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            nickName: nickName,
            email: email,
            password: password
        }
        console.log("Hello data : ", data)
        saveUser(data)
            .then((res)=>{
                if(res.status === 200) {
                    return navigate('/login')
                }
                
            }).catch((err: any) => {
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
                    <label>S'enregistrer</label>
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Prénom" 
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <input 
                        required
                        type="text" 
                        placeholder="Nom" 
                        value={lastName}
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <input 
                        required
                        type="text" 
                        placeholder="Pseudo" 
                        value={nickName}
                        onChange={(e)=>{
                            setNickName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <input 
                        required
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
                        required
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
