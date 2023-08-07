import { commmonfunction } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerFunction = async (data, header) => {
    return await commmonfunction("POST", `${BASE_URL}/user/register`, data, header );
}

export const getAllUser = async () => {
    return await commmonfunction("GET", `${BASE_URL}/getUserDetails`)
}