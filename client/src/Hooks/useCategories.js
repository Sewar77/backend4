import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const deleteCategory = async (id) => {
    try {
      const res = await api.delete(`/category/${id}`);
      toast.success(res.data.message);
      getAllCategories();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const addCategory = async (category) => {
    try {
      const res = await api.post("/category", category);
      toast.success(res.data.message);
      getAllCategories(); //refresh
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const updateCategory = async (id, newCategoery) => {
    try {
      const res = await api.put(`/category/${id}`, newCategoery);
      toast.success(res.data.message);
      getAllCategories();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return { categories, deleteCategory, addCategory, updateCategory };
};
