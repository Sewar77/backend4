import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [approveMessages, setApproveMessages] = useState([]);

  const createMessages = async ({ fullName, email, message }) => {
    try {
      const res = await api.post("/message", { fullName, email, message });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };

  const getAllMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data.messages);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const updateMessageStatus = async (id, newStatus) => {
    try {
      const res = await api.put(`/message/${id}`, { newStatus });
      toast.success(res.data.message);
      getAllMessages();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const getApprovedMessages = async () => {
    try {
      const res = await api.get("/approve/messages");
      setApproveMessages(res.data.messages);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getApprovedMessages();
  }, []);

  return {
    getAllMessages,
    messages,
    createMessages,
    updateMessageStatus,
    approveMessages,
  };
};
