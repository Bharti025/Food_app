import React, { useState } from "react";

import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Promo() {
  const url = "https://food-app-backend-l63s.onrender.com";

  const [data, setDate] = useState({
    code: "",
    expiry_date: "",
    discount_type: "",
    discount_value:"",
    min_order: "",
   
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDate((data) => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${url}/api/promo/add`,data);
    console.log(response.data);
    if (response.data.success) {
      setDate({
        code: "",
        expiry_date: "",
        discount_type: "",
        discount_value: "",
        min_order: ""
      });
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      // console.log("data send fails");
      console.log(err);
    }
  };

  return (
    <>
      <div className="add">
        <form className="flex-col" onSubmit={onsubmitHandler}>
       
          <div className="add-product-name flex-col">
            <p>Code</p>
            <input
              onChange={onChangeHandler}
              value={data.code}
              type="text"
              name="code"
              placeholder="Type here"
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Expiry Date</p>
            <input
              onChange={onChangeHandler}
              value={data.expiry_date}
              name="expiry_date"
              type="date"
              placeholder="Write expiry date"
              required
            ></input>
          </div>
          <div className="add-product-name flex-col">
            <p>Min order</p>
            <input
              onChange={onChangeHandler}
              value={data.min_order}
              name="min_order"
              placeholder="$20"
              required
            ></input>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Discount Type</p>
              <select
                onChange={onChangeHandler}
                value={data.discount_type}
                name="discount_type"
              >
               
                <option value="fixed">Fixed</option>
                 <option value="percentage">Percentage</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Discount value</p>
              <input
                onChange={onChangeHandler}
                value={data.discount_value}
                type="Number"
                name="discount_value"
                placeholder="$20"
              />
            </div>
            
          </div>
          
          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
      </div>
    </>
  );
}

export default Promo;
