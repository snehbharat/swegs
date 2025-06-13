import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { search } from "../Redux/Slice";

export const SkeletonCard = () => (
  <div className="w-80 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl rounded-2xl border border-yellow-200 p-6 animate-pulse transform hover:scale-105 transition-all duration-300">
    <div className="h-64 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-xl mb-4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-yellow-200 rounded-full w-1/3"></div>
      <div className="h-5 bg-amber-200 rounded-full w-4/5"></div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 bg-yellow-300 rounded-full w-1/3"></div>
        <div className="h-8 w-8 bg-amber-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function SearchResults() {
  const { searchData, status } = useSelector((state) => state.Sli);
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(search(name));
  }, [dispatch, name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header Section */}
      <div className="text-center py-12 px-6">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-full shadow-lg mb-4">
          <h1 className="text-xl font-bold">
            {searchData.length} Results Found
          </h1>
        </div>
        <p className="text-gray-600 text-lg mt-2">
          Searching for: <span className="font-semibold text-amber-700">"{name}"</span>
        </p>
      </div>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {status === "loading" ? (
            // Enhanced skeleton loaders
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Enhanced product cards
            searchData && searchData.map((item) => (
              <div 
                className="group w-80 bg-white shadow-xl rounded-2xl border border-yellow-200 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-yellow-400" 
                key={item.id}
              >
                <Link to={`/product/${item.id}`} className="block">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {item.brand}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Price and Action Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-amber-600">
                          ${item.price}
                        </span>
                        <span className="text-sm text-gray-500">Best Price</span>
                      </div>
                      
                      {/* Action Button */}
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-4 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {status !== "loading" && searchData.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-yellow-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Results Found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse our categories</p>
          </div>
        )}
      </section>
    </div>
  );
}