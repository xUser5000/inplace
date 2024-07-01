import { Route, Routes } from 'react-router-dom'
import { Layout } from './pages/layout.tsx'
import { Login } from './pages/login.tsx'
import { Home } from './pages/home.tsx'
import { Register } from './pages/register.tsx'
import { PrivateRoute } from './components/private-route.tsx'
import { OffersPage } from './pages/Offers.tsx'
import { CreateOffersPage } from './pages/CreateOffer.tsx'
import { OfferPage } from './pages/Offer.tsx'



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
                <Route path='*' element={<h1>Not Found</h1>} />j
                <Route path='/profile' element={<PrivateRoute />} >
                    <Route index element={<h1>Profile</h1>} />
                    <Route path='/profile/settings' element={<h1>Settings page</h1>} />
                    <Route path='/profile/offers' element={<OffersPage />} />
                    <Route path='/profile/offers/:id' element={<OfferPage />} />
                    <Route path='/profile/offers/add' element={<CreateOffersPage />} />
                </Route>
            </Route>

        </Routes>
    )
}