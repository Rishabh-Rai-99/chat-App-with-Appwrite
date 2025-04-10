import React, { createContext, useContext, useEffect, useState } from 'react'
import { account } from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { OrbitProgress } from 'react-loading-indicators'
import { ID } from 'appwrite';

const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    
    useEffect(() => {
        getUserOnload();
    }, [])
    
    const getUserOnload = async ()=>{
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }
    
    const handleUserLogout = async()=>{
          await account.deleteSession('current');
         setUser(null)
    }

    const handleUserRegister = async(e,credentials)=>{
      e.preventDefault();
      setLoading(true);
      
      if (credentials.password1 !== credentials.password2) {
        alert("passwords does not match");
        setLoading(false);
        return;
      }

      try {
        const response = await account.create(
          ID.unique(),
          credentials.email,
          credentials.password1,
          credentials.username,
        )
        console.log("REGISTERD: ",response);
        await account.createEmailPasswordSession(credentials.email, credentials.password1);
        const accountDetails = await account.get();
        setUser(accountDetails);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
      finally{
        setLoading(false);
      }
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
          console.log("LOGGED IN: ", response);
          const accountDetails = await account.get();
          setUser(accountDetails);
          return true;

        } catch (error) {
          console.log(error);
          alert(error.message || "Something went wrong");
          return false;

        } finally {
          setLoading(false);
        }
      };
      

    const contextData = { 
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return(
        <AuthContext.Provider value={contextData}>
        {loading ? 
        <div className=' bg-[rgba(20,20,31,11)] w-full text-white flex items-center justify-center h-screen'>
        <OrbitProgress color="rgba(219,26,90,1)" size="medium" text="" textColor="" /> 
        </div>
        : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext