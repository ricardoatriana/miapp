import { Link } from "react-router-dom";

const AptGrid = ({ apts, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {apts.map((apt, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <Link to={`/apt/${apt._id}`} className="block">
            <div className="w-full h-96 mb-4 rounded-lg overflow-hidden">
              <img
                src={apt.images[0].url}
                alt={apt.images[0].alText || apt.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold">{apt.name}</h3>
            <p className="text-gray-700">${apt.price}/month</p>
          </Link>

          {/* Button outside of Link to prevent accidental navigation */}
          <button
            onClick={() => addToCart(apt)}
            className="mt-2 bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default AptGrid;
