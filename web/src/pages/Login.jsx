import React, { useState } from 'react';
import { Container, FormControl, Input, Button, FormLabel, Alert } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredential = {
      email,
      password
    };
    dispatch(loginUser(userCredential)).then((result) => {
      if (result.payload) {
        setEmail('');
        setPassword('');
        navigate('/');
      }
    });
  };

  return (
    <Container
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      maxW={'400px'}
      gap={'10px'}>
      {error && <Alert>Error</Alert>}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          required
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          required
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>

      <Button type='submit' onSubmit={handleLoginEvent}>{loading ? 'Loading...' : 'Login'}</Button>
    </Container>
  );
}
