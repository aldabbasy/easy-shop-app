import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";
import CartItem from './CartItem';
import useAxiosGet from '../../hooks/useAxiosGet';
import useAxiosPost from '../../hooks/useAxiosPost';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import UserContext from '../../contexts/UserContext';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));



function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CartView = () => {
  const classes = useStyles();
  const [removedItems, setRemovedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const {data, loading, refetch} = useAxiosGet({endpoint: 'api/carts/get_cart'});
  const [checkout] = useAxiosPost({endpoint: 'api/carts/checkout'});
  const { refetchUserData } = useContext(UserContext);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const dataToRender = data?.filter((item) => !removedItems.includes(item?.id));

  const handleRemoveItems = (id) => {
    setRemovedItems([...removedItems, id]);
  }
  const handleCheckout = () => {
    checkout({status:1}).then((res) => {
      refetch();
      refetchUserData();
      setOpen(true);
    });
  }

  const calculateTotal = () => {
    const products = dataToRender?.map((item) => ({
      ...item?.product,
      quantity: item?.quantity
    }));
    const prices = products?.map((product) => product?.price * product?.quantity);
    const totalPrice = prices?.reduce((a, b) => a + b, 0);

    return totalPrice;
  };

  return (
    <>
      <Box className={classes.paper}>
        <Grid container>
          {(!loading || dataToRender) && dataToRender?.map(cartItem => <CartItem key={cartItem.id} handleRemoveItems={handleRemoveItems}  cartItem={cartItem} refetch={refetch} />)}
        </Grid>
        <Box position='fixed' bottom={16} width={500}>
          <Button disabled={!dataToRender?.length} variant={'contained'} color={'primary'} fullWidth onClick={handleCheckout}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'30%'}>
              <Typography variant={'button'}>Checkout</Typography>
              <Typography variant={'button'}> | </Typography>
              <Typography variant={'subtitle1'}>${calculateTotal()}</Typography>
            </Box>
          </Button>
        </Box>
      </Box>
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
      >
        <Alert onClose={handleClose} severity="success">
          Cart Checked Out Sccessfuly
        </Alert>
      </Snackbar>
    </>
  )
};

export default CartView;
