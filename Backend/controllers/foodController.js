import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    // image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "error" });
  }
};

const getFood = async (req, res) => {
  try {
    const {id}=req.params;
      const foods = await foodModel.findById(id);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "error" });
  }
};
// remove food item

const removeFood = async (req, res) => {
  try {
    // const food = await foodModel.findById(req.body.id);
    //  fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "error" });
  }
};
const editFood = async (req, res) => {
  try {
    
    const {id}=req.params;
       const { name, description, price, category } = req.body;

    await foodModel.findByIdAndUpdate(id,{
     name, description, price, category 
    });
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true } // This returns the updated document
    );
    console.log(updatedFood);
    // Check if the food item exists
    if (!updatedFood) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Return the updated food item
    res.json({
      success: true,
      message: "Food item updated successfully",
      data: updatedFood, // Send the updated data back to the frontend
    });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "error" });
  }
};

export { addFood, listFood, removeFood,getFood,editFood };
