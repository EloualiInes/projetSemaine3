import React, { useEffect, ReactNode} from "react";
import { loginUserReducer, selectUser } from "../redux/userReducer";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../api/user";

export default function RequireAuth({children, withAuth}:{children:ReactNode, withAuth: boolean}) {
  
        const dispatch = useDispatch();
        const user = useSelector(selectUser)
        const navigate = useNavigate();

        useEffect(()=>{
            verifyLogin()
        })

        const verifyLogin = async ()=>{
            const token = window.localStorage.getItem("token");
            if(!user.isLogged && withAuth) {
                if(token === null ) {
                    return navigate("/")
                } else {       
                    
                    const res: {status: number, data: any} = await checkToken(token)
                    if(res.status === 200) {
                        // if token exist and find info user => i connect user
                        dispatch(loginUserReducer(res.data.user))
                    } else {
                        // else navigate
                        return navigate("/login")
                    } 
                }
            }
        }


        return (<>{children}</>)
           
}
