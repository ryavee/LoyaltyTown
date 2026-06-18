import React, { useMemo, useState, useRef } from "react";
import {
  AlertCircle,
  Box,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  CircleStar,
  Edit2,
  Hash,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Link as LinkIcon,
  List as ListIcon,
  Loader,
  MoreVertical,
  Package,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Papa from "papaparse";

import ExportButton from "../Components/ExportButton";
import ImportButton from "../Components/ImportButton";
import ActionButtons from "../Components/Reusable/ActionButtons";
import ConfirmationModal from "../Components/ConfirmationModal";
import Pagination from "../Components/Reusable/Pagination";
import {
  createProduct,
  toProductViewModel,
  updateProduct,
} from "../services/products";
import { getCurrentUserRole, ROLES } from "../utils/rbac";

const initialProducts = [
  {
    id: "1",
    productName: "Premium Birch Plywood",
    sku: "PLY-BIRCH-18",
    brand: "CenturyPly",
    category: "Plywood",
    mrp: 4500,
    description: "18mm Waterproof Marine Grade, suitable for premium kitchens and outdoor installations.",
    basePoints: 120,
    cashbackAmount: 90,
    status: "Active",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=300&auto=format&fit=crop&q=80",
    createdAt: "2026-06-15",
  },
  {
    id: "2",
    productName: "Glossy Laminate Sheet",
    sku: "LAM-GLOSS-08",
    brand: "Greenlam",
    category: "Laminate",
    mrp: 1800,
    description: "8x4 ft - High Gloss Wooden Texture sheet, scratch-resistant and easy to clean.",
    basePoints: 50,
    cashbackAmount: 35,
    status: "Active",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=300&auto=format&fit=crop&q=80",
    createdAt: "2026-06-13",
  },
  {
    id: "3",
    productName: "Premium Acrylic Veneer",
    sku: "VEN-ACRY-04",
    brand: "Decoply",
    category: "Veneer",
    mrp: 6500,
    description: "4mm Decorative Charcoal Finish Veneer for luxury cabinets and wall paneling.",
    basePoints: 200,
    cashbackAmount: 150,
    status: "Inactive",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&auto=format&fit=crop&q=80",
    createdAt: "2026-06-12",
  }
];

const categories = ["Plywood", "Laminate", "Veneer", "Hardware", "Adhesive"];

const productColumns = [
  { key: "productName", header: "Product Name" },
  { key: "sku", header: "SKU" },
  { key: "category", header: "Category" },
  { key: "mrp", header: "MRP" },
  { key: "basePoints", header: "Base Points" },
  { key: "cashbackAmount", header: "Cashback" },
  { key: "status", header: "Status" },
];

const emptyProduct = {
  productName: "",
  sku: "",
  brand: "",
  category: "Plywood",
  mrp: "",
  description: "",
  basePoints: "0",
  cashbackAmount: "0",
  image: "",
  status: "Active",
};

const SortIndicator = ({ sortKey, sortConfig }) => {
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

const Products = () => {
  const currentUserRole = getCurrentUserRole();
  const canManageProducts = currentUserRole !== ROLES.QR_GENERATE;

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [imageTab, setImageTab] = useState("upload"); // upload or url

  const fileInputRef = useRef(null);

  // Stats
  const totalProducts = products.length;
  const activeCount = products.filter((p) => p.status === "Active").length;
  const totalPoints = products.reduce(
    (sum, product) => sum + Number(product.basePoints || 0),
    0
  );
  const totalCashback = products.reduce(
    (sum, product) => sum + Number(product.cashbackAmount || 0),
    0
  );

  // Filters
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const searchableValues = [
        product.productName,
        product.sku,
        product.category,
        product.description,
      ];

      const matchesSearch =
        !q ||
        searchableValues.some((value) =>
          value?.toString().toLowerCase().includes(q)
        );

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const sortableProducts = [...filteredProducts];

    if (!sortConfig.key) {
      return sortableProducts;
    }

    sortableProducts.sort((a, b) => {
      const aRaw = a[sortConfig.key];
      const bRaw = b[sortConfig.key];

      const aValue =
        sortConfig.key === "mrp" ||
        sortConfig.key === "basePoints" ||
        sortConfig.key === "cashbackAmount"
          ? Number(aRaw || 0)
          : aRaw?.toString().toLowerCase() || "";
      const bValue =
        sortConfig.key === "mrp" ||
        sortConfig.key === "basePoints" ||
        sortConfig.key === "cashbackAmount"
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    event.target.value = "";
    toast.error(
      "Direct image upload is not configured yet. Upload the image to your CDN and use its URL."
    );
    setImageTab("url");
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setProductForm(emptyProduct);
    setImageTab("upload");
    setFormError("");
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      productName: product.productName || "",
      sku: product.sku || "",
      brand: product.brand || "",
      category: product.category || "Plywood",
      mrp: product.mrp?.toString() || "",
      description: product.description || "",
      basePoints: product.basePoints?.toString() || "0",
      cashbackAmount: product.cashbackAmount?.toString() || "0",
      image: product.image || "",
      status: product.status || "Active",
    });
    setImageTab(product.image?.startsWith("http") ? "url" : "upload");
    setFormError("");
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProductId(null);
    setProductForm(emptyProduct);
    setFormError("");
  };

  const handleSaveProduct = async () => {
    const productName = productForm.productName.trim();
    const sku = productForm.sku.trim();
    const brand = productForm.brand.trim();
    const category = productForm.category;
    const mrp = Number(productForm.mrp || 0);
    const description = productForm.description.trim();
    const basePoints = Number(productForm.basePoints || 0);
    const cashbackAmount = Number(productForm.cashbackAmount || 0);
    const image = productForm.image;
    const status = productForm.status;

    if (!productName || !sku) {
      setFormError("Product Name and SKU are required.");
      return;
    }

    if (Number.isNaN(mrp) || mrp <= 0) {
      setFormError("MRP must be a valid positive number.");
      return;
    }

    if (Number.isNaN(basePoints) || basePoints < 0) {
      setFormError("Base points must be a valid positive number.");
      return;
    }

    if (Number.isNaN(cashbackAmount) || cashbackAmount < 0) {
      setFormError("Cashback amount must be a valid positive number.");
      return;
    }

    if (cashbackAmount > mrp) {
      setFormError("Cashback amount cannot exceed the MRP.");
      return;
    }

    if (image?.startsWith("data:")) {
      setFormError(
        "Base64 images cannot be saved. Upload the image to your CDN and paste its HTTPS URL."
      );
      setImageTab("url");
      return;
    }

    if (image) {
      try {
        const imageUrl = new URL(image);
        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("Unsupported image URL protocol");
        }
      } catch {
        setFormError("Product image must be a valid HTTP or HTTPS URL.");
        setImageTab("url");
        return;
      }
    }

    const skuExists = products.some(
      (product) =>
        product.id !== editingProductId &&
        product.sku.toLowerCase() === sku.toLowerCase()
    );

    if (skuExists) {
      setFormError("Product SKU already exists.");
      return;
    }

    setIsSaving(true);

    try {
      if (editingProductId) {
        const updatedProduct = await updateProduct(
          editingProductId,
          productForm
        );

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProductId
              ? toProductViewModel(updatedProduct, {
                  ...product,
                  productName,
                  sku,
                  brand,
                  category,
                  mrp,
                  description,
                  basePoints,
                  cashbackAmount,
                  image,
                  status,
                })
              : product
          )
        );
        toast.success("Product updated successfully");
      } else {
        const createdProduct = await createProduct(productForm);

        setProducts((currentProducts) => [
          toProductViewModel(createdProduct, {
            id: createdProduct?.id ?? Date.now().toString(),
            productName,
            sku,
            brand,
            category,
            mrp,
            description,
            basePoints,
            cashbackAmount,
            image,
            status,
            createdAt: new Date().toISOString().split("T")[0],
          }),
          ...currentProducts,
        ]);
        toast.success("Product added successfully");
      }

      setCurrentPage(1);
      closeProductModal();
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      const message = Array.isArray(backendMessage)
        ? backendMessage.join(" ")
        : backendMessage || "Unable to save product. Please try again.";

      setFormError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImportProducts = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          toast.error("CSV file is empty");
          return;
        }

        try {
          const imported = results.data.map((row, index) => {
            const productName = row["Product Name"] || row["productName"] || "";
            const sku = row["SKU"] || row["sku"] || `SKU-${Date.now()}-${index}`;
            const brand = row["Brand"] || row["brand"] || "";
            const category = row["Category"] || row["category"] || "Plywood";
            const mrp = Number(row["MRP"] || row["mrp"] || 0);
            const description = row["Description"] || row["description"] || "";
            const basePoints = Number(row["Base Points"] || row["basePoints"] || 0);
            const cashbackAmount = Number(row["Cashback"] || row["cashbackAmount"] || 0);
            const status = row["Status"] || row["status"] || "Active";

            return {
              id: (Date.now() + index).toString(),
              productName,
              sku,
              brand,
              category,
              mrp,
              description,
              basePoints,
              cashbackAmount,
              status:
                status.toLowerCase() === "inactive" ||
                status.toLowerCase() === "draft"
                  ? "Inactive"
                  : "Active",
              image: "",
              createdAt: new Date().toISOString().split("T")[0],
            };
          });

          setProducts((currentProducts) => [...imported, ...currentProducts]);
          toast.success(`Successfully imported ${imported.length} products`);
          setCurrentPage(1);
        } catch (error) {
          toast.error(`Error processing CSV data: ${error.message}`);
        }
      },
      error: (err) => {
        toast.error(`Error parsing CSV file: ${err.message}`);
      },
    });
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

  // Coins icon component placeholder
  const CoinsIconPlaceholder = ({ className }) => (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // Stats Card data
  const stats = [
    {
      title: "TOTAL PRODUCTS",
      value: totalProducts,
      icon: Package,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
    },
    {
      title: "ACTIVE",
      value: activeCount,
      icon: Box,
      color: "bg-[#E2F5EC] text-[#22A861]",
    },
    {
      title: "TOTAL POINTS",
      value: totalPoints.toLocaleString("en-IN"),
      icon: CircleStar,
      color: "bg-[#F0EAFF] text-[#5B3FD6]",
    },
    {
      title: "TOTAL CASHBACK",
      value: `₹${totalCashback.toLocaleString("en-IN")}`,
      icon: CoinsIconPlaceholder,
      color: "bg-[#EAFBF2] text-[#36B37E]",
    },
  ];

  // Live calculator helper values
  const mrpVal = Number(productForm.mrp || 0);
  const cashbackVal = Number(productForm.cashbackAmount || 0);
  const pointsVal = Number(productForm.basePoints || 0);

  const cashbackPct = mrpVal > 0 ? (cashbackVal / mrpVal) * 100 : 0;
  const effectiveCost = mrpVal - cashbackVal;
  const pointsYield = mrpVal > 0 ? (pointsVal / mrpVal) * 100 : 0;

  return (
    <div className="space-y-5 pb-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
              <p className="text-[10px] font-bold tracking-[0.05em] text-[#8E8AA2]">
                {stat.title}
              </p>
              <h3 className="text-xl font-bold leading-6 text-[#2B2340] mt-0.5">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {/* Left Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
            <input
              type="text"
              placeholder="Search by name, SKU, brand..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#AAA2BE] hover:text-[#5B3FD6] transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-[#E7DFF2] p-0.5 bg-[#FAF8FE] shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-[#5B3FD6] text-white"
                  : "text-[#8E8AA2] hover:text-[#5B3FD6]"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-[#5B3FD6] text-white"
                  : "text-[#8E8AA2] hover:text-[#5B3FD6]"
              }`}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        {canManageProducts && (
          <div className="flex flex-wrap items-center gap-3">
            <ImportButton
              requiredHeaders={[
                { key: "productName", header: "Product Name" },
                { key: "sku", header: "SKU" },
                { key: "category", header: "Category" },
                { key: "mrp", header: "MRP" },
              ]}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Main View Area */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] p-12 text-center text-[#8E8AA2] shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
          No products found matching the criteria.
        </div>
      ) : viewMode === "grid" ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => {
            const catColors =
              product.category === "Plywood"
                ? "bg-[#F0EAFF] text-[#5B3FD6]"
                : product.category === "Laminate"
                ? "bg-[#E0F2FE] text-[#2E90C9]"
                : product.category === "Veneer"
                ? "bg-[#E2F5EC] text-[#22A861]"
                : product.category === "Hardware"
                ? "bg-[#FEF3C7] text-[#D97706]"
                : "bg-[#FEE2E2] text-[#EF4444]";

            return (
              <div
                key={product.id}
                className="bg-white border border-[#E9E2F3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(43,35,64,0.04)] hover:shadow-[0_4px_20px_rgba(91,63,214,0.08)] hover:-translate-y-0.5 transition-all duration-300 relative flex flex-col justify-between overflow-hidden"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B3FD6] to-[#B8A6F3]" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-start gap-3 justify-between">
                    <div className="flex gap-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E9E2F3] bg-[#FAF8FE]"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = ""; // triggers fallback initials box
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#F0EAFF] text-[#5B3FD6] flex items-center justify-center font-bold text-lg border border-[#E9E2F3]">
                          {product.productName.charAt(0)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="font-bold text-[#2B2340] text-sm truncate">
                          {product.productName}
                        </h4>
                        <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5 truncate">
                          <span className="font-mono text-[#5B3FD6]">
                            {product.sku}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {canManageProducts && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1 rounded-md text-[#8E8AA2] hover:text-[#5B3FD6] hover:bg-[#F4F0FB] transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 rounded-md text-[#8E8AA2] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                        product.status === "Active"
                          ? "bg-[#E2F5EC] text-[#22A861]"
                          : "bg-[#FFEAF1] text-[#E05A74]"
                      }`}
                    >
                      {product.status === "Active" ? "ACTIVE" : "DRAFT"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${catColors}`}
                    >
                      {product.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[11.5px] leading-relaxed text-[#8E8AA2] mt-3 line-clamp-2 min-h-[34px]">
                    {product.description || "No description provided."}
                  </p>
                </div>

                {/* Bottom Stats & Rewards Section */}
                <div className="mt-4 pt-4 border-t border-[#F2ECFA]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold text-[#8E8AA2]">
                      MRP
                    </span>
                    <span className="text-sm font-extrabold text-[#2B2340]">
                      ₹{product.mrp?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Base Points Box */}
                    <div className="bg-[#FAF8FE] border border-[#E7DFF2] rounded-lg p-2 text-center">
                      <p className="text-[9px] font-bold tracking-[0.05em] text-[#8E8AA2] uppercase">
                        Base Points
                      </p>
                      <p className="text-[15px] font-extrabold text-[#5B3FD6] mt-0.5">
                        {product.basePoints || 0}
                      </p>
                    </div>

                    {/* Cashback Box */}
                    <div className="bg-[#EAFBF2] border border-[#A7F3D0] rounded-lg p-2 text-center">
                      <p className="text-[9px] font-bold tracking-[0.05em] text-[#22A861] uppercase">
                        Cashback
                      </p>
                      <p className="text-[15px] font-extrabold text-[#059669] mt-0.5">
                        ₹{product.cashbackAmount || 0}
                      </p>
                    </div>
                  </div>

                  {/* Unique identifier */}
                  <div className="flex items-center justify-between text-[9px] text-[#AAA2BE] mt-3 font-mono font-medium">
                    <span>Created: {product.createdAt || "2026-06-15"}</span>
                    <span>
                      {product.sku.toLowerCase()}-
                      {Math.abs(product.id || 0)
                        .toString(16)
                        .substring(0, 8)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Layout (Table) */
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#F4F0FB] border-b border-[#E7DFF2]">
                <tr>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2]">
                    Product
                  </th>
                  <th
                    onClick={() => requestSort("sku")}
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>SKU</span>
                      <SortIndicator sortKey="sku" sortConfig={sortConfig} />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("category")}
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Category</span>
                      <SortIndicator
                        sortKey="category"
                        sortConfig={sortConfig}
                      />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("mrp")}
                    className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>MRP</span>
                      <SortIndicator sortKey="mrp" sortConfig={sortConfig} />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("basePoints")}
                    className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Points</span>
                      <SortIndicator
                        sortKey="basePoints"
                        sortConfig={sortConfig}
                      />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("cashbackAmount")}
                    className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Cashback</span>
                      <SortIndicator
                        sortKey="cashbackAmount"
                        sortConfig={sortConfig}
                      />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("status")}
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Status</span>
                      <SortIndicator sortKey="status" sortConfig={sortConfig} />
                    </div>
                  </th>
                  {canManageProducts && (
                    <th className="px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2]">
                      Action
                  </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="w-9 h-9 rounded-lg object-cover border border-[#E9E2F3] bg-[#FAF8FE] shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-[#F0EAFF] text-[#5B3FD6] flex items-center justify-center font-bold text-sm border border-[#E9E2F3] shrink-0">
                            {product.productName.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#2B2340] truncate">
                            {product.productName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3 font-mono text-xs text-[#5B3FD6] font-bold">
                      {product.sku}
                    </td>

                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8FE] border border-[#E7DFF2] text-[#8E8AA2]">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-5 py-3 text-right text-sm font-bold text-[#2B2340]">
                      ₹{product.mrp?.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-3 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F0EAFF] text-[#5B3FD6] text-[10px] font-bold">
                        {product.basePoints}
                      </span>
                    </td>

                    <td className="px-5 py-3 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#EAFBF2] text-[#059669] text-[10px] font-bold">
                        ₹{product.cashbackAmount}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          product.status === "Active"
                            ? "bg-[#E2F5EC] text-[#22A861]"
                            : "bg-[#FFEAF1] text-[#E05A74]"
                        }`}
                      >
                        {product.status === "Active" ? "ACTIVE" : "DRAFT"}
                      </span>
                    </td>

                    {canManageProducts && (
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1 rounded text-[#8E8AA2] hover:text-[#5B3FD6] hover:bg-[#F4F0FB] transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setProductToDelete(product);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 rounded text-[#8E8AA2] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {sortedProducts.length > 0 && (
        <div className="bg-[#FAF8FE] border border-[#E7DFF2] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
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
      )}

      {/* Add/Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-[#E7DFF2] shadow-xl overflow-hidden animate-modalPop flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7DFF2] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-[#2B2340]">
                  {editingProductId ? "Edit Product" : "Add Product"}
                </h2>
                <p className="text-xs text-[#8E8AA2] mt-0.5">
                  Configure product specifications and rewards configurations.
                </p>
              </div>

              <button
                onClick={closeProductModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F4F0FB] text-[#8E8AA2] cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              {formError && (
                <div className="flex items-start gap-2 rounded-xl border border-[#FFDDE7] bg-[#FFEAF1] p-3 text-xs text-[#E05A74]">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="font-semibold">{formError}</p>
                </div>
              )}

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="productName"
                  value={productForm.productName}
                  onChange={handleInputChange}
                  placeholder="e.g. Premium Birch Plywood"
                  className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={productForm.sku}
                  onChange={handleInputChange}
                  placeholder="e.g. PLY-BIRCH-18"
                  className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8] font-mono"
                />
              </div>

              {/* Category & MRP Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8] cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                    MRP (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="mrp"
                    value={productForm.mrp}
                    onChange={handleInputChange}
                    placeholder="e.g. 4500"
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Enter detailed specifications or product description"
                  className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              {/* Base Points & Cashback Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                    Base Points
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="basePoints"
                    value={productForm.basePoints}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                    Cashback Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="cashbackAmount"
                    value={productForm.cashbackAmount}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>
              </div>

              {/* Rewards Calculator Live Breakdown */}
              <div className="bg-gradient-to-r from-blue-50/70 to-[#F5F2FC] border border-[#E2DDF8] rounded-xl p-4 space-y-2.5">
                <p className="text-[10px] font-extrabold text-[#5B3FD6] uppercase tracking-[0.05em]">
                  Rewards Calculation Preview
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[#8E8AA2] block text-[10px]">
                      Cashback Return
                    </span>
                    <span className="font-bold text-[#2B2340]">
                      {cashbackPct.toFixed(1)}% of MRP
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8E8AA2] block text-[10px]">
                      Effective Net Cost
                    </span>
                    <span className="font-bold text-[#059669]">
                      ₹{effectiveCost >= 0 ? effectiveCost.toLocaleString("en-IN") : 0}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[#8E8AA2] block text-[10px]">
                      Points Yield Rate
                    </span>
                    <span className="font-bold text-[#5B3FD6]">
                      {pointsYield.toFixed(1)} pts / ₹100
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-[#AAA2BE] leading-relaxed italic border-t border-[#E7DFF2]/60 pt-2">
                  When a customer scans a QR code for this product, they will
                  be awarded <span className="font-bold text-[#5B3FD6]">{pointsVal} Base Points</span> and{" "}
                  <span className="font-bold text-[#059669]">₹{cashbackVal} Cashback</span>.
                </p>
              </div>

              {/* Product Image Selection (Upload & URL) */}
              <div>
                <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-1.5">
                  Product Image
                </label>

                {/* Tabs */}
                <div className="flex border-b border-[#E7DFF2] mb-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setImageTab("upload")}
                    className={`pb-2 pr-4 transition-all flex items-center gap-1.5 cursor-pointer border-b-2 ${
                      imageTab === "upload"
                        ? "border-[#5B3FD6] text-[#5B3FD6]"
                        : "border-transparent text-[#8E8AA2] hover:text-[#2B2340]"
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload from Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("url")}
                    className={`pb-2 px-4 transition-all flex items-center gap-1.5 cursor-pointer border-b-2 ${
                      imageTab === "url"
                        ? "border-[#5B3FD6] text-[#5B3FD6]"
                        : "border-transparent text-[#8E8AA2] hover:text-[#2B2340]"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    Add Image URL
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                    {imageTab === "upload" ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#E7DFF2] hover:border-[#5B3FD6] rounded-xl p-5 text-center cursor-pointer transition-colors bg-[#FAF8FE] flex flex-col items-center justify-center gap-1.5"
                      >
                        <UploadCloud className="w-6 h-6 text-[#AAA2BE]" />
                        <span className="text-xs font-bold text-[#5B3FD6]">
                          Click to upload image
                        </span>
                        <span className="text-[10px] text-[#AAA2BE]">
                          PNG, JPG up to 5MB
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={productForm.image}
                        onChange={(e) =>
                          setProductForm((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                        placeholder="Paste image URL (e.g. https://...)"
                        className="w-full px-3 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                      />
                    )}
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="w-20 h-20 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] overflow-hidden flex items-center justify-center shrink-0">
                    {productForm.image ? (
                      <img
                        src={productForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      <div className="text-center text-[10px] text-[#AAA2BE] p-2 flex flex-col items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span>Preview</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#2B2340] uppercase tracking-wider mb-2">
                  Status
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Active Radio Card */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      productForm.status === "Active"
                        ? "bg-[#EAFBF2] border-[#22A861] ring-1 ring-[#22A861]"
                        : "bg-white border-[#E7DFF2] hover:bg-[#FAF8FE]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={productForm.status === "Active"}
                      onChange={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          status: "Active",
                        }))
                      }
                      className="mt-1 h-3.5 w-3.5 text-[#5B3FD6] border-[#E7DFF2] focus:ring-[#5B3FD6] cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#2B2340]">Active</p>
                      <p className="text-[10px] text-[#8E8AA2] mt-0.5">
                        Product is visible and available for QR code generations
                      </p>
                    </div>
                  </label>

                  {/* Inactive Radio Card */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      productForm.status === "Inactive"
                        ? "bg-[#FFF9E6] border-[#D97706] ring-1 ring-[#D97706]"
                        : "bg-white border-[#E7DFF2] hover:bg-[#FAF8FE]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={productForm.status === "Inactive"}
                      onChange={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          status: "Inactive",
                        }))
                      }
                      className="mt-1 h-3.5 w-3.5 text-[#5B3FD6] border-[#E7DFF2] focus:ring-[#5B3FD6] cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#2B2340]">Draft / Inactive</p>
                      <p className="text-[10px] text-[#8E8AA2] mt-0.5">
                        Product is hidden and temporarily disabled
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E7DFF2] bg-[#FAF8FE] shrink-0">
              <button
                onClick={closeProductModal}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E7DFF2] hover:bg-[#F4F0FB] text-[#8E8AA2] hover:text-[#5B3FD6] text-xs font-bold disabled:opacity-60 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProduct}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-xs font-bold disabled:opacity-60 inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
              >
                {isSaving && <Loader className="w-3.5 h-3.5 animate-spin" />}
                {editingProductId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
