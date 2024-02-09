import React, { useState } from 'react';
import {Box} from "@mui/material"
import { Form} from 'react-bootstrap';
import Axios from 'axios';
import { FcGoogle } from 'react-icons/fc'
import SVGImage from "../../assests/blob-haikei.svg"
import SVGImage1 from "../../assests/blob-scene-haikei.svg"
import Loader from '../../components/loaders/Loader';
import Language from '../../components/global/Language';




const Login = () => {
     const [loader,setLoader] = useState(false)
     const [data, setData] = useState({
          email: '',
          password: '',
     });

     const [error, setError] = useState('');

     const handleChange = (event) => {
          const { name, value } = event.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
     };

     const handleSubmit = async (event) => {
          event.preventDefault(); // prevent the default form submission behavior
          try {
               setLoader(true)
               const response = await Axios.post('https://ms-client.onrender.com/login', data);
               const token = response.data.token;
               localStorage.setItem('moveSmart_client_token', token);
               // console.log(token);
               Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
               setLoader(false)
               window.location = "/";
          } catch (error) {
               setLoader(false)
               setError(error.response.data.message);
          }
     };

     return (
          <div className='w-full min-h-screen grid md:grid-cols-12 sm:grid-cols-12 grid-cols-1 relative'>
               <div className="relative md:col-span-5 sm:col-span-6 bg-cover bg-center h-screen"style={{backgroundImage:`url(${SVGImage})`}} >
                    <div className="btn-group absolute top-0 end-[3rem] p-2">
                         <Language/>
                    </div>
                    {error && <Box className='text-center text-red-700 p-3 bg-gray-100 rounded-lg ml-5'>{error}</Box>}
                    <div className="p-5 text-center ">
                         <h1 className="text-center font-extrabold mb-4 te">Login</h1>
                         {!loader?<Form onSubmit={handleSubmit}>
                              <Box className="grid grid-flow-row gap-2">
                                   <input
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={data.email}
                                        className="p-3 bg-transparent border-b-2"
                                        onChange={handleChange}
                                        required />

                                   <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="p-3 bg-transparent border-b-2"
                                        required />

                              <div className='row justify-content-center'>
                                   <button type="submit" className="mt-4 px-6 rounded-lg p-2 bg-blue-500">
                                        Login
                                   </button>
                              </div>
                              </Box>
                         </Form>:<Loader/>}
                         <button type="button" className="flex justify-center items-center gap-2 mt-2 mx-auto p-2 px-4 bg-slate-400 rounded-3xl">continue with<FcGoogle size={18} /></button>
                         <p>New to MoveSmart  <a href="/signup" className="font-bold text-blue-900 underline hover:text-blue-950">Sign up</a></p>
                    </div>
               </div>
               <div className="md:col-span-7 sm:col-span-6 flex items-center justify-center  bg-cover bg-center SignUp_divisions rounded-l-[2rem]" style={{backgroundImage:`url(${SVGImage1})`}}>
                    <h1 className='md:text-8xl sm:text-5xl font-extrabold'>Move<span className='text-yellow-500'>Smart</span></h1>
               </div>
               </div>
     );
};

export default Login;

