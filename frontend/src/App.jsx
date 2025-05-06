import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { GroupPage } from "./pages/GroupPage/GroupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/groups/" element={<GroupPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
