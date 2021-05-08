import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import useAxiosPost from '../../hooks/useAxiosPost';
import UserContext from '../../contexts/UserContext';
import Spinner from '../Shared/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: 100,
  }
}));

const CartItem = ({ cartItem, refetch, handleRemoveItems }) => {
  const classes = useStyles();
  const [removeItemFromCart, { data, loading }] = useAxiosPost({ endpoint: 'api/carts/remove_from_cart' });
  const { refetchUserData } = useContext(UserContext);
  const handleRemoveItemFromCart = (id) => {
    removeItemFromCart({ id }).then((res) => {
      refetchUserData();
    });
    handleRemoveItems(id);
  }

  return (
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
      <Box margin={2}>
        <Card className={classes.root} raised>
          {loading ? (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} paddingY={2}>
              <CircularProgress size={50} color={'primary'} />
            </Box>) :
            <CardHeader
              title={
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={150}>
                    <Typography variant={'h5'} component={'h3'}>
                      {cartItem?.product?.name.slice(0, 10)}{cartItem?.product?.name.length > 10 && '...'}
                    </Typography>
                    <Typography variant={'subtitle1'} component={'p'}>
                      x{cartItem?.quantity}
                    </Typography>
                  </Box>
                  <Typography variant={'body1'} component={'p'}>
                    ${cartItem?.product?.price * cartItem?.quantity}
                  </Typography>
                </Box>
              }
              avatar={
                <IconButton onClick={() => { handleRemoveItemFromCart(cartItem?.id) }}>
                  <CancelRoundedIcon color={'error'} />
                </IconButton>
              }
            />
          }
        </Card>
      </Box>
    </Grid>
  )
};

export default CartItem;
