import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from './pages/Success';
import ScrollToTop from "./ScrollToTop";
import AdminConsole from './pages/AdminConsole';
import ProductStatistics from "./pages/ProductStatistics";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

const dotenv = require("dotenv");
dotenv.config();

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <Router>
      <ScrollToTop>
        { user?.isAdmin === false &&
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderid" element={<Order />} />
        </Routes>
        }
        {
          user?.isAdmin &&
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderid" element={<Order />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/admin/manageproducts" element={<ManageProducts />} />
            <Route path="/admin/editproduct/:productId" element={<EditProduct />} />
            <Route path="/admin/createproduct" element={<CreateProduct />} />
            <Route path="/admin/statistics" element={<ProductStatistics />} />
          </Routes>
        }
        { !user &&
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        }
        
      </ScrollToTop>
    </Router>
  );
};

export default App;