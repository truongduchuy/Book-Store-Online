import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BackgroundImage from './BackgroundImageSection';
import Slider from './Slider';
import About from './About';

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
