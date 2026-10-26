import { useState } from "react";
import api from "./api.js";
import { useEffect } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      //response      request
      const res = await api.get("/products"); //the completed part
      setProducts(res.data.products);
      console.log("the response is: ", res.data.products);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []); // later for now
  return <></>;
}

export default App;
