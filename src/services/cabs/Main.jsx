import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import CabsForm from '../../components/forms/CabsBook'
import Header from '../../components/headers/Home-h'
import Navbar from '../../components/headers/Home-nav-bar'
import SimpleWhy from '../../components/containers/ReasonsBook-cabs'
import CabCompanies from "../../components/containers/BusOPerators"
import CoverageArea from '../../components/containers/Cabs-Coverage-area'
import Footer from '../../components/global/Footer'

export default function Cabs() {
  const [data,setData]=useState({
   tickets:[],
   userImage:"",
  })
    const [error, setError] = useState('')
    useEffect(() => {
      async function fetchData() {
        try {
          const token =localStorage.getItem("moveSmart_client_token");
          Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const response = await Axios.get('https://ms-client.onrender.com/home');
          setData(response.data)
        } catch (error) {
            setError(error.response.data.message);
        }
      }
      fetchData()
    },[])
  return (
    <div className='grid gap-6 overflow-x-hidden'>
      <Header image={data.userImage} error={error}/>
      <Navbar tickets={data.tickets}/>
      <CabsForm/>
      <SimpleWhy />
      <CoverageArea/>
      <CabCompanies title={"Companies"} />
      <Footer/>
    </div>
  )
}
