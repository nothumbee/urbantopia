import Image from "next/image";
import InquiryForm from "@/components/listingDetail/InquiryForm";
import { createClient } from "@/utils/supabase/static-props";

export default function DetailPage({ listing }) {
  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 px-8 mb-4">
        <div>
          <h1 className="text-4xl mb-2">{listing.title}</h1>
          <p className="mb-2">{listing.description}</p>
          <ul className="list-disc">
            <li>Location: {listing.location}</li>
            <li>Price: ${listing.price}</li>
            <li>Bedrooms: {listing.number_of_bedrooms}</li>
            <li>Bathrooms: {listing.number_of_bathrooms}</li>
            <li>Area: {listing.area} sqft</li>
            <li>Year: {listing.year_built}</li>
          </ul>
        </div>
        <Image src={listing.thumbnail_url} width={300} height={300}></Image>
      </div>

      <div className="grid grid-cols-3 gap-4 px-8">
        {listing.gallery_urls.map((imageUrl) => {
          return (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt={listing.description}
              width={300}
              height={300}
              sizes="33vw"
            />
          );
        })}
      </div>

      <InquiryForm listingId={listing.id} />
    </div>
  );
}

export async function getStaticProps(context) {
  const supabase = createClient();
  const listingId = context.params.listingId;

  const { data: listings, error } = await supabase
    .from("listings")
    .select()
    .eq("id", listingId);

  const listing = listings?.[0];

  if (!listing || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listing,
    },
    revalidate: 60 * 60 * 24,
  };
}

export async function getStaticPaths() {
  const supabase = createClient();
  const { data: listings, error } = await supabase
    .from("listings")
    .select("id");

  const paths = listings.map((listing) => ({
    params: { listingId: listing.id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}
