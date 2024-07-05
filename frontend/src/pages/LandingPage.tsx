import { Logo } from "@/components/Logo"
import { OfferCard } from "@/components/OfferCard"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function LandingPage() {

    const [offers, setOffers] = useState<any>([])

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/offers/all", {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            setOffers(data)
        }
        )
    }, [])

    return (
        <div className=" mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] gap-10">
                <img className="object-cover rounded h-full " src="https://www.tennessean.com/gcdn/presto/2019/10/11/PNAS/adf1101a-0f8c-404f-9df3-5837bf387dfd-1_Exterior_House_Beautiful_Whole_Home_Concept_House_Castle_Homes_Photo_Reed_Brown_Photography.jpg?crop=5619,3161,x0,y104&width=3200&height=1801&format=pjpg&auto=webp" alt="" />
                <div className="flex flex-col justify-center">
                    <Logo className="w-64 -ml-3" />
                    <p className="text-xl my-5">
                        Inplace is a platform that connects people looking for a place to stay with people offering a place to stay.
                    </p>
                    <Link to="/search">
                        <Button>
                            Find Place Now</Button>
                    </Link>
                </div>
            </div>

            <div className="offers mt-10">
                <h2 className="text-xl md:text-5xl font-black">Offers</h2>
                <div className="grid grid-cols-1  md:grid-cols-3 gap-10 md:gap-3 my-10">
                    {
                        offers.map((offer: any) => {
                            return (
                                <OfferCard key={offer.id} offer={offer} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}