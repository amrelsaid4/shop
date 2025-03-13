import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const SideBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectCategory,
    setSelectCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyWords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();

        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (e) {
        console.error("Error fetching categories", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectCategory(category);
  };

  const handleKeywordClick = (keyWord: string) => {
    setKeyword(keyWord);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 py-3 w-full sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center mt-3 items-center">
          <input
            type="number"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="MIN"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="border-2 px-5 py-3 mb-3 w-full"
            placeholder="MAX"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
      </section>

      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <section>
          {loading ? (
            <p className="text-gray-500 italic">Loading categories...</p>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  className="mr-2 w-[16px] h-[16px]"
                  checked={selectCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))
          ) : (
            <p className="text-red-500">No categories found.</p>
          )}
        </section>
      </div>

      <div className="mb-5 mt-4">
        <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        <div>
          {keyWords.map((keyWord, index) => (
            <button
              key={index}
              onClick={() => handleKeywordClick(keyWord)}
              className={`mb-2 px-4 py-2 w-full border rounded hover:bg-gray-200 ${
                keyword === keyWord ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              {keyWord.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleResetFilters}
        className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default SideBar;
