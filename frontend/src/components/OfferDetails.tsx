import { Bath, Bed, Ruler, Home, DollarSign, Star, Calendar, MapPin, CheckCircle } from 'lucide-react'; // Import additional icons as needed
import { Offer } from "@/lib/types";
import ordinal from "ordinal";

interface OfferDetailsProps {
  offer: Offer;
}
const OfferDetails: React.FC<OfferDetailsProps> = ({ offer }) => {
    return (
      <div className="offer-details col-span-4 flex flex-col gap-3">
        <div className="">
          <h2 className="text-xl md:text-4xl font-black my-5">
            {offer.title}
          </h2>
          <p className="text-sm text-gray-600">Posted in: {new Date(offer.createdAt).toLocaleDateString()} </p>
          <br />
          <p>
            {offer.description}
          </p>
        </div>
  
        <div className="offer-grid mt-5 grid grid-cols-2 gap-4">

            {offer.offerType && offer.offerPrice && (
            <div className="flex items-center gap-2">
                <DollarSign size={20} />
                <span>${offer.offerPrice} for {offer.offerType === "for_rent" ? "rent" : "sale"}</span>
            </div>
            )}

            {offer.roomCount && (
            <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>{offer.roomCount} Rooms</span>
            </div>
            )}

            {offer.bedCount && (
            <div className="flex items-center gap-2">
                <Bed size={20} />
                <span>{offer.bedCount} Beds</span>
            </div>
            )}

            {offer.bathroomCount && (
            <div className="flex items-center gap-2">
                <Bath size={20} />
                <span>{offer.bathroomCount} Bathrooms</span>
            </div>
            )}

            {offer.area && (
            <div className="flex items-center gap-2">
                <Ruler size={20} />
                <span>{offer.area} m<sup>2</sup></span>
            </div>
            )}

            {offer.floorNumber && (
            <div className="flex items-center gap-2">
                <Home size={20} />
                <span>{ordinal(offer.floorNumber)} Floor</span>
            </div>
            )}

            {true && (
            <div className="flex items-center gap-2">
                <Star size={20} />
                <span>{offer.isFurnished ? 'Furnished' : 'Not Furnished'}</span>
            </div>
            )}

            {(offer.latitude && offer.longitude) && (
            <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{`Location: ${offer.latitude}, ${offer.longitude}`}</span>
            </div>
            )}

            {/* {offer.appliances && offer.appliances.length > 0 && (
            <div className="flex items-center gap-2">
                <Tools size={20} />
                <span>{offer.appliances.join(', ')}</span>
            </div>
            )} */}
        </div>
      </div>
    );
  };
  
export { OfferDetails };
