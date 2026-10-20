// the imports 
import dotenv from "dotenv"
import express from "express" //server
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import categoryRoutes from "./src/routes/categories.Routes.js"
import bodyParser from "body-parser"
import productsRoutes from "./src/routes/products.Routes.js"
// extensions in server imports are so important. 
//the dotenv config
dotenv.config()
// define the server
const app = express()
app.use(express.json())

// the old approach
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

connectDB()
// security - on api headers

// first api
// check health. 
app.get('/health', (req, res) => {
    res.send("sewar")

})
// endpoints
// app.get("/sewar/shorman/sdk/backend", (req, res) => {
//     res.send("this api is for sewar")
//     console.log("found");
// })

// api use
app.use('/api', categoryRoutes)
app.use('/api', productsRoutes)

// localhost:3000/api
const port = process.env.PORT // read from env file
//start server
app.listen(port, () => {
    console.log("The Server is Connection on port:", port)
})