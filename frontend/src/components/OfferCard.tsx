import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HumanReadableDate } from "@/lib/date";
import { Bath, Bed, Ruler, SwatchBook, Star } from "lucide-react";
import { Link } from "react-router-dom";
export function OfferCard({ offer }: any) {
    return (
        <Link to={`/offers/${offer.id}`}>
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
                        <div className="flex items-center gap-3 " >
                            <Bath size={20} />
                            <span>{offer.bathroomCount}</span>
                        </div>
                        <div className="flex items-center gap-2 " >
                            <Bed size={20} />
                            <span>{offer.bedCount}</span>
                        </div>
                        <div className="flex items-center gap-2 " >
                            <Ruler size={20} />
                            <span>{offer.area}</span>
                        </div>
                        <div className="flex ml-auto items-center gap-2 " >
                            <Star size={20} />
                            <span>{offer.likes}</span>
                        </div>
                    </div>

                    <CardTitle >{offer.title}</CardTitle>
                </CardHeader>
                <CardContent className="-mt-3">
                    <p className="text-sm"> {offer.description} </p>
                    <div className="flex items-center justify-between mt-3 -mb-3r2">
                        <span> {HumanReadableDate(offer.createdAt)} </span>
                        <div className="flex items-center gap-3">
                            {offer.offerType == 'for_rent' && <div className="text-green-500 text-lg font-bold"> ${offer.offerPrice} /mo </div>}
                            {offer.offerType == 'for_sale' && <div className="text-green-500 text-lg font-bold"> ${offer.offerPrice} </div>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}