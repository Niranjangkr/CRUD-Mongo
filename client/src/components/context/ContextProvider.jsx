import { createContext, useState } from "react";

export const addData = createContext();

const ContextProvider = ( {children} ) => {
    const [ udata, setudata ] = useState('');
    return(
        <>
            <addData.Provider value={{ udata, setudata }}>
                { children }
            </addData.Provider>
        </>
    )
}

export default ContextProvider;