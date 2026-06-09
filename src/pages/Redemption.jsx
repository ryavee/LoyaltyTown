import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Gift,
  IndianRupee,
  MoreVertical,
  Phone,
  RotateCcw,
  Search,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

import ConfirmationModal from "../Components/ConfirmationModal";
import Pagination from "../Components/Reusable/Pagination";
import StatCard from "../Components/ui/StatCard";
import ExportButton from "../Components/ExportButton";

const initialRedemptions = [
  {
    id: "RED1001",
    uid: "1",
    userName: "Ravi Raj",
    userPhone: "9876543210",
    upiId: "ravi@upi",
    upiNumber: "9876543210",
    points: 2500,
    ratio: "10:1",
    totalValue: 250,
    status: "P",
    requestedAt: "2026-05-30T10:15:00",
  },
  {
    id: "RED1002",
    uid: "2",
    userName: "Aman Kumar",
    userPhone: "9999999999",
    upiId: "aman@okaxis",
    upiNumber: "9999999999",
    points: 1800,
    ratio: "10:1",
    totalValue: 180,
    status: "A",
    requestedAt: "2026-05-29T15:30:00",
  },
  {
    id: "RED1003",
    uid: "3",
    userName: "Neha Singh",
    userPhone: "8888888888",
    upiId: "neha@ybl",
    upiNumber: "8888888888",
    points: 900,
    ratio: "10:1",
    totalValue: 90,
    status: "R",
    requestedAt: "2026-05-27T12:20:00",
  },
  {
    id: "RED1004",
    uid: "4",
    userName: "Priya Sharma",
    userPhone: "6666666666",
    upiId: "priya@upi",
    upiNumber: "6666666666",
    points: 3200,
    ratio: "10:1",
    totalValue: 320,
    status: "P",
    requestedAt: "2026-05-24T09:45:00",
  },
];

const statusLabels = {
  P: "Pending",
  A: "Approved",
  R: "Rejected",
};

const statusStyles = {
  P: "bg-[#FFF4E5] text-[#F59E0B]",
  A: "bg-[#EAFBF2] text-[#36B37E]",
  R: "bg-[#FFEAF1] text-[#E05A74]",
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Redemption = () => {
  const [redemptions, setRedemptions] = useState(initialRedemptions);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [resetSpin, setResetSpin] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "requestedAt",
    direction: "desc",
  });

  const stats = useMemo(
    () => ({
      total: redemptions.length,
      pending: redemptions.filter((item) => item.status === "P").length,
      approved: redemptions.filter((item) => item.status === "A").length,
      rejected: redemptions.filter((item) => item.status === "R").length,
    }),
    [redemptions]
  );

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = redemptions.filter((item) => {
      const statusFilter =
        filter === "All" ||
        item.status === { Pending: "P", Approved: "A", Rejected: "R" }[filter];

      const searchMatch =
        !q ||
        [
          item.id,
          item.userName,
          item.userPhone,
          item.upiId,
          item.upiNumber,
        ].some((value) => value?.toString().toLowerCase().includes(q));

      const dateMatch =
        !selectedDate ||
        new Date(item.requestedAt).toISOString().split("T")[0] === selectedDate;

      return statusFilter && searchMatch && dateMatch;
    });

    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue =
        sortConfig.key === "totalValue" || sortConfig.key === "points"
          ? Number(a[sortConfig.key] || 0)
          : a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue =
        sortConfig.key === "totalValue" || sortConfig.key === "points"
          ? Number(b[sortConfig.key] || 0)
          : b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filter, redemptions, searchQuery, selectedDate, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = filteredData.slice(
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

  const handleResetFilters = () => {
    setResetSpin(true);
    setFilter("All");
    setSelectedDate("");
    setSearchQuery("");
    setCurrentPage(1);
    setTimeout(() => setResetSpin(false), 600);
  };

  const handleSelectAll = (event) => {
    setSelectedRows(event.target.checked ? paginatedData.map((item) => item.id) : []);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  };

  const updateStatus = (ids, status) => {
    setRedemptions((current) =>
      current.map((item) =>
        ids.includes(item.id) && item.status === "P"
          ? { ...item, status }
          : item
      )
    );
    setSelectedRows([]);
    setConfirmAction(null);
    toast.success(
      `${status === "A" ? "Approved" : "Rejected"} redemption request`
    );
  };

  const handleBulkAction = (status) => {
    const pendingIds = redemptions
      .filter((item) => selectedRows.includes(item.id) && item.status === "P")
      .map((item) => item.id);

    if (pendingIds.length === 0) {
      toast.error("Select at least one pending redemption");
      return;
    }

    setConfirmAction({
      title: status === "A" ? "Approve Redemptions" : "Reject Redemptions",
      message: `Are you sure you want to ${
        status === "A" ? "approve" : "reject"
      } ${pendingIds.length} pending request(s)?`,
      ids: pendingIds,
      status,
    });
  };


  const statCards = [
    {
      title: "Total Redemptions",
      value: stats.total,
      icon: Gift,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
      filter: "All",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-[#FFF4E5] text-[#F59E0B]",
      filter: "Pending",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      color: "bg-[#EAFBF2] text-[#36B37E]",
      filter: "Approved",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "bg-[#FFEAF1] text-[#E05A74]",
      filter: "Rejected",
    },
  ];

  const tableHeads = [
    { label: "User Name", icon: Gift, key: "userName" },
    { label: "Contact", icon: Phone, key: "userPhone" },
    { label: "UPI Details", icon: Wallet, key: "upiId" },
    { label: "Amount", icon: IndianRupee, key: "totalValue" },
    { label: "Date", icon: CalendarDays, key: "requestedAt" },
    { label: "Status", icon: CheckCircle, key: "status" },
    { label: "Action", icon: MoreVertical },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            variant="filter"
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bg={stat.color.includes("EEE8FF") ? "bg-[#F3E8FF]" :
                stat.color.includes("FFF4E5") ? "bg-[#FFF7ED]" :
                stat.color.includes("EAFBF2") ? "bg-[#E8FBF2]" : "bg-[#FFF1F2]"}
            border={stat.color.includes("EEE8FF") ? "border-[#DDD6FE]" :
                    stat.color.includes("FFF4E5") ? "border-[#FED7AA]" :
                    stat.color.includes("EAFBF2") ? "border-[#A7F3D0]" : "border-[#FECDD3]"}
            iconBg={stat.color.includes("EEE8FF") ? "bg-[#7C3AED]" :
                    stat.color.includes("FFF4E5") ? "bg-[#F59E0B]" :
                    stat.color.includes("EAFBF2") ? "bg-[#059669]" : "bg-[#E11D48]"}
            valueCl={stat.color.includes("EEE8FF") ? "text-[#5B3FD6]" :
                     stat.color.includes("FFF4E5") ? "text-[#D97706]" :
                     stat.color.includes("EAFBF2") ? "text-[#059669]" : "text-[#E11D48]"}
            labelCl={stat.color.includes("EEE8FF") ? "text-[#7C3AED]" :
                     stat.color.includes("FFF4E5") ? "text-[#F59E0B]" :
                     stat.color.includes("EAFBF2") ? "text-[#22A861]" : "text-[#F43F5E]"}
            isActive={filter === stat.filter}
            onClick={() => { setFilter(stat.filter); setCurrentPage(1); }}
          />
        ))}
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-3 mb-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
            <input
              type="text"
              placeholder="Search name, phone, ID or UPI..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
            />
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(event) => {
              setSelectedDate(event.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
          />

          <select
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
          >
            <RotateCcw className={`w-4 h-4 ${resetSpin ? "animate-spin" : ""}`} />
            Reset
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleBulkAction("A")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedRows.length
                ? "bg-[#EAFBF2] text-[#2CA06F] hover:bg-[#DFF7EA]"
                : "bg-[#F4F0FB] text-[#AAA2BE] cursor-not-allowed"
            }`}
          >
            Approve ({selectedRows.length})
          </button>

          <button
            onClick={() => handleBulkAction("R")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedRows.length
                ? "bg-[#FFEAF1] text-[#E05A74] hover:bg-[#FFDDE7]"
                : "bg-[#F4F0FB] text-[#AAA2BE] cursor-not-allowed"
            }`}
          >
            Reject ({selectedRows.length})
          </button>

          <ExportButton
            data={redemptions.filter((item) => selectedRows.includes(item.id))}
            columns={[
              { key: "id", header: "ID" },
              { key: "userName", header: "User Name" },
              { key: "userPhone", header: "Phone" },
              { key: "upiId", header: "UPI ID" },
              { key: "points", header: "Points" },
              { key: "totalValue", header: "Amount" },
              { key: "status", header: "Status", formatter: (val) => statusLabels[val] || val },
              { key: "requestedAt", header: "Requested Date", formatter: (val) => formatDate(val) },
            ]}
            filename="redemptions"
            disabled={selectedRows.length === 0}
          />
        </div>
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] overflow-hidden shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        {filteredData.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">
            No redemptions found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#F4F0FB] border-b border-[#E7DFF2]">
                  <tr>
                    <th className="px-5 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          paginatedData.length > 0 &&
                          selectedRows.length === paginatedData.length
                        }
                        onChange={handleSelectAll}
                        className="w-4 h-4 accent-[#5B3FD6]"
                      />
                    </th>
                    {tableHeads.map((head) => (
                      <th
                        key={head.label}
                        onClick={() => requestSort(head.key)}
                        className="px-5 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8E8AA2] cursor-pointer"
                      >
                        <div className="flex items-center gap-2 whitespace-nowrap">
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
                  {paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200 ${
                        selectedRows.includes(item.id) ? "bg-[#FAF8FE]" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                          className="w-4 h-4 accent-[#5B3FD6]"
                        />
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-[#2B2340]">
                          {item.userName}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">{item.id}</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#2B2340]">
                        {item.userPhone}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm text-[#2B2340]">{item.upiId}</p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          {item.upiNumber}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-[#2B2340]">
                          {item.points} pts = Rs. {item.totalValue}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          Ratio: {item.ratio}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#2B2340]">
                        {formatDate(item.requestedAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${statusStyles[item.status]}`}
                        >
                          {statusLabels[item.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {item.status === "P" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  title: "Approve Redemption",
                                  message: `Approve redemption for ${item.userName}?`,
                                  ids: [item.id],
                                  status: "A",
                                })
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#EAFBF2] hover:bg-[#DFF7EA] text-[#2CA06F] text-xs font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  title: "Reject Redemption",
                                  message: `Reject redemption for ${item.userName}?`,
                                  ids: [item.id],
                                  status: "R",
                                })
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#FFEAF1] hover:bg-[#FFDDE7] text-[#E05A74] text-xs font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-[#8E8AA2]">
                            {statusLabels[item.status]}
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
                totalItems={filteredData.length}
              />
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!confirmAction}
        title={confirmAction?.title || ""}
        message={confirmAction?.message || ""}
        onConfirm={() =>
          confirmAction && updateStatus(confirmAction.ids, confirmAction.status)
        }
        onCancel={() => setConfirmAction(null)}
        confirmText="Confirm"
        type={confirmAction?.status === "A" ? "success" : "danger"}
      />
    </div>
  );
};

export default Redemption;
