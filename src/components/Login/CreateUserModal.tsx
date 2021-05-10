import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAxiosPost from '../../hooks/useAxiosPost';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const CreateUserModal = ({classes, handleClose}) => {
  const [handleCreateUser, {data, loading, error}] = useAxiosPost({endpoint: 'api/users/create'});
  const [role, setRole] = useState(null)
  const { control, handleSubmit, errors } = useForm();
  const onChange = (args:any) => ({ value: args[0].target.value });

  const handleSubmitform = handleSubmit(form => {
    if(role){
      handleCreateUser({...form, role});
    }
  });

  useEffect(() => {
    if(data){
      handleClose();
    }
  }, [data])

  return (
    <Card className={classes.modalBody}>
      <CardHeader
        title={'Create new User'}
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
              id='username'
              label='User Name'
              autoComplete='off'
              autoFocus
              error={!!errors.username}
            />
          }
          control={control}
          name={'username'}
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
              id='password'
              label='Password'
              autoComplete='off'
              autoFocus
              error={!!errors.password}
              type={'password'}
            />
          }
          control={control}
          name={'password'}
          onChange={onChange}
          defaultValue={''}
          rules={{ 
            required: true,
          }}
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup row aria-label="role" name="role" value={role} onChange={(e) => {console.log(e.target.value); setRole(e.target.value)}}>
            <FormControlLabel value={2} control={<Radio color={'primary'} checked={role === '2'} />} label="Business User" />
            <FormControlLabel value={3} control={<Radio color={'primary'} checked={role === '3'} />} label="Manager" />
            <FormControlLabel value={4} control={<Radio color={'primary'} checked={role === '4'} />} label="Admin" />
          </RadioGroup>
        </FormControl>
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

export default CreateUserModal;
