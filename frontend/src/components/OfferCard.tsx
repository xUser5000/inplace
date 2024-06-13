import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
export function OfferCard({ offer }: any) {
    return (
        <Link to={`/profile/offers/${offer.id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{offer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p> {offer.description} </p>
                </CardContent>
            </Card>
        </Link>
    );
}