import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:null,
    loading:false
}
const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        SigninSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false
            state.error=null
        },
        signInFailure:(state,action)=>{
          state.error=action.payload;
          state.loading=false
        }
    }
})
export const{signInStart,signInFailure,SigninSuccess}=UserSlice.actions;
export default UserSlice.reducer;