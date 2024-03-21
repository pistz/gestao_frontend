import React, { createContext, useState } from 'react';
import { AuthContextData, IChildren } from './types';


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [signed, setSigned] = useState<boolean>(false);

    const [userEmail, setUserEmail] = useState<string>(""); //TODO

    const [userRole, setUserRole] = useState<string>("");

    const [userPassword, setUserPassword] = useState<string>(""); //TODO

    const [userToken, setUserToken] = useState<string>("");

    return (
    <AuthContext.Provider value={{ signed, setSigned,
                userEmail, setUserEmail, userRole, setUserRole, userPassword, setUserPassword, userToken, setUserToken}}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthContext;