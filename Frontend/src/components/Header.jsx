import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {
    const {currentUser,loading} = useSelector((state) => {
        console.log(state?.persistedReducer.user
            );
        return state?.persistedReducer.user;
      });
      const profile=currentUser?.data.user.avatar
      console.log(loading)
  return (
    <header className='bg-slate-200 shadow-md '>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link>
            <h1 className='font-bold text-sm sm:text-xl flex-wrap '>
            <span className='text-slate-500'>Shiri</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
            </Link>
       
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='search' placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
            <FaSearch className='text-slate-500 '/>
        </form>
        <ul className='flex gap-4'>
            <Link to={'/'}>
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
            </Link>
           <Link to={'/about'}>
           <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'> About</li>
           </Link>
           
              {currentUser?(<Link to={'/profile'}><img className='rounded-full h-7 w-7 object-cover' src={profile} alt='profile'/></Link>): <Link to={'/sign-in'}> <li className=' text-slate-700 hover:underline cursor-pointer'>Signin</li> </Link>}
           
           
          
        </ul>
        </div>
       
    
        </header>
  )
}

export default Header