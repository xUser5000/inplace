import { useEffect, useState } from "react";
import { OffersPage } from "./Offers";
import { useAuth } from "@/components/providers/auth-provider";

export function ProfileOffers() {
    const { token, user } = useAuth()
    const [offers, setOffers] = useState<any>()

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
    return (
        <div className="container">
            <div className="flex flex-col my-10">
                <h2 className="capitalize text-2xl md:text-4xl font-black">
                    {user?.first_name} {user?.last_name}
                </h2>
                <p> {user?.email} </p>
            </div>
            <hr />
            {offers && <OffersPage title="My offers" selectedOffers={offers} />}
        </div>
    )
}