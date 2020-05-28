import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from 'antd';
import FbIcon from './fb.png';
import TwiterIcon from './twiter.png';
import InIcon from './in.png';
import PaypalIcon from './paypal.svg';

const Container = styled.section`
  background-image: url(https://res.cloudinary.com/dm1wgyp1n/image/upload/v1590659992/footer_banner_qma5d3.webp);
  padding: 50px 0 30px;

  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  > div {
    padding: 0 15px;

    > * {
      a {
        color: rgba(0, 0, 0, 0.65);

        :hover {
          color: #1890ff;
        }
      }

      margin-bottom: 15px;

      i {
        margin-right: 10px;
      }
    }

    > *:first-child {
      margin-bottom: 25px;
      text-transform: uppercase;
    }

    .socials {
      margin-bottom: 20px;

      > a:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <div>
        <h3>Your Account</h3>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/dashboard/login">My Account</Link>
        </div>
        <div>
          <Link to="/register">New Account</Link>
        </div>
        <div>
          <Link to="/shop">Look Book</Link>
        </div>
      </div>
      <div>
        <h3>Our Company</h3>
        <div>
          <Link to="/">About Us</Link>
        </div>
        <div>
          <Link to="/">Contact Us</Link>
        </div>
        <div>
          <Link to="/">Portfolio</Link>
        </div>
        <div>
          <Link to="/">FAQs</Link>
        </div>
      </div>
      <div>
        <div>
          <NavLink to="/" className="logo">
            <h3>HUY TRU STORE</h3>
          </NavLink>
        </div>
        <div>
          <Icon type="shop" /> 99, Hồ Đắc Di, An Cựu, Thành phố Huế
        </div>
        <div>
          <Icon type="phone" /> Call Us: 0935903718
        </div>
        <div>
          <Icon type="mail" /> Email Us: huy.truong@mevry.com
        </div>
      </div>
      <div>
        <div className="socials">
          <a href="https://facebook.com/">
            <img src={FbIcon} alt="facebook" />
          </a>
          <a href="https://twitter.com/">
            <img src={TwiterIcon} alt="twiter" />
          </a>
          <a href="https://www.linkedin.com/">
            <img src={InIcon} alt="linkedin" />
          </a>
        </div>
        <div>
          <a href="https://www.paypal.com/">
            <img style={{ maxWidth: '100px' }} src={PaypalIcon} alt="paypal" />
          </a>
        </div>
      </div>
    </Container>
  );
};
export default Footer;
