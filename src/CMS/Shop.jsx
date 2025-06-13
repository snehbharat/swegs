import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../Redux/Slice";
import FilterDesktop from "./FilterDesktop";

export default function Shop() {

  const [data, setData] = useState([]);


 
  // console.log(data);
  return (
    <>
      <div className="flex">
       <FilterDesktop/>

        {/* Main content */}
       
      </div>

      
    </>
  );
}
