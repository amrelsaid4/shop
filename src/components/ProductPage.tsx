import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((e) => {
          console.error(`Error fetching product data: ${e}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-red-500">
          Product not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      {product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-[50%] h-auto mb-5 rounded-md shadow-lg"
        />
      ) : (
        <div className="w-[50%] h-64 flex items-center justify-center bg-gray-200 text-gray-500 mb-5 rounded-md">
          No Image Available
        </div>
      )}

      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex text-lg">
        <p>
          Price: <span className="font-semibold">${product.price}</span>
        </p>
        <p className="ml-10">
          Rating: <span className="font-semibold">{product.rating}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
