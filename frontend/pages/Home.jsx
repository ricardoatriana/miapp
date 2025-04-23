import { useEffect, useState } from 'react';
import AptGrid from "../src/components/Products/AptGrid";
import CartDrawer from "/pages/CartDrawer";
import axios from "axios";  // Axios to integrate backend with frontend


const Home = () => {
    const [apts, setApts] = useState([]);
    const [cart, setCart] = useState([]);  // Cart state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:9000/api/products"); 
                setApts(response.data); 
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

  // Function to add item to cart
  const addToCart = (apt) => {
    setCart((prevCart) => [...prevCart, apt]); //Creates a new array with the previous cart item
  };
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index)); //Removes an item from the cart using its index, filter function loop trough the array except at the index
  };

  return (
    <div className="flex flex-col lg:flex-row">
    {/* Products */}
      <AptGrid apts={apts} addToCart={addToCart}   /> 

    {/* Cart Drawer */}
      <CartDrawer cart={cart} removeFromCart={removeFromCart} />    

     </div>
  );
}

export default Home;
