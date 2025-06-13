import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./CMS/Home";
import Example from "./CMS/Navbar";
import Shop from "./CMS/Shop";
import Categories from "./CMS/Categories";
import EachProduct from "./CMS/EachProduct";
import SearchResults from "./CMS/SearchResults";
import CategoryProducts from "./CMS/CategoryProducts";
import Cart from "./CMS/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Example />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<EachProduct />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/search/:name" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
