import { useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,SigninSuccess } from '../redux/user/userSlice';
const _useauth = () => {
  const [loading,setloading]=useState(false)
 async function handlesignup(input,setinput){
    try {
        setloading(true)
  const res=      await axios.post('http://localhost:3000/api/auth/sign-up',input)
  console.log(res);
  
    toast.success('Successfully signed up Now you can login');
    setinput({username:'',email:'',password:''})
        
  
      
    } catch (error) {
      if(error.response.status===409)
      {
          toast.error(error.response?.data.message);
          console.log(error.response.data.message)
      }
      if(error.response.status===400)
      {
          toast.error(error.response?.data.message);
          console.log(error.response.data.message)
      }
      if(error.response.status===401)
      {
          toast.error(error.response?.data.message);
          console.log(error.response.data.message)
      }
      if(error.response.status===500)
      {
          toast.error(error.response?.data.message);
          console.log(error.response.data.message)
      }
     
    
      console.log(error);}
    finally{
        setloading(false)
    }
  }
  return {handlesignup,loading}
}
const useLogin = () => {

  const [loading,setloading]=useState(false)
  const[error,seterror]=useState(false)
	// const { setAuthUser } = useAuthContext();
    const dispatch=useDispatch()
    const route=useNavigate();

	const login = async (inputs) => {
		dispatch(signInStart())
        try {
            console.log('Inside login',inputs)
           
      const res= await axios.post('http://localhost:3000/api/auth/Log-in',inputs,{withCredentials:true});
      console.log(res);
          
           if(res.status===200)
           {
            dispatch(SigninSuccess(res?.data.data))
           route('/');
           }
          if(res.status!==200)
          {
            dispatch(signInFailure(error,error?.message))
          }
          
        } catch (error) {
          
            if(error.response.status===409)
            {
                toast.error(error.response?.data.message);
                console.log(error.response.data.message)
            }
            if(error.response.status===400)
            {
                toast.error(error.response?.data.message);
                console.log(error.response.data.message)
            }
            if(error.response.status===401)
            {
                toast.error('Username or Password is required');
                console.log(error.response.data.message)
            }
            console.log(error);
        }
        finally{
            
        }
	};

	return { loading, login };
};



export { _useauth,useLogin}