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
import ManageUsers from "./Components/Admin/Manage/ManageUsers/ManageUsers";
import Contact from "./Components/Home/Contact";
import ManageMessages from "./Components/Admin/Manage/ManageMessages/ManageMessages";
import TraderLayout from "./Components/Trader/TrdaerLayout";
import TrdaerDashboard from "./Components/Trader/TraderDashboard";
import ChangePassword from "./Components/Shared/ChangePassword";
import Profile from "./Components/Profile/Profile";
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
        <Route path="change-password" element={<ChangePassword />} />

        <Route path="/trader" element={<TraderLayout />}>
          <Route index path="dashboard" element={<TrdaerDashboard />} />
          <Route path="manage-products" element={<DisplayProducts />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="manage-categories" element={<DisplayCategories />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-products" element={<DisplayProducts />} />
          <Route path="manage-categories" element={<DisplayCategories />} />
          <Route path="manage-messages" element={<ManageMessages />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
