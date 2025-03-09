import { useEffect, useState } from "react";

interface Iprops {}
interface product {
  categories: string;
}
interface FetchResponse {
  products: product[];
}
const SideBar = ({}: Iprops) => {
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
        const uniqueCategorie = Array.from(
          new Set(data.products.map((product) => product.categories))
        );
        setCategories(uniqueCategorie);
      } catch (e) {
        console.error("Error fatching product", e);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">react </h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
        />
        <div className="flex justify-center items-center">
          <input type="text" className="border-2 mr-2 px-5 -py-3 mb-3 w-full" placeholder="MIN"/>
          <input type="text" className="border-2 mr-2 px-5 -py-3 mb-3 w-full" placeholder="MAX"/>
        </div>
       
       {/* section catecongries */}

       <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">categories</h2>
       </div>
       {categories.map((category, index) => (
        <label key={index} className="black mb-2">
          <input type="radio" name="category" value={category} className="mr-2 w-[16px] h-[16px]"/>
          {category}
        </label>
       ))}
      
      </section>
    </div>
  );
};

export default SideBar;
