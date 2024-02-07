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
  Link
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password1: '',
  password2: ''
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^\S+$/, 'Must be single word.')
    .matches(/^\D+$/, 'Invalid name format.')
    .required('First name is required.'),
  last_name: Yup.string()
    .matches(/^\S+$/, 'Must be single word.')
    .matches(/^\D+$/, 'Invalid name format.')
    .required('Last name is required.'),
  email: Yup.string().email('Invalid email address').required('Email is required.'),
  password1: Yup.string()
    .required('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,}$/,
      'Passwords is weak.'
    ),
  password2: Yup.string()
    .required('Password confirmation is required.')
    .oneOf([Yup.ref('password1'), null], 'Passwords must match.')
});

export function Register() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values));
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword1('');
        setPassword2('');
        navigate('/');
      } catch (error) {
        // Handle Register error
      }
    }
  });

  const { values, handleBlur, handleChange, handleSubmit } = formik;

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Container
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h="91vh">
      <Box
        p={8}
        maxW={'400px'}
        w={'full'}
        bg={'white'}
        boxShadow={'md'}
        rounded={'md'}
        textAlign={'center'}>
        <Heading color={'blue.400'}>INPLACE</Heading>
        <Text>{t('Register a new account')}</Text>
        <form onSubmit={handleSubmit}>
          <Flex columnGap={2} flexDirection={currentLanguage === 'ar' ? 'row-reverse' : 'row'}>
            <FormControl
              isInvalid={formik.touched.first_name && formik.errors.first_name}
              mb={4}
              size="md">
              <FormLabel float={currentLanguage === 'ar' ? 'right' : 'left'}>
                {t('First Name')}
              </FormLabel>
              <Input
                name="first_name"
                type="text"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                size="md"
              />
              <FormErrorMessage
                justifyContent={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}>
                {t(formik.errors.first_name)}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.last_name && formik.errors.last_name}
              mb={4}
              size="md">
              <FormLabel float={currentLanguage === 'ar' ? 'right' : 'left'}>
                {t('Last Name')}
              </FormLabel>
              <Input
                name="last_name"
                type="text"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                size="md"
              />
              <FormErrorMessage
                justifyContent={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}>
                {t(formik.errors.last_name)}
              </FormErrorMessage>
            </FormControl>
          </Flex>

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
            isInvalid={formik.touched.password1 && formik.errors.password1}
            mb={4}
            size="md">
            <FormLabel float={currentLanguage === 'ar' ? 'right' : 'left'}>
              {t('Password')}
            </FormLabel>
            <Input
              name="password1"
              type="password"
              value={values.password1}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage justifyContent={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}>
              {t(formik.errors.password1)}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.password2 && formik.errors.password2}
            mb={4}
            size="md">
            <FormLabel float={currentLanguage === 'ar' ? 'right' : 'left'}>
              {t('Confirm password')}
            </FormLabel>
            <Input
              name="password2"
              type="password"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage justifyContent={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}>
              {t(formik.errors.password2)}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" size="md" width="full" mb={4}>
            {loading ? t('Loading...') : t('Register')}
          </Button>
        </form>

        <Flex justifyContent="space-between" alignItems="center">
          <Link color={'blue.500'} href="/login" textAlign="left">
            {t('Login')}
          </Link>
          <Link color={'blue.500'} href="#" textAlign="right">
            {t("Can't Login")}
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}
