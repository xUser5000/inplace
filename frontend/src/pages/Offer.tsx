import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { OfferDetails } from "@/components/OfferDetails";
import { MessageCircle, Phone, Trash, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function OfferPage() {
    const navigate = useNavigate()
    const { user: authUser } = useAuth();
    const [ offer, setOffer ] = useState<any>({})
    const [ user, setUser ] = useState<any>({})
    const [ isLiked, setIsLiked ] = useState<any>(false);
    const [ isSaveDisabled, setIsSaveDisabled ] = useState<any>(false);
    
    const offerID = useParams().id
    const token = localStorage.getItem("token");

    function getOffers() {
        fetch(import.meta.env.VITE_API_URL + "/offers/offer/" + offerID, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(data => {
            setOffer(data);
            setUser(data.user);
            setIsLiked(data.is_liked);
        }
        )
    }

    function deleteOffer(id: any) {
        let deleteOffer = confirm("Are you sure you want to delete this offer?")
        if (!deleteOffer) {
            return
        }
        fetch(import.meta.env.VITE_API_URL + "/offers/remove/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(() => {
            navigate("/profile/offers")
        })

    }

    async function like(id: any) {
        setIsSaveDisabled(() => true);
        fetch(import.meta.env.VITE_API_URL + "/likes/like/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(() => {
            setIsLiked(() => true);
            setIsSaveDisabled(() => false);
        });
    }

    async function unlike(id: any) {
        setIsSaveDisabled(() => true);
        fetch(import.meta.env.VITE_API_URL + "/likes/unlike/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(() => {
            setIsLiked(() => false);
            setIsSaveDisabled(() => false);
        });
    }

    useEffect(() => {
        getOffers()
    }, []);

    console.log(offer);


    return (
        <div className="py-10 w-full container">
            <div className="slider-cotainer">
                {
                    offer.images?.map((image: any) => {
                        return (<div>
                            <img className="rounded-xl object-cover" key={image} src={image} alt="" width={"100%"} />
                        </div>)
                    })
                }
                <div className="container">
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-2 mt-5">
                
                <OfferDetails offer={offer} />
                
                <div className="flex flex-col gap-3 contact border border-2 rounded p-5 col-span-2">
                    {(authUser?.id != offer?.user?.id) && <p>Get in touch with {user.first_name} {user.last_name} </p>}
                    {(authUser?.id != offer?.user?.id) && user.phone_number &&
                        <>
                            <Button className="bg-green-500 text-white">
                                <a href={"whatsapp://send?abid=" + user.phone_number} target="_blank" className="flex items-center">
                                    <MessageCircle className="mx-3" />
                                    Chat on Whatsapp
                                </a>
                            </Button>
                            <Button variant="secondary">
                                <a href={"tel:" + user.phone_number} className="flex items-center">
                                    <Phone className="mx-3" />
                                    Ring on Phone

                                </a>
                            </Button>
                        </>
                    }

                    <br />
                    { authUser && offer && <p>Save for later</p> }
                    {
                        authUser && offer &&
                        <Button disabled={isSaveDisabled} variant="outline" onClick={() => (!isLiked) ? like(offer.id) : unlike(offer.id)}>
                            <a className="flex items-center">
                                {
                                    isLiked ?
                                    <Star className="mx-3" strokeWidth={0} fill="#f1c40f" /> :
                                    <Star className="mx-3" color="#f1c40f" />
                                }

                                { isLiked ? "Liked" : "Like"}
                            </a>
                        </Button>
                    }

                    {
                        authUser?.id == offer?.user?.id &&
                        "Delete offer"
                    }
                    {
                        authUser?.id == offer?.user?.id &&
                        <Button onClick={() => deleteOffer(offer.id)} variant={"destructive"}>
                            <Trash className="mr-2" /> Delete
                        </Button>
                    }
                </div>
            </div>

        </div >
    );
}