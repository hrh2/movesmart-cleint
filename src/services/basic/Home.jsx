import React, { useState,useEffect} from 'react';
import Axios from 'axios'
import Header from '../../components/headers/Home-h.jsx';
import Navbar from '../../components/headers/Home-nav-bar.jsx';
import BookForm from '../../components/forms/BusBookingForm.jsx'
import EarnWithUs from '../../components/containers/EarnWithUs.jsx';
import StationDescription from '../../components/containers/AvailableStations.jsx';
import BusOperators from '../../components/containers/BusOPerators.jsx';
import Footer from "../../components/global/Footer.jsx"
const Home = () => {
// eslint-disable-next-line
const [data,setData]=useState({
 userImage:'',
 tickets:[],
})
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
      }
  }
  fetchData()
},[])
     return (
        <div className=' overflow-x-hidden'>
        <div className=' min-h-screen w-full grid grid-flow-row gap-5'>
            <Header image={data.userImage} error={error}/>
            <Navbar tickets={data.tickets}/>
            <BookForm />
            <StationDescription/>
            <EarnWithUs/>
            <BusOperators/>
        </div>
            <Footer/>
        </div>
     );
};

export default Home;
