import React from 'react';
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
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: 350,
  },
  actionBtns: {
    marginLeft: 'auto',
  }
}));

const ProductCard = ({product}) => {

  const classes = useStyles();

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
            <Button size="small" variant={'contained'} color="secondary" endIcon={<AddShoppingCartIcon />}>
              Add to Cart
            </Button>
          </Box>
        </CardActions>
        </Card>
      </Box>
    </Grid>
  )
};

export default ProductCard;
