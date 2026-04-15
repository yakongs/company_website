import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Careers = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post");

        setPosts(response.data);
      } catch (error) {
        console.log("Failed to fetch posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      const matchesSearch = value.includes(searchTerm.toLowerCase());

      const postDate = new Date(post.createdAt).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate + "T23:59:59").getTime() : null;

      const matchesDate =
        (!start || postDate >= start) && (!end || postDate <= end);

      return matchesSearch && matchesDate;
    });
  }, [posts, searchTerm, searchType, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-7xl py-32">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 md:mb-8">
          Careers
        </h1>
        <p className="text-xl text-gray-600">
          SOSO Factory, where talented teams come together to create great
          games!
        </p>
      </div>

      <div className="mb-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select
            className="border rounded px-3 py-2 text-base"
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="title">Title</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded px-3 py-2 text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-3 py-2 w-full md:w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-3 py-2 w-full md:w-auto"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">Rows per page:</label>
          <select
            className="border rounded px-3 py-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[8%]">
                No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-auto">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[15%]">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[8%]">
                Views
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPosts.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post, index) => (
                <tr
                  key={post._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {post.views}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid grid-cols-1 gap-4">
        {paginatedPosts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 p-2">
            No posts found.
          </div>
        ) : (
          paginatedPosts.map((post, index) => (
            <div
              key={post._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold truncate">{post.title}</h3>
                <span className="text-sm text-gray-500">
                  #{(currentPage - 1) * pageSize + index + 1}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Date: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Views: {post.views}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-2 text-base font-bold">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50 bg-gray-100"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1 font-normal">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50 bg-gray-100"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Careers;
