import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function OrderByPhone({ phone }) {
  const fetchOrders = async () => {
   try {
    const { data } = await axios.get(`https://cafe-management-a7uc.onrender.com/api/orders/${phone}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch orders."
    );
  }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["order", phone],
    queryFn: fetchOrders,
    enabled: !!phone && phone.length === 10, 
  });

  if (!phone) return null;

  if (isLoading)
    return (
      <p className="text-gray-500 mt-6 text-center">Loading your orders...</p>
    );

  if (isError)
    return (
      <p className="text-red-500 mt-6 text-center">
        ❌ Failed to load orders. Please try again.
      </p>
    );
  if (!data || data.length === 0)
    return (
      <p className="text-gray-500 mt-6 text-center">
        No orders found for this phone number.
      </p>
    );
  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 shadow-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Orders</h2>

      <div className="space-y-4">
        {data.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-800">📞 {order.phone}</p>
              <span
                className={`text-sm font-medium ${
                  order.status === "pending"
                    ? "text-yellow-600"
                    : order.status === "completed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm">
              🕒 {new Date(order.createdAt).toLocaleString()}
            </p>

            <hr className="my-2" />

            {order.order_items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-gray-700 text-sm"
              >
                <span>
                  {item.item_name} × {item.item_quantity}
                </span>
                <span>₹{item.item_price * item.item_quantity}</span>
              </div>
            ))}

            <div className="mt-3 text-right font-semibold text-gray-800">
              Total: ₹{order.total_price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderByPhone;
