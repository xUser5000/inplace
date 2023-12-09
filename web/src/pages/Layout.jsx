import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Box } from '@chakra-ui/react';

export function Layout() {
  return (
    <Box background={"gray.50"} minHeight="100vh" >
      <Navbar />
      <Outlet />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          style: {
            background: '#363636',
            color: '#fff'
          },

          // Default options for specific types
          success: {
            duration: 3000,
            // @ts-ignore
            theme: {
              primary: 'green',
              secondary: 'black'
            }
          }
        }}
      />
    </Box>
  );
}
