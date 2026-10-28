import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
<<<<<<< HEAD
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
=======
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import DisplayProducts from "./Components/Admin/Manage/ManageProducts/DisplayProducts";
>>>>>>> ea1de0a98934247aa3af4f0f99b052720efc4470
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<AdminDashboard />} />
          <Route path="manage-products" element={<DisplayProducts />} />
        </Route>
>>>>>>> ea1de0a98934247aa3af4f0f99b052720efc4470
      </Routes>
    </>
  );
}

export default App;
