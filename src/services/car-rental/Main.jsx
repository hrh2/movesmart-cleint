import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import SideBar from '../../components/sidebars/Car-rental-side';
import { Outlet } from'react-router-dom';
import { Box } from '@mui/material';
import {Typography} from '@mui/material';
import Footer from '../../components/global/Footer'


export default function Main() {
  // eslint-disable-next-line 
  const [isSidebar, setIsSidebar] = useState(true);
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  useEffect(() => {
    async function fetchData() {
      try {
        const token =localStorage.getItem("moveSmart_client_token");
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        const response = await Axios.get('http://localhost:3050/home');
        setData(response.data)
      } catch (error) {
          setError(error.response.data.message);
          setTimeout(()=>{
            setError(false)
          },1700)
      }
    }
    fetchData()
  },[])
  return (
    <Box className=" max-w-full overflow-x-hidden"> 
   <Box className='app '>
    <SideBar isSidebar={isSidebar} image={data.userImage} name={data.name}/>
      <main className='content max-h-[93vh] overflow-y-scroll scrollbar-hide'>
        {error&&<Typography>
          {error}
        </Typography>}
        <Outlet/>
      </main>
   </Box>
   <Footer/>
   </Box>
  )
}
