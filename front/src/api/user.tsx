import axios from "axios";
import { TypeLoginUser, TypeRegisterUser } from "../types/typesUsers";

// Register
export const saveUser = async (data: TypeRegisterUser) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

// Login
export const loginUser = async (data: TypeLoginUser) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

// Verify token
export const checkToken = async (token: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/auth/checkToken`, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response.data;
        })
}