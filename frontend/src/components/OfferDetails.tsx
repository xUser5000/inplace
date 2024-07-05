import { Bath, Bed, Ruler, Home, DollarSign, Star, MapPin, CheckCircle } from 'lucide-react'; // Import additional icons as needed
import { Offer } from "@/lib/types";
import ordinal from "ordinal";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


interface OfferDetailsProps {
  offer: Offer;
}
const OfferDetails: React.FC<OfferDetailsProps> = ({ offer }) => {

  if (!offer || offer === null || offer === undefined || Object.keys(offer).length === 0) {
    return <></>;
  }

  const location = {
    lat: offer.latitude,
    lng: offer.longitude
  }

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

            {offer.offerType !== null && offer.offerPrice !== null && (
            <div className="flex items-center gap-2">
                <DollarSign size={20} />
                <span>${offer.offerPrice} for {offer.offerType === "for_rent" ? "rent" : "sale"}</span>
            </div>
            )}

            {offer.roomCount !== null && (
            <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>{offer.roomCount} Rooms</span>
            </div>
            )}

            {offer.bedCount !== null && (
            <div className="flex items-center gap-2">
                <Bed size={20} />
                <span>{offer.bedCount} Beds</span>
            </div>
            )}

            {offer.bathroomCount !== null && (
            <div className="flex items-center gap-2">
                <Bath size={20} />
                <span>{offer.bathroomCount} Bathrooms</span>
            </div>
            )}

            {offer.area !== null && (
            <div className="flex items-center gap-2">
                <Ruler size={20} />
                <span>{offer.area} m<sup>2</sup></span>
            </div>
            )}

            {offer.floorNumber !== null && (
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

            {/* {(offer.latitude && offer.longitude) && (
            <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{`Location: ${offer.latitude}, ${offer.longitude}`}</span>
            </div>
            )} */}

            {/* {offer.appliances && offer.appliances.length > 0 && (
            <div className="flex items-center gap-2">
                <Tools size={20} />
                <span>{offer.appliances.join(', ')}</span>
            </div>
            )} */}
        </div>

        <br />

        <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span>Location:</span>
        </div>
        {/* @ts-ignore */}
        <MapContainer center={location} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
              position={location}
          />
        </MapContainer>
      </div>
    );
  };
  
export { OfferDetails };
