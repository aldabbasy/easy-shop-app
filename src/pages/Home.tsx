import React from 'react';
import Container from '@material-ui/core/Container';
import HomeView from '../components/Home/HomeView';

const Home = () => {
  return (
    <Container component="main" maxWidth="xl" style={{paddingTop: '3em'}}>
      <HomeView />
    </Container>
  )
};

export default Home;
