import React, { useEffect, useState } from "react";
import { dummy } from "../dummy";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../Redux/Slice";
import { ShoppingBag, Star, Zap, Users, TrendingUp, Eye, Heart, ArrowRight, Sparkles, Gift, Crown } from "lucide-react";

const SkeletonLoader = () => (
  <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200/50 animate-pulse">
    <div className="aspect-square bg-gradient-to-br from-yellow-200 to-amber-300 animate-pulse" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-yellow-200 rounded-full w-3/4 animate-pulse" />
      <div className="h-3 bg-yellow-200 rounded-full w-1/2 animate-pulse" />
      <div className="h-5 bg-yellow-200 rounded-full w-1/3 animate-pulse" />
    </div>
  </article>
);

const FloatingElement = ({ children, delay = 0 }) => (
  <div 
    className="animate-bounce"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  >
    {children}
  </div>
);

const ProductCard = ({ item, isLoading = false }) => {
  if (isLoading) return <SkeletonLoader />;
  
  return (
    <Link to={`/product/${item.id}`}>
      <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-yellow-50 border border-yellow-200/50 hover:border-amber-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={item.thumbnail}
            alt={item.title}
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
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-amber-600 transition-colors duration-300 mb-2">
            {item.title}
          </h3>
          <p className="text-slate-600 text-sm mb-3">High Top (Lemon Yellow)</p>
          
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
            <span className="text-2xl font-bold text-slate-800">$60</span>
            <button className="p-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default function Home() {
  const { status, productData } = useSelector((state) => state.Sli);
  const dispatch = useDispatch();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(products());
  }, [dispatch]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsVisible(true);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  console.log(productData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <main className="bg-gradient-to-br from-white via-yellow-50 to-amber-50 relative overflow-hidden min-h-screen">
        <div className="bg-transparent flex justify-center items-start relative z-20 overflow-hidden">
          <div className="container lg:ml-20 px-6 flex justify-start relative py-8">
            <div className={`sm:w-2/3 lg:w-3/5 flex flex-col relative z-20 text-start transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full px-4 py-2 text-sm font-medium text-amber-700 mb-8 w-fit">
                <Sparkles className="w-4 h-4" />
                Limited Time Offer
              </div>
              
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none bg-gradient-to-r from-slate-900 via-amber-900 to-yellow-900 bg-clip-text text-transparent">
                Exclusive
                <span className="text-5xl sm:text-7xl bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Deals</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
                Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.
              </p>
              
              <div className="flex justify-start mt-8 gap-4">
                <Link
                  href="#"
                  className="group relative overflow-hidden uppercase py-3 px-6 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 border-2 border-transparent text-white text-md font-bold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/25 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="#"
                  className="group uppercase py-3 px-6 rounded-2xl bg-transparent border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 text-md font-bold transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    Read more
                  </span>
                </Link>
              </div>
            </div>
            
            <div className={`hidden sm:block sm:w-1/3 lg:w-3/5 relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                <img
                  src="images/49407305_9240592.jpg"
                  className="max-w-xs md:max-w-md m-auto rounded-3xl shadow-2xl hover:shadow-yellow-500/25 transition-shadow duration-300"
                  alt="Hero"
                />
                
                {/* Floating Elements */}
                <FloatingElement delay={0}>
                  <div className="absolute -top-28 right-6 bg-gradient-to-r from-yellow-400 to-amber-400 text-white p-3 rounded-2xl shadow-lg">
                    <Crown className="w-6 h-6" />
                  </div>
                </FloatingElement>
                
                <FloatingElement delay={1}>
                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-amber-400 to-orange-400 text-white p-3 rounded-2xl shadow-lg">
                    <Gift className="w-6 h-6" />
                  </div>
                </FloatingElement>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section py-10 px-5">
          <div className="stats-grid z-20 max-w-5xl rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-between md:px-10 gap-x-10 py-10 px-5 lg:px-10 gap-y-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 to-amber-400/90" />
            
            <div className="col-span-1 md:col-span-3 lg:col-span-1 flex flex-col items-center justify-center gap-y-3 relative z-10">
              <h2 className="text-3xl md:pb-5 md:text-3xl text-white font-bold flex items-center gap-2">
                <TrendingUp className="w-8 h-8" />
                Our Stats
              </h2>
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center gap-y-3 relative z-10 group">
              <Users className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl lg:text-5xl text-white font-bold group-hover:scale-105 transition-transform duration-300">
                1.2M
              </h2>
              <p className="text-center text-sm md:text-base text-white/90">
                Members worldwide
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center gap-y-3 relative z-10 group">
              <Star className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl lg:text-5xl text-white font-bold group-hover:scale-105 transition-transform duration-300">
                95%
              </h2>
              <p className="text-center text-sm md:text-base text-white/90">
                Customer satisfaction rate
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center gap-y-3 relative z-10 group">
              <Zap className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl lg:text-5xl text-white font-bold group-hover:scale-105 transition-transform duration-300">
                3500+
              </h2>
              <p className="text-center text-sm md:text-base text-white/90">
                Transactions processed daily
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Products Section */}
      <div className="max-w-screen-4xl mx-0 p-5 md:p-16 relative">
        {status === "loading" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(9)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Featured Electronics */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-amber-900 bg-clip-text text-transparent mb-4">
                Featured Electronics
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Handpicked products that combine style, functionality, and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {productData?.slice(77, 80)?.map((item, index) => (
                <div
                  key={item.id}
                  className={`transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>

            {/* Featured Accessories */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-amber-900 bg-clip-text text-transparent mb-4">
                Featured Accessories
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Premium accessories to complete your lifestyle
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {productData?.slice(157, 160)?.map((item, index) => (
                <div
                  key={item.id}
                  className={`transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 200}ms` }}
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

     
    </div>
  );
}