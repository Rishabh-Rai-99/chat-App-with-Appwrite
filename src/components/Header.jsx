import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from '../utils/AuthContext';


const Header = () => {
    const {user,handleUserLogout} = useAuth();
  return (
    <div className='bg-[#292935] py-2 px-3 w-[100%] md:w-[40%] mt-0 md:mt-10 rounded-t-xl flex justify-between'>
        {user ?<> 
            <h2 className='font-semibold text-lg'>Welcome! {user.name}</h2>
            <button onClick={handleUserLogout}>
            <IoIosLogOut className='cursor-pointer text-2xl' />
            </button>
        </> :
            <button className='bg-[rgba(219,26,90,1)] py-2 px-3 rounded-lg cursor-pointer'>Login</button>
        }
    </div>
  )
}

export default Header