import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import useAxiosGet from '../../hooks/useAxiosGet';
import Box from '@material-ui/core/Box';

const ProductList = () => {

  const {data, loading} = useAxiosGet({endpoint: 'api/products/'});
  
  return (
    <Box padding={4}>
      <Grid container>
        {!loading && data.map((product:any) => <ProductCard product={product} />)}
      </Grid>
    </Box>
  )
};

export default ProductList;