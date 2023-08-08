import { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const deleteUser = createContext();

const ContextProvider = ({ children }) => {
    const [delUser, setDelUser] = useState('');
    const [udata, setudata] = useState('');
    const [updateU, setUpdateUser] = useState('');
    return (
        <>
            <deleteUser.Provider value={{ delUser, setDelUser }} >
                <updateData.Provider value={{ updateU, setUpdateUser }}>
                    <addData.Provider value={{ udata, setudata }}>
                        {children}
                    </addData.Provider>
                </updateData.Provider>
            </deleteUser.Provider>
        </>
    )
}

export default ContextProvider;