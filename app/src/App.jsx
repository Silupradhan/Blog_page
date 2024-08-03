import React, { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import  authService from "./appwrite/auth"
import { login,logout } from './redux/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'


function App() {

   const [loading,setLoading] = useState(true)
   const dispatch = useDispatch()

   useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login(userData))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))
   },[])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-400'>
      <div className='container mx-auto text-center' >
        <Header/>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
