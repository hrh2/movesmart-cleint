// eslint-disable-next-line 
import React,{ useState, useEffect } from 'react';
import {Box,useTheme} from '@mui/material'
import { tokens } from '../../hooks/Theme';
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios'

import AvailableTickets from '../../components/containers/AvailableTickets';
import Loader from '../../components/loaders/Loader'

function MyForm() {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const [routes, setRoutes] = useState([]);
     const [error, setError] = useState(null);
     const [availableTickets, setAvailableTickets] = useState([]);
     const [trueReponse, setResponse] = useState(false);
     const [loading, setLoading] = useState(false);
     const [data,setData] = useState({
          from:"",
          to:"",
          date:"",
     })

    
     const handleChange = (event) => {
          const { name, value } = event.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
     };        
        const token =localStorage.getItem("moveSmart_client_token");
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        useEffect(() => {
          async function fetchData() {
            try {
              const response = await Axios.get('https://ms-client.onrender.com/search/stations');
              setRoutes(response.data)
            } catch (error) {
                setError(error.response.data.message);
              }
          }
          fetchData()
        },[])
        
        const handleSubmit = async (event)=>{
          event.preventDefault(); // prevent the default form submission behavior
          try {
               setLoading(true)
               const response = await Axios.post('https://ms-client.onrender.com/search/tickets', data);
               setAvailableTickets(response.data);
               setTimeout(()=>{
                    setLoading(false)
               },500)
               setResponse(true);
          } catch (error) {
               setError(error.response.data.message);
               setTimeout(()=>{
                    setLoading(false)
                    setError(false);
               },500)
          }
     }
     const routesWithLabel = routes.map(route => {
          return { ...route, label: `from  ${route.from}  to  ${route.to}` };
      });
      
     return (
          <Box className='md:w-4/6 sm:w-5/6 w-11/12 mx-auto px-4 rounded-lg box-shadow' backgroundColor={colors.primary[400]} >
               <form className="" onSubmit={handleSubmit}>
                    <Box className="items-center relative">
                         <h2 className={`text-[${colors.grey[100]}] font-bold pt-3 pb-2  px-2 text-[.5em] sm:text-[.8em] md:text-[1.245em] relative`}>Search Ticket for Your Journey</h2>
                         {error?<p>{error}</p>:""}
                         <Box className='grid md:grid-flow-col gap-1 sm:grid-flow-col relative'>
                              <Box className="input-group p-0 m-0">
                                   <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={routesWithLabel}
                                        noOptionsText="No matching route"
                                        onChange={(event, value) => {
                                             if(value.from)
                                             setData((prevData) => ({ ...prevData, from: value.from,to:value.to}));
                                             if(!value.from)
                                             setData((prevData) => ({ ...prevData, from: "",to:""}));
                                           }}
                                        fullWidth
                                        renderInput={(params) => <TextField className={`text-[${colors.grey[100]}]`} {...params} label="From/ aho ugie kuva" />}
                                   />
                              </Box>
                              <Box className='input-group'>
                                   <input
                                        type="Date"
                                        name='date'
                                        className="form-control border h-full text-center w-full rounded-lg bg-transparent"
                                        aria-label=""
                                        min="2023-10-01" 
                                        max="2023-10-31"
                                        onChange={handleChange}
                                        placeholder="Date"
                                        required />
                              </Box>
                         </Box>
                         <Box className={`flex flex-column items-center my-3 text-[${colors.grey[100]}] justify-center`}>
                              <button
                                   type="submit"
                                   className={`border-0 bg-blue-900 px-5 py-2 rounded-3xl md:w-1/3 w-1/2`}>
                                   Search
                              </button>
                         </Box>
                         <Box className="relative md:bottom-16 sm:bottom-16 bottom-28  px-3 bg-white text-black rounded-b-md">
                         </Box>
                    </Box>
                    <Box>
                    
                    </Box>
               </form>
               {loading&&<Loader/>}
               {trueReponse&& !loading ?<AvailableTickets data={availableTickets} from={data.from} to={data.to} />:""}
          </Box>
     );

}
export default MyForm;
