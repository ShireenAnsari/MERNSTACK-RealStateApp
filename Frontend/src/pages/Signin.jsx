import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../actions/auth';
import OAuth from '../components/OAuth';

const Signin = () => {
  const [state, setState] = useState({ username: "", password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(state)
    setState({ ...state, [name]: value });
  }
const {loading,login}=useLogin()
  const handleSubmit =async (e) => {
    e.preventDefault();
    await login(state)
    console.log('In login',state);
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' name='username' value={state.username} onChange={handleChange} placeholder='username' className='border border-gray-400 p-3 rounded-lg focus:outline-none ' />
        <input type='password' name='password' value={state.password} onChange={handleChange} placeholder='password' className='border border-gray-400 p-3 rounded-lg focus:outline-none' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-90'>Sign in</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/Sign-up'}>
          <span className='text-blue-700'>{loading?'...':'Sign in'}</span>
        </Link>
      </div>
    </div>
  )
}

export default Signin