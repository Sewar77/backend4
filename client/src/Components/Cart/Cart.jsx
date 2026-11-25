import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCart } from "../../Hooks/useCart";
import { useEffect, useState } from "react";
import Header from "../Shared/Header";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Cart() {
  const {
    getCartByUser,
    cart,
    addToCart,
    minusFromCart,
    totalPrice,
    clearCart,
    checkOut,
  } = useCart();
  useEffect(() => {
    getCartByUser();
  }, []);
  console.log(cart.items);

  return (
    <>
      <Header />
      <Container sx={{ my: 2, width: "80%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            my: 3,
          }}
        >
          <Typography variant="h2">Total Price Cart: {totalPrice}</Typography>

          <Button onClick={() => clearCart()}>
            <Tooltip title="Remove all items from cart forever">
              <DeleteForeverIcon clear sx={{ fontSize: "50px" }} />
            </Tooltip>
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />
        {cart.items?.length === 0 && (
          <>
            <Typography variant="h2">No Item in Cart</Typography>
          </>
        )}
        <Grid container spacing={4}>
          {cart.items?.map((item) => {
            return (
              <Grid size={12}>
                <Card sx={{ textAlign: "center", alignItems: "center" }}>
                  <CardContent
                    sx={{
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Tooltip title="+ 1 ">
                        <Button
                          variant="contained"
                          onClick={() =>
                            addToCart({
                              productId: item.product._id,
                              quantity: 1,
                            })
                          }
                        >
                          <AddIcon />
                        </Button>
                      </Tooltip>
                      <Typography variant="h3">{item.product.name}</Typography>
                      <Tooltip title="- 1 ">
                        <Button
                          variant="contained"
                          onClick={() =>
                            minusFromCart({
                              productId: item.product._id,
                              quantity: 1,
                            })
                          }
                        >
                          <RemoveIcon />
                        </Button>
                      </Tooltip>
                    </Box>
                    <Typography variant="h4">${item.product.price}</Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        border: "1px solid black",
                        my: 3,
                        width: "fit-content",
                        textAlign: "center",
                        p: 2,
                        borderRadius: 3,
                      }}
                    >
                      Qty: {item.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {cart.items?.length !== 0 && (
          <>
            <Button onClick={() => checkOut()}>CHECKOT</Button>
          </>
        )}
      </Container>
    </>
  );
}
