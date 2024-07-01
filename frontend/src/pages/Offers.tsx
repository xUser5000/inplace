import { OfferCard } from "@/components/OfferCard";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function OffersPage() {
    const { token } = useAuth()
    const [offers, setOffers] = useState([])
    function getOffers() {
        fetch(import.meta.env.VITE_API_URL + "/offers/all", {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(data => {
            setOffers(data)
        }
        )
    }

    useEffect(() => {
        getOffers()
    }, [])



    return (
        <div className="py-10 w-full container">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl md:text-3xl font-bold">Offers</h1>

                <Link to="/profile/offers/add" >
                    <Button>Add Offer</Button>
                </Link>
            </div>
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
    );
}