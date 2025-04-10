import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Register = () => {

    const {user,handleUserRegister} = useAuth();
    const navigate = useNavigate();

    const [credential,setCredential] = useState({
        email:'',
        username:'',
        password1:'',
        password2:'',
      });

    const handleInputChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
    
        setCredential({...credential,[name]:value})    
      }
      useEffect(() => {
          if (user) {
            navigate('/')
          }
        }, [user, navigate])

  return (
    <div className=' bg-[rgba(20,20,31,11)] w-full text-white flex flex-col  items-center justify-center h-screen'>
      <form onSubmit={(e)=>handleUserRegister(e,credential)} className='gap-5 flex flex-col'>
      <div className='flex flex-col w-full'>
          <label htmlFor="username">Name: </label>
          <input required placeholder='Peter Parker' onChange={handleInputChange} value={credential.username}  className='bg-[#22222d] outline-none px-3 py-2 rounded-lg w-72' type="text" name="username" id="username" />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="email">Email: </label>
          <input required placeholder='Example@gmail.com' onChange={handleInputChange} value={credential.email}  className='bg-[#22222d] outline-none px-3 py-2 rounded-lg w-72' type="email" name="email" id="email" />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="password">Password: </label>
          <input  required onChange={handleInputChange} value={credential.password1} className='bg-[#22222d] outline-none px-3 py-2 rounded-lg w-72' type="password" name="password1" id="password1" />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="password">Confirm Password: </label>
          <input required  onChange={handleInputChange} value={credential.password2} className='bg-[#22222d] outline-none px-3 py-2 rounded-lg w-72' type="password" name="password2" id="password2" />
        </div>
        <button type='submit' className='bg-[rgba(219,26,90,1)] py-2 px-3 rounded-lg cursor-pointer' >
        Register
        </button>
      </form>
      <p className='mt-2'>Don't have a account? Login <Link className='underline font-semibold text-blue-400 ' to='/login'>here</Link></p>
    </div>
  )
}

export default Register