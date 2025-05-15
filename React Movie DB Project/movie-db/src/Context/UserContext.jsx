import React from 'react';
import { useContext } from 'react';

export const UserContext = React.createContext({});
export const useUser = () => useContext(UserContext);