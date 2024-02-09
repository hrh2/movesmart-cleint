import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import { tokens } from "../../hooks/Theme";
import { Box,useTheme} from "@mui/material";
import RouteCard from "../cards/RouteCard"
import LinearLoader from '../../components/loaders/LinearLoader'

export default function StationDescription() {
    const theme = useTheme();
     const colors = tokens(theme.palette.mode);
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(false);
    // eslint-disable-next-line
    const [error, setError] = useState('')
    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true)
          const token =localStorage.getItem("token");
          Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const response = await Axios.get('https://ms-client.onrender.com/search/linked');
          setData(response.data)
          setLoading(false)
        } catch (error) {
            setError(error.response.data.message);
            setTimeout(()=>{
              setLoading(false);
              setError(null)
          },2000)
        }
      }
      fetchData()
    },[])
  return (
  <>
  <h1 className='md:w-4/5 mx-auto w-5/6 py-3 text-xl font-bold'>{data.length!==0?"Accessible BUS Routes":"No Registered Station"}</h1>
    <Box className="mx-auto md:w-4/5  sm:w-5/6 w-11/12 p-3 grid md:grid-cols-3 grid-cols-1 gap-3 box-shadow rounded-lg " backgroundColor={colors.primary[600]}>
          {data.map(station=>{
            const linksId=station.LinkedDestinationIDs
            return <RouteCard key={station._id} name={station.name} links={linksId} stations={data}/>
          })}
          {loading&&<LinearLoader/>}
  </Box>
  </>
  )
}