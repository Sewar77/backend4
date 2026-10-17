// the imports 
import dotenv from "dotenv"
import express from "express" //server
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import categoryRoutes from "./src/routes/categories.Routes.js"
// extensions in server imports are so important. 
//the dotenv config
dotenv.config()
// define the server
const app = express()
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


const port = process.env.PORT // read from env file
//start server
app.listen(port, () => {
    console.log("The Server is Connection on port:", port)
})