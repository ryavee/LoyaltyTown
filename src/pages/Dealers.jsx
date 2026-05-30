import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Hash,
  Loader,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import ExportButton from "../components/ExportButton";
import ImportButton from "../components/ImportButton";
import Pagination from "../components/Reusable/Pagination";

const initialDealers = [
  {
    id: "1",
    dealerId: "DLR1001",
    companyName: "Raj Hardware Traders",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Active",
  },
  {
    id: "2",
    dealerId: "DLR1002",
    companyName: "Aman Paint House",
    city: "Mumbai",
    state: "Maharashtra",
    status: "Active",
  },
  {
    id: "3",
    dealerId: "DLR1003",
    companyName: "Singh Building Mart",
    city: "Delhi",
    state: "Delhi",
    status: "Inactive",
  },
  {
    id: "4",
    dealerId: "DLR1004",
    companyName: "Verma Construction Supply",
    city: "Bengaluru",
    state: "Karnataka",
    status: "Active",
  },
  {
    id: "5",
    dealerId: "DLR1005",
    companyName: "Sharma Industrial Store",
    city: "Pune",
    state: "Maharashtra",
    status: "Active",
  },
];

const dealerColumns = [
  { key: "dealerId", header: "Dealer ID" },
  { key: "companyName", header: "Company Name" },
  { key: "city", header: "City" },
  { key: "state", header: "State" },
  { key: "status", header: "Status" },
];

const StatusBadge = ({ status }) => {
  const isActive = status === "Active";

  return (
    <span
      className={`
      inline-flex w-fit items-center
      px-2.5 py-1
      rounded-full
      text-[11px] font-medium
      ${
        isActive
          ? "bg-[#EAFBF2] text-[#36B37E]"
          : "bg-[#FFEAF1] text-[#E05A74]"
      }
      `}
    >
      {status}
    </span>
  );
};

const Dealers = () => {
  const [dealers, setDealers] = useState(initialDealers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealerToDelete, setDealerToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newDealer, setNewDealer] = useState({
    dealerId: "",
    companyName: "",
    city: "",
    state: "",
    status: "Active",
  });

  const totalDealers = dealers.length;
  const activeDealers = dealers.filter((dealer) => dealer.status === "Active").length;
  const inactiveDealers = totalDealers - activeDealers;
  const coveredCities = new Set(dealers.map((dealer) => dealer.city).filter(Boolean)).size;

  const filteredDealers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return dealers.filter((dealer) => {
      const searchableValues = [
        dealer.id,
        dealer.dealerId,
        dealer.companyName,
        dealer.city,
        dealer.state,
        dealer.status,
      ];

      const matchesSearch =
        !q ||
        searchableValues.some((value) =>
          value?.toString().toLowerCase().includes(q)
        );

      const matchesStatus =
        statusFilter === "All" || dealer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [dealers, searchTerm, statusFilter]);

  const sortedDealers = useMemo(() => {
    const sortableDealers = [...filteredDealers];

    if (!sortConfig.key) {
      return sortableDealers;
    }

    sortableDealers.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sortableDealers;
  }, [filteredDealers, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedDealers.length / pageSize));

  const paginatedDealers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedDealers.slice(start, start + pageSize);
  }, [sortedDealers, currentPage, pageSize]);

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

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDealer((dealer) => ({
      ...dealer,
      [name]: value,
    }));
  };

  const handleGenerateDealerId = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const nextNumber = dealers.length + 1001;

      setNewDealer((dealer) => ({
        ...dealer,
        dealerId: `DLR${nextNumber}`,
      }));
      setIsGenerating(false);
    }, 350);
  };

  const handleCreateDealer = () => {
    if (!newDealer.dealerId.trim()) {
      toast.error("Dealer ID is required");
      return;
    }

    if (!newDealer.companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    if (!newDealer.city.trim()) {
      toast.error("City is required");
      return;
    }

    const dealerExists = dealers.some(
      (dealer) =>
        dealer.dealerId.toLowerCase() === newDealer.dealerId.toLowerCase()
    );

    if (dealerExists) {
      toast.error("Dealer ID already exists");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setDealers((currentDealers) => [
        {
          ...newDealer,
          id: Date.now().toString(),
          state: newDealer.state || "-",
        },
        ...currentDealers,
      ]);
      setShowAddModal(false);
      setNewDealer({
        dealerId: "",
        companyName: "",
        city: "",
        state: "",
        status: "Active",
      });
      setIsSaving(false);
      setCurrentPage(1);
      toast.success("Dealer added successfully");
    }, 400);
  };

  const handleImport = () => {
    toast.success("CSV validated. Connect import API when backend is ready.");
  };

  const confirmDelete = () => {
    if (!dealerToDelete) return;

    setDealers((currentDealers) =>
      currentDealers.filter((dealer) => dealer.id !== dealerToDelete.id)
    );
    setDealerToDelete(null);
    setShowDeleteModal(false);
    toast.success("Dealer deleted successfully");
  };

  const stats = [
    {
      title: "Total Dealers",
      value: totalDealers,
      icon: Users,
      color: "bg-[#EEE8FF] text-[#5B3FD6]",
      filter: "All",
    },
    {
      title: "Active Dealers",
      value: activeDealers,
      icon: CheckCircle,
      color: "bg-[#EAFBF2] text-[#36B37E]",
      filter: "Active",
    },
    {
      title: "Inactive Dealers",
      value: inactiveDealers,
      icon: AlertCircle,
      color: "bg-[#FFEAF1] text-[#E05A74]",
      filter: "Inactive",
    },
    {
      title: "Cities Covered",
      value: coveredCities,
      icon: MapPin,
      color: "bg-[#E8F0FF] text-[#4F7CFF]",
      filter: "All",
    },
  ];

  const tableHeads = [
    { label: "Dealer ID", icon: Hash, key: "dealerId" },
    { label: "Company", icon: Building2, key: "companyName" },
    { label: "Location", icon: MapPin, key: "city" },
    { label: "Status", icon: CheckCircle, key: "status" },
    { label: "Action", icon: MoreVertical },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FC] p-5">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#2B2340]">Dealers</h1>
        <p className="mt-1 text-sm text-[#8E8AA2]">
          Manage dealer onboarding, coverage, and network status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <button
            key={stat.title}
            onClick={() => {
              setStatusFilter(stat.filter);
              setCurrentPage(1);
            }}
            className={`
            bg-white/90 backdrop-blur-md
            rounded-2xl border p-5
            flex items-center gap-4
            transition-all duration-200
            hover:-translate-y-1 hover:shadow-md
            ${
              statusFilter === stat.filter
                ? "border-[#5B3FD6] ring-2 ring-[#E7DDF8]"
                : "border-[#E7DFF2]"
            }
            `}
          >
            <div
              className={`
              w-12 h-12 rounded-2xl
              flex items-center justify-center
              ${stat.color}
              `}
            >
              <stat.icon className="w-5 h-5" />
            </div>

            <div className="text-left">
              <p className="text-[13px] text-[#8E8AA2]">{stat.title}</p>
              <h3 className="text-2xl font-bold text-[#2B2340]">
                {stat.value}
              </h3>
            </div>
          </button>
        ))}
      </div>

      <div
        className="
        bg-white/90 backdrop-blur-md
        rounded-2xl border border-[#E7DFF2]
        p-4 mb-6
        flex flex-col lg:flex-row lg:items-center lg:justify-between
        gap-4
        "
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
            <input
              type="text"
              placeholder="Search dealer, city, state or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="
              w-full pl-10 pr-4 py-2.5
              rounded-xl border border-[#E7DFF2]
              bg-[#FAF8FE]
              text-sm outline-none
              focus:ring-2 focus:ring-[#E7DDF8]
              transition-all
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="
            px-4 py-2.5
            rounded-xl border border-[#E7DFF2]
            bg-[#FAF8FE]
            text-sm outline-none cursor-pointer
            "
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ImportButton
            requiredHeaders={dealerColumns}
            onUpload={handleImport}
            label="Import CSV"
          />

          <ExportButton
            data={filteredDealers}
            columns={dealerColumns}
            filename="dealers"
            page="dealers"
            disabled={filteredDealers.length === 0}
          />

          <button
            onClick={() => setShowAddModal(true)}
            className="
            inline-flex items-center gap-2
            px-4 py-2.5 rounded-xl
            bg-[#5B3FD6] hover:bg-[#4C32C7]
            text-white text-sm font-medium
            transition-all duration-200
            "
          >
            <Plus className="w-4 h-4" />
            Add Dealer
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#E7DFF2] overflow-hidden">
        {filteredDealers.length === 0 ? (
          <div className="p-16 text-center text-[#8E8AA2]">
            No dealers found.
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
                        className="
                        px-6 py-4 text-left
                        text-[11px] font-semibold uppercase tracking-[0.12em]
                        text-[#8E8AA2]
                        cursor-pointer
                        "
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
                  {paginatedDealers.map((dealer) => (
                    <tr
                      key={dealer.id}
                      className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE] transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEE8FF] text-[#5B3FD6] text-xs font-semibold">
                          {dealer.dealerId}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[#2B2340]">
                          {dealer.companyName}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          Dealer partner
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-[#2B2340]">
                          {dealer.city || "-"}
                        </p>
                        <p className="text-xs text-[#8E8AA2] mt-1">
                          {dealer.state || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={dealer.status} />
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            setDealerToDelete(dealer);
                            setShowDeleteModal(true);
                          }}
                          className="
                          inline-flex items-center justify-center
                          w-9 h-9 rounded-xl
                          bg-[#FFEAF1] hover:bg-[#FFDDE7]
                          text-[#E05A74]
                          transition-all duration-200
                          "
                          aria-label={`Delete ${dealer.companyName}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                totalItems={sortedDealers.length}
              />
            </div>
          </>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E7DFF2] shadow-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7DFF2]">
              <div>
                <h2 className="text-lg font-semibold text-[#2B2340]">
                  Add Dealer
                </h2>
                <p className="text-sm text-[#8E8AA2] mt-1">
                  Create a dealer profile for the rewards network.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F4F0FB] text-[#8E8AA2]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Dealer ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="dealerId"
                    value={newDealer.dealerId}
                    onChange={handleInputChange}
                    placeholder="Enter or generate ID"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateDealerId}
                    disabled={isGenerating}
                    className="px-4 py-2.5 rounded-xl bg-[#EEE8FF] hover:bg-[#E7DDF8] text-[#5B3FD6] text-sm font-medium disabled:opacity-60 inline-flex items-center gap-2"
                  >
                    {isGenerating && <Loader className="w-4 h-4 animate-spin" />}
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={newDealer.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={newDealer.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={newDealer.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={newDealer.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none cursor-pointer"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#E7DFF2]">
              <button
                onClick={() => setShowAddModal(false)}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateDealer}
                disabled={isSaving || isGenerating}
                className="px-4 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium disabled:opacity-60 inline-flex items-center gap-2"
              >
                {isSaving && <Loader className="w-4 h-4 animate-spin" />}
                Save Dealer
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E7DFF2] shadow-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#FFEAF1] text-[#E05A74] flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#2B2340]">
                  Delete Dealer
                </h2>
                <p className="text-sm text-[#8E8AA2] mt-1">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-[#2B2340]">
                    {dealerToDelete?.companyName || "this dealer"}
                  </span>
                  ?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setDealerToDelete(null);
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 rounded-xl bg-[#E05A74] hover:bg-[#D84B66] text-white text-sm font-medium inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dealers;
