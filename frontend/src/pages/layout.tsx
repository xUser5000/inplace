import { Nav } from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className='min-h-screen flex flex-col' >
                <Nav />
                <div className="container flex-1 flex flex-col items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    );
}