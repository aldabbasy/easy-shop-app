import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { Badge, ButtonGroup, makeStyles } from '@material-ui/core';
import useAxiosPost from '../../hooks/useAxiosPost';
import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: 350,
  },
  actionBtns: {
    marginLeft: 'auto',
  },
  counter: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({product}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  const [addToCart, {loading}] = useAxiosPost({endpoint: 'api/carts/add_to_cart'});
  const { refetchUserData } = useContext(UserContext);


  const handleAddtoCart = (pid) => {
    addToCart({quantity, pid}).then((res) => refetchUserData());
    setQuantity(0);
  }

  return (
    <Grid item xl={3} lg={4} md={12} sm={12} xs={12} >
      <Box margin={2}>
        <Card className={classes.root} raised>
        <CardActionArea>
          <CardHeader 
            title={product?.name}
            action={
              <IconButton aria-label="goto-product">
                <ChevronRightOutlinedIcon />  
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {product?.description.slice(0, 200)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'} paddingRight={1} paddingLeft={1}>
            <Typography variant='h5' color="primary" component="p">
              ${product?.price}
            </Typography>
            <Box display={'flex'}>
              <ButtonGroup className={classes.counter}>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setQuantity(Math.max(quantity - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  disabled={quantity === product.quantity + 1}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              <Button disabled={quantity === 0} onClick={() => {handleAddtoCart(product?.id)}} size="small" variant={'contained'} color="secondary" endIcon={<Badge badgeContent={quantity} color={'primary'} ><AddShoppingCartIcon /></Badge>}>
              Add to Cart
            </Button>
            </Box>
          </Box>
        </CardActions>
        </Card>
      </Box>
    </Grid>
  )
};

export default ProductCard;
