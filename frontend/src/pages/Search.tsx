import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OffersPage } from "./Offers";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/Spinner";

export function SearchPage() {
    const [query, setQuery] = useState<any>("")
    const [loading, setLoading] = useState(false)
    const [offers, setOffers] = useState<any>([])
    useEffect(() => {
        setLoading(true)
        fetch(import.meta.env.VITE_API_URL + "/offers/search?query=" + query, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            setLoading(false)
            setOffers(data)
        }
        )
    }, [query])

    return (
        <div className="mt-10">
            <div className="relative w-full ">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className=" pl-10" onChange={(e) => setQuery(e.target.value)} placeholder="Search for a place to stay" />
            </div>
            <OffersPage selectedOffers={offers} />
            {loading && <LoadingSpinner className="mx-auto " />}
        </div>
    )
}