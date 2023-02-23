import { useState, useEffect, createContext } from 'react';
import AuthService from '../utils/AuthService';

const AuthContext = createContext({})
const auth = new AuthService();

function AuthProviderWrapper(props){
    const [token, setToken] = useState(null); 
    const [userId, setUserId] = useState(null); 

    const login = (token, userId, tokenExpiration) => {
        // this.setState({ token, userId })
        setToken(token);
        setUserId(userId)
      }

    const logout = () => {
        localStorage.removeItem('user');
    // this.setState({token: null, userId: null})
    setToken(null)
    setUserId(null)
    }

    useEffect(()=>{
        if(auth.getUser() !== null ){
           const { token, userId } = auth.getUser();
           setToken(token);
           setUserId(userId);
          }
    },[])

    return (
        <AuthContext.Provider value={{ token, userId, login, logout}}>
          {props.children}
        </AuthContext.Provider>
      )
};

export { AuthContext, AuthProviderWrapper }