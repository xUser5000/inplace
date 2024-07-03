import { Nav } from '@/components/nav';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className='min-h-screen flex flex-col' >
                <Nav />
                <div className="container flex-1 flex flex-col items-center justify-start">
                    <Outlet />
                </div>
                <div className="flex items-center justify-center p-5 w-full border-t">
                    All Rights Reserved Inplace@2024
                </div>
            </div>
        </ThemeProvider>
    );
}