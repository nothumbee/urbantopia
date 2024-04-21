import { createClient } from "@/utils/supabase/component";
import { useEffect, useState } from "react";

export const useListingData = (listingId) => {
  const supabase = createClient();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!listingId) return;

    const { data } = await supabase
      .from("listings")
      .select()
      .eq("id", listingId);

    setData(data?.[0] ?? null);
  };

  useEffect(() => {
    fetchData();
  }, [listingId]);

  return data;
};
