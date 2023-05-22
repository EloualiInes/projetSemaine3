import axios from "axios";

export const saveUser = (data : { firstName: string,
    lastName: string,
    nickName: string,
    email: string,
    password: string})=>{
        console.log("in chemin : ", `${process.env.REACT_APP_API_URL}/api/user/signup)`)
    return axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, data)
            .then((response: any): any=>{
                return response.data
            })
            .catch((err: Error):void=>{
                console.log(err);
            })
}