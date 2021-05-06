import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const Spinner = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100vw'} height={'calc(100vh - 64px)'}>
      <CircularProgress size={50} color={'primary'} />
    </Box>
  )
};

export default Spinner;
