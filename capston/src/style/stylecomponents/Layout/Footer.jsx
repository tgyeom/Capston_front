import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  margin-bottom: 0%;
  width: 100%;
`;

const Footer = () => {
  return <FooterContainer>footer</FooterContainer>;
};

export default Footer;
