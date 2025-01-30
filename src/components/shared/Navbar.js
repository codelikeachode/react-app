import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavItem = ({ children, onClick }) => (
  <NavItemWrapper>
    {children}
  </NavItemWrapper>
);

const NavItemWrapper = styled.li`
  display: flex;
  align-items: center;
`;

const StyledNavLink = styled.button`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  cursor: pointer;
  transition: color 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  font: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinkButton = ({ onClick, isActive, children }) => (
  <StyledNavLink onClick={onClick} $isActive={isActive}>
    {children}
  </StyledNavLink>
);

const StyledRouterLink = styled(Link)`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Nav $scrolled={scrolled}>
      <NavContainer>
        <Logo to="/">
          <span>John</span>Johnny
        </Logo>

        <MenuIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>

        <NavLinks $isOpen={isOpen}>
          {isHomePage ? (
            <>
              <NavItem>
                <NavLinkButton 
                  onClick={() => scrollToSection('about')}
                  isActive={location.hash === '#about'}
                >
                  About
                </NavLinkButton>
              </NavItem>
              <NavItem>
                <NavLinkButton 
                  onClick={() => scrollToSection('portfolio')}
                  isActive={location.hash === '#portfolio'}
                >
                  Portfolio
                </NavLinkButton>
              </NavItem>
              <NavItem>
                <NavLinkButton 
                  onClick={() => scrollToSection('contact')}
                  isActive={location.hash === '#contact'}
                >
                  Contact
                </NavLinkButton>
              </NavItem>
              <NavItem>
                <StyledRouterLink 
                  to="/blog"
                  onClick={() => setIsOpen(false)}
                  $isActive={false}
                >
                  Blog
                </StyledRouterLink>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <StyledRouterLink 
                to="/"
                onClick={() => setIsOpen(false)}
                $isActive={false}
              >
                Home
              </StyledRouterLink>
            </NavItem>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme, $scrolled }) =>
    $scrolled ? theme.colors.background : 'transparent'};
  transition: all 0.3s ease;
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background};
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

export default Navbar;