import axios from "axios";

export const saveUser = async (data : { firstName: string,
    lastName: string,
    nickName: string,
    email: string,
    password: string})=>{
        console.log("in chemin : ", `${process.env.REACT_APP_API_URL}/api/user/signup)`)
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, data);
        return response.data;
    } catch (error :  any) {
        throw error.response.data.error;
    }
}

export const loginUser = async (data : { email: string, password: string}) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, data);
        return response.data;
    } catch (error: any) {
        console.log("error : ", error);
        throw error.response.data.error;
    }
}