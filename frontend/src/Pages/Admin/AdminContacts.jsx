import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contact", {
          withCredentials: true,
        });

        setContacts(response.data);
      } catch (error) {
        console.log("Failed to fetch inquiries: ", error);
      }
    };

    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/contact/${selectedContact._id}`,
        { status: newStatus },
        { withCredentials: true },
      );

      setContacts(
        contacts.map((contact) =>
          contact._id === selectedContact._id
            ? { ...contact, status: newStatus }
            : contact,
        ),
      );

      setIsModalOpen(false);
      Swal.fire(
        "Update Successful",
        "The status has been updated successfully.",
        "success",
      );
    } catch (error) {
      console.log("Update failed: ", error);
      Swal.fire(
        "Update Failed",
        "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/contact/${id}`, {
          withCredentials: true,
        });

        setContacts(contacts.filter((contact) => contact._id !== id));
        Swal.fire(
          "Delete Successful",
          "The item has been deleted successfully.",
          "success",
        );
        setCurrentPage(1);
      } catch (error) {
        console.log("Delete Failed: ", error);
        Swal.fire(
          "Delete Failed",
          "Something went wrong. Please try again.",
          "error",
        );
      }
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const value = contact[searchType].toLowerCase() || "";
      const matchesSearch = value.includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, searchType, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">Contact Messages</h1>

      {contacts.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-2xl font-bold text-gray-800">
            No inquiries found.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex w-full md:w-auto gap-2">
              <select
                className="border rounded px-3 py-2 text-base"
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="subject">Subject</option>
                <option value="message">Message</option>
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

              <select
                className="border rounded px-3 py-2 text-base"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-base font-bold text-gray-600">
                Items per page:
              </label>
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

          <div className="mb-4">
            <div className="text-lg font-bold text-gray-600">
              {filteredContacts.length} inquiries
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="table-fixed w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-base">
              <colgroup>
                <col className="w-[5%]"></col>
                <col className="w-[10%]"></col>
                <col className="w-[15%]"></col>
                <col className="w-[20%]"></col>
                <col className="w-[30%]"></col>
                <col className="w-[10%]"></col>
                <col className="w-[10%]"></col>
              </colgroup>
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">No.</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td]:truncate">
                {paginatedContacts.map((contact, index) => (
                  <tr key={contact._id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-4">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-3 py-4">{contact.name}</td>
                    <td className="px-3 py-4">{contact.email}</td>
                    <td className="px-3 py-4 truncate">{contact.subject}</td>
                    <td className="px-3 py-4 truncate">{contact.message}</td>
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
                        <button
                          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => handleEdit(contact)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => {
                            handleDelete(contact._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden break-words">
            {paginatedContacts.map((contact, index) => (
              <div
                key={contact._id}
                className="p-4 border rounded-lg bg-white shadow-md text-lg font-bold"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    #{(currentPage - 1) * pageSize + index + 1}
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
                </div>
                <div>Name: {contact.name}</div>
                <div>Email: {contact.email}</div>
                <div>Subject: {contact.subject}</div>
                <div>Message: {contact.message}</div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap"
                    onClick={() => {
                      handleDelete(contact._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="px-3 py-1 font-normal">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Inquiry Status</h2>
            <div className="mb-4">
              <p className="font-medium mb-2">
                Current Status:{" "}
                {selectedContact.status === "In Progress"
                  ? "In Progress"
                  : selectedContact.status === "Pending"
                    ? "Pending"
                    : "Completed"}
              </p>
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  onClick={() => {
                    handleStatusUpdate("Pending");
                  }}
                >
                  Pending
                </button>
                <button
                  className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                  onClick={() => {
                    handleStatusUpdate("In Progress");
                  }}
                >
                  In Progress
                </button>
                <button
                  className="w-full px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
                  onClick={() => {
                    handleStatusUpdate("Completed");
                  }}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
