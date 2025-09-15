import React, { useState, useEffect } from "react";
import "../Add/Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom"; // For routing

function Edit() {
  const url = "https://food-app-backend-l63s.onrender.com";
  const { id } = useParams(); // Get the food item id from the URL
  const navigate = useNavigate(); // To navigate after success

  const [image, setImage] = useState(null); // Store the image (new image when selected)
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "", // To store existing image path
  });

  // Fetch food data when the component is mounted
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/food/get/${id}`);
        if (response.data.success) {
          const food = response.data.data;
          setData({
            name: food.name,
            description: food.description,
            category: food.category,
            price: food.price,
            image: food.image, // Set the existing image URL (so it can be shown in the form)
          });
        } else {
          toast.error("Failed to fetch food details");
        }
      } catch (error) {
        toast.error("Error fetching food details");
      }
    };
    
    fetchFoodDetails();
  }, [id]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
   
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const result={
     name:data.name,
     description:data.description,
     category:data.category,
     price:data.price
    }
  console.log(result);
    try {
      const response = await axios.put(`${url}/api/food/edit/${id}`,result);
      if (response.data.success) {
        
        toast.success(response.data.message);
        navigate("/list"); // Redirect after successful edit
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error editing food");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image) // Display the newly selected image
                  : `${url}/images/${data.image}` // Display the existing image from the database
              }
              alt="Food Image"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])} // Set the selected image
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="none">none</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default Edit;

