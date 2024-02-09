import React from 'react'
import { tokens } from "../../hooks/Theme";
import { Box,useTheme } from "@mui/material";
import BusOperatorCard from '../cards/BusOperator';
import CarImage3 from "../../assests/illustration-two-taxi-cars.png"

export default function  BusOperators() {
    const theme = useTheme();
     const colors = tokens(theme.palette.mode);
  return (
    <Box className='mx-0 max-w-full py-5 grid md:grid-cols-2 sm:grid-cols-2  grid-cols-1 gap-3' backgroundColor={colors.primary[600]}>
    <Box className="grid grid-cols-1">
      <p className='md:text-2xl sm:text-xl text-lg font-extrabold px-4 mx-auto md:w-4/5 sm:w-5/6 w-11/12'>Companies Connected with Move<span className='text-yellow-500'>Smart</span></p>
      <Box p={2} className="mx-auto md:w-4/5  sm:w-5/6 w-11/12 p-3 flex gap-3 rounded-lg">
        <BusOperatorCard/>
        <BusOperatorCard/>
        <BusOperatorCard/>
        <BusOperatorCard/>
      </Box>
    </Box>
    <Box className='min-h-[20vh]'>
      <Box className="md:w-1/2 sm:w-2/3 w-5/6 h-full bg-contain bg-no-repeat bg-center mx-auto" style={{backgroundImage:`url(${CarImage3})`}}>
      </Box>
    </Box>
  </Box>
  )
}