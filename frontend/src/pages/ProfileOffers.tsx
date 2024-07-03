import { useEffect, useState } from "react";
import { OffersPage } from "./Offers";
import { useAuth } from "@/components/providers/auth-provider";

export function ProfileOffers() {
    const { token, user } = useAuth()
    const [offers, setOffers] = useState<any>();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/users/user/" + user?.id + "/offers", {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(data => {
            setOffers(data)
        })

    }, [])

    if (user) {
        user.bio = "A nerd without glasses"
    }

    return (
         <div className="container">
            <div className="flex flex-col my-10">
                <h2 className="capitalize text-2xl md:text-4xl font-black text-center">
                    {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-lg text-gray-800 mb-2 text-center"> {user?.bio.trim()} </p>
                <p className="text-sm text-gray-400 mb-2 text-center">
                    ({user?.verified ? 'Verified Account' : 'Unverified Account'})
                </p>
                <p>
                </p>
                <p>
                    <span className="text-lg text-gray-800 mb-2">Email: </span>
                    <span className="text-md text-gray-600 mb-2"> {user?.email} </span>
                </p>
                <p>
                    <span className="text-lg text-gray-800 mb-2">Phone Number: </span>
                    <span className="text-md text-gray-600 mb-2"> {user?.phone_number} </span>
                </p>
            </div>
            <hr />
            {offers && <OffersPage title="Offers" selectedOffers={offers} />}
        </div>
    )
}
