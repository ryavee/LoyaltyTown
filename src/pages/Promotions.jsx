import React, { useMemo, useState } from "react";
import {
  Box,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  FileText,
  Loader,
  MoreVertical,
  Percent,
  Plus,
  Search,
  Star,
  Tag,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import ExportButton from "../Components/ExportButton";
import ActionButtons from "../Components/Reusable/ActionButtons";
import ConfirmationModal from "../Components/ConfirmationModal";
import Pagination from "../Components/Reusable/Pagination";

const products = [
  { productId: "PRD1001", productName: "Premium Cement" },
  { productId: "PRD1002", productName: "Wall Putty" },
  { productId: "PRD1003", productName: "Exterior Primer" },
  { productId: "PRD1004", productName: "Tile Adhesive" },
];

const initialPromotions = [
  {
    id: "PROMO1001",
    productIds: ["PRD1001"],
    productNames: ["Premium Cement"],
    description: "Extra loyalty points on Premium Cement purchases.",
    active: true,
    category: "Bonus",
    bonusType: "Fixed Points",
    bonusValue: 50,
    startDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "PROMO1002",
    productIds: ["PRD1002", "PRD1003"],
    productNames: ["Wall Putty", "Exterior Primer"],
    description: "Festive offer for selected finishing products.",
    active: true,
    category: "Product Offer",
    bonusType: "Percentage",
    bonusValue: 12,
    startDate: "2026-06-05",
    endDate: "2026-07-05",
  },
  {
    id: "PROMO1003",
    productIds: ["PRD1004"],
    productNames: ["Tile Adhesive"],
    description: "Inactive dealer trial offer.",
    active: false,
    category: "Bonus",
    bonusType: "Fixed Points",
    bonusValue: 25,
    startDate: "2026-05-01",
    endDate: "2026-05-20",
  },
];

const emptyForm = {
  productIds: [],
  description: "",
  active: true,
  category: "Bonus",
  bonusType: "Fixed Points",
  point: "",
  bonusPercentage: "",
  startDate: "",
  endDate: "",
};

const todayStr = new Date().toISOString().split("T")[0];

const StatusBadge = ({ active }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
      active ? "bg-[#EAFBF2] text-[#36B37E]" : "bg-[#F4F0FB] text-[#8E8AA2]"
    }`}
  >
    {active ? "Active" : "Inactive"}
  </span>
);

const CategoryBadge = ({ category }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
      category === "Bonus"
        ? "bg-[#EEE8FF] text-[#5B3FD6]"
        : "bg-[#E8F0FF] text-[#4F7CFF]"
    }`}
  >
    {category}
  </span>
);

const BonusTypeBadge = ({ bonusType }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
      bonusType === "Fixed Points"
        ? "bg-[#EAFBF2] text-[#36B37E]"
        : "bg-[#FFF4E5] text-[#F59E0B]"
    }`}
  >
    {bonusType}
  </span>
);

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Promotions = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const activePromotions = promotions.filter((promo) => promo.active).length;
  const inactivePromotions = promotions.length - activePromotions;
  const productCoverage = new Set(promotions.flatMap((promo) => promo.productIds)).size;

  const filteredPromotions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return promotions.filter((promo) =>
      [
        promo.id,
        promo.productNames.join(" "),
        promo.productIds.join(" "),
        promo.description,
        promo.category,
        promo.bonusType,
      ].some((value) => value?.toString().toLowerCase().includes(q))
    );
  }, [promotions, searchTerm]);

  const sortedPromotions = useMemo(() => {
    const sortable = [...filteredPromotions];

    if (!sortConfig.key) return sortable;

    sortable.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "productName") {
        aValue = a.productNames?.[0] || "";
        bValue = b.productNames?.[0] || "";
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortable;
  }, [filteredPromotions, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedPromotions.length / pageSize));
  const paginatedPromotions = sortedPromotions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const requestSort = (key) => {
    if (!key) return;
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPromotion(null);
    setFormData(emptyForm);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "bonusType") {
      setFormData((current) => ({
        ...current,
        bonusType: value,
        point: value === "Fixed Points" ? current.point : "",
        bonusPercentage: value === "Percentage" ? current.bonusPercentage : "",
      }));
      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductToggle = (productId) => {
    setFormData((current) => ({
      ...current,
      productIds: current.productIds.includes(productId)
        ? current.productIds.filter((id) => id !== productId)
        : [...current.productIds, productId],
    }));
  };

  const handleSavePromotion = () => {
    if (formData.productIds.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Start and end date are required");
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    const bonusValue =
      formData.bonusType === "Fixed Points"
        ? Number(formData.point)
        : Number(formData.bonusPercentage);

    if (!bonusValue || bonusValue <= 0) {
      toast.error("Enter a valid bonus value");
      return;
    }

    const selectedProducts = products.filter((product) =>
      formData.productIds.includes(product.productId)
    );

    setSaving(true);

    setTimeout(() => {
      const payload = {
        id: editingPromotion?.id || `PROMO${Date.now().toString().slice(-4)}`,
        productIds: selectedProducts.map((product) => product.productId),
        productNames: selectedProducts.map((product) => product.productName),
        description: formData.description.trim(),
        active: formData.active,
        category: formData.category,
        bonusType: formData.bonusType,
        bonusValue,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      if (editingPromotion) {
        setPromotions((current) =>
          current.map((promo) =>
            promo.id === editingPromotion.id ? payload : promo
          )
        );
        toast.success("Promotion updated successfully");
      } else {
        setPromotions((current) => [payload, ...current]);
        toast.success("Promotion created successfully");
      }

      setSaving(false);
      closeModal();
    }, 450);
  };

  const handleEditPromotion = (promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      productIds: promotion.productIds || [],
      description: promotion.description || "",
      active: promotion.active ?? true,
      category: promotion.category || "Bonus",
      bonusType: promotion.bonusType || "Fixed Points",
      point:
        promotion.bonusType === "Fixed Points"
          ? promotion.bonusValue?.toString() || ""
          : "",
      bonusPercentage:
        promotion.bonusType === "Percentage"
          ? promotion.bonusValue?.toString() || ""
          : "",
      startDate: promotion.startDate || "",
      endDate: promotion.endDate || "",
    });
    setIsModalOpen(true);
  };

  const handleDeletePromotion = () => {
    if (!promotionToDelete) return;
    setPromotions((current) =>
      current.filter((promo) => promo.id !== promotionToDelete.id)
    );
    setPromotionToDelete(null);
    toast.success("Promotion deleted successfully");
  };

  const exportRows = sortedPromotions.map((promo) => ({
    productName: promo.productNames.join(", "),
    productId: promo.productIds.join(", "),
    description: promo.description,
    active: promo.active ? "Yes" : "No",
    category: promo.category,
    bonusType: promo.bonusType,
    bonusValue: promo.bonusValue,
    startDate: promo.startDate,
    endDate: promo.endDate,
  }));

  const stats = [
    {
      title: "Promotions",
      value: promotions.length,
      icon: Tag,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
    },
    {
      title: "Active",
      value: activePromotions,
      icon: CheckCircle,
      color: "bg-[#EAFBF2] text-[#36B37E]",
    },
    {
      title: "Inactive",
      value: inactivePromotions,
      icon: X,
      color: "bg-[#FFEAF1] text-[#E05A74]",
    },
    {
      title: "Products Covered",
      value: productCoverage,
      icon: Box,
      color: "bg-[#E8F0FF] text-[#4F7CFF]",
    },
  ];

  const tableHeads = [
    { label: "Product", icon: Box, key: "productName" },
    { label: "Description", icon: FileText, key: "description" },
    { label: "Category", icon: Tag, key: "category" },
    { label: "Bonus Type", icon: Percent, key: "bonusType" },
    { label: "Value", icon: Star, key: "bonusValue" },
    { label: "Duration", icon: Calendar, key: "startDate" },
    { label: "Status", icon: CheckCircle, key: "active" },
    { label: "Action", icon: MoreVertical },
  ];

  const SortIndicator = ({ sortKey }) => {
    if (!sortKey) return null;
    if (sortConfig.key !== sortKey) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-[#AAA2BE]" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-[#5B3FD6]" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-[#5B3FD6]" />
    );
  };

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
            placeholder="Search product, description, category or bonus..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ExportButton
            data={exportRows}
            columns={[
              { key: "productName", header: "Product Name" },
              { key: "productId", header: "Product ID" },
              { key: "description", header: "Description" },
              { key: "active", header: "Active" },
              { key: "category", header: "Category" },
              { key: "bonusType", header: "Bonus Type" },
              { key: "bonusValue", header: "Bonus Value" },
              { key: "startDate", header: "Start Date" },
              { key: "endDate", header: "End Date" },
            ]}
            filename="promotions"
            disabled={exportRows.length === 0}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Promotion
          </button>
        </div>
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {sortedPromotions.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">
            No promotions found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#F4F0FB] border-b border-[#E7DFF2]">
                  <tr>
                    {tableHeads.map((head) => (
                      <th
                        key={head.label}
                        onClick={() => head.key && requestSort(head.key)}
                        className={`px-5 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] ${
                          head.key ? "cursor-pointer" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <head.icon className="w-4 h-4" />
                          <span>{head.label}</span>
                          <SortIndicator sortKey={head.key} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedPromotions.map((promotion) => (
                    <tr
                      key={promotion.id}
                      className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          {promotion.productNames.map((name) => (
                            <span
                              key={name}
                              className="px-2.5 py-1 rounded-full bg-[#EEE8FF] text-[#5B3FD6] text-xs font-semibold"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#2B2340] max-w-[280px]">
                        {promotion.description}
                      </td>
                      <td className="px-5 py-3.5">
                        <CategoryBadge category={promotion.category} />
                      </td>
                      <td className="px-5 py-3.5">
                        <BonusTypeBadge bonusType={promotion.bonusType} />
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAFBF2] text-[#36B37E] text-xs font-semibold">
                          {promotion.bonusType === "Percentage"
                            ? `${promotion.bonusValue}%`
                            : `${promotion.bonusValue} pts`}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm text-[#2B2340]">
                          {formatDate(promotion.startDate)}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          to {formatDate(promotion.endDate)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge active={promotion.active} />
                      </td>
                      <td className="px-5 py-3.5">
                        <ActionButtons
                          onEdit={() => handleEditPromotion(promotion)}
                          onDelete={() => setPromotionToDelete(promotion)}
                          disableAll={saving}
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
                totalItems={sortedPromotions.length}
              />
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white border border-[#E7DFF2] shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7DFF2]">
              <div>
                <h2 className="text-lg font-semibold text-[#5B3FD6]">
                  {editingPromotion ? "Edit Promotion" : "Add Promotion"}
                </h2>
                <p className="mt-0.5 text-sm text-[#7C7297]">
                  Configure products, dates, and bonus rules.
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
              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-2">
                  Products
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {products.map((product) => (
                    <label
                      key={product.productId}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer ${
                        formData.productIds.includes(product.productId)
                          ? "border-[#5B3FD6] bg-[#EEE8FF] text-[#5B3FD6]"
                          : "border-[#E7DFF2] bg-[#FAF8FE] text-[#2B2340]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.productIds.includes(product.productId)}
                        onChange={() => handleProductToggle(product.productId)}
                        className="accent-[#5B3FD6]"
                      />
                      {product.productName}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter promotion description"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none resize-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    min={todayStr}
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    min={formData.startDate || todayStr}
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  >
                    <option>Bonus</option>
                    <option>Product Offer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Bonus Type
                  </label>
                  <select
                    name="bonusType"
                    value={formData.bonusType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                  >
                    <option>Fixed Points</option>
                    <option>Percentage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.bonusType === "Fixed Points" ? (
                  <div>
                    <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                      Points
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="point"
                      value={formData.point}
                      onChange={handleInputChange}
                      placeholder="Enter points"
                      className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                      Percentage
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="bonusPercentage"
                      value={formData.bonusPercentage}
                      onChange={handleInputChange}
                      placeholder="Enter percentage"
                      className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2 mt-7 text-sm text-[#2B2340]">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="accent-[#5B3FD6]"
                  />
                  Active promotion
                </label>
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
                onClick={handleSavePromotion}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium disabled:opacity-60"
              >
                {saving && <Loader className="w-4 h-4 animate-spin" />}
                {editingPromotion ? "Update Promotion" : "Create Promotion"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!promotionToDelete}
        title="Delete Promotion"
        message="Are you sure you want to delete this promotion?"
        onConfirm={handleDeletePromotion}
        onCancel={() => setPromotionToDelete(null)}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Promotions;
