import OrdersCard from "../../components/shared/OrdersCard";

function OrdersProfile() {
    return (
        <div className="p-4 w-full max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Orders:</h1>
            {/* Add your orders content here */}
            <OrdersCard />
            <OrdersCard />
        </div>
    );
}
export default OrdersProfile;