import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingBag, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const SkeletonLoader = () => (
  <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200/50 animate-pulse">
    <div className="aspect-square bg-gradient-to-br from-yellow-200 to-amber-300 animate-pulse" />
    <div className="p-6 space-y-3">
      <div className="h-6 bg-yellow-200 rounded-full w-3/4 animate-pulse" />
      <div className="h-4 bg-yellow-200 rounded-full w-1/2 animate-pulse" />
      <div className="h-4 bg-yellow-200 rounded-full w-2/3 animate-pulse" />
    </div>
  </article>
);

const ProductCard = ({ item }) => (
  <Link to={`/product/${item.id}`}>
    <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-yellow-50 border border-yellow-200/50 hover:border-amber-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={item.images?.[0] || "images/No_Image_Available.jpg"}
          alt={item.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart className="w-4 h-4 text-red-500" />
        </button>
        
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="font-bold text-lg text-slate-800 group-hover:text-amber-600 transition-colors duration-300 mb-1">
          {item.title}
        </h2>
        
        <h3 className="text-sm font-medium text-amber-600 mb-2">
          {item.brand}
        </h3>
        
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {item.description?.slice(0, 40)}...
        </p>
        
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
              }`}
            />
          ))}
          <span className="text-sm text-slate-600 ml-2">{item.rating}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-800">${item.price}</span>
          <button className="p-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  </Link>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-600 hover:from-yellow-200 hover:to-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
            page === currentPage
              ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
              : page === '...'
              ? 'cursor-default text-slate-400'
              : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-600 hover:from-yellow-200 hover:to-amber-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-600 hover:from-yellow-200 hover:to-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function Products({ productData, status }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil((productData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productData?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-12 px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-yellow-200 rounded-full animate-pulse" />
            </div>
            <p className="mt-6 text-xl text-slate-600 font-medium">Loading amazing products...</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 w-full max-w-6xl">
              {[...Array(8)].map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
           

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 md:gap-8">
              {currentProducts.map((item, index) => (
                <div
                  key={item.id}
                  className={`transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {/* Empty State */}
            {productData?.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No Products Found</h3>
                <p className="text-slate-600">We couldn't find any products to display.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}