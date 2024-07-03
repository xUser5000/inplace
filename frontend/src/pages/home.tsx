import { useAuth } from '@/components/providers/auth-provider'
import { OffersPage } from './Offers'
import { useEffect, useState } from 'react'
import { LandingPage } from './LandingPage'

export function Home() {
  const { token, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(loading)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])



  return (
    <>
      {!isLoading && (token !== null ? <OffersPage /> : <LandingPage />)}
    </>
  )
}

export default Home
