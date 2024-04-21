import { createClient } from "@/utils/supabase/component";
import { useEffect, useState } from "react";

export const useListingsData = (filters) => {
  const supabase = createClient();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let query = supabase.from("listings").select();

    if (filters.price_min) {
      query = query.gte("price", filters.price_min ?? 0);
    }
    if (filters.price_max) {
      query = query.lte("price", filters.price_max ?? Infinity);
    }
    if (filters.year) {
      query = query.gte("year_built", filters.year ?? 0);
    }
    if (filters.area) {
      query = query.gte("area", filters.area ?? 0);
    }
    if (filters.bedrooms) {
      query = query.gte("number_of_bedrooms", filters.bedrooms ?? 0);
    }
    if (filters.bathrooms) {
      query = query.gte("number_of_bathrooms", filters.bathrooms ?? 0);
    }
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }
    if (filters.type) {
      query = query.ilike("property_type", `%${filters.type}%`);
    }
    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%,property_type.ilike.%${filters.search}%`
      );
    }

    const { data: listings, error } = await query;

    setData(listings);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return data;
};
