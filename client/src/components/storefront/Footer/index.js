import React from 'react';
import styled from 'styled-components';
import FbIcon from './fb.png';
import TwiterIcon from './twiter.png';
import InIcon from './in.png';

const Container = styled.section`
  padding: 50px 0 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .socials {
    margin-bottom: 20px;

    > a:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <div className="socials">
        <a href="###">
          <img src={FbIcon} alt="facebook" />
        </a>
        <a href="###">
          <img src={TwiterIcon} alt="twiter" />
        </a>
        <a href="###">
          <img src={InIcon} alt="instagram" />
        </a>
      </div>
      <p>With Paypal</p>
    </Container>
  );
};
export default Footer;
