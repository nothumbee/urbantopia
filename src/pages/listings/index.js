import { useState } from "react";
import SearchFilters from "@/components/search/SearchFilters";
import ListingItem from "@/components/search/ListingItem";
import { useListingsData } from "@/components/search/useListingsData";

export default function SearchPage() {
  const [filters, setFilters] = useState({});
  const listings = useListingsData(filters);

  return (
    <div>
      <SearchFilters setFilters={setFilters} />

      <div className="grid grid-cols-3 gap-4 px-8">
        {listings.map((listing) => {
          return <ListingItem key={listing.id} listing={listing} />;
        })}
      </div>
    </div>
  );
}
