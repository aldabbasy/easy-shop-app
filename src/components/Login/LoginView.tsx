import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './styled';
import { authenticateUser } from '../../utils/auth';

const LoginView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  
  const { control, handleSubmit, errors } = useForm();
  const onChange = (args:any) => ({ value: args[0].target.value });

  const handleSubmitform = handleSubmit(form => {
    setLoading(true);
    authenticateUser({username: form.username, password: form.password}).then((data) => {
      history.push('/');
    }).catch((e) => {
      alert('invalid username/password');
    }).finally(() => {
      setLoading(false);
    })
  });

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmitform}
          disabled={loading}
        >
          {loading ? <CircularProgress size={30} /> : 'Sign in'}
        </Button>
      </div>
    </div>
  )
}

export default LoginView;
