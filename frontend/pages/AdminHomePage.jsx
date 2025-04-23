import axios from "axios";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all orders when component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:9000/api/orders", { withCredentials: true }); // API GET all order from ordersRoutes
                setOrders(response.data); // Assuming API returns an array of orders
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Overview Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Revenue</h2>
                    <p className="text-2xl">${orders.reduce((total, order) => total + order.totalPrice, 0)}</p>
                </div>
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl">{orders.length}</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading orders...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <table className="min-w-full text-left text-gray-500">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                                <tr>
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">User</th>
                                    <th className="py-3 px-4">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                            <td className="p-4">{order._id}</td>
                                            <td className="p-4">{order.user?.name || "Unknown User"}</td>
                                            <td className="p-4">${order.totalPrice}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="p-4 text-center text-gray-500">
                                            No recent orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
