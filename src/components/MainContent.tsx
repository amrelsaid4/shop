import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";

interface Iprops {}
const MainContent = ({}: Iprops) => {
  const { searchQuery, seletCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
    if (seletCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category == seletCategory
      );
    }

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
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="xl:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center ">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex items-center">
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
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
        </div>
      </div>
    </section>
  );
};

export default MainContent;
