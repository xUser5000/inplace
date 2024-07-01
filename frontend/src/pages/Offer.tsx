import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { MessageCircle, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick"

export function OfferPage() {
    const { token } = useAuth()
    const [offer, setOffer] = useState<any>({})
    const [user, setUser] = useState<any>({})
    const offerID = useParams().id
    function getOffers() {
        fetch(import.meta.env.VITE_API_URL + "/offers/offer/" + offerID, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token || "",
            }
        }).then(res => res.json()).then(data => {
            setOffer(data)
            setUser(data.user)
            console.log(data)
        }
        )
    }

    useEffect(() => {
        getOffers()
    }, [])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="py-10 w-full container">
            <div className="slider-cotainer">
                <Slider {...settings}>
                    {
                        offer.images?.map((image: any) => {
                            return (<div>
                                <img className="rounded-xl object-cover  px-3 max-h-[400px]" src={image} alt="" />
                            </div>)
                        })
                    }

                </Slider>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-2 mt-5">
                <div className="offer-details col-span-4 flex flex-col gap-3">
                    <div className="">
                        <h2 className="text-xl md:text-4xl font-black my-5" >
                            {
                                offer.title
                            }
                        </h2>
                        <p>
                            {offer.description}
                        </p>

                    </div>
                    <div className="">
                        <h3 className="text-xl md:text-2xl font-bold">Notes</h3>
                        {offer.notes}
                    </div>
                </div>
                <div className="flex flex-col gap-3 contact border border-2 rounded p-5 col-span-2">
                    <h2 className="font-bold text-2xl my-2">Contact Info</h2>
                    {user && <p>Get in touch with {user.first_name} {user.last_name} </p>}
                    {user.phone_number &&
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


                </div>
            </div>

        </div >
    );
}