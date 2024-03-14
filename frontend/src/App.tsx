import { Route, Routes } from 'react-router-dom'
import { Layout } from './pages/layout.tsx'
import { Login } from './pages/login.tsx'
import { Home } from './pages/home.tsx'
import { Register } from './pages/register.tsx'

export function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}
            >
                <Route index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Route>

        </Routes>
    )
}