import { Container } from "@mui/material";
import { useCart } from "../../Hooks/useCart";
import { useEffect } from "react";
import Header from "../Shared/Header";
export default function Cart() {
  const { getCartByUser, cart } = useCart();
  useEffect(() => {
    getCartByUser();
  }, []);
  console.log(cart.items);
  return (
    <>
      <Header />
      <Container sx={{ my: 2 }}></Container>
    </>
  );
}
