import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import useAxios from '../../hooks/useAxios';
import Box from '@material-ui/core/Box';

const ProductList = () => {

  const {data, loading} = useAxios({endpoint: 'api/products/', method: 'GET'});
  
  return (
    <Box padding={4}>
      <Grid container>
        {!loading && data.map((product:any) => <ProductCard product={product} />)}
      </Grid>
    </Box>
  )
};

export default ProductList;