import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
