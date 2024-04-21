import { FilterInput, FilterSelect } from "./filterComponents";
import { useFilterValues } from "./useFilterValues";

export default function SearchFilters({ setFilters }) {
  const { types, locations } = useFilterValues();

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
          options={locations}
          placeholder="Select location"
        />
        <FilterSelect
          label="Property type"
          name="type"
          handleFilterChange={handleFilterChange}
          options={types}
          placeholder="Select type"
        />
        <FilterInput
          label="Year"
          name="year"
          handleFilterChange={handleFilterChange}
          type="number"
        />
        <FilterInput
          label="Area"
          name="area"
          handleFilterChange={handleFilterChange}
          type="number"
        />
        <FilterInput
          label="Bathrooms"
          name="bathrooms"
          handleFilterChange={handleFilterChange}
          type="number"
        />
        <FilterInput
          label="Bedrooms"
          name="bedrooms"
          handleFilterChange={handleFilterChange}
          type="number"
        />
        <FilterInput
          label="Max Price"
          name="price_max"
          handleFilterChange={handleFilterChange}
          type="number"
        />
        <FilterInput
          label="Min Price"
          name="price_min"
          handleFilterChange={handleFilterChange}
          type="number"
        />
      </div>
    </div>
  );
}
