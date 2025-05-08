import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../ui/Logo';
import DarkModeToggle from '../../ui/DarkModeToggle';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 4rem;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-sm);
`;

const LogoWrapper = styled.div`
  img {
    height: 4.5rem !important;
    width: auto;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;

  a {
    font-weight: 500;
    color: var(--color-blue-700);

    &:hover {
      color: var(--color-brand-500);
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem; /* Ubah nilai ini untuk mengatur jarak antar elemen */
`;

const LoginButton = styled(Link)`
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.4rem;
  box-shadow: var(--shadow-md);

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function Navbar() {
  return (
    <Nav>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <LeftSection>
        <NavLinks>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#cabins">Cabin</Link>
          </li>
          <li>
            <Link to="#about">About</Link>
          </li>
        </NavLinks>
      </LeftSection>

      <RightSection>
        <DarkModeToggle />
        <LoginButton to="/login">Login</LoginButton>
      </RightSection>
    </Nav>
  );
}

export default Navbar;
