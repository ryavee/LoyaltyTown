import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  CircleStar,
  Download,
  FileText,
  Hash,
  Package,
  Plus,
  QrCode,
  Search,
  Square,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import Pagination from "../Components/Reusable/Pagination";

const partners = [
  { partnerId: "DLR1001", companyName: "Raj Hardware Traders", type: "Dealer" },
  { partnerId: "DLR1002", companyName: "Aman Paint House", type: "Dealer" },
  { partnerId: "DLR1003", companyName: "Singh Building Mart", type: "Dealer" },
  { partnerId: "DST1001", companyName: "South Zone Distribution", type: "Distributor" },
  { partnerId: "DST1002", companyName: "Metro Supply Chain", type: "Distributor" },
];

const products = [
  {
    productId: "PRD1001",
    productName: "Premium Cement",
    productUnit: "50 kg",
    productPoint: 120,
  },
  {
    productId: "PRD1002",
    productName: "Wall Putty",
    productUnit: "25 kg",
    productPoint: 80,
  },
  {
    productId: "PRD1003",
    productName: "Exterior Primer",
    productUnit: "20 L",
    productPoint: 150,
  },
];

const initialBatches = [
  {
    batchId: "DLR1PRD1001503005260001",
    productName: "Premium Cement",
    productId: "PRD1001",
    companyName: "Raj Hardware Traders",
    dealerId: "DLR1001",
    points: 120,
    quantity: 250,
    expiryDate: "2026-11-30",
    createdAt: "2026-05-30",
    remarks: "First Chennai batch",
  },
  {
    batchId: "DLR2PRD1002253005260002",
    productName: "Wall Putty",
    productId: "PRD1002",
    companyName: "Aman Paint House",
    dealerId: "DLR1002",
    points: 80,
    quantity: 140,
    expiryDate: "None",
    createdAt: "2026-05-28",
    remarks: "Mumbai dealer stock",
  },
  {
    batchId: "DLR3PRD1003203005260003",
    productName: "Exterior Primer",
    productId: "PRD1003",
    companyName: "Singh Building Mart",
    dealerId: "DLR1003",
    points: 150,
    quantity: 90,
    expiryDate: "2027-05-30",
    createdAt: "2026-05-24",
    remarks: "North region batch",
  },
];

const emptyForm = {
  numberOfCodes: "",
  productId: "",
  partnerId: "",
  expiryType: "None",
  customDate: "",
  remarks: "",
};

const QRGeneration = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const selectedProduct = products.find(
    (product) => product.productId === formData.productId
  );
  const selectedPartner = partners.find(
    (partner) => partner.partnerId === formData.partnerId
  );

  const generatedBatchId = useMemo(() => {
    if (!selectedProduct) return "";

    const date = new Date();
    const datePart = [
      String(date.getDate()).padStart(2, "0"),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getFullYear()).slice(-2),
    ].join("");
    const unitPart =
      selectedProduct.productUnit.match(/\d+/)?.[0]?.padStart(3, "0") ||
      "000";
    const sequence = String(batches.length + 1).padStart(4, "0");
    const partnerPart = selectedPartner
      ? selectedPartner.partnerId.slice(0, 4)
      : "OPEN";

    return `${partnerPart}${selectedProduct.productId}${unitPart}${datePart}${sequence}`;
  }, [batches.length, selectedPartner, selectedProduct]);

  const previewQuantity = Number(formData.numberOfCodes || 0);
  const previewPointsPerCode = Number(selectedProduct?.productPoint || 0);
  const previewTotalPoints = previewQuantity * previewPointsPerCode;

  const totalCodes = batches.reduce(
    (sum, batch) => sum + Number(batch.quantity || 0),
    0
  );
  const totalPoints = batches.reduce(
    (sum, batch) => sum + Number(batch.points || 0) * Number(batch.quantity || 0),
    0
  );

  const filteredBatches = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const now = new Date();

    return batches.filter((batch) => {
      const searchableValues = [
        batch.batchId,
        batch.productName,
        batch.productId,
        batch.companyName,
        batch.dealerId,
        batch.remarks,
      ];

      const matchesSearch =
        !q ||
        searchableValues.some((value) =>
          value?.toString().toLowerCase().includes(q)
        );

      const createdAt = new Date(batch.createdAt);
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" &&
          createdAt.toDateString() === now.toDateString()) ||
        (dateFilter === "week" &&
          createdAt >=
            new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) ||
        (dateFilter === "month" &&
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear());

      return matchesSearch && matchesDate;
    });
  }, [batches, dateFilter, searchTerm]);

  const sortedBatches = useMemo(() => {
    const sortableBatches = [...filteredBatches];

    if (!sortConfig.key) return sortableBatches;

    sortableBatches.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortableBatches;
  }, [filteredBatches, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedBatches.length / pageSize));
  const paginatedBatches = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedBatches.slice(start, start + pageSize);
  }, [currentPage, pageSize, sortedBatches]);

  const requestSort = (key) => {
    if (!key) return;

    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setFormErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const getExpiryDate = () => {
    if (formData.expiryType === "None") return "None";
    if (formData.expiryType === "custom") return formData.customDate || "None";

    const months = Number(formData.expiryType.replace("months", ""));
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split("T")[0];
  };

  const handleGenerate = () => {
    const quantity = Number(formData.numberOfCodes);
    const nextErrors = {};

    if (!formData.numberOfCodes) {
      nextErrors.numberOfCodes = "Number of codes is required";
    } else if (!quantity || quantity <= 0) {
      nextErrors.numberOfCodes = "Number of codes must be greater than zero";
    }

    if (!selectedProduct) {
      nextErrors.productId = "Product is required";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      toast.error("Please fill the required fields");
      return;
    }

    const createdAt = new Date().toISOString().split("T")[0];

    setBatches((current) => [
      {
        batchId: generatedBatchId,
        productName: selectedProduct.productName,
        productId: selectedProduct.productId,
        companyName: selectedPartner?.companyName || "Open Stock",
        dealerId: selectedPartner?.partnerId || "N/A",
        partnerType: selectedPartner?.type || "Unassigned",
        points: selectedProduct.productPoint,
        quantity,
        expiryDate: getExpiryDate(),
        createdAt,
        remarks: formData.remarks,
      },
      ...current,
    ]);

    setFormData(emptyForm);
    setFormErrors({});
    setShowForm(false);
    setCurrentPage(1);
    toast.success("QR batch generated successfully");
  };

  const handleSelectBatch = (batchId) => {
    setSelectedBatches((current) =>
      current.includes(batchId)
        ? current.filter((id) => id !== batchId)
        : [...current, batchId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBatches.length === sortedBatches.length) {
      setSelectedBatches([]);
      return;
    }

    setSelectedBatches(sortedBatches.map((batch) => batch.batchId));
  };

  const exportSelectedCsv = () => {
    const exportRows = batches.filter((batch) =>
      selectedBatches.includes(batch.batchId)
    );

    if (exportRows.length === 0) {
      toast.error("Select at least one batch to export");
      return;
    }

    const headers = [
      "Batch ID",
      "Product",
      "Dealer / Distributor",
      "Codes",
      "Points",
      "Expiry Date",
      "Created At",
      "Remarks",
    ];
    const csvRows = exportRows.map((batch) =>
      [
        batch.batchId,
        batch.productName,
        batch.companyName,
        batch.quantity,
        batch.points,
        batch.expiryDate,
        batch.createdAt,
        batch.remarks,
      ]
        .map((value) => `"${value || ""}"`)
        .join(",")
    );

    const blob = new Blob([[headers.join(","), ...csvRows].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-batches-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Selected QR batches exported");
  };

  const tableHeads = [
    { label: "Batch ID", icon: Hash, key: "batchId" },
    { label: "Product", icon: Package, key: "productName" },
    { label: "Dealer / Distributor", icon: QrCode, key: "companyName" },
    { label: "Codes", icon: QrCode, key: "quantity" },
    { label: "Points", icon: CircleStar, key: "points" },
    { label: "Expiry", icon: Calendar, key: "expiryDate" },
    { label: "Created", icon: Calendar, key: "createdAt" },
    { label: "Action", icon: Download },
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

  const formatBatchId = (batchId) => {
    if (!batchId || batchId.length <= 18) return batchId;
    return `${batchId.slice(0, 8)}...${batchId.slice(-6)}`;
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold leading-tight text-[#5B3FD6]">
              Generate QR Codes
            </h1>
            <p className="mt-0.5 text-[13px] text-[#7C7297]">
              Create a new QR batch for a product, dealer, or distributor.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(false);
              setFormData(emptyForm);
            }}
            className="w-9 h-9 rounded-lg bg-white border border-[#E7DFF2] text-[#7C7297] flex items-center justify-center hover:bg-[#F4F0FB]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-4">
        <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-4 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                Number of Codes <span className="text-[#E05A74]">*</span>
              </label>
              <input
                type="number"
                min="1"
                name="numberOfCodes"
                value={formData.numberOfCodes}
                onChange={handleInputChange}
                placeholder="Enter number of codes"
                className={`w-full px-4 py-2 rounded-lg border bg-[#FAF8FE] text-sm outline-none focus:ring-2 transition-all ${
                  formErrors.numberOfCodes
                    ? "border-[#E05A74] focus:ring-[#FFDDE7]"
                    : "border-[#E7DFF2] focus:ring-[#E7DDF8]"
                }`}
              />
              {formErrors.numberOfCodes && (
                <p className="mt-1 text-xs font-medium text-[#E05A74]">
                  {formErrors.numberOfCodes}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                Dealer / Distributor
                <span className="ml-1 text-xs font-normal text-[#8E8AA2]">
                  Optional
                </span>
              </label>
              <select
                name="partnerId"
                value={formData.partnerId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
              >
                <option value="">No partner selected - Open stock</option>
                {partners.map((partner) => (
                  <option key={partner.partnerId} value={partner.partnerId}>
                    {partner.companyName} ({partner.type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                Product <span className="text-[#E05A74]">*</span>
              </label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border bg-[#FAF8FE] text-sm outline-none focus:ring-2 transition-all ${
                  formErrors.productId
                    ? "border-[#E05A74] focus:ring-[#FFDDE7]"
                    : "border-[#E7DFF2] focus:ring-[#E7DDF8]"
                }`}
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName} - {product.productUnit}
                  </option>
                ))}
              </select>
              {formErrors.productId && (
                <p className="mt-1 text-xs font-medium text-[#E05A74]">
                  {formErrors.productId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                Batch ID
              </label>
              <input
                type="text"
                value={generatedBatchId}
                readOnly
                placeholder="Auto-generated"
                className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#F4F0FB] text-sm text-[#7C7297] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                Expiry Date
              </label>
              <select
                name="expiryType"
                value={formData.expiryType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
              >
                <option value="None">None</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="12months">12 Months</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>

            {formData.expiryType === "custom" && (
              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Custom Date
                </label>
                <input
                  type="date"
                  name="customDate"
                  value={formData.customDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
              Remarks
            </label>
            <textarea
              name="remarks"
              rows="3"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Enter remarks"
              className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none resize-none focus:ring-2 focus:ring-[#E7DDF8]"
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
            onClick={() => {
              setShowForm(false);
              setFormData(emptyForm);
              setFormErrors({});
            }}
              className="px-4 py-2 rounded-lg bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleGenerate}
              className="px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
            >
              Generate Batch
            </button>
          </div>
        </div>

        <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-4 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#EEE8FF] text-[#5B3FD6] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#2B2340]">
                Live Preview
              </h2>
              <p className="text-xs text-[#8E8AA2]">
                QR batch summary before generation
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              ["Product", selectedProduct?.productName || "Select a product"],
              ["Unit", selectedProduct?.productUnit || "-"],
              ["Partner", selectedPartner?.companyName || "Open stock"],
              ["Partner Type", selectedPartner?.type || "Optional"],
              ["Codes", previewQuantity || 0],
              ["Points / Code", previewPointsPerCode],
              ["Total Reward Value", previewTotalPoints],
              ["Expiry", getExpiryDate()],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#FAF8FE] px-3 py-2"
              >
                <span className="text-xs text-[#8E8AA2]">{label}</span>
                <span className="text-right text-sm font-semibold text-[#2B2340]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-[#EEE8FF] p-3">
            <p className="text-xs font-medium text-[#5B3FD6]">Batch ID</p>
            <p className="mt-1 break-all text-sm font-semibold text-[#2B2340]">
              {generatedBatchId || "Auto-generated after product selection"}
            </p>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {[
          {
            title: "QR Batches",
            value: batches.length,
            icon: QrCode,
            color: "bg-[#EEE8FF] text-[#5B3FD6]",
          },
          {
            title: "Total Codes",
            value: totalCodes,
            icon: Hash,
            color: "bg-[#E8F0FF] text-[#4F7CFF]",
          },
          {
            title: "Total Reward Value",
            value: totalPoints,
            icon: CircleStar,
            color: "bg-[#EAFBF2] text-[#36B37E]",
          },
        ].map((stat) => (
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

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-3 mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
            <input
              type="text"
              placeholder="Search batch, product, dealer, distributor or remarks..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
            />
          </div>

          <select
            value={dateFilter}
            onChange={(event) => {
              setDateFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportSelectedCsv}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EAFBF2] hover:bg-[#DFF7EA] text-[#2CA06F] text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Generate QR
          </button>
        </div>
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {sortedBatches.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">
            <FileText className="w-8 h-8 mx-auto mb-3 text-[#AAA2BE]" />
            No QR batches found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] table-fixed">
              <colgroup>
                <col className="w-[44px]" />
                <col className="w-[165px]" />
                <col className="w-[175px]" />
                <col className="w-[235px]" />
                <col className="w-[80px]" />
                <col className="w-[105px]" />
                <col className="w-[105px]" />
                <col className="w-[105px]" />
                <col className="w-[95px]" />
              </colgroup>
              <thead className="bg-[#F4F0FB] border-b border-[#E7DFF2]">
                <tr>
                  <th className="px-3 py-3 text-left">
                    <button onClick={handleSelectAll}>
                      {selectedBatches.length === sortedBatches.length ? (
                        <CheckSquare className="w-4 h-4 text-[#5B3FD6]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#8E8AA2]" />
                      )}
                    </button>
                  </th>
                  {tableHeads.map((head) => (
                    <th
                      key={head.label}
                      onClick={() => head.key && requestSort(head.key)}
                      className={`px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.04em] text-[#8E8AA2] ${
                        head.key ? "cursor-pointer" : ""
                      }`}
                    >
                      <div className="flex h-5 items-center gap-1.5 leading-none">
                        <head.icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">
                          {head.label}
                        </span>
                        <span className="ml-auto shrink-0">
                          <SortIndicator sortKey={head.key} />
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedBatches.map((batch) => (
                  <tr
                    key={batch.batchId}
                    className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                  >
                    <td className="px-3 py-3.5">
                      <button onClick={() => handleSelectBatch(batch.batchId)}>
                        {selectedBatches.includes(batch.batchId) ? (
                          <CheckSquare className="w-4 h-4 text-[#5B3FD6]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#8E8AA2]" />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        title={batch.batchId}
                        className="inline-flex max-w-full items-center rounded-lg bg-[#EEE8FF] px-2.5 py-1 text-[11px] font-semibold leading-4 text-[#5B3FD6]"
                      >
                        <span className="truncate">{formatBatchId(batch.batchId)}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="truncate text-sm font-semibold text-[#2B2340]">
                        {batch.productName}
                      </p>
                      <p className="text-xs text-[#8E8AA2] mt-1">
                        {batch.productId}
                      </p>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="truncate text-sm text-[#2B2340]">
                        {batch.companyName}
                      </p>
                      <p className="text-xs text-[#8E8AA2] mt-1">
                        {batch.partnerType || "Dealer"} - {batch.dealerId}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-[#2B2340]">
                      {batch.quantity}
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAFBF2] text-[#36B37E] text-xs font-semibold">
                        {batch.points}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-[#2B2340]">
                      {batch.expiryDate}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-[#2B2340]">
                      {batch.createdAt}
                    </td>
                    <td className="px-3 py-3.5">
                      <button
                        onClick={() =>
                          toast.success("PDF generation can be connected after adding PDF libraries")
                        }
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EEE8FF] hover:bg-[#E7DDF8] text-[#5B3FD6] text-xs font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              totalItems={sortedBatches.length}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGeneration;
