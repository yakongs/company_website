import React from "react";
const contacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "437-123-4567",
    message: "I have a question about the product.",
    status: "Pending",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily@example.com",
    phone: "437-876-4321",
    message: "I would like to request a refund.",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Michael Hii",
    email: "michael@example.com",
    phone: "437-000-1111",
    message: "The response seems to be delayed.",
    status: "Completed",
  },
];

const AdminContacts = () => {
  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">Contact Messages</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select className="border rounded px-3 py-2 text-base">
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="message">Message</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded px-3 py-2 text-base"
            />
          </div>
          <select className="border rounded px-3 py-2 text-base">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-base font-bold text-gray-600">
            Items per page:
          </label>
          <select className="border rounded px-3 py-2">
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-lg font-bold text-gray-600">
          No inquiries found
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">No.</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-4">{contact.id}</td>
                <td className="px-3 py-4">{contact.name}</td>
                <td className="px-3 py-4">{contact.email}</td>
                <td className="px-3 py-4">{contact.phone}</td>
                <td className="px-3 py-4">{contact.message}</td>
                <td className="px-3 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      contact.status === "Pending"
                        ? "bg-blue-100 text-blue-800"
                        : contact.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2">
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
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border rounded-lg bg-white shadow-md"
          >
            <div className="text-lg font-bold">No. {contact.id}</div>
            <div>Name: {contact.name}</div>
            <div>Email: {contact.email}</div>
            <div>Phone: {contact.phone}</div>
            <div>Message: {contact.message}</div>
            <div>
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  contact.status === "Pending"
                    ? "bg-blue-100 text-blue-800"
                    : contact.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {contact.status}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
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
        <span className="px-3 py-1">1 / 1</span>
        <button className="px-3 py-1 rounded border disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminContacts;
