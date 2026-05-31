import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Box,
  ChevronDown,
  ChevronUp,
  CircleStar,
  Hash,
  Layers,
  Loader,
  MoreVertical,
  Package,
  Plus,
  Search,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import ExportButton from "../Components/ExportButton";
import ImportButton from "../Components/ImportButton";
import ActionButtons from "../Components/Reusable/ActionButtons";
import ConfirmationModal from "../Components/ConfirmationModal";
import Pagination from "../Components/Reusable/Pagination";
import { getCurrentUserRole, ROLES } from "../utils/rbac";

const initialProducts = [
  {
    id: "1",
    productId: "PRD1001",
    productName: "Premium Cement",
    productUnit: "50 kg",
    productPoint: 120,
  },
  {
    id: "2",
    productId: "PRD1002",
    productName: "Wall Putty",
    productUnit: "25 kg",
    productPoint: 80,
  },
  {
    id: "3",
    productId: "PRD1003",
    productName: "Exterior Primer",
    productUnit: "20 L",
    productPoint: 150,
  },
  {
    id: "4",
    productId: "PRD1004",
    productName: "Tile Adhesive",
    productUnit: "20 kg",
    productPoint: 65,
  },
  {
    id: "5",
    productId: "PRD1005",
    productName: "Waterproof Coating",
    productUnit: "10 L",
    productPoint: 210,
  },
];

const productColumns = [
  { key: "productId", header: "Product ID" },
  { key: "productName", header: "Product Name" },
  { key: "productUnit", header: "Product Unit" },
  { key: "productPoint", header: "Point" },
];

const emptyProduct = {
  productId: "",
  productName: "",
  productUnit: "",
  productPoint: "",
};

const Products = () => {
  const currentUserRole = getCurrentUserRole();
  const canManageProducts = currentUserRole !== ROLES.QR_GENERATE;

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const totalProducts = products.length;
  const totalPoints = products.reduce(
    (sum, product) => sum + Number(product.productPoint || 0),
    0
  );
  const averagePoints =
    totalProducts > 0 ? Math.round(totalPoints / totalProducts) : 0;
  const unitsCount = new Set(
    products.map((product) => product.productUnit).filter(Boolean)
  ).size;

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const searchableValues = [
        product.id,
        product.productId,
        product.productName,
        product.productUnit,
        product.productPoint,
      ];

      return (
        !q ||
        searchableValues.some((value) =>
          value?.toString().toLowerCase().includes(q)
        )
      );
    });
  }, [products, searchTerm]);

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...filteredProducts];

    if (!sortConfig.key) {
      return sortableProducts;
    }

    sortableProducts.sort((a, b) => {
      const aRaw = a[sortConfig.key];
      const bRaw = b[sortConfig.key];

      const aValue =
        sortConfig.key === "productPoint"
          ? Number(aRaw || 0)
          : aRaw?.toString().toLowerCase() || "";
      const bValue =
        sortConfig.key === "productPoint"
          ? Number(bRaw || 0)
          : bRaw?.toString().toLowerCase() || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sortableProducts;
  }, [filteredProducts, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage, pageSize]);

  const requestSort = (key) => {
    if (!key) return;

    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProductForm((product) => ({
      ...product,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setProductForm(emptyProduct);
    setFormError("");
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      productId: product.productId || "",
      productName: product.productName || "",
      productUnit: product.productUnit || "",
      productPoint: product.productPoint?.toString() || "",
    });
    setFormError("");
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProductId(null);
    setProductForm(emptyProduct);
    setFormError("");
  };

  const handleSaveProduct = () => {
    const productId = productForm.productId.trim();
    const productName = productForm.productName.trim();
    const productUnit = productForm.productUnit.trim();
    const productPoint = Number(productForm.productPoint || 0);

    if (!productId || !productName) {
      setFormError("Product ID and product name are required.");
      return;
    }

    if (Number.isNaN(productPoint) || productPoint < 0) {
      setFormError("Product points must be a valid positive number.");
      return;
    }

    const productExists = products.some(
      (product) =>
        product.id !== editingProductId &&
        product.productId.toLowerCase() === productId.toLowerCase()
    );

    if (productExists) {
      setFormError("Product ID already exists.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      if (editingProductId) {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProductId
              ? {
                ...product,
                productId,
                productName,
                productUnit,
                productPoint,
              }
              : product
          )
        );
        toast.success("Product updated successfully");
      } else {
        setProducts((currentProducts) => [
          {
            id: Date.now().toString(),
            productId,
            productName,
            productUnit,
            productPoint,
          },
          ...currentProducts,
        ]);
        toast.success("Product added successfully");
      }

      setIsSaving(false);
      setCurrentPage(1);
      closeProductModal();
    }, 400);
  };

  const handleImportProducts = () => {
    toast.success("CSV validated. Connect import API when backend is ready.");
  };

  const confirmDelete = () => {
    if (!productToDelete) return;

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productToDelete.id)
    );
    setProductToDelete(null);
    setShowDeleteModal(false);
    toast.success("Product deleted successfully");
  };

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
    },
    {
      title: "Reward Points",
      value: totalPoints,
      icon: CircleStar,
      color: "bg-[#EAFBF2] text-[#36B37E]",
    },
    {
      title: "Average Points",
      value: averagePoints,
      icon: Box,
      color: "bg-[#E8F0FF] text-[#4F7CFF]",
    },
    {
      title: "Units",
      value: unitsCount,
      icon: Layers,
      color: "bg-[#FFF4E5] text-[#F59E0B]",
    },
  ];

  const tableHeads = [
    { label: "Product ID", icon: Hash, key: "productId" },
    { label: "Product Name", icon: Box, key: "productName" },
    { label: "Unit", icon: Layers, key: "productUnit" },
    { label: "Points", icon: CircleStar, key: "productPoint" },
    ...(canManageProducts
      ? [{ label: "Action", icon: MoreVertical }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="w-4 h-4" />
            </div>

            <div className="min-w-0">
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

      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
          <input
            type="text"
            placeholder="Search product ID, name, unit or points..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8] transition-all"
          />
        </div>

        {canManageProducts && (
          <div className="flex flex-wrap items-center gap-3">
            <ImportButton
              requiredHeaders={productColumns.filter(
                (column) => column.key !== "productId"
              )}
              onUpload={handleImportProducts}
              label="Import CSV"
            />

            <ExportButton
              data={sortedProducts}
              columns={productColumns}
              filename="products"
              disabled={sortedProducts.length === 0}
            />

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        )}
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {sortedProducts.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">
            No products found.
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
                        onClick={() => requestSort(head.key)}
                        className="px-5 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <head.icon className="w-4 h-4" />
                          <span>{head.label}</span>

                          {sortConfig.key === head.key &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                    >
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEE8FF] text-[#5B3FD6] text-xs font-semibold">
                          {product.productId}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-[#2B2340]">
                          {product.productName}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          Reward catalogue item
                        </p>
                      </td>

                      <td className="px-5 py-3.5 text-sm text-[#2B2340]">
                        {product.productUnit || "-"}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAFBF2] text-[#36B37E] text-xs font-semibold">
                          {product.productPoint || 0}
                        </span>
                      </td>

                      {canManageProducts && (
                        <td className="px-5 py-3.5">
                          <ActionButtons
                            onEdit={() => openEditModal(product)}
                            onDelete={() => {
                              setProductToDelete(product);
                              setShowDeleteModal(true);
                            }}
                            disableAll={isSaving}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FAF8FE] border-t border-[#E7DFF2]">
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                  totalItems={sortedProducts.length}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7DFF2] shadow-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7DFF2]">
              <div>
                <h2 className="text-lg font-semibold text-[#2B2340]">
                  {editingProductId ? "Edit Product" : "Add Product"}
                </h2>
                <p className="text-sm text-[#8E8AA2] mt-1">
                  Configure product details and reward points.
                </p>
              </div>

              <button
                onClick={closeProductModal}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F4F0FB] text-[#8E8AA2]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {formError && (
                <div className="flex items-start gap-2 rounded-xl border border-[#FFDDE7] bg-[#FFEAF1] p-3 text-sm text-[#E05A74]">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <p>{formError}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Product ID
                </label>
                <input
                  type="text"
                  name="productId"
                  value={productForm.productId}
                  onChange={handleInputChange}
                  placeholder="Enter product ID"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={productForm.productName}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="productUnit"
                    value={productForm.productUnit}
                    onChange={handleInputChange}
                    placeholder="e.g. 50 kg"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    Points
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="productPoint"
                    value={productForm.productPoint}
                    onChange={handleInputChange}
                    placeholder="Enter points"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#E7DFF2]">
              <button
                onClick={closeProductModal}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProduct}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium disabled:opacity-60 inline-flex items-center gap-2"
              >
                {isSaving && <Loader className="w-4 h-4 animate-spin" />}
                {editingProductId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Product"
        message={`Are you sure you want to delete "${
          productToDelete?.productName || "this product"
        }"?`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setProductToDelete(null);
          setShowDeleteModal(false);
        }}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Products;
