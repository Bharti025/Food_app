import mongoose from "mongoose";

const promoSchema=new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  expiry_date: { type: Date, required: true },
  discount_type: { type: String, required: true },
  discount_value: { type: Number, required: true },
  min_order: { type: Number, required: true },
 
});

const promoModel = mongoose.models.promo|| mongoose.model("promo", promoSchema);

export default promoModel;