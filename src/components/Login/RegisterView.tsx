import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './styled';
import useAxiosPost from '../../hooks/useAxiosPost';
import SnackBarContext from '../../contexts/SnackBarContext';

const RegisterView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [RegisterUser, {data, loading, error}] = useAxiosPost({ endpoint: '/api/users/register' });
  const {showSnackBar, setMessage, setType} = useContext(SnackBarContext);
  const { control, handleSubmit, errors } = useForm();
  const onChange = (args:any) => ({ value: args[0].target.value });

  const handleSubmitform = handleSubmit(form => {
    if(form.password !== form.confirm_password){
      setMessage('not matching passwords!');
      setType('error');
      showSnackBar();
      return;
    }
    RegisterUser({...form});
  });

  useEffect(() => {
    if(error){
      setMessage('user name already exists!!!');
      setType('error');
      showSnackBar();
    }
  }, [error, setMessage, setType, showSnackBar]);

  useEffect(() => {
    if(data){
      history.push('/login');
    }
  }, [data])

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Register
      </Typography>
      <div className={classes.form}>
        <Controller
          as={
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='username'
              label='Username'
              autoComplete='username'
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
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
            />
          }
          control={control}
          name={'password'}
          onChange={onChange}
          defaultValue={''}
          rules={{ required: true }}
        />
        <Controller
          as={
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="off"
              error={!!errors.confirm_password}
            />
          }
          control={control}
          name={'confirm_password'}
          onChange={onChange}
          defaultValue={''}
          rules={{ required: true }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmitform}
          disabled={loading}
        >
          {loading ? <CircularProgress size={30} /> : 'Register'}
        </Button>
        <Button
          type="button"
          variant="text"
          color="primary"
          className={classes.submit}
          fullWidth
          onClick={() => {history.push('/login')}}
        >
          Already have an Account?
        </Button>
      </div>
    </div>
  )
}

export default RegisterView;
