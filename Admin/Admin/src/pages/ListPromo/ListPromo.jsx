import React, { useEffect, useState } from "react";
import "./listpromo.css"
import axios from "axios";
import { toast } from "react-toastify";

function ListPromo() {
  const url ="https://food-app-backend-l63s.onrender.com";
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/promo/list`);
    if (response.data.success) {
      console.log(response.data);
      setList(response.data.data);
    } else {
      toast.error("error");
    }
  };

  const removePromo = async (id) => {
    const response = await axios.post(`${url}/api/promo/delete`, { id: id });
    console.log(response);
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="list add flex-col">
        <p>All Coupons</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Code</b>
            <b>Expiry Date</b>
            <b>Discount Type</b>
            <b>Discount Value</b>
            <b>Min Order</b>
              <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <p>{item.code}</p>
                <p>{new Date(item.expiry_date).toLocaleDateString()}</p>
                <p>{item.discount_type}</p>
                <p>{item.discount_value}</p>
                <p>{item.min_order}</p>
                <p onClick={() => removePromo(item._id)} className="curser">
                  x
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ListPromo;

