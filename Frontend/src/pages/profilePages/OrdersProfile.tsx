import OrdersCard from "../../components/shared/OrdersCard";
import { useState, useEffect } from "react";
import type { Order } from "../../types/orders.types";
import axios from "../../lib/axios";
function OrdersProfile() {
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders/all", { withCredentials: true });
                setOrders(response.data as Order[]);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);
    
    return (
        <div className="p-4 w-full lg:w-xl xl:w-3xl ">
            <h1 className="text-2xl font-bold mb-4">Your Orders:</h1>
            {orders.length === 0 && (<p>No orders found.</p>)}
            {orders.map((order) => {
                console.log(order);
                return <OrdersCard order={order} key={order.id} />;
            })}
        </div>
    );
}
export default OrdersProfile;