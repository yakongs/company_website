import React, { useState } from "react";

const dummyPosts = [
  {
    _id: 1,
    number: 1,
    title: "First post",
    createdAt: "2026-02-01T10:00:00",
    views: 10,
  },
  {
    _id: 2,
    number: 2,
    title: "Second post",
    createdAt: "2026-02-02T11:30:00",
    views: 20,
  },
  {
    _id: 3,
    number: 3,
    title: "Third post",
    createdAt: "2026-02-03T14:00:00",
    views: 30,
  },
  {
    _id: 4,
    number: 4,
    title: "Fourth post",
    createdAt: "2026-02-04T16:45:00",
    views: 40,
  },
  {
    _id: 5,
    number: 5,
    title: "Fifth post",
    createdAt: "2026-02-05T09:15:00",
    views: 50,
  },
];

const Careers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPage - itemsPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirstPost, indexOfLastPage);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto py-32 md:py-32">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 md:mb-8">
          Careers
        </h1>
        <p className="text-xl text-gray-600">
          SOSO Factory, where the finest teams come together to create the No. 1
          game in the world!
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
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
            {currentPosts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{post.number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Careers;
