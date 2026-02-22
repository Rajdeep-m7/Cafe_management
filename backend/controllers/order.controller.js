import order from "../models.js/order.models.js";

export const addOrder= async(req,res)=>{
    try{
        const {name, phone , total_price, status , order_items} = req.body;
        const orderDetails = await order.create({
            name,
            phone,
            total_price,
            status: "pending",
            order_items,
        });
        res.status(201).json({
        message: "Order placed successfully",
        order: orderDetails,
    });
    }catch(err){
         console.error("Error adding order:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }

}

export const getOrdersByPhone = async(req,res)=>{
   try{
     const {phone}= req.params;
    if(!phone){
        res.status(400).json({message:"phone number required"})
    }
    const orders = await order.find({phone}).sort({ createdAt: -1 });

    if(orders.length==0){
        res.json({message: " no order found "})
    }
    res.status(200).json( orders)

   }catch(err){
        console.error("Error getting order:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await order.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Fetch successful", orders }); 
  } catch (err) {
    console.error("Error getting order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateOrderStatus = async(req,res)=>{
  try{
    const {id}= req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await order.findByIdAndUpdate(
      id,
      {  status: status.toLowerCase() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Error updating order status:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

