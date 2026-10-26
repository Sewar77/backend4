// the imports
import dotenv from "dotenv";
import express from "express"; //server
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import categoryRoutes from "./src/routes/categories.Routes.js";
import bodyParser from "body-parser";
import productsRoutes from "./src/routes/products.Routes.js";
import authRoutes from "./src/routes/auth.Routes.js";
import userRoutes from "./src/routes/user.Routes.js";
// extensions in server imports are so important.
//the dotenv config
dotenv.config();
// define the server
const app = express();
connectDB();
app.use(express.json()); // will recieve only json

// the old approach
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

// security - on api headers
app.use(
    cors({
        origin: "http://localhost:5173", //this is whome will send the requests
        credentials: true, //allow data in body  cardentails
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] //for api server
    }),
);
// first api
// check health.
app.get("/health", (req, res) => {
    res.send("sewar");
});
// endpoints
// app.get("/sewar/shorman/sdk/backend", (req, res) => {
//     res.send("this api is for sewar")
//     console.log("found");
// })

// api use
app.use("/api", categoryRoutes);
app.use("/api", productsRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// localhost:3000/api
const port = process.env.PORT; // read from env file
//start server
app.listen(port, () => {
    console.log("The Server is Connection on port:", port);
});
