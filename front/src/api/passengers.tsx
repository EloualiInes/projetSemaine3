import axios from "axios";
import { TypeDataSearchPassengers } from "../types/typesSearchPassengers";

// Get age passagers for stats
export const getAge = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/age`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

// Get sexe passagers for stats
export const getSexe = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/sexe`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

// Get classe passagers for stats
export const getClass = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/class`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

// Get survivor passagers for stats
export const getSurvived = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/survived`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

// User can search passengers
export const searchPassengers = async (data: TypeDataSearchPassengers) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/stats/search`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}