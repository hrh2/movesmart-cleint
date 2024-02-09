import React,{ useState } from "react";
import {Box} from "@mui/material"
import Dropzone from "react-dropzone";
import { Form, Alert } from "react-bootstrap";
import { FcGoogle} from "react-icons/fc";
import {FaPlus,FaCloudUploadAlt} from "react-icons/fa";
import SVGImage from "../../assests/wave-haikei.svg"
import SVGImage1 from "../../assests/blob-scatter-haikei.svg"
import Loader from "../../components/loaders/Loader"
import Axios from "axios";
import Language from '../../components/global/Language';

const Signup = () => {
     // const [file, setFile] = useState(null);
     const [loader,setLoader] =useState(false)
     const [data, setData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          phone:null,
          cardNumber:'',
          username: '',
          password: '',
          image:null
     });
     const [image,setImage]=useState(null)

     
    
     const [error, setError] = useState('');
     const handleChange = ({ currentTarget: input }) => {
          setData({ ...data, [input.name]: input.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               setLoader(true)
               data.image=image
               const response = await Axios.post('http://localhost:3050/signup', data);
               const token = response.data.token;
               localStorage.setItem('moveSmart_client_token', token);
               Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
               setLoader(false)
               window.location = "/";
          } catch (error) {
            setLoader(false)
            setError(error.response.data.message);
          }
     };
     const imageDivStyle = {
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "10rem", // Adjust the width and height as needed
          height: "10rem",
        };
        const handleDrop = (acceptedFiles) => {
          const file = acceptedFiles[0];
          const reader = new FileReader();
      
          reader.onload = (event) => {
            setImage(event.target.result);
          };
      
          if (file) {
            reader.readAsDataURL(file);
          }
        };

     return (
          <div className="w-full min-h-screen grid md:grid-cols-12 sm:grid-cols-12 grid-cols-1">
               <div className=" md:col-span-7 sm:col-span-6 SignUp_divisions flex items-center justify-center rounded-r-[2rem] bg-cover bg-center" style={{backgroundImage:`url(${SVGImage})`}}>
                    <h1 className='md:text-8xl sm:text-5xl font-extrabold'>Move<span className='text-yellow-500'>Smart</span></h1>
               </div>
               <div className=" md:col-span-5 sm:col-span-6 h-screen overflow-y-scroll bg-cover bg-center relative" style={{backgroundImage:`url(${SVGImage1})`}}>
                    <div className="btn-group absolute top-0 end-[3rem] p-2">
                         <Language/>
                    </div>
                    <div className="p-5 text-center">
                         <h1 className="font-bold text-lg">Sign Up</h1>
                         {error && <Alert variant="danger">{error}</Alert>}
                         {!loader?<Form onSubmit={handleSubmit} >
                         <div className="mx-auto w-[10rem] aspect-square">
                              <Dropzone onDrop={handleDrop} accept="image/*" >
                                   {({ getRootProps, getInputProps }) => (
                                        <div
                                         {...getRootProps()}
                                         className="w-full h-full rounded-full relative bg-white text-center flex items-center box-shadow"
                                         style={imageDivStyle}
                                         >
                                   <input {...getInputProps()} />
                                    {image ? null : (
                                    <p className="text-black text-center w-full grid grid-flow-row">
                                        <FaCloudUploadAlt size={30} className="mx-auto"/>
                                        <span className="italic">Drop or Tap to upload</span>
                   
                                   </p>
                                  )}<FaPlus size={25} className=" absolute bottom-3 right-2 text-slate-500"/>
                                  <FaPlus size={25} className=" absolute bottom-3 right-2 text-slate-500"/>
                                        </div>
                                 )}
                             </Dropzone>
                         </div>
                              <Box className="grid grid-flow-row gap-2">
                                   <input
                                        type="text"
                                        name="firstName"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="p-3 bg-transparent border-b-2"
                                        required
                                   />
                                   <input
                                        type="text"
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleChange}
                                        className="p-3 bg-transparent border-b-2"
                                        placeholder="Last Name"
                                        required
                                   />
                                   <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="p-3 bg-transparent border-b-2"
                                        required
                                   />
                                   <input
                                        type="number"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className="p-3 bg-transparent border-collapse border-b-2"
                                        placeholder="Phone Number"
                                        required
                                   />
                                   <input
                                        type="text"
                                        name="cardNumber"
                                        autoComplete="off"
                                        value={data.cardNumber}
                                        onChange={handleChange}
                                        className="p-3 bg-transparent border-b-2"
                                        placeholder="card Number"
                                        required
                                   />
                                   <input
                                        type="text"
                                        name="username"
                                        autoComplete="off"
                                        value={data.username}
                                        onChange={handleChange}
                                        className="p-3 bg-transparent border-b-2"
                                        placeholder="Username"
                                        required
                                   />
                                   <input
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="p-3 bg-transparent border-b-2"
                                        placeholder="Password"
                                        required
                                   />
                              </Box>
                              <div className=" grid grid-flow-row gap-2">
                                   <button variant="secondary" type="reset" className="p-1 bg-yellow-700 w-1/6 rounded-md mx-auto my-2">reset</button>
                                   <button variant="primary" type="submit" className="bg-blue-500 rounded-xl p-2 w-1/3 mx-auto">Sign Up</button>
                              </div>
                         </Form>:<Loader/>}
                        <button type="button" className="flex justify-center items-center gap-2 mt-2 mx-auto p-2 px-4 bg-slate-400 rounded-3xl">continue with<FcGoogle size={18} /></button>
                         <p>Have an Account? <a href="/login" className="font-bold text-blue-900 underline hover:text-blue-950">login</a></p>
                   </div>
               </div>
        </div>
     );
};

export default Signup;
