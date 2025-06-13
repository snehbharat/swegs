import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../Redux/Slice";

export default function MobileFilter({ open, setSelectedCategories, setSelectedPriceRange, setSortOrder }) {
  const dispatch = useDispatch();

  // Fetch categories from Redux
  const { catData, status } = useSelector((state) => state.Sli);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategoriesState] = useState([]);
  const [selectedPriceRange, setSelectedPriceRangeState] = useState("");

  // Fetch categories on mount
  React.useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCategoryChange = (category) => {
    setSelectedCategoriesState((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (range) => setSelectedPriceRangeState(range);

  const applyFilters = () => {
    setSelectedCategories(selectedCategories);
    setSelectedPriceRange(selectedPriceRange);
    toggleSidebar(); // Close the sidebar after applying filters
  };

  const resetFilters = () => {
    setSelectedCategoriesState([]);
    setSelectedPriceRangeState("");
    setSelectedCategories([]);
    setSelectedPriceRange("");
  };

  return (
    <>
      {/* Button to open the sidebar (visible only on mobile) */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg"
      >
        Filters
      </button>

      {/* Sidebar */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleSidebar}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed left-0 top-0 bottom-0 bg-white w-3/4 max-w-sm shadow-lg p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4 overflow-auto">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={toggleSidebar}
                  className="text-red-600 hover:text-red-800"
                >
                  Close
                </button>
              </div>

              {status === "loading" ? (
                <p>Loading categories...</p>
              ) : (
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-2">Categories</h3>
                    <ul className="space-y-2">
                      {catData.map((category) => (
                        <li key={category.id}>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={selectedCategories.includes(category.slug)}
                              onChange={() => handleCategoryChange(category.slug)}
                            />
                            <span>{category.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Ranges */}
                  <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <ul className="space-y-2">
                      {["Under $50", "$50 - $100", "$100 - $500", "Over $500"].map((range) => (
                        <li key={range}>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              className="form-radio"
                              name="price-range"
                              checked={selectedPriceRange === range}
                              onChange={() => handlePriceRangeChange(range)}
                            />
                            <span>{range}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reset Filters Button */}
                  <button
                    onClick={resetFilters}
                    className={`w-full bg-red-600 text-white py-2 rounded ${
                      selectedCategories.length === 0 && selectedPriceRange === ""
                        ? "bg-gray-400 cursor-not-allowed"
                        : "hover:bg-red-700"
                    }`}
                    disabled={selectedCategories.length === 0 && selectedPriceRange === ""}
                  >
                    Reset Filters
                  </button>

                  {/* Apply Filters Button */}
                  <button
                    onClick={applyFilters}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 mt-4"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
