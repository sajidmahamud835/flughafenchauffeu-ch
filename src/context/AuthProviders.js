import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext();

const AuthProviders = ({ children }) => {

    const allContexts = useFirebase();

    return (
        <div>
            <AuthContext.Provider value={allContexts}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProviders;