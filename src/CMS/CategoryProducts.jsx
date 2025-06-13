import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { categoryProd } from "../Redux/Slice";
import { SkeletonCard } from "./SearchResults";

export default function CategoryProducts() {
  const { CatProdData, status } = useSelector((state) => state.Sli);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(categoryProd(slug));
  }, [dispatch, slug]);

  // Format category name for display
  const formatCategoryName = (slug) => {
    return slug
      ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : 'Category';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Enhanced Header Section */}
      <div className="text-center py-12 px-6">
        <div className="inline-block mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-full shadow-lg mb-4">
            <h1 className="text-xl font-bold">
              {CatProdData.length} Products Found
            </h1>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-yellow-200">
            <p className="text-gray-700 text-lg">
              Category: <span className="font-bold text-amber-700">{formatCategoryName(slug)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Results Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {status === "loading" ? (
            // Enhanced skeleton loaders
            Array.from({ 
              length: CatProdData.length > 0 ? CatProdData.length : 6 
            }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Enhanced product cards
            CatProdData && CatProdData.map((item) => (
              <div 
                className="group w-80 bg-white shadow-xl rounded-2xl border border-yellow-200 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-yellow-400" 
                key={item.id}
              >
                <Link to={`/product/${item.id}`} className="block">
                  {/* Enhanced Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating brand badge */}
                    {item.brand && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform transition-all duration-300 group-hover:scale-105">
                        {item.brand}
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                      {formatCategoryName(slug)}
                    </div>

                    {/* Discount badge (if applicable) */}
                    {item.discountPercentage && (
                      <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                        -{Math.round(item.discountPercentage)}%
                      </div>
                    )}
                  </div>

                  {/* Enhanced Content Container */}
                  <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50">
                    {/* Product Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Rating Section (if available) */}
                    {item.rating && (
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating) 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            ({item.rating.toFixed(1)})
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Price and Action Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-amber-600">
                            ${item.price}
                          </span>
                          {item.discountPercentage && (
                            <span className="text-sm text-gray-500 line-through">
                              ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">Best Price</span>
                      </div>
                      
                      {/* Enhanced Action Button */}
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:from-yellow-500 group-hover:to-amber-600">
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

                    {/* Stock indicator */}
                    {item.stock !== undefined && (
                      <div className="mt-3 flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          item.stock > 10 ? 'bg-green-400' : 
                          item.stock > 0 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <span className="text-xs text-gray-600">
                          {item.stock > 10 ? 'In Stock' : 
                           item.stock > 0 ? `Only ${item.stock} left` : 'Out of Stock'}
                        </span>
                      </div>
                    )}

                    {/* Animated bottom accent line */}
                    <div className="mt-4 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Empty State */}
        {status !== "loading" && CatProdData.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No Products Found</h3>
            <p className="text-gray-500 text-lg mb-6">
              Sorry, we couldn't find any products in the "{formatCategoryName(slug)}" category.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}