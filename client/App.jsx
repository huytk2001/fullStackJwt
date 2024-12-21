import React, { useEffect } from 'react'
import GlobalProvider from './src/component/provider/GlobalProvider'
import Header from './src/component/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserDetail, setUserDetails } from './src/redux/userSlice'
import { fetchCartItems } from './src/redux/Card/cardSlice'

export default function App() {
    const dispatch = useDispatch()
    const fetchUser = async()=>{
     try {
      const userData = await fetchUserDetail()
      dispatch(setUserDetails(userData.data))
     } catch (error) {
      console.log(error);
      
     }
    }
    const fetchCard = async()=>{
      try {
        dispatch(fetchCartItems())
      } catch (error) {
        console.log(error);
      }
    }
useEffect(()=>{
  fetchUser()
  fetchCard()
},[])
  return (
   <GlobalProvider>
    <Header/>
    <main>
        <Outlet/>
    </main>
   </GlobalProvider>
  )
}
