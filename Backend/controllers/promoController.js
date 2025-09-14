import promoModel from "../models/promoModel.js";

const addPromo=async(req,res)=>{
console.log(req.body);
try {
const promo=new promoModel({
code:req.body.code,
discount_type:req.body.discount_type,
discount_value:req.body.discount_value,
min_order:req.body.min_order,
expiry_date:req.body.expiry_date,
});
    await promo.save();
    console.log(promo);
    res.json({ success: true, message: "Promo added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error" });
  }
}

const listPromo=async(req,res)=>{
  try {
    const promos = await promoModel.find({});
    res.json({ success: true, data: promos});
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "error" });
  }
};

const removePromo=async(req,res)=>{
  try{
   await promoModel.findByIdAndDelete(req.body.id);
    res.json({ success: true});
  }
  catch(error){
 console.log("Error");
    res.json({ success: false, message: "error" });
  }
  }
  const checkPromo=async(req,res)=>{
  try{
    console.log(req.body.code);
   const promo= await promoModel.findOne({ code: req.body.code });
   if(!promo){
     return res.json({ success: false, message: "Invalid promo code" });
   }
   const currentDate = new Date();
   if(promo.expiry_date < currentDate){
     return res.json({ success: false, message: "Promo code expired" });
   }
   res.json({ success: true, data: promo });
  }
  catch(error){
 console.log("Error");
    res.json({ success: false, message: "error" });
  }
  }

 export { addPromo, removePromo, listPromo,checkPromo};