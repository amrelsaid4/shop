import { useEffect, useState, useCallback } from "react";

interface Author {
  id: string;
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (e) {
        setError("Failed to load authors. Please try again.");
        console.error(`Error fetching authors: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = useCallback((id: string) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading top sellers...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

      <ul>
        {authors.map((author) => (
          <li key={author.id} className="flex items-center justify-between mb-4">
            <section className="flex justify-center items-center">
              <img
                src={author.image}
                alt={`Profile of ${author.name}`} 
                className="w-[25%] h-[25%] rounded-full"
              />
              <span className="ml-4">{author.name}</span>
            </section>

            <button
              onClick={() => handleFollowClick(author.id)}
              className={`py-1 px-3 rounded ${
                author.isFollowing ? "bg-red-500 text-white" : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
