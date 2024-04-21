import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";

const items = [1, 2, 3, 4, 5];

export default function SearchPage() {
  return (
    <div>
      <Header />

      <SearchFilters />

      <div class="grid grid-cols-3 gap-4 px-8">
        {items.map((item) => {
          return <ListingItem key={item} />;
        })}
      </div>
    </div>
  );
}

const SearchFilters = () => {
  const [filters, setFilters] = useState({});

  console.log("filters", filters);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-100 p-8 mb-4">
      <div className="flex gap-2 justify-center mb-4">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-4xl"
          onChange={(event) => handleFilterChange("search", event.target.value)}
        />
        <button className="btn">Search</button>
      </div>

      <div className="grid grid-cols-3">
        <FilterSelect
          label="Location"
          name="location"
          handleFilterChange={handleFilterChange}
          options={["Springfield", "Shelbyville", "Capital City"]}
          placeholder="Select location"
        />
        <FilterSelect
          label="Property type"
          name="type"
          handleFilterChange={handleFilterChange}
          options={["Apartment", "House", "Condo"]}
          placeholder="Select type"
        />
        <FilterInput
          label="Year"
          name="year"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Area"
          name="area"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Bathrooms"
          name="bathrooms"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Bedrooms"
          name="bedrooms"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Max Price"
          name="price_max"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Min Price"
          name="price_min"
          handleFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

const FilterInput = ({ name, label, handleFilterChange }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        name={name}
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => handleFilterChange(name, event.target.value)}
      />
    </label>
  );
};

const FilterSelect = ({
  name,
  label,
  handleFilterChange,
  placeholder,
  options,
}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        name={name}
        className="select select-bordered w-full max-w-xs"
        onChange={(event) => handleFilterChange(name, event.target.value)}
      >
        {placeholder && (
          <option disabled selected>
            {placeholder}
          </option>
        )}

        {options.map((option) => {
          return <option>{option}</option>;
        })}
      </select>
    </label>
  );
};

const ListingItem = () => {
  return (
    <div>
      <Image
        alt="Apartment"
        src="/images/apartment.webp"
        width={300}
        height={200}
      />
      <h3 className="text-lg font-bold">Apartment</h3>
      <ul>
        <li>Location: Springfield</li>
        <li>Price: $1000</li>
        <li>Bedrooms: 3</li>
        <li>Bathrooms: 2</li>
        <li>Area: 1000 sqft</li>
        <li>Year: 2021</li>
      </ul>
    </div>
  );
};
