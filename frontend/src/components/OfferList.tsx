import { OfferCard } from "@/components/OfferCard";

export function OfferList({ offers, notFoundMessage }: any) {
    return (
        <div className="py-10 w-full ">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-10 md:gap-3 my-10">
                {
                    offers && offers.length > 0 && offers.map((offer: any) => {
                        return (
                            <OfferCard key={offer.id} offer={offer} />
                        )
                    })
                }
            </div>

            {
                (!offers || offers.length == 0) &&
                <div className="text-center w-full">
                    {notFoundMessage || "No Offers found."}
                </div>
            }
        </div>
    );
}
