import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    total_price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    order_items:[
        {
        item_name:{
            type:String,
            required:true
        },
        item_quantity:{
            type:String,
            required:true
        },
        item_price:{
            type: Number ,
            required:true
        },
    },
    ],
},{timestamps:true})

export default mongoose.model("order",orderSchema);