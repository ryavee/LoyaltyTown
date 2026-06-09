import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Eye,
  Hash,
  Loader2,
  MapPin,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import Pagination from "../Components/Reusable/Pagination";

const initialQrData = [
  {
    qrId: "QR-LT-1001-8F4A92C1",
    batchId: "DLR1PRD1001503005260001",
    productName: "Premium Cement",
    companyName: "Raj Hardware Traders",
    status: "scanned",
    scannedByName: "Ravi Raj",
    city: "Chennai",
    state: "Tamil Nadu",
    location: { lat: 13.0827, lng: 80.2707 },
    createdAt: "2026-05-30T09:25:00",
  },
  {
    qrId: "QR-LT-1002-1A82CC91",
    batchId: "DLR2PRD1002253005260002",
    productName: "Wall Putty",
    companyName: "Aman Paint House",
    status: "not_scanned",
    scannedByName: "",
    city: "",
    state: "",
    location: null,
    createdAt: "2026-05-29T14:10:00",
  },
  {
    qrId: "QR-LT-1003-B75D21EF",
    batchId: "DLR3PRD1003203005260003",
    productName: "Exterior Primer",
    companyName: "Singh Building Mart",
    status: "scanned",
    scannedByName: "Neha Singh",
    city: "Delhi",
    state: "Delhi",
    location: { lat: 28.6139, lng: 77.209 },
    createdAt: "2026-05-24T12:40:00",
  },
  {
    qrId: "QR-LT-1004-C983AE42",
    batchId: "DLR1PRD1001503005260001",
    productName: "Premium Cement",
    companyName: "Raj Hardware Traders",
    status: "inactive",
    scannedByName: "",
    city: "Bengaluru",
    state: "Karnataka",
    location: { lat: 12.9716, lng: 77.5946 },
    createdAt: "2026-05-18T16:05:00",
  },
];

const statusStyles = {
  scanned: "bg-[#EAFBF2] text-[#36B37E]",
  not_scanned: "bg-[#E8F0FF] text-[#4F7CFF]",
  inactive: "bg-[#FFEAF1] text-[#E05A74]",
};

const statusLabels = {
  scanned: "Scanned",
  not_scanned: "Not Scanned",
  inactive: "Inactive",
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const QRTrack = () => {
  const [qrData] = useState(initialQrData);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const scannedCount = qrData.filter((qr) => qr.status === "scanned").length;
  const pendingCount = qrData.filter((qr) => qr.status === "not_scanned").length;
  const inactiveCount = qrData.filter((qr) => qr.status === "inactive").length;

  const filteredQrData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const now = new Date();

    return qrData.filter((qr) => {
      const searchableValues = [
        qr.qrId,
        qr.batchId,
        qr.productName,
        qr.companyName,
        qr.scannedByName,
        qr.city,
        qr.state,
      ];

      const matchesSearch =
        !q ||
        searchableValues.some((value) =>
          value?.toString().toLowerCase().includes(q)
        );

      const createdAt = new Date(qr.createdAt);
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

      const matchesStatus =
        statusFilter === "All" || qr.status === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [dateFilter, qrData, searchTerm, statusFilter]);

  const sortedQrData = useMemo(() => {
    const sortable = [...filteredQrData];

    if (!sortConfig.key) return sortable;

    sortable.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortable;
  }, [filteredQrData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedQrData.length / pageSize));

  const paginatedQrData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedQrData.slice(start, start + pageSize);
  }, [currentPage, pageSize, sortedQrData]);

  const requestSort = (key) => {
    if (!key) return;

    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const stats = [
    {
      title: "Total QR Codes",
      value: qrData.length,
      icon: QrCode,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
      filter: "All",
    },
    {
      title: "Scanned",
      value: scannedCount,
      icon: CheckCircle,
      color: "bg-[#EAFBF2] text-[#36B37E]",
      filter: "scanned",
    },
    {
      title: "Not Scanned",
      value: pendingCount,
      icon: ShieldCheck,
      color: "bg-[#E8F0FF] text-[#4F7CFF]",
      filter: "not_scanned",
    },
    {
      title: "Inactive",
      value: inactiveCount,
      icon: X,
      color: "bg-[#FFEAF1] text-[#E05A74]",
      filter: "inactive",
    },
  ];

  const tableHeads = [
    { label: "QR ID", icon: Hash, key: "qrId" },
    { label: "Batch", icon: QrCode, key: "batchId" },
    { label: "Supplier", icon: ShieldCheck, key: "companyName" },
    { label: "Status", icon: CheckCircle, key: "status" },
    { label: "Scanned By", icon: Eye, key: "scannedByName" },
    { label: "Created", icon: Calendar, key: "createdAt" },
    { label: "Location", icon: MapPin },
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
          <button
            key={stat.title}
            onClick={() => {
              setStatusFilter(stat.filter);
              setCurrentPage(1);
            }}
            className={`
            bg-white/95 backdrop-blur-md rounded-xl border px-4 py-3.5
            flex items-center gap-3 transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-sm
            ${
              statusFilter === stat.filter
                ? "border-[#5B3FD6] ring-2 ring-[#E7DDF8]"
                : "border-[#E7DFF2]"
            }
            `}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[12px] leading-4 text-[#8E8AA2]">
                {stat.title}
              </p>
              <h3 className="text-xl font-bold leading-6 text-[#2B2340]">
                {stat.value}
              </h3>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
            <input
              type="text"
              placeholder="Search QR, batch, supplier, user or location..."
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

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
          >
            <option value="All">All Status</option>
            <option value="scanned">Scanned</option>
            <option value="not_scanned">Not Scanned</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium transition-all duration-200"
        >
          {refreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Refresh
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {sortedQrData.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">
            No QR tracking records found.
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
                  {paginatedQrData.map((qr) => (
                    <tr
                      key={qr.qrId}
                      className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-[#2B2340]">
                          {qr.qrId.slice(0, 12)}...
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          {qr.qrId.slice(-8)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEE8FF] text-[#5B3FD6] text-xs font-semibold">
                          {qr.batchId}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm text-[#2B2340]">
                          {qr.companyName}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          {qr.productName}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            statusStyles[qr.status] ||
                            "bg-[#F4F0FB] text-[#8E8AA2]"
                          }`}
                        >
                          {statusLabels[qr.status] || qr.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#2B2340]">
                        {qr.scannedByName || "-"}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#2B2340]">
                        {formatDate(qr.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        {qr.location ? (
                          <button
                            onClick={() => setSelectedLocation(qr)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EEE8FF] hover:bg-[#E7DDF8] text-[#5B3FD6] text-xs font-medium"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            {qr.city || "View Map"}
                          </button>
                        ) : (
                          <span className="text-xs text-[#8E8AA2]">
                            No location
                          </span>
                        )}
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
                totalItems={sortedQrData.length}
              />
            </div>
          </>
        )}
      </div>

      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl rounded-xl bg-white border border-[#E7DFF2] shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7DFF2] bg-[#F4F0FB]">
              <div>
                <h2 className="text-lg font-semibold text-[#5B3FD6]">
                  QR Location
                </h2>
                <p className="text-sm text-[#7C7297] mt-0.5">
                  {selectedLocation.qrId}
                </p>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="w-9 h-9 rounded-lg bg-white text-[#7C7297] flex items-center justify-center hover:bg-[#EEE8FF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-[480px]">
              <iframe
                src={`https://www.google.com/maps?q=${selectedLocation.location.lat},${selectedLocation.location.lng}&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="QR Location Map"
              />
            </div>

            <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#E7DFF2] bg-[#FAF8FE]">
              <a
                href={`https://www.google.com/maps?q=${selectedLocation.location.lat},${selectedLocation.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
              >
                <MapPin className="w-4 h-4" />
                Open Maps
              </a>
              <button
                onClick={() => setSelectedLocation(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRTrack;
