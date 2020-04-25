import React from 'react';
import Slider from './Slider';
import About from './About';
import BackgroundImage from './BackgroundImageSection';
import Layout from '../Layout';

const Home = () => {
  return (
    <Layout>
      <BackgroundImage />
      <Slider />
      <About />
    </Layout>
  );
};

export default Home;
