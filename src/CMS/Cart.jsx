import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/Slice";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.Sli);

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Calculate the total amount
  const totalAmount = cartData.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div className="mx-auto mt-10 overflow-hidden">
        <div className="sm:flex shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white px-10 py-5">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartData.length || 0} Items
              </h2>
            </div>
            {cartData.map((item) => (
              <div
                className="md:flex items-stretch border-gray-400 shadow-md p-3"
                key={item.product.id}
              >
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full object-center object-cover md:block hidden"
                    />
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="md:hidden w-full h-full object-center object-cover"
                    />
                  </Link>
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                    {item.product.brand}
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-black leading-none text-gray-800">
                      {item.product.title}
                    </p>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center">
                      <p
                        className="text-xs leading-3 text-red-500 cursor-pointer"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove
                      </p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="#"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div
            id="summary"
            className="w-full sm:w-1/4 md:w-1/2 px-8 py-10"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cartData.length}
              </span>
              <span className="font-semibold text-sm">${totalAmount.toFixed(2)}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout - ${totalAmount.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
