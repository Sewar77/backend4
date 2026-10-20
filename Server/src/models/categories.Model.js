// the schema, links between the db and controller. 
// schema, no logic. 
// object - docemtn schema
// =============
// category schema:
// name(string, requied) , descripton(string), created at, updated at, id, (created by, updated by)
// ==============
import mongoose from "mongoose"
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"],
            trim: true,
            minLength: [2, 'Minimum Length is 2 charecters'],
            maxLength: [20, 'Maximim length is 20'],
            unique: [true, 'Category name is already exist']
        },
        description: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
        // dates, _id
    }
)
const Category = mongoose.model("Category", categorySchema)
export default Category