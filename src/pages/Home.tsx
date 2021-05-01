import React from 'react';
import Container from '@material-ui/core/Container';
import HomeView from '../components/Home/HomeView';
import NavBar from '../components/Shared/NavBar';

const Home = () => {
  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xl">
        <HomeView />
      </Container>
    </>
  )
};

export default Home;
