import { useProducts } from "../../Hooks/useProducts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../Shared/Header";
export default function Products() {
  const { products } = useProducts();

  return (
    <>
      <Header />
      <Container sx={{ my: 3 }}>
        <Typography variant="h1">Products</Typography>
        <Divider sx={{ p: 2 }}>Explore</Divider>
        <Grid container spacing={4}>
          {products.map((product) => {
            return (
              <Grid
                key={product._id}
                size={{ xs: 6, sm: 6, md: 4, lg: 3, p: 2 }}
              >
                <Card sx={{ height: "600px", width: "100%" }}>
                  <CardContent>
                    <CardHeader title={product.catId?.name || "NO CATEGORY"} />
                    <br />
                    <CardMedia
                      component={"img"}
                      src="product.jpg"
                      alt="product image"
                      width={"100%"}
                      height={"300px"}
                    />
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1">${product.price}</Typography>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="contained">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
