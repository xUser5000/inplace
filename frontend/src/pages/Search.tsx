import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OffersPage } from "./Offers";

export function SearchPage() {
    return (
        <div className="container mt-10">
            <div className="relative w-full ">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className=" pl-10" placeholder="Search for a place to stay" />
            </div>
            <OffersPage />
        </div>
    )
}