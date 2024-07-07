import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { OfferList } from "@/components/OfferList";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

export function ProfilePage() {
    const { token, user } = useAuth()
    const [ offers, setOffers] = useState<any>();
    const [ savedOffers, setSavedOffers ] = useState<any>();

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

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/likes/list", {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(data => {
            setSavedOffers(data)
        })
    }, []);

    return (
         <div className="container">
            <div className="flex flex-col my-10">
                <h2 className="capitalize text-2xl md:text-4xl font-black text-center">
                    {user?.first_name} {user?.last_name}
                </h2>
                {   user?.bio &&
                    <p className="text-lg text-gray-800 mb-2 text-center"> {user?.bio.trim()} </p>
                }
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

            <Tabs defaultValue="offers" className="container">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="offers">My Offers</TabsTrigger>
                    <TabsTrigger value="likes">Liked offers</TabsTrigger>
                </TabsList>
                <TabsContent value="offers">
                    <OfferList offers={offers} notFoundMessage="You haven't created any offer." />
                </TabsContent>
                <TabsContent value="likes">
                    <OfferList offers={savedOffers} notFoundMessage="You don't have any saved offer." />
                </TabsContent>
            </Tabs>
        </div>
    )
}
