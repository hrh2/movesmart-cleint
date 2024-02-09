import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <Box w={100} className=" col-span-3">
      <LinearProgress />
    </Box>
  );
}