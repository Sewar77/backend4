//the second fil, afte the model.
// (logic), everything, handler,errors handelrs. req, res
//link between the routers and the models.

import Category from "../models/categories.Model.js";

// server function start with => crud
// pascalCase => server in js
// CamelCase => frontend

// create
export const createCategory = async (req, res) => {
  try {
    /*
create steps: 
1- read data => name, descrition
2- validate 
3- create 
4- send result OK!
        */
    const { name, description } = req.body;
    // read data from the request body => input by user
    name.trim();

    if (!name.trim()) {
      // not allowed !
      // bad request
      // json => message, data
      return res.statu(400).json({ message: "you should enter a name" });
      // return => stop
    }

    if (name.length < 3) {
      return res
        .statu(400)
        .json({ message: "category name must be more than 3 charecter " });
    }
    if (name.length >= 20) {
      return res
        .statu(400)
        .json({ message: "category name must be less than 20 charecter " });
    }

    //create:
    const category = Category.create(name, description);
    if (!category) {
      return res
        .statu(400)
        .json({ message: "something went wrong! please try again later" });
    }
    return res
      .status(201)
      .json({ message: "category created successfully", category });
    // created status=> 201
  } catch (error) {
    // internal server error => unhandleded error
    console.log(error);
    return res.statu(500).json({ message: "internal server error" });
  }
};
// read => getAllCategories
export const getAllCategories = async (req, res) => {
  try {
  } catch (error) {}
};
