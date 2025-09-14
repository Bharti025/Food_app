import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Orders";
import Promo from "./pages/Promo/Promo";
import ListPromo from "./pages/ListPromo/ListPromo";
import Edit from "./pages/Edit/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/listpromo" element={<ListPromo />} />
                <Route path="/edit/:id" element={<Edit />} /> 
          </Routes>
        </div>
      </div>
      ;
    </>
  );
}

export default App;
