import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./CMS/Home";
import Shop from "./CMS/Shop";
import Categories from "./CMS/Categories";
import EachProduct from "./CMS/EachProduct";
import SearchResults from "./CMS/SearchResults";
import CategoryProducts from "./CMS/CategoryProducts";
import Cart from "./CMS/Cart";
import { useEffect } from "react";
import Navbar from "./CMS/Navbar";
import Footer from "./CMS/Footer";


function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };
  return (
    <>
      <BrowserRouter>
        <ScrollToTop /> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<EachProduct />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/search/:name" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
