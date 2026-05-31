import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Image as ImageIcon,
  Loader,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import ActionButtons from "../Components/Reusable/ActionButtons";
import ConfirmationModal from "../Components/ConfirmationModal";

const initialFeeds = [
  {
    id: "FEED1001",
    title: "Double Points Weekend",
    description:
      "Customers can earn double loyalty points on selected products this weekend.",
    image: "",
    createdAt: "2026-05-30T10:30:00",
  },
  {
    id: "FEED1002",
    title: "New Dealer Onboarding",
    description:
      "A new onboarding flow is now available for dealer partners in metro cities.",
    image: "",
    createdAt: "2026-05-29T15:45:00",
  },
  {
    id: "FEED1003",
    title: "Catalogue Updated",
    description:
      "The product catalogue has been updated with waterproofing and primer items.",
    image: "",
    createdAt: "2026-05-27T12:10:00",
  },
];

const emptyFeed = {
  title: "",
  description: "",
  imageFile: null,
  imagePreview: "",
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Feed = () => {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyFeed);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredFeeds = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return feeds.filter((feed) =>
      [feed.id, feed.title, feed.description].some((value) =>
        value?.toString().toLowerCase().includes(q)
      )
    );
  }, [feeds, searchTerm]);

  const recentFeeds = feeds.filter(
    (feed) =>
      new Date(feed.createdAt) >=
      new Date(new Date().setDate(new Date().getDate() - 7))
  ).length;
  const feedsWithImages = feeds.filter((feed) => feed.image).length;

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyFeed);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (feed) => {
    setEditingId(feed.id);
    setFormData({
      title: feed.title || "",
      description: feed.description || "",
      imageFile: null,
      imagePreview: feed.image || "",
    });
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyFeed);
    setError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setFormData((current) => ({
        ...current,
        imageFile: file,
        imagePreview: loadEvent.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.imagePreview,
      };

      if (editingId) {
        setFeeds((current) =>
          current.map((feed) =>
            feed.id === editingId ? { ...feed, ...payload } : feed
          )
        );
        toast.success("Feed updated successfully");
      } else {
        setFeeds((current) => [
          {
            ...payload,
            id: `FEED${Date.now().toString().slice(-4)}`,
            createdAt: new Date().toISOString(),
          },
          ...current,
        ]);
        toast.success("Feed created successfully");
      }

      setSaving(false);
      closeModal();
    }, 450);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    setFeeds((current) => current.filter((feed) => feed.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success("Feed deleted successfully");
  };

  const stats = [
    {
      title: "Total Feeds",
      value: feeds.length,
      icon: ImageIcon,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
    },
    {
      title: "Recent Posts",
      value: recentFeeds,
      icon: Plus,
      color: "bg-[#EAFBF2] text-[#36B37E]",
    },
    {
      title: "With Images",
      value: feedsWithImages,
      icon: Upload,
      color: "bg-[#E8F0FF] text-[#4F7CFF]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
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
            placeholder="Search feed title or description..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
          />
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Feed
        </button>
      </div>

      {filteredFeeds.length === 0 ? (
        <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-12 text-center text-[#8E8AA2]">
          <Search className="w-9 h-9 mx-auto mb-3 text-[#AAA2BE]" />
          <h3 className="text-base font-semibold text-[#2B2340]">
            {searchTerm ? "No results found" : "No feeds yet"}
          </h3>
          <p className="mt-1 text-sm">
            {searchTerm
              ? "Try another title or description."
              : "Create your first feed post to get started."}
          </p>
          {!searchTerm && (
            <button
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Create Feed
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {filteredFeeds.map((feed) => (
            <div
              key={feed.id}
              className="group bg-white/95 border border-[#E7DFF2] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
            >
              <div className="relative w-full h-32 overflow-hidden bg-[#F4F0FB]">
                {feed.image ? (
                  <img
                    src={feed.image}
                    alt={feed.title || "Feed image"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-[#AAA2BE]" />
                  </div>
                )}

                <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#5B3FD6] shadow-sm">
                  FEED
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-[#2B2340] truncate">
                  {feed.title || "Untitled Feed"}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#7C7297] line-clamp-2">
                  {feed.description || "No description available"}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-[#8E8AA2] truncate">
                    {formatDate(feed.createdAt)}
                  </span>

                  <ActionButtons
                    onEdit={() => openEditModal(feed)}
                    onDelete={() => setDeleteTarget(feed)}
                    disableAll={saving}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl bg-white border border-[#E7DFF2] shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7DFF2]">
              <div>
                <h2 className="text-lg font-semibold text-[#5B3FD6]">
                  {editingId ? "Edit Feed" : "Add Feed"}
                </h2>
                <p className="mt-0.5 text-sm text-[#7C7297]">
                  Create an update for the app feed.
                </p>
              </div>
              <button
                onClick={closeModal}
                disabled={saving}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F4F0FB] text-[#7C7297]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-[#FFDDE7] bg-[#FFEAF1] p-3 text-sm text-[#E05A74]">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter feed title"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write feed description"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none resize-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Image
                  <span className="ml-1 text-xs font-normal text-[#8E8AA2]">
                    Optional
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="feed-image"
                  className="hidden"
                />
                <label
                  htmlFor="feed-image"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#DCD4EA] bg-[#FAF8FE] px-4 py-3 text-sm text-[#7C7297] hover:border-[#CFC0EF]"
                >
                  <Upload className="w-4 h-4" />
                  {formData.imagePreview ? "Change Image" : "Upload Image"}
                </label>

                {formData.imagePreview && (
                  <div className="mt-3">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl border border-[#E7DFF2]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          imageFile: null,
                          imagePreview: "",
                        }))
                      }
                      className="mt-2 inline-flex items-center gap-1 text-sm text-[#E05A74]"
                    >
                      <X className="w-3.5 h-3.5" />
                      Remove image
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#E7DFF2]">
              <button
                onClick={closeModal}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium disabled:opacity-60"
              >
                {saving && <Loader className="w-4 h-4 animate-spin" />}
                {editingId ? "Update Feed" : "Save Feed"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        title="Delete Feed"
        message={`Are you sure you want to delete "${
          deleteTarget?.title || "this feed"
        }"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Feed;
