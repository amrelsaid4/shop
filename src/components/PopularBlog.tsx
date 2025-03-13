import { MessageCircle, ThumbsUp } from "lucide-react";

interface Iprops {}

const PopularBlog = ({}: Iprops) => {
  const blogs = [
    { title: "The Future of AI", author: "Alice Johnson", likes: 250, comments: 120 },
    { title: "Mastering React.js", author: "John Doe", likes: 340, comments: 89 },
    { title: "Understanding TypeScript", author: "Michael Smith", likes: 290, comments: 75 },
    { title: "Building Scalable Web Apps", author: "Emily Davis", likes: 420, comments: 210 },
    { title: "Next.js vs Gatsby", author: "Chris Wilson", likes: 180, comments: 65 },
    { title: "Top 10 JavaScript Frameworks", author: "Emma Brown", likes: 500, comments: 320 },
    { title: "How to Improve Web Performance", author: "David Martinez", likes: 230, comments: 95 },
    { title: "GraphQL vs REST API", author: "Sophia White", likes: 310, comments: 140 },
    { title: "The Rise of Serverless Computing", author: "Liam Anderson", likes: 275, comments: 110 },
    { title: "Cybersecurity Best Practices", author: "Olivia Thomas", likes: 350, comments: 175 },
  ];

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {sortedBlogs.slice(0, 4).map((blog, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">{blog.title}</span>
            </div>
            <span className="text-gray-600">Published by {blog.author}</span>
            <div className="flex items-center mt-2">
              <ThumbsUp size={16} className="mr-1 text-gray-500" />
              <span className="text-gray-500 mr-4">{blog.likes}</span>
              <MessageCircle size={16} className="mr-1 text-gray-500" />
              <span className="text-gray-500">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlog;
