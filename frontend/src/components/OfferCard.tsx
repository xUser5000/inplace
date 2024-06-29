import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HumanReadableDate } from "@/lib/date";
import { Bath, Bed, SwatchBook, Users } from "lucide-react";
import { Link } from "react-router-dom";
export function OfferCard({ offer }: any) {
    return (
        <Link to={`/profile/offers/${offer.id}`}>
            <Card className="relative" >
                {offer.isFurnished && <div className="absolute top-1 left-1 bg-green-500 text-white p-1 text-sm rounded ">
                    <div className="flex items-center gap-2">
                        <SwatchBook size={20} />
                        Furnished
                    </div>
                </div>}
                {offer.images.length > 0 && <img src={offer.images[0]} className="rounded" alt={offer.title} />}
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 " >
                            <Bath size={20} />
                            <span>{offer.bathroomCount}</span>
                        </div>
                        <div className="flex items-center gap-2 " >
                            <Bed size={20} />
                            <span>{offer.bedCount}</span>
                        </div>
                        <div className="flex items-center gap-2 " >
                            <Users size={20} />
                            <span>{offer.capacity}</span>
                        </div>
                    </div>

                    <CardTitle >{offer.title}</CardTitle>
                </CardHeader>
                <CardContent className="-mt-3">
                    <p className="text-sm"> {offer.description} </p>
                    <div className="flex items-center justify-between mt-3 -mb-3r2">
                        <span> {HumanReadableDate(offer.createdAt)} </span>
                        <div className="flex items-center gap-3">
                            {offer.forRent && <div className="text-green-500 text-lg font-bold"> ${offer.rentCost} /mo </div>}
                            {offer.forSale && <div className="text-green-500 text-lg font-bold"> ${offer.saleCost} </div>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}