import { OfferCard } from "@/components/OfferCard";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function OffersPage({ selectedOffers, title }: any) {
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
        if (selectedOffers) {
            setOffers(selectedOffers)
        } else {
            getOffers()
        }
    }, [selectedOffers])



    return (
        <div className="py-10 w-full ">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl md:text-3xl font-bold"> {title || "Offers"} </h1>
                {token && (<Link to="/profile/offers/add" >
                    <Button>Add Offer</Button>
                </Link>)}
            </div>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-10 md:gap-3 my-10">
                {
                    offers.map((offer: any) => {
                        return (
                            <OfferCard key={offer.id} offer={offer} />
                        )
                    })
                }
                {
                    offers.length == 0 && <div className="text-center w-full">No offers found</div>
                }
            </div>
        </div>
    );
}