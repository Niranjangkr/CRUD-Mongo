import { commmonfunction } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerFunction = async (data, header) => {
    return await commmonfunction("POST", `${BASE_URL}/user/register`, data, header );
}

export const getAllUser = async (search, gender, status, order) => {
    return await commmonfunction("GET", `${BASE_URL}/getUserDetails?search=${search}&gender=${gender}&status=${status}&order=${order}`,"")
}

export const getSingleUser = async (data) => {
    return await commmonfunction("GET", `${BASE_URL}/userprofile/${data}`)
}

export const deleteSingleUser = async(data) =>{
    return await commmonfunction("DELETE", `${BASE_URL}/deleteSingleUser/${data}`,{})
}

export const updateUser = async(id, data, header) => {
    return await commmonfunction("PUT", `${BASE_URL}/updateuser/${id}`, data, header )
}

export const updateUserStatus = async(id, data) => {
    return await commmonfunction("PUT", `${BASE_URL}/user/status/${id}`, {data} );
}


// export const searchData = async(data) => {
//     return commmonfunction("GET", `${BASE_URL}/findusers/${data}`);
// }