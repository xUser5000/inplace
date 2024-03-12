import { Nav } from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div >
                <Nav />
                <div className="container my-3">
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    );
}