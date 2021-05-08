import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { isValidNumber } from '../../utils/regexp';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAxiosPost from '../../hooks/useAxiosPost';

const NewProductModal = ({classes, handleClose, refetchProducts}) => {
  const [handleCreateProduct, {loading}] = useAxiosPost({endpoint: 'api/products/create'});
  const { control, handleSubmit, errors } = useForm();
  const onChange = (args:any) => ({ value: args[0].target.value });

  const handleSubmitform = handleSubmit(form => {
    handleCreateProduct(form).then((res) => {
      handleClose();
      refetchProducts();
    });
  });


  return (
    <Card className={classes.modalBody}>
      <CardHeader
        title={'Create new Product'}
        action={(
          <IconButton onClick={handleClose} aria-label="goto-product">
            <CloseRoundedIcon />  
          </IconButton>
        )}
      />
      <CardContent>
        <Controller
          as={
            <TextField
              variant='outlined'
              color={'primary'}
              margin='normal'
              fullWidth
              id='name'
              label='Product Name'
              autoComplete='name'
              autoFocus
              error={!!errors.name}
            />
          }
          control={control}
          name={'name'}
          onChange={onChange}
          defaultValue={''}
          rules={{ required: true }}
        />
        <Controller
          as={
            <TextField
              variant='outlined'
              color={'primary'}
              margin='normal'
              fullWidth
              id='price'
              label='Product Price'
              autoComplete='price'
              autoFocus
              error={!!errors.price}
              type={'number'}
            />
          }
          control={control}
          name={'price'}
          onChange={onChange}
          defaultValue={''}
          rules={{ 
            required: true,
            pattern: {
              value: isValidNumber,
              message: 'Invalid Price'
            }
          }}
        />
        <Controller
          as={
            <TextField
              variant='outlined'
              color={'primary'}
              margin='normal'
              fullWidth
              id='quantity'
              label='Product Quantity'
              autoComplete='quantity'
              autoFocus
              error={!!errors.quantity}
              type={'number'}
            />
          }
          control={control}
          name={'quantity'}
          onChange={onChange}
          defaultValue={''}
          rules={{ 
            required: true,
            pattern: {
              value: isValidNumber,
              message: 'Invalid Quantity'
            }
          }}
        />
        <Controller
          as={
            <TextField
              variant='outlined'
              color={'primary'}
              margin='normal'
              fullWidth
              id='description'
              label='Product Description'
              autoComplete='description'
              autoFocus
              error={!!errors.description}
            />
          }
          control={control}
          name={'description'}
          onChange={onChange}
          defaultValue={''}
          rules={{ required: true }}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmitform}
          disabled={loading}
        >
          {loading ? <CircularProgress size={30} /> : 'Submit'}
        </Button>
      </CardActions>
    </Card>
  )
};

export default NewProductModal;
