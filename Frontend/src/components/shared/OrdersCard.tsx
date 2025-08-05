import type { Order } from "../../types/orders.types";
function OrdersCard({ order }: { order: Order }) {
    return (
        <div className="p-4 rounded-lg shadow-md mb-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Order #</h2>
            <p className="text-gray-600 mb-4">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

            <ul className="space-y-2 mb-4 ">
                {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between ">
                        <img src={item.product.imageUrl} alt="Order Image" className="rounded-md object-cover border border-gray-300 mb-4 w-20 h-20" />
                       <span className="text-gray-700">
                            {item.product.name}
                        </span>
                        <span className="text-gray-600">${item.price}</span>
                        <span className="text-gray-600">X</span>
                        <span className="text-gray-600">{item.quantity}</span>
                        <span className="text-gray-600">=</span>
                        <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <p className="text-lg font-bold text-right">Total: <span className="text-green-600">${order.total.toFixed(2)}</span></p>
        </div>
    );
}
export default OrdersCard;