import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {_useauth} from '../actions/auth'

const Signup = () => {
  const [state, setState] = useState({ username: "", email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
const {loading,handlesignup}=_useauth()
  const handleSubmit =async (e) => {
    e.preventDefault();
    await handlesignup(state,setState)
   
    
    console.log(state);
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' name='username' value={state.username} onChange={handleChange} placeholder='username' className='border border-gray-400 p-3 rounded-lg focus:outline-none ' />
        <input type='email' name='email' value={state.email} onChange={handleChange} placeholder='email' className='border border-gray-400 p-3 rounded-lg focus:outline-none' />
        <input type='password' name='password' value={state.password} onChange={handleChange} placeholder='password' className='border border-gray-400 p-3 rounded-lg focus:outline-none' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-90'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/Sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup;
