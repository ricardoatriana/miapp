import axios from "axios";
import { useEffect, useState } from "react";

const CartDrawer = ({ cart, removeFromCart }) => {
  const [userId, setUserId] = useState(""); // Stores the userId after fetching it
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Indicates if checkout is in progress
 
 // Get the user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
         // API GET from Users. Routes-userRoutes, the credentials ensure that auth token is included
        const response = await axios.get("http://localhost:9000/api/users/userid", {
          withCredentials: true,
        });
        setUserId(response.data._id); // Extract user ID from respons
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const checkout = async () => {
    if (!userId) {
      alert("Please log in first");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

      await axios.post("http://localhost:9000/api/orders", {
        // API POST to Order Collections. Routes-orderRoutes
        user: userId,
        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
        })),
        totalPrice,
      });

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total for display

  // To Fixed is to format the number
  return (
    <div className="cart-drawer p-4 bg-white rounded shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => ( //iterates to each item on the cart using map , item is the product and index its position, so it renders a list
            <div
              key={item.id || index} // As reacts requires a key prop when rendering lists , the main is item.id, if not id then uses index.
              className="flex justify-between items-center border-b py-2"
            >
              <p>
                {item.name} - ${item.price.toFixed(2)} 
              </p>
              <button
                onClick={() => removeFromCart(index)}
                className="text-sm text-red-500 hover:text-red-700"
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}

            
          <div className="flex justify-between items-center mt-4 font-semibold">
            <span>Total:</span> 
            <span>${total.toFixed(2)}</span>  
          </div>

          <button
            onClick={checkout}
            className="mt-4 w-full bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? "Placing Order..." : "Checkout"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
