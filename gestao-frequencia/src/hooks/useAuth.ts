import { useContext } from 'react';
import AuthContext from '../context/authenticate';

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}