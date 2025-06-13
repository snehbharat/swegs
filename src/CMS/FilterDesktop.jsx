import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories, products } from "../Redux/Slice";
import Products from "./Products";

export default function FilterDesktop() {
  const { catData, status, productData } = useSelector((state) => state.Sli);
  const dispatch = useDispatch();

  // Local state for selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(products());
    dispatch(categories());
  }, [dispatch]);

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Handle price checkbox change
  const handlePriceChange = (price) => {
    setSelectedPrice((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  // Handle sort option change
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Filter products based on selected categories and prices
  const filteredProducts = productData.filter((product) => {
    const isInCategory = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;

    const isInPriceRange = selectedPrice.length
      ? selectedPrice.some((price) => product.price <= price) // Check if the product price is <= selected price
      : true;

    return isInCategory && isInPriceRange;
  });

  // Sort products based on selected sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "High to Low") {
      return b.price - a.price;
    } else if (sortOrder === "Low to High") {
      return a.price - b.price;
    } else if (sortOrder === "Rating") {
      return b.rating - a.rating; // Assuming products have a rating property
    }
    return 0; // No sorting
  });

  const ClearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice([]);
    setSortOrder("");
  };
  return (
    <>
      {status === "loading" ? (
        // Skeleton loader
        <div className="w-1/4 hidden md:block h-screen sticky top-0 p-6 transition-transform duration-300">
          <div className="space-y-4 animate-pulse">
            {/* Filters heading skeleton */}
            <div className="h-6 bg-gray-300 rounded"></div>

            {/* Categories skeleton */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {/* Price skeleton */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {/* Sort By skeleton */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Sidebar for desktop
        <div className="w-1/4 hidden md:block h-screen sticky top-0 bg-gray-100 p-6 shadow-lg transition-transform duration-300 overflow-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <button
              className={`mb-4 px-2 py-1 rounded-md text-white ${
                selectedCategories <= 0 &&
                selectedPrice <= 0 &&
                sortOrder === ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={ClearFilters}
              disabled={
                selectedCategories <= 0 &&
                selectedPrice <= 0 &&
                sortOrder === ""
              }
            >
              Reset
            </button>
          </div>
          <ul className="list-none space-y-6">
            <li>
              <h3 className="font-semibold mb-2">Categories -</h3>
              <ul className="list-none space-y-2">
                {catData.map((item) => (
                  <li key={item.id}>
                    <label className="flex items-center space-x-2 hover:text-indigo-500">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        checked={selectedCategories.includes(item.slug)}
                        onChange={() => handleCategoryChange(item.slug)}
                      />
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <h3 className="font-semibold mb-2">Price Within -</h3>
              <ul className="list-none space-y-2">
                {[20, 50, 100, 300, 500, 700, 1000].map((price, index) => (
                  <li key={index}>
                    <label className="flex items-center space-x-2 hover:text-indigo-500">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        checked={selectedPrice.includes(price)}
                        onChange={() => handlePriceChange(price)}
                      />
                      ${price}
                    </label>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <h3 className="font-semibold mb-2">Sort By -</h3>
              <ul className="list-none space-y-2">
                {["High to Low", "Low to High", "Rating"].map(
                  (sortOption, index) => (
                    <li key={index}>
                      <label className="flex items-center space-x-2 hover:text-indigo-500">
                        <input
                          type="radio"
                          className="form-radio mr-2"
                          name="sort"
                          checked={sortOrder === sortOption}
                          onChange={() => handleSortChange(sortOption)}
                        />
                        {sortOption}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
          <div className="h-20"></div>
        </div>
      )}

      <div className="w-full md:w-3/4 bg-white p-4">
        {/* Hamburger Icon for small screens */}
       
        <Products productData={sortedProducts} status={status} />
      </div>
    </>
  );
}
