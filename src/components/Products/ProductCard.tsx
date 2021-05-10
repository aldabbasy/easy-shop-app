import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { CircularProgress, makeStyles } from '@material-ui/core';
import useAxiosPost from '../../hooks/useAxiosPost';
import UserContext from '../../contexts/UserContext';
import Alert from '@material-ui/lab/Alert';
import ThemeContext from '../../contexts/ThemeContext';

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
  },
  chevron: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px'
  },
  alert: {
    padding: '0px 8px',
  },
  cardHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }
}));

type ProductCardUserFooterProps = {
  quantity: number;
  handleAddtoCart: (pid: any) => void;
  product: any;
  classes: any;
  setQuantity: (quantity: number) => void;
};
function ProductCardUserFooter({quantity, handleAddtoCart, product, classes, setQuantity}: ProductCardUserFooterProps) {
  return (
    <>
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
          disabled={quantity === product.quantity}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Button disabled={quantity === 0} onClick={() => { handleAddtoCart(product?.id); } } size="small" variant={'contained'} color="secondary" endIcon={<Badge badgeContent={quantity} color={'primary'}><AddShoppingCartIcon /></Badge>}>
        {product.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </>
  );
}

type ProductCardBusUserFooterProps = {
  status: any;
  classes: any;
};
function ProductCardBusUserFooter({status, classes}: ProductCardBusUserFooterProps) {
  const statusColor = status.status_code === 0 ? 'warning' :  (status.status_code === 1 ? 'success' : 'error')
  return (
    <Alert variant="outlined"  severity={statusColor} className={classes.alert}>
      {status.status}
    </Alert>
  );
}

type ProductCardManagerFooterProps = {
  pid: number;
  refetch: any;
};
function ProductCardManagerFooter({ pid, refetch }: ProductCardManagerFooterProps) {
  const [approveRejectProduct, {loading}] = useAxiosPost({endpoint: 'api/products/update_status'});
  const HandleSubmit = (status) => {
    approveRejectProduct({
      id: pid,
      status
    }).then((res) => {
      refetch();
    });
  }
  return (
    <>
      {
        loading ? <Button color={'primary'} fullWidth><CircularProgress size={20} /></Button> : 
        <ButtonGroup size={'small'} variant={'text'} >
          <Button color={'secondary'} onClick={() => {HandleSubmit(2)}}>Reject</Button>
          <Button color={'primary'} onClick={() => {HandleSubmit(1)}}>Approve</Button>
        </ButtonGroup>
    }
    </>
  );
}

const ProductCard = ({product, refetch}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  const [addToCart] = useAxiosPost({endpoint: 'api/carts/add_to_cart'});
  const { refetchUserData, user_role } = useContext(UserContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const handleAddtoCart = (pid) => {
    addToCart({quantity, pid}).then((res) => refetchUserData());
    setQuantity(0);
  }

  return (
    <Grid item xl={3} lg={4} md={12} sm={12} xs={12} >
      <Box margin={2}>
        <Card className={classes.root} raised>
        <CardHeader
          className={!isDarkTheme && classes.cardHeader}
          color={isDarkTheme ? 'default' : 'primary'} 
          title={product?.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product?.description.slice(0, 200)}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'} paddingRight={1} paddingLeft={1}>
            <Typography variant='h5' color="primary" component="p">
              ${product?.price}
            </Typography>
            <Box display={'flex'}>
              {user_role === 1 && <ProductCardUserFooter quantity={quantity} handleAddtoCart={handleAddtoCart} product={product} classes={classes} setQuantity={setQuantity} />}
              {(user_role === 2 || user_role === 4) && <ProductCardBusUserFooter status={product?.status} classes={classes} />}
              {user_role === 3 && <ProductCardManagerFooter pid={product?.id} refetch={refetch} />}
            </Box>
          </Box>
        </CardActions>
        </Card>
      </Box>
    </Grid>
  )
};

export default ProductCard;



