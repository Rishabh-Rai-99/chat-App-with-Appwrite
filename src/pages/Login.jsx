import React,{useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const {user,handleUserLogin} = useAuth();
  const navigate = useNavigate()
  
  const [credential,setCredential] = useState({
    email:'',
    password:'',
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
  }, [])
  
  return (
    <div className=' bg-[rgba(20,20,31,11)] w-full text-white flex flex-col  items-center justify-center h-screen'>
      <form onSubmit={(e)=>handleUserLogin(e,credential)} className='gap-5 flex flex-col'>
        <div className='flex flex-col w-full'>
          <label htmlFor="email">Email: </label>
          <input required placeholder='Example@gmail.com' onChange={handleInputChange} value={credential.email}  className='bg-[#22222d] outline-none px-3 py-2 rounded-lg w-72' type="text" name="email" id="email" />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="password">Password: </label>
          <input onChange={handleInputChange} value={credential.password} className='bg-[#22222d] outline-none px-3 py-2 rounded-lg w-72' type="password" name="password" id="password" />
        </div>
        <button type='submit' className='bg-[rgba(219,26,90,1)] py-2 px-3 rounded-lg cursor-pointer' >
        Login
        </button>
      </form>
      <p className='mt-2'>Don't have a account? Register <Link className='underline font-semibold text-blue-400 ' to='/register'>here</Link></p>
    </div>
  )
}

export default Login