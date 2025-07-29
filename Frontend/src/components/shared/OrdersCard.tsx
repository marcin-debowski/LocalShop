function OrdersCard() {
    return (
        <div className="p-4 rounded-lg shadow-md mb-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Order #12345</h2>
            <p className="text-gray-600 mb-4">Order Date: January 1, 2023</p>
            <ul className="space-y-2 mb-4 ">
                <li className="flex justify-between ">
                    <img src="https://via.placeholder.com/150" alt="Order Image" className="rounded-md object-cover border border-gray-300 mb-4" />
                    <span className="text-gray-700">Product 1</span>
                    <span className="text-gray-600">$10.00</span>
                    <span className="text-gray-600">X</span>
                    <span className="text-gray-600">10</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-gray-600">$100.00</span>
                </li>
                <li className="flex justify-between">
                    <img src="https://via.placeholder.com/150" alt="Order Image" className="rounded-md object-cover border border-gray-300 mb-4" />
                    <span className="text-gray-700">Product 1</span>
                    <span className="text-gray-600">$10.00</span>
                    <span className="text-gray-600">X</span>
                    <span className="text-gray-600">10</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-gray-600">$100.00</span>
                </li>
            </ul>
            <p className="text-lg font-bold text-right">Total: <span className="text-green-600">$115.00</span></p>
        </div>
    );
}
export default OrdersCard;