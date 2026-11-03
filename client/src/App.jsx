import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLayout from "./Components/Admin/AdminLayout";
import DisplayProducts from "./Components/Admin/Manage/ManageProducts/DisplayProducts";
import DisplayCategories from "./Components/Admin/Manage/ManageCategories/DisplayCategories";
import Contact from "./Components/Home/Contact";
import ManageMessages from "./Components/Admin/Manage/ManageMessages/ManageMessages";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<AdminDashboard />} />
          <Route path="manage-categories" element={<DisplayCategories />} />
          <Route path="manage-messages" element={<ManageMessages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
