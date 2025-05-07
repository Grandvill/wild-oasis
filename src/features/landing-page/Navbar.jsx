// components/Navbar.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../ui/Logo'; // sesuaikan dengan path kamu

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 4rem;

  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
    color: var(--color-grey-0);

    &:hover {
      color: var(--color-blue-100);
    }
  }
`;

const LoginButton = styled(Link)`
  background-color: var(--color-grey-0);
  color: var(--color-blue-700);
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.4rem;
  box-shadow: var(--shadow-md);

  &:hover {
    background-color: var(--color-blue-100);
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo />
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
      <LoginButton to="/login">Login</LoginButton>
    </Nav>
  );
}

export default Navbar;
