import React, { useContext,useState,useEffect} from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, checkPromoCode,promo,url,discount} =
    useContext(StoreContext);
  const [code,setCode]=useState("");
  const navigate = useNavigate();

 

useEffect(() => {
    if (promo?.success === false && promo?.message) {
      toast.error(promo.message);
    }
    if(promo.success===true){
      toast.success("Congratulations! You get discount")
    }
  }, [promo]);

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        </div>
        <br />
        <hr />
        {food_list?.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <React.Fragment key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b className={promo.success? "highlight":""}>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
              </div>
              {promo.success && (
              <div>
              <div className="cart-total-details">
             <p>Discount</p> 
               <p>-${discount}</p> 
            </div>
            <div className="cart-total-details">
             <b>Final Total</b>
              <b>
               ${getTotalCartAmount()+2-discount}
              </b>
            </div>
            </div>
              )
}
            <button onClick={() => navigate("/order")}>
              Proceed To Checkout
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" onChange={(e)=>setCode(e.target.value)}/>
              <button onClick={() => checkPromoCode(code)}>Submit</button>
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
