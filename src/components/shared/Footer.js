import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 John Johnny. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export default Footer;