import React, { useMemo, useState } from "react";
import {
  AlignLeft,
  Calendar,
  Flag,
  Megaphone,
  MoreVertical,
  Notebook,
  Plus,
  Search,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import ActionButtons from "../Components/Reusable/ActionButtons";
import ConfirmationModal from "../Components/ConfirmationModal";
import Pagination from "../Components/Reusable/Pagination";

const initialAnnouncements = [
  {
    id: "ANN1001",
    title: "New Reward Campaign",
    message: "Customers can now earn double points on every purchase this weekend.",
    target: "All Users",
    priority: "High",
    date: "2026-08-12",
  },
  {
    id: "ANN1002",
    title: "Referral Bonus",
    message: "Invite friends and get 500 bonus loyalty points instantly.",
    target: "Customers",
    priority: "Medium",
    date: "2026-08-10",
  },
  {
    id: "ANN1003",
    title: "System Maintenance",
    message: "Platform will remain under maintenance from 2AM to 4AM.",
    target: "Dealers",
    priority: "Low",
    date: "2026-08-08",
  },
];

const emptyAnnouncement = {
  title: "",
  message: "",
  target: "All Users",
  priority: "Normal",
  date: "",
};

const priorityStyles = {
  High: "bg-[#FFEAF1] text-[#E05A74]",
  Medium: "bg-[#FFF4E5] text-[#F59E0B]",
  Low: "bg-[#E8F0FF] text-[#4F7CFF]",
  Normal: "bg-[#F4F0FB] text-[#8E8AA2]",
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [formData, setFormData] = useState(emptyAnnouncement);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredAnnouncements = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return announcements.filter((announcement) =>
      [
        announcement.id,
        announcement.title,
        announcement.message,
        announcement.target,
        announcement.priority,
      ].some((value) => value?.toString().toLowerCase().includes(q))
    );
  }, [announcements, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAnnouncements.length / pageSize)
  );
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const highPriority = announcements.filter(
    (announcement) => announcement.priority === "High"
  ).length;
  const customerTargeted = announcements.filter(
    (announcement) => announcement.target === "Customers"
  ).length;
  const dealerTargeted = announcements.filter(
    (announcement) => announcement.target === "Dealers"
  ).length;

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((current) => ({
  //     ...current,
  //     [name]: value,
  //   }));
  // };

  const handleCreateAnnouncement = () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      toast.error("Title and message are required");
      return;
    }

    setAnnouncements((current) => [
      {
        ...formData,
        id: `ANN${Date.now().toString().slice(-4)}`,
        date: formData.date || new Date().toISOString().split("T")[0],
      },
      ...current,
    ]);
    setFormData(emptyAnnouncement);
    setIsModalOpen(false);
    setCurrentPage(1);
    toast.success("Announcement created successfully");
  };

  const handleDeleteAnnouncement = () => {
    if (!announcementToDelete) return;

    setAnnouncements((current) =>
      current.filter(
        (announcement) => announcement.id !== announcementToDelete.id
      )
    );
    setAnnouncementToDelete(null);
    toast.success("Announcement deleted successfully");
  };

  const stats = [
    {
      title: "Announcements",
      value: announcements.length,
      icon: Megaphone,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: Flag,
      color: "bg-[#FFEAF1] text-[#E05A74]",
    },
    {
      title: "Customers",
      value: customerTargeted,
      icon: Notebook,
      color: "bg-[#EAFBF2] text-[#36B37E]",
    },
    {
      title: "Dealers",
      value: dealerTargeted,
      icon: Calendar,
      color: "bg-[#E8F0FF] text-[#4F7CFF]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white/95 rounded-xl border border-[#E7DFF2] px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[12px] leading-4 text-[#8E8AA2]">
                {stat.title}
              </p>
              <h3 className="text-xl font-bold leading-6 text-[#2B2340]">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
          <input
            type="text"
            placeholder="Search title, message, target or priority..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Announcement
        </button>
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {filteredAnnouncements.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">
            No announcements found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#F4F0FB] border-b border-[#E7DFF2]">
                  <tr>
                    {[
                      { label: "Title", icon: Notebook },
                      { label: "Date", icon: Calendar },
                      { label: "Priority", icon: Flag },
                      { label: "Description", icon: AlignLeft },
                      { label: "Action", icon: MoreVertical },
                    ].map((head) => (
                      <th
                        key={head.label}
                        className="px-5 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2]"
                      >
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <head.icon className="w-4 h-4" />
                          <span>{head.label}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {paginatedAnnouncements.map((announcement) => (
                    <tr
                      key={announcement.id}
                      className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-[#2B2340]">
                          {announcement.title}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          {announcement.target || "All Users"}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#2B2340]">
                        {formatDate(announcement.date)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            priorityStyles[announcement.priority] ||
                            priorityStyles.Normal
                          }`}
                        >
                          {announcement.priority || "Normal"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 max-w-[560px]">
                        <p className="text-sm text-[#5B5875] line-clamp-2">
                          {announcement.message}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <ActionButtons
                          onDelete={() => setAnnouncementToDelete(announcement)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FAF8FE] border-t border-[#E7DFF2]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                totalItems={filteredAnnouncements.length}
              />
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl bg-white border border-[#E7DFF2] shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7DFF2]">
              <div>
                <h2 className="text-lg font-semibold text-[#5B3FD6]">
                  Add Announcement
                </h2>
                <p className="mt-0.5 text-sm text-[#7C7297]">
                  Create an announcement for a target audience.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F4F0FB] text-[#7C7297]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Enter announcement title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  placeholder="Write the announcement message"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none resize-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Target
                  </label>
                  <select
                    name="target"
                    value={formData.target}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        target: event.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  >
                    <option>All Users</option>
                    <option>Customers</option>
                    <option>Dealers</option>
                    <option>Admins</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        priority: event.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  >
                    <option>Normal</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        date: event.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#E7DFF2]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAnnouncement}
                className="px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
              >
                Add Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!announcementToDelete}
        title="Delete Announcement"
        message={`Are you sure you want to delete "${
          announcementToDelete?.title || "this announcement"
        }"?`}
        onConfirm={handleDeleteAnnouncement}
        onCancel={() => setAnnouncementToDelete(null)}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Announcements;
