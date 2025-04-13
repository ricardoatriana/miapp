import { useEffect, useState } from 'react';
import AptGrid from "../src/components/Products/AptGrid";

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


  return (
    <div className="flex flex-col lg:flex-row">
      {/* Products */}
      <AptGrid apts={apts}  /> 



     </div>
  );
}

export default Home;
