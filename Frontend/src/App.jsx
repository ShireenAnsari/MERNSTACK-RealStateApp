import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import { Privateroute } from './components/Privateroute'
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/about' element={<About/>}/>
      <Route  element={<Privateroute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
