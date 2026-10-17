// the routes
//define routes
//link routes with controller
import express from "express"
import { createCategory } 
from "../controller/categories.Controller.js"

const router = express.Router()

router.post('/category', createCategory)






export default router


