import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Iprops {}
interface product {
  category: string;
}
interface FetchResponse {
  products: product[];
}

const SideBar = ({}: Iprops) => {
const {
  searchQuery,
            setSearchQuery,
            seletCategory,
            setSeletCategory,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            keyword,
            setKeyword
} = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
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
        console.log(data);

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (e) {
        console.error("Error fetching product", e);
      }
    };
    fetchCategories();
  }, []);

  const handleMInPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value;
setMinPrice(value ? parseFloat(value) : undefined);
  }
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
      }
  const handleRadioChangeCategories = (category : string) => {
    setSeletCategory(category);
  }
  const handleKeywordClick = (keyWord: string) => {
    setKeyword(keyWord)
  }
  const handleResetFilters = () => {
    setSearchQuery("");
    setSeletCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  }

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">react</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="MIN"
            value={minPrice ?? ""}
            onChange={handleMInPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="MAX"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* section categories */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  className="mr-2 w-[16px] h-[16px]"
                  checked={seletCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </section>
        {/* Keywords section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keyWords.map((keyWord, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyWord)}
                className="black mb-2 px-4 py-2 w-full border rounded hover:bg-gray-200"
              >
                {keyWord.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
       <button onClick={handleResetFilters} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">rester fuilter</button>
      </section>
    </div>
  );
};

export default SideBar;
