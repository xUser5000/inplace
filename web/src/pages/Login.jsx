import React from 'react';
import {
  Container,
  FormControl,
  Input,
  Button,
  FormLabel,
  Alert,
  FormErrorMessage,
  Box,
  Heading,
  Text,
  Flex,
  Link,
  AlertTitle
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required.'),
  password: Yup.string().required('Password is required.')
});

export function Login() {
  const { loading, error, user } = useSelector((state) => state.user); // Add user selector
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values));
        // No need for redirection here since Redirect component will handle it automatically
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    }
  });

  const { values, handleBlur, handleChange, handleSubmit } = formik;
  const currentLanguage = i18n.language;

  // If user is authenticated, redirect to the main page
  if (user) {
    navigateTo('/');
  }

  return (
    <Container
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h="80vh">
      <Box
        p={8}
        maxW={'400px'}
        w={'full'}
        bg={'white'}
        boxShadow={'md'}
        rounded={'md'}
        textAlign={'center'}>
        <Heading color={'blue.400'}>INPLACE</Heading>
        <Text>{t('Login to continue')}</Text>
        {error && (
          <Alert
            justifyContent={currentLanguage === 'ar' ? 'end' : 'start'}
            status="error"
            mb={4}
            borderRadius={'5px'}
            margin={'10px auto'}>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={formik.touched.email && formik.errors.email} mb={4} size="md">
            <FormLabel float={currentLanguage === 'ar' ? 'right' : 'left'}>{t('Email')}</FormLabel>
            <Input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage justifyContent={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}>
              {t(formik.errors.email)}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
            mb={4}
            size="md">
            <FormLabel float={currentLanguage === 'ar' ? 'right' : 'left'}>
              {t('Password')}
            </FormLabel>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage justifyContent={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}>
              {t(formik.errors.password)}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="md" width="full" mb={4}>
            {t('Login')}
          </Button>
        </form>
        <Flex justifyContent="space-between" alignItems="center">
          <Link color={'blue.500'} href="/register" textAlign="left">
            {t('Create an account')}
          </Link>
          <Link color={'blue.500'} href="#" textAlign="right">
            {t("Can't Login")}
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}
