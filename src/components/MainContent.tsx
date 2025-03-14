import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { ShoppingCart, Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import Cart from "./Cart";

interface Iprops {}
const MainContent = ({}: Iprops) => {
  const { searchQuery, selectCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((e) => {
        console.error("Error fetch data", e);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;
    if (selectCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category == selectCategory
      );
    }
    console.log("App Component Loaded");
    if (minPrice != undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice != undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "cheap":
        return [...filteredProducts].sort((x, y) => x.price - y.price);
      case "expensive":
        return [...filteredProducts].sort((x, y) => y.price - x.price);
      case "popular":
        return [...filteredProducts].sort((x, y) => y.rating - x.rating);
      default:
        return filteredProducts;
    }
  };

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const numberPages = () => {
  //   const buttons: number[] = [];
  //   let startPage = Math.max(1, currentPage - 2);
  //   let endPage = Math.min(totalPages, currentPage + 2);

  //   if (currentPage - 2 < 1) {
  //     endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
  //   }
  //   if (currentPage + 2 > totalPages) {
  //     startPage = Math.min(1, startPage + (2 - totalPages - currentPage));
  //   }

  //   for (let page = startPage; page <= endPage; page++) {
  //     buttons.push(page);
  //   }

  //   return buttons;
  // };
  // const handleIncreaseQuantity = (id: number) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const handleDecreaseQuantity = (id: number) => {
  //   setCartItems((prevItems) =>
  //     prevItems
  //       .map((item) =>
  //         item.id === id
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       )
  //       .filter((item) => item.quantity > 0)
  //   );
  // };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="xl:w-[55rem] mr-[10rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("cheap")}
                >
                  Cheap
                </button>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("expensive")}
                >
                  Expensive
                </button>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("popular")}
                >
                  Popular
                </button>
              </div>
            )}
          </div>

          <div className="relative py-5">
  <button
    className="border px-4 py-2 rounded-full flex items-center shadow-lg hover:bg-gray-100 transition"
    onClick={() => setCartOpen(true)}
  >
    <ShoppingCart className="mr-2" />
    Cart
  </button>

  {cartOpen && (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
      onClick={() => setCartOpen(false)}
    />
  )}

  <div
    className={`fixed top-0 right-0 w-96 h-full bg-white shadow-xl border-l border-gray-300 transform transition-transform duration-300 ease-in-out z-50 flex flex-col
    ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
  >
    <div className="p-4 flex justify-between items-center border-b">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      <button
        onClick={() => setCartOpen(false)}
        className="text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </div>

    <div className="overflow-y-auto flex-grow p-4">
      <Cart />
    </div>
  </div>
</div>

        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => handlePageChange(num + 1)}
              className={`px-4 py-2 border rounded-3xl ${
                num + 1 === currentPage
                  ? "bg-gray-900 text-white border-2 border-white"
                  : ""
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
