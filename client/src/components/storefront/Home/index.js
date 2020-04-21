import React from 'react';
import Header from '../Header';
import BackgroundImage from './BackgroundImageSection';
import Slider from './Slider';
import About from './About';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <BackgroundImage />
        <Slider />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default Home;
