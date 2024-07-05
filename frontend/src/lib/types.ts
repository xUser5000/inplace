export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string,
    bio: string,
    email: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Offer {
    appliances: string[];
    area: number;
    bathroomCount: number;
    bedCount: number;
    createdAt: string; // or Date if you want to handle date objects
    description: string;
    floorNumber: number;
    offerType: string;
    offerPrice: number;
    id: number;
    images: string[];
    isFurnished: boolean;
    latitude: number | null | undefined;
    longitude: number | null | undefined;
    roomCount: number;
    title: string;
    updatedAt: string; // or Date if you want to handle date objects
}
