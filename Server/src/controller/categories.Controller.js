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
      return res.status(400).json({ message: "you should enter a name" });
      // return => stop
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "category name must be more than 3 charecter " });
    }
    if (name.length >= 20) {
      return res
        .status(400)
        .json({ message: "category name must be less than 20 charecter " });
    }
    //in case the name is already exist! doublication is not allowed!
    const isExist = await Category.findOne({ name })
    if (isExist) { //is exist => true, means found
      return res.status(409).json({ message: "this category name is already exist!" })
    } // 409 - conflict
    //create:
    const category = await Category.create({ name, description });
    if (!category) {
      return res
        .status(400)
        .json({ message: "something went wrong! please try again later" });
    }
    return res
      .status(201)
      .json({ message: "category created successfully", category });
    // created status=> 201
  } catch (error) {
    // internal server error => unhandleded error
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
// read => getAllCategories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // get all data from the model - find all
    // categories length.
    // categories => [], {} => array when its many. obj when its one.
    if (categories.length === 0) {
      // not error, they are just empty
      return res
        .status(200)
        .json({
          message: "there is no categories in our store yet. ",
          categories: [],
        });
    }
    // seccess in both cases => send res with message and data.
    return res.status(200).json({ message: "categories fetch", categories });
  } catch (error) {
    // internal server error => unhandleded error
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

// read => getCategoryById
export const getCategoryById = async (req, res) => {
  try {
    // send data=id. 
    // read data
    // when the function is BY-ID, read id from params
    const { id } = req.params // xd98wsxu897dw823d  
    if (!id) {
      return res.status(400).json({ message: "no item selected!" })
    }
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ message: "item not found" })
    }
    return res.status(200).json({ message: "found", category })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

// read - get categiry by name
export const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.body; //input
    if (!name) {
      return res.status(400).json({ message: "pleaes enter a name" })
    }
    const category = await Category.find({ name })
    if (!category) {
      return res.status(404).json({ message: "item with this name is not found" })
    }
    return res.status(200).json({ message: "found", category })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

// update
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body; // input => new data
    const { id } = req.params // which item to update
    //delete and update should have id from params
    if (!id) {
      return res.status(400).json({ message: "item not seleteced!" })
    }
    //in case the name is already exist! doublication is not allowed!
    const isExist = await Category.findOne({ name, _id: { $ne: id } }) // women 
    // ne => not equal
    if (isExist) { //is exist => true, means found
      return res.status(409).json({ message: "this category name is already exist!" })
    }
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      {
        new: true,
        runValidators: true,
        timestamps: true //update the time 
      }
    )
    if (!category) {
      return res.status(404).json({ message: "something went wrong while updating! item not found" })
    }
    return res.status(200).json({ message: "updated successfully", category })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

// delete
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params // xd98wsxu897dw823d  
    if (!id) {
      return res.status(400).json({ message: "no item selected!" })
    }
    const category = await Category.findByIdAndDelete(id)
    if (!category) {
      return res.status(404).json({ message: "item not found" })
    }
    return res.status(200).json({ message: "deleted" })
    // no need to retrive data when deleted
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}
