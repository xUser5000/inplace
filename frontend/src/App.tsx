import { Route, Routes } from 'react-router-dom'
import { Layout } from './pages/layout.tsx'
import { Login } from './pages/login.tsx'
import { Home } from './pages/home.tsx'
import { Register } from './pages/register.tsx'
import { PrivateRoute } from './components/private-route.tsx'
import { CreateOffersPage } from './pages/CreateOffer.tsx'
import { OfferPage } from './pages/Offer.tsx'
import { SearchPage } from './pages/Search.tsx'
import { AboutPage } from './pages/About.tsx'
import { ProfilePage } from './pages/ProfileOffers.tsx'
import { SettingsPage } from './pages/Settings.tsx'



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
                <Route path='/search' element={<SearchPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='*' element={<h1>Not Found</h1>} />j
                <Route path='/offers/:id' element={<OfferPage />} />
                <Route path='/profile' element={<PrivateRoute />} >
                    <Route index element={<h1>Profile</h1>} />
                    <Route path='/profile/settings' element={<SettingsPage />} />
                    <Route path='/profile/offers' element={<ProfilePage />} />
                    <Route path='/profile/offers/add' element={<CreateOffersPage />} />
                </Route>
            </Route>

        </Routes>
    )
}