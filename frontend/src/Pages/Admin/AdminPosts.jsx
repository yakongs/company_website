import React from "react";
const posts = [
  {
    _id: "1",
    title: "First Post",
    content: "This is the content of the first post.",
    views: 123,
    fileUrl: ["https://example.com/file1.pdf"],
    createdAt: "2025-12-01T12:00:00Z",
    updatedAt: "2025-12-02T15:30:00Z",
  },
  {
    _id: "2",
    title: "Second Post",
    content: "This is the content of the second post.",
    views: 456,
    fileUrl: ["https://example.com/file2.pdf", "https://example.com/file3.pdf"],
    createdAt: "2025-12-03T10:00:00Z",
    updatedAt: "2025-12-03T18:45:00Z",
  },
  {
    _id: "3",
    title: "Third Post",
    content: "This is the content of the third post.",
    views: 789,
    fileUrl: [],
    createdAt: "2025-12-05T09:00:00Z",
    updatedAt: "2025-12-05T14:30:00Z",
  },
];

const AdminPosts = () => {
  return (
    <div className="p-4 mx-auto max-w-[1700px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">Career Posts</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select className="border rounded px-3 py-2 text-base">
            <option value="title">Title</option>
            <option value="content">Content</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded px-3 py-2 text-base"
            />
          </div>
        </div>

        <a
          href="#"
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
        >
          Add
        </a>
      </div>

      <div className="mb-4">
        <div className="text-lg font-bold text-gray-600">No posts found</div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">No.</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Content</th>
              <th className="px-4 py-3 text-left">Views</th>
              <th className="px-4 py-3 text-center">Attachment</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Updated At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {post.title}
                </td>
                <td className="px-4 py-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {post.content}
                </td>
                <td className="px-4 py-3">{post.views}</td>
                <td className="px-4 py-3 text-center">
                  {post.fileUrl.length > 0 ? (
                    post.fileUrl.map((url, index) => (
                      <button
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-md transition-all duration-300 border border-gray-200 hover:border-gray-300 mr-2"
                      >
                        File {index + 1}
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-500">No files</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {new Date(post.updatedAt).toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end space-x-2">
                    <button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className="p-4 border rounded-lg bg-white shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <span className="text-gray-500 text-sm">#{index + 1}</span>
            </div>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.fileUrl.length > 0 ? (
                post.fileUrl.map((url, index) => (
                  <button
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-md transition-all duration-300 border border-gray-200 hover:border-gray-300"
                  >
                    File {index + 1}
                  </button>
                ))
              ) : (
                <span className="text-gray-500">No files</span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <div>Views: {post.views}</div>
              <div>Created At: {new Date(post.createdAt).toLocaleString()}</div>
              <div>Updated At: {new Date(post.updatedAt).toLocaleString()}</div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
        <button className="px-3 py-1 rounded border disabled:opacity-50">
          Prev
        </button>
        <span className="px-3 py-1 font-normal">1 / 1</span>
        <button className="px-3 py-1 rounded border disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPosts;
