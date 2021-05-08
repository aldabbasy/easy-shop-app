import React from 'react';
import Container from '@material-ui/core/Container';
import CartView from '../components/Cart/CartView';

const Cart = () => {
  return (
    <Container component="main" maxWidth="md" style={{paddingTop: '3em'}}>
      <CartView />
    </Container>
  )
}

export default Cart;
