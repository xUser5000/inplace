import { useAuth } from "@/components/providers/auth-provider";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function OfferPage() {
    const { token } = useAuth()
    const [offer, setOffer] = useState({})
    const offerID = useParams().id
    function getOffers() {
        fetch(import.meta.env.VITE_API_URL + "/offers/offer/" + offerID, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(data => {
            setOffer(data)
            console.log(data)
        }
        )
    }

    useEffect(() => {
        getOffers()
    }, [])



    return (
        <div className="py-10 w-full container">
            {
                //@ts-ignore
                offer.images?.map((image: any) => {
                    return (
                        <img className="rounded object-cover" src={image} />
                    )
                })
            }

            <p className="my-10" >
                {
                    //@ts-ignore
                    offer && offer.title
                }
            </p>
        </div>
    );
}