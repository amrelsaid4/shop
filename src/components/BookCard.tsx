import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";

interface IProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<IProps> = ({ id, image, title, price }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, image, title, price }));
  };

  return (
    <div className="border p-4 rounded flex flex-col justify-between">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />
      </Link>
      <h2 className="font-bold">{title}</h2>
      <p>${price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
