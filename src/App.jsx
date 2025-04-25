import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";

// const orders = [
//   {
//     id: 1,
//     title: 'Order 1',
//     date: '2017-06-29 12:09:33',
//     description: 'desc',
//     get products () { return products }
//   },
//   {
//     id: 2,
//     title: 'Order 2',
//     date: '2017-06-29 12:09:33',
//     description: 'desc',
//     get products () { return products }
//   },
//   {
//     id: 3,
//     title: 'Order 3',
//     date: '2017-06-29 12:09:33',
//     description: 'desc',
//     get products () { return products },
//   }
// ]

// const products = [
//   {
//     id: 1,
//     serialNumber: 1234,
//     isNew: 1,
//     photo: 'pathToFile.jpg',
//     title: 'Product 1',
//     type: 'Monitors',
//     specification: 'Specification 1'
//     guarantee: {
//       start: '2017-06-29 12:09:33',
//       end: '2017-06-29 12:09:33'
//     },
//     price: [
//       {value: 100, symbol: 'USD', isDefault: 0},
//       {value: 2600, symbol: 'UAH', isDefault: 1}
//     ],
//     order: 1,
//     date: '2017-06-29 12:09:33'
//   },
//   {
//     id: 2,
//     serialNumber: 1234,
//     isNew: 1,
//     photo: 'pathToFile.jpg',
//     title: 'Product 1',
//     type: 'Monitors',
//     specification: 'Specification 1'
//     guarantee: {
//       start: '2017-06-29 12:09:33',
//       end: '2017-06-29 12:09:33'
//     },
//     price: [
//       {value: 100, symbol: 'USD', isDefault: 0},
//       {value: 2600, symbol: 'UAH', isDefault: 1}
//     ],
//     order: 2,
//     date: '2017-06-29 12:09:33'
//   }
// ]

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products/" element={<ProductsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
