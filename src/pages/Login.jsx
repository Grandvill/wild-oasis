'use client';

import { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: var(--color-grey-50);

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const ImageSection = styled(motion.div)`
  flex: 1;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/cabin-login-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem;
  color: white;
  position: relative;

  @media (max-width: 968px) {
    height: 30vh;
    padding: 2rem;
  }
`;

const ImageContent = styled.div`
  max-width: 50rem;
  z-index: 1;

  h1 {
    font-size: 3.6rem;
    font-weight: 700;
    margin-bottom: 1.6rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.8rem;
    margin-bottom: 2.4rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 968px) {
    h1 {
      font-size: 2.4rem;
    }
    p {
      font-size: 1.6rem;
      margin-bottom: 1rem;
    }
  }
`;

const FormSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: var(--color-grey-0);

  @media (max-width: 968px) {
    padding: 2rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 45rem;
`;

const LogoContainer = styled.div`
  margin-bottom: 3.2rem;
  display: flex;
  justify-content: center;
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;

  h2 {
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--color-grey-800);
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.6rem;
    color: var(--color-grey-500);
  }
`;

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <PageContainer>
      <ImageSection initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ type: 'tween', duration: 0.5 }}>
        <ImageContent>
          <h1>Welcome to Wild Oasis</h1>
          <p>Experience the perfect blend of luxury and nature in our exclusive cabin retreats. Discover tranquility and adventure in equal measure.</p>
        </ImageContent>
      </ImageSection>

      <FormSection initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'tween', duration: 0.5 }}>
        <FormContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <WelcomeText>
            <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p>{isLogin ? 'Please enter your details' : 'Start your journey with us'}</p>
          </WelcomeText>

          <LoginForm isLogin={isLogin} />

          {isLogin && (
            <p
              style={{
                marginTop: '2rem',
                fontSize: '1.4rem',
                textAlign: 'center',
                color: 'var(--color-grey-500)',
              }}
            >
              Contact admin if you want to login
            </p>
          )}
        </FormContainer>
      </FormSection>
    </PageContainer>
  );
}

export default Login;
