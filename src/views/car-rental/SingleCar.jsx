import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Box } from "@mui/material";
import Images from '../../components/containers/Render-many-img';
import Form from '../../components/forms/Rent-car-from';
import CommentForm from '../../components/forms/Comment-on-car';

export default function Main() {
  const { id } = useParams();
  const [imagesArray, setImages] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("moveSmart_client_token");
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        const response = await Axios.get(`https://ms-client.onrender.com/car-rental/single/${id}`);
        setData(response.data);
        setImages(response.data.images);
      } catch (error) {
          setError("Unexpected error occurred: ");
      }
    }
    fetchData();
  }, [id]); // Include 'id' as a dependency to re-fetch data when the route parameter changes

  // Conditional rendering to ensure data is available before rendering child components
  return (
    <Box className='content px-2'>
      <Box className="text-red-500">{error}</Box>
      {Object.keys(data).length > 0 && (
        <>
          <Box className="w-[80vw] mx-auto">
            <Images imagesArray={imagesArray} />
          </Box>
          <h1 className='border-l-4 px-2 font-bold my-2 md:text-base sm:text-sm text-xs w-5/6 mx-auto'>CAR's DESCRIPTION</h1>
          <div className='md:w-9/12 mx-auto md:text-base sm:text-sm text-xs grid md:grid-flow-row sm:grid-cols-4 grid-cols-2 gap-2 my-2'>
              <h2 className='font-bold'>Name: <span className='text-[80%] font-light italic'>{data.name}</span></h2>
              <h2 className='font-bold'>Brand: <span className='text-[80%] font-light italic'>{data.bland}</span></h2>
              <h2 className='font-bold'>Company: <span className='text-[80%] font-light italic'>{data.company}</span></h2>
              <h2 className='font-bold'>Plate No: <span className='text-[80%] font-light italic'>{data.plate}</span></h2>
          </div>
          <Form details={data} />
          <CommentForm />
        </>
      )}
    </Box>
  );
}
