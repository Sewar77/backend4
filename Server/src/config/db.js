//for data base connection
//this file makes sure that batabase is connected with server. 
//the first file. 
import mongoose from "mongoose"

// asynchorized
export const connectDB = async () => {
    try {
        // the correct code
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("mongo is connected");
    } catch (error) {
        console.log("mongo is NOT connected", error)
        process.exit(1)
    }
}
