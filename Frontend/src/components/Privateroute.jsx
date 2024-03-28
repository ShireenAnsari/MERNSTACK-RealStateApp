import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
export const Privateroute = () => {
    const {currentUser} = useSelector((state) => {
        console.log(state?.persistedReducer.user
            );
        return state?.persistedReducer.user;
      });
  return currentUser?<Outlet/>:(
    <Navigate to={'/sign-in'}/>
  )
}
