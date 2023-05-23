import axios from "axios";

export const getAge = async () =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/age`);
        return response.data;
    } catch (error :  any) {
        throw error.response.data.error;
    }
}

export const getSexe = async () =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/sexe`);
        return response.data;
    } catch (error :  any) {
        throw error.response.data.error;
    }
}

export const getClass = async () =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/class`);
        return response.data;
    } catch (error :  any) {
        throw error.response.data.error;
    }
}

export const searchPassengers = async (data : {nom : string, age : number,sexe : string, classe : number }) =>{
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/stats/search`, data);
        return response.data;
    } catch (error :  any) {
        throw error.response.data.error;
    }
}