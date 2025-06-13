import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slice";
import { Heart, ShoppingCart, Star, Truck, Shield, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyReviews } from "../dummy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function EachProduct() {
  const [data, setData] = useState({});
  const [mainImage, setMainImage] = useState("");
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addToCart({ product: data, quantity }));
  };

  const handleQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let res = await axios.get(`https://dummyjson.com/products/${id}`);
        setData(res.data);
        setMainImage(res.data.images[0]);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };
    fetchProduct();
  }, [id]);

  const changeImage = (src) => {
    setMainImage(src);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const displayedReviews = showAllReviews ? dummyReviews : dummyReviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <span>Home</span> <ChevronRight className="inline w-4 h-4 mx-2" />
          <span>{data.category}</span> <ChevronRight className="inline w-4 h-4 mx-2" />
          <span className="text-yellow-600 font-medium">{data.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={mainImage || "https://via.placeholder.com/600"}
                alt={data.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              {data.discountPercentage && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  -{Math.round(data.discountPercentage)}% OFF
                </div>
              )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {data?.images?.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                    mainImage === item
                      ? "ring-4 ring-yellow-400 opacity-100 scale-110"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                  onClick={() => changeImage(item)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.title}</h1>
              <p className="text-xl text-gray-600 font-medium">{data.brand}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(data.rating)}
              </div>
              <span className="text-gray-600">
                {data.rating} ({dummyReviews.length} reviews)
              </span>
              <span className="text-green-600 font-medium">In Stock: {data.stock}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gray-900">${data.price}</span>
              {data.discountPercentage && (
                <span className="text-xl text-gray-500 line-through">
                  ${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-2 text-yellow-700">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">{data.warrantyInformation}</span>
                </div>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700">
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">{data.shippingInformation}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <p className="text-gray-700 leading-relaxed">{data.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                  <button
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-l-xl transition-colors"
                    onClick={() => handleQuantity(-1)}
                  >
                    -
                  </button>
                  <span className="px-6 py-3 bg-gray-50 font-medium">{quantity}</span>
                  <button
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-r-xl transition-colors"
                    onClick={() => handleQuantity(1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">Available: {data.stock} items</span>
              </div>

              <div className="flex gap-4">
                <button 
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  onClick={handleCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button 
                  className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                    isWishlisted 
                      ? "bg-red-50 border-red-200 text-red-600" 
                      : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600"
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200 mb-8">
            {["description", "reviews", "specifications"].map((tab) => (
              <button
                key={tab}
                className={`px-8 py-4 font-medium capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "border-b-4 border-yellow-400 text-yellow-600"
                    : "text-gray-600 hover:text-yellow-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{data.description}</p>
                
                {data?.tags && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(4.2)}
                    </div>
                    <span className="text-gray-600">4.2 out of 5</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {displayedReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="hover:text-yellow-600 transition-colors">
                          Helpful ({review.helpful})
                        </button>
                        <button className="hover:text-yellow-600 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {dummyReviews.length > 3 && (
                  <button
                    className="w-full bg-yellow-100 text-yellow-700 py-3 rounded-xl font-medium hover:bg-yellow-200 transition-colors"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? "Show Less Reviews" : `Show All ${dummyReviews.length} Reviews`}
                  </button>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Brand</span>
                      <span className="text-gray-900">{data.brand}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Category</span>
                      <span className="text-gray-900">{data.category}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">SKU</span>
                      <span className="text-gray-900">{data.sku}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Weight</span>
                      <span className="text-gray-900">{data.weight} kg</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Dimensions</span>
                      <span className="text-gray-900">
                        {data.dimensions?.width} × {data.dimensions?.height} × {data.dimensions?.depth} cm
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Warranty</span>
                      <span className="text-gray-900">{data.warrantyInformation}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Return Policy</span>
                      <span className="text-gray-900">{data.returnPolicy}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Minimum Order Qty</span>
                      <span className="text-gray-900">{data.minimumOrderQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}