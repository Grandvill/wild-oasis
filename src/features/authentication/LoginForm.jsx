'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import Button from '../../ui/Button';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

const StyledForm = styled(motion.form)`
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem 1.2rem 4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  font-size: 1.6rem;
  color: var(--color-grey-700);
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px rgba(var(--color-brand-600-rgb), 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    cursor: not-allowed;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1.6rem;
  transform: translateY(-50%);
  color: var(--color-grey-500);
  pointer-events: none;
`;

const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-grey-500);
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--color-grey-700);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 1.2rem;
  margin-top: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: var(--color-red-700);
  font-size: 1.4rem;
  margin-top: 0.8rem;
`;

function LoginForm({ isLogin = true }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    if (isLogin) {
      login(
        { email, password },
        {
          onSettled: () => {
            setEmail('');
            setPassword('');
          },
        }
      );
    } else {
      // Handle signup (just visual for now)
      console.log('Sign up with:', { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <StyledForm onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible">
      {!isLogin && (
        <InputGroup as={motion.div} variants={itemVariants}>
          <Label htmlFor="name">Full Name</Label>
          <InputContainer>
            <InputIcon>
              <FiUser />
            </InputIcon>
            <Input type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} required={!isLogin} />
          </InputContainer>
        </InputGroup>
      )}

      <InputGroup as={motion.div} variants={itemVariants}>
        <Label htmlFor="email">Email Address</Label>
        <InputContainer>
          <InputIcon>
            <FiMail />
          </InputIcon>
          <Input type="email" id="email" placeholder="Enter your email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} required />
        </InputContainer>
      </InputGroup>

      <InputGroup as={motion.div} variants={itemVariants}>
        <Label htmlFor="password">Password</Label>
        <InputContainer>
          <InputIcon>
            <FiLock />
          </InputIcon>
          <Input type={showPassword ? 'text' : 'password'} id="password" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required />
          <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </PasswordToggle>
        </InputContainer>
      </InputGroup>

      <motion.div variants={itemVariants}>
        <SubmitButton size="large" disabled={isLoading}>
          {!isLoading ? isLogin ? 'Log in' : 'Sign up' : <SpinnerMini />}
        </SubmitButton>
      </motion.div>
    </StyledForm>
  );
}

export default LoginForm;
