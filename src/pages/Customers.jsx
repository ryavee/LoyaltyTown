import React, {
  useState,
  useMemo,
} from "react";
import Papa from "papaparse";
import { toast } from "react-hot-toast";

import {
  User,
  Phone,
  CheckCircle,
  CircleStar,
  MoreVertical,
  RotateCcw,
  Search,
  IdCard,
  Lock,
  Unlock,
  Users as UsersIcon,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  MapPin,
  X,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

// import { CustomerContext } from "../Context/CustomerContext";

import CustomerDetails from "../Components/CustomerDetails";
import StatCard from "../Components/ui/StatCard";

import Pagination from "../Components/Reusable/Pagination";

import ExportButton from "../Components/ExportButton";

import ImportButton from "../Components/ImportButton";

import LoadingSpinner from "../Components/Reusable/LoadingSpinner";

const customersList = [
  {
    uid: 1,
    firstName: "Ravi",
    lastName: "Raj",
    email: "ravi@gmail.com",
    phone: "9876543210",
    district: "T. Nagar",
    state: "Chennai",
    loyaltyPoint: 2500,
    isKYCverifed: true,
    isBlocked: false,
    referralCode: "LT1001",
  },
  {
    uid: 2,
    firstName: "Aman",
    lastName: "Kumar",
    email: "aman@gmail.com",
    phone: "9999999999",
    district: "Andheri",
    state: "Mumbai",
    loyaltyPoint: 1200,
    isKYCverifed: false,
    isBlocked: false,
    referralCode: "LT1002",
  },
  {
    uid: 3,
    firstName: "Rahul",
    lastName: "Singh",
    email: "rahul@gmail.com",
    phone: "8888888888",
    district: "Connaught Place",
    state: "Delhi",
    loyaltyPoint: 500,
    isKYCverifed: true,
    isBlocked: true,
    referralCode: "LT1003",
  },
  {
    uid: 4,
    firstName: "Sneha",
    lastName: "Verma",
    email: "sneha@gmail.com",
    phone: "7777777777",
    district: "Velachery",
    state: "Chennai",
    loyaltyPoint: 3400,
    isKYCverifed: true,
    isBlocked: false,
    referralCode: "LT1004",
  },
  {
    uid: 5,
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@gmail.com",
    phone: "6666666666",
    district: "Bandra",
    state: "Mumbai",
    loyaltyPoint: 950,
    isKYCverifed: false,
    isBlocked: false,
    referralCode: "LT1005",
  },
  {
    uid: 6,
    firstName: "Arjun",
    lastName: "Mehta",
    email: "arjun@gmail.com",
    phone: "5555555555",
    district: "Saket",
    state: "Delhi",
    loyaltyPoint: 4200,
    isKYCverifed: true,
    isBlocked: false,
    referralCode: "LT1006",
  },
];

const loading = false;

const customerColumns = [
  { key: "uid", header: "Customer ID", formatter: (val) => `CUST-${12000 + Number(val || 1)}` },
  { key: "name", header: "Customer Name", formatter: (val, row) => `${row.firstName || ""} ${row.lastName || ""}`.trim() },
  { key: "referralCode", header: "Referral Code" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "location", header: "Location", formatter: (val, row) => `${row.district || row.city || ""}, ${row.state || ""}`.trim() },
  { key: "loyaltyPoint", header: "Points" },
  { key: "isKYCverifed", header: "KYC Status", formatter: (val) => val ? "Verified" : "Pending" },
  { key: "isBlocked", header: "Account Status", formatter: (val) => val ? "Blocked" : "Active" },
];

const Customers = () => {
  const [customers, setCustomers] = useState(customersList);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [resetSpinning, setResetSpinning] =
    useState(false);

  const [sortConfig, setSortConfig] =
    useState({
      key: null,
      direction: "asc",
    });

  /* =====================================================
      STATS
  ===================================================== */

  const totalCustomers =
    customers.length;

  const kycVerified =
    customers.filter(
      (c) => c.isKYCverifed
    ).length;

  const blockedUsers =
    customers.filter(
      (c) => c.isBlocked
    ).length;

  const activeUsers =
    totalCustomers - blockedUsers;

  /* =====================================================
      FILTER
  ===================================================== */

  const filteredCustomers = useMemo(() => {
    const q = searchTerm
      .trim()
      .toLowerCase();

    return customers
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .filter((c) => {

        const searchableValues = [
          c.uid,
          c.id,
          c.customerId,
          c.referralCode,
          c.firstName,
          c.lastName,
          `${c.firstName || ""} ${c.lastName || ""}`,
          c.phone,
          c.mobile,
          c.email,
          c.address,
          c.city,
          c.district,
          c.state,
        ];

        const matchesSearch =
          !q ||
          searchableValues.some((value) =>
            value
              ?.toString()
              .toLowerCase()
              .includes(q)
          );

        const matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Active" &&
            !c.isBlocked) ||
          (statusFilter === "Blocked" &&
            c.isBlocked) ||
          (statusFilter === "KYC Verified" &&
            c.isKYCverifed) ||
          (statusFilter === "KYC Pending" &&
            !c.isKYCverifed);

        return (
          matchesSearch &&
          matchesStatus
        );
      });

  }, [
    customers,
    searchTerm,
    statusFilter,
  ]);

  /* =====================================================
      SORTING
  ===================================================== */

  const requestSort = (key) => {

    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({
      key,
      direction,
    });
  };

  const sortedCustomers = useMemo(() => {

    let sortable =
      [...filteredCustomers];

    if (sortConfig.key !== null) {

      sortable.sort((a, b) => {

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (
          sortConfig.key === "firstName"
        ) {

          aValue =
            `${a.firstName || ""} ${a.lastName || ""}`;

          bValue =
            `${b.firstName || ""} ${b.lastName || ""}`;
        }

        if (aValue < bValue)
          return sortConfig.direction === "asc"
            ? -1
            : 1;

        if (aValue > bValue)
          return sortConfig.direction === "asc"
            ? 1
            : -1;

        return 0;
      });
    }

    return sortable;

  }, [filteredCustomers, sortConfig]);

  /* =====================================================
      PAGINATION
  ===================================================== */

  const [currentPage, setCurrentPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const totalPages = Math.ceil(
    sortedCustomers.length / pageSize
  );

  const paginatedCustomers =
    useMemo(() => {

      const start =
        (currentPage - 1) * pageSize;

      return sortedCustomers.slice(
        start,
        start + pageSize
      );

    }, [
      sortedCustomers,
      currentPage,
      pageSize,
    ]);

  /* =====================================================
      RESET
  ===================================================== */

  const handleResetFilters = () => {

    setSearchTerm("");

    setStatusFilter("All");

    setCurrentPage(1);

    setResetSpinning(true);

    setTimeout(() => {
      setResetSpinning(false);
    }, 600);
  };

  /* =====================================================
      ACTIONS
  ===================================================== */

  const handleCustomerClick =
    (customer) => {
      setSelectedCustomer(customer);
    };

  const handleBackClick = () =>
    setSelectedCustomer(null);

  /* =====================================================
      LOADING
  ===================================================== */

  if (loading) {
    return (
      <LoadingSpinner
        centered
        message="Loading Customers..."
      />
    );
  }

  /* =====================================================
      DETAILS PAGE
  ===================================================== */

  const handleBlockCustomer = (uid) => {
    setCustomers((prev) =>
      prev.map((c) => (c.uid === uid ? { ...c, isBlocked: !c.isBlocked } : c))
    );
  };

  const handleKycAction = (uid) => {
    setCustomers((prev) =>
      prev.map((c) => (c.uid === uid ? { ...c, isKYCverifed: !c.isKYCverifed } : c))
    );
  };

  const handlePointsUpdate = (uid, newPoints) => {
    setCustomers((prev) =>
      prev.map((c) => (c.uid === uid ? { ...c, loyaltyPoint: newPoints } : c))
    );
  };

  const handleImportCustomers = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          toast.error("CSV file is empty");
          return;
        }
        const imported = results.data.map((row, index) => {
          const uid = row.uid ? Number(row.uid) : Date.now() + index;
          return {
            uid,
            firstName: row.firstName || row["First Name"] || row["firstName"] || "",
            lastName: row.lastName || row["Last Name"] || row["lastName"] || "",
            email: row.email || "",
            phone: row.phone || "",
            district: row.district || row["District"] || "",
            state: row.state || row["State"] || "",
            loyaltyPoint: Number(row.loyaltyPoint || row.loyaltyPoint || row.Points || 0),
            isKYCverifed: String(row.isKYCverifed || row.isKYCverifed || row["KYC Status"]).toLowerCase() === "true" || String(row.isKYCverifed || row["KYC Status"]).toLowerCase() === "verified",
            isBlocked: String(row.isBlocked || row["Account Status"]).toLowerCase() === "true" || String(row.isBlocked || row["Account Status"]).toLowerCase() === "blocked",
            referralCode: row.referralCode || row["Referral Code"] || `LT${1000 + index + customers.length}`,
          };
        });

        setCustomers((prev) => [...imported, ...prev]);
        toast.success(`Successfully imported ${imported.length} customers`);
      },
      error: (err) => {
        toast.error(`Error parsing CSV file: ${err.message}`);
      }
    });
  };

  if (selectedCustomer) {
    const currentCustomer = customers.find((c) => c.uid === selectedCustomer.uid) || selectedCustomer;
    return (
      <CustomerDetails
        customer={currentCustomer}
        onBack={handleBackClick}
        onBlockCustomer={handleBlockCustomer}
        onKYCAction={handleKycAction}
        onPointsUpdate={handlePointsUpdate}
      />
    );
  }

  /* =====================================================
      STATS DATA
  ===================================================== */

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: UsersIcon,
      color:
        "bg-[#EEE8FF] text-[#5B3FD6]",
      filter: "All",
    },

    {
      title: "KYC Verified",
      value: kycVerified,
      icon: IdCard,
      color:
        "bg-[#EAFBF2] text-[#36B37E]",
      filter: "KYC Verified",
    },

    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: Lock,
      color:
        "bg-[#FFEAF1] text-[#E05A74]",
      filter: "Blocked",
    },

    {
      title: "Active Users",
      value: activeUsers,
      icon: Unlock,
      color:
        "bg-[#E8F0FF] text-[#4F7CFF]",
      filter: "Active",
    },
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
    <div className="space-y-4 pb-8">

      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {[
          {
            title: "Total Customers",
            value: totalCustomers,
            icon: UsersIcon,
            bg: "bg-[#F3E8FF]",
            border: "border-[#DDD6FE]",
            iconBg: "bg-[#7C3AED]",
            valueCl: "text-[#5B3FD6]",
            labelCl: "text-[#7C3AED]",
            filter: "All",
            sub: "All registered users",
          },
          {
            title: "KYC Verified",
            value: kycVerified,
            icon: ShieldCheck,
            bg: "bg-[#E8FBF2]",
            border: "border-[#A7F3D0]",
            iconBg: "bg-[#059669]",
            valueCl: "text-[#059669]",
            labelCl: "text-[#22A861]",
            filter: "KYC Verified",
            sub: "Identity confirmed",
          },
          {
            title: "Blocked Users",
            value: blockedUsers,
            icon: Lock,
            bg: "bg-[#FFF1F2]",
            border: "border-[#FECDD3]",
            iconBg: "bg-[#E11D48]",
            valueCl: "text-[#E11D48]",
            labelCl: "text-[#F43F5E]",
            filter: "Blocked",
            sub: "Access restricted",
          },
          {
            title: "Active Users",
            value: activeUsers,
            icon: Unlock,
            bg: "bg-[#E0F2FE]",
            border: "border-[#BAE6FD]",
            iconBg: "bg-[#0284C7]",
            valueCl: "text-[#0284C7]",
            labelCl: "text-[#0EA5E9]",
            filter: "Active",
            sub: "Currently active",
          },
        ].map((stat) => (
          <StatCard
            key={stat.filter}
            variant="filter"
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bg={stat.bg}
            border={stat.border}
            iconBg={stat.iconBg}
            valueCl={stat.valueCl}
            labelCl={stat.labelCl}
            sub={stat.sub}
            isActive={statusFilter === stat.filter}
            onClick={() => setStatusFilter(stat.filter)}
          />
        ))}
      </div>



      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div
        className="
        bg-white/95
        backdrop-blur-md

        rounded-xl

        border border-[#E7DFF2]

        p-3

        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between

        gap-3

        mb-4
        "
      >

        {/* LEFT */}
        <div
          className="
          flex flex-col sm:flex-row
          items-stretch sm:items-center

          gap-3

          flex-1
          "
        >

          {/* SEARCH */}
          <div className="relative flex-1">

            <Search
              className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2

              w-4 h-4

              text-[#AAA2BE]
              "
            />

            <input
              type="text"

              placeholder="Search customers..."

              value={searchTerm}

              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}

              className="
              w-full

              pl-10 pr-9 py-2

              rounded-lg

              border border-[#E7DFF2]

              bg-[#FAF8FE]

              text-sm

              outline-none

              focus:border-[#5B3FD6]
              focus:ring-2
              focus:ring-[#E7DDF8]

              transition-all
              "
            />

            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#AAA2BE] hover:text-[#5B3FD6] transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

          </div>

          {/* FILTER */}
          <select
            value={statusFilter}

            onChange={(e) =>
              setStatusFilter(e.target.value)
            }

            className="
            px-4 py-2

            rounded-lg

            border border-[#E7DFF2]

            bg-[#FAF8FE]

            text-sm

            outline-none

            cursor-pointer
            "
          >

            <option>All</option>
            <option>Active</option>
            <option>Blocked</option>
            <option>KYC Verified</option>
            <option>KYC Pending</option>

          </select>

          {/* RESET */}
          <button
            onClick={handleResetFilters}

            className="
            px-4 py-2

            rounded-lg

            bg-[#5B3FD6]
            hover:bg-[#4C32C7]

            text-white

            text-sm
            font-medium

            flex items-center gap-2

            transition-all duration-200
            "
          >

            <RotateCcw
              className={`
              w-4 h-4

              ${
                resetSpinning
                  ? "animate-spin"
                  : ""
              }
              `}
            />

            Reset

          </button>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <ImportButton
            label="Import CSV"
            onUpload={handleImportCustomers}
          />

          <ExportButton
            data={filteredCustomers}
            columns={customerColumns}
            filename="customers"
          />

        </div>

      </div>



      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
        bg-white/95
        backdrop-blur-md

        rounded-xl

        border border-[#E7DFF2]

        overflow-hidden
        "
      >

        {/* EMPTY */}
        {filteredCustomers.length === 0 ? (

          <div
            className="
            p-12
            text-center

            text-[#8E8AA2]
            "
          >
            No customers found.
          </div>

        ) : (
          <>

            <table className="min-w-full">

              {/* HEAD */}
              <thead
                className="
                bg-[#F4F0FB]

                border-b border-[#E7DFF2]
                "
              >

                <tr>

                  {[
                    {
                      label: "Customer",
                      icon: User,
                      key: "firstName",
                    },

                    {
                      label: "Contact",
                      icon: Phone,
                      key: "phone",
                    },

                    {
                      label: "Location",
                      icon: MapPin,
                    },

                    {
                      label: "Points",
                      icon: CircleStar,
                    },

                    {
                      label: "Status",
                      icon: CheckCircle,
                    },

                    {
                      label: "Action",
                      icon: MoreVertical,
                    },
                  ].map((head) => (

                    <th
                      key={head.label}

                      onClick={() =>
                        head.key &&
                        requestSort(head.key)
                      }

                      className="
                      px-5 py-3

                      text-left

                      text-[10.5px]
                      font-semibold

                      uppercase

                      tracking-[0.1em]

                      text-[#8E8AA2]

                      "
                    >

                      <div className="flex items-center gap-2">

                        <head.icon className="w-4 h-4" />

                        <span>
                          {head.label}
                        </span>

                        <SortIndicator sortKey={head.key} />

                      </div>

                    </th>
                  ))}

                </tr>

              </thead>



              {/* BODY */}
              <tbody>

                {paginatedCustomers.map(
                  (customer) => (

                    <tr
                      key={customer.uid}

                      className="
                      border-b border-[#F2ECFA]

                      hover:bg-[#FAF8FE]

                      transition-all duration-200
                      "
                    >

                      {/* CUSTOMER */}
                      <td className="px-5 py-3.5">

                        <div className="flex items-center gap-3">

                          {customer.profileImage ? (
                            <img
                              src={customer.profileImage}

                              alt="profile"

                              className="
                              w-10 h-10

                              rounded-xl

                              object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                              w-10 h-10

                              rounded-xl

                              bg-[#EEE8FF]

                              flex items-center justify-center

                              text-[#5B3FD6]

                              font-semibold
                              "
                            >
                              {customer.firstName?.[0]}
                            </div>
                          )}

                          <div>

                            <p
                              className="
                              text-sm
                              font-semibold

                              text-[#2B2340]
                              "
                            >
                              {customer.firstName}
                              {" "}
                              {customer.lastName}
                            </p>

                            <p
                              className="
                              text-xs

                              text-[#8E8AA2]
                              "
                            >
                              {customer.referralCode}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CONTACT */}
                      <td className="px-5 py-3.5">

                        <p
                          className="
                          text-sm

                          text-[#2B2340]
                          "
                        >
                          {customer.email || "-"}
                        </p>

                        <p
                          className="
                          text-xs

                          text-[#8E8AA2]
                          mt-1
                          "
                        >
                          {customer.phone || "-"}
                        </p>

                      </td>

                      {/* LOCATION */}
                      <td className="px-5 py-3.5">

                        <p
                          className="
                          text-sm

                          text-[#2B2340]
                          "
                        >
                          {customer.district || "-"}
                        </p>

                        <p
                          className="
                          text-xs

                          text-[#8E8AA2]
                          mt-1
                          "
                        >
                          {customer.state || "-"}
                        </p>

                      </td>

                      {/* POINTS */}
                      <td className="px-5 py-3.5">

                        <span
                          className="
                          inline-flex
                          items-center

                          px-3 py-1

                          rounded-full

                          bg-[#EEE8FF]

                          text-[#5B3FD6]

                          text-xs
                          font-semibold
                          "
                        >
                          {customer.loyaltyPoint || 0}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-3.5">

                        <div className="flex flex-col gap-1.5">

                          <span
                            className={`
                            inline-flex
                            items-center

                            w-fit

                            px-2.5 py-1

                            rounded-full

                            text-[11px]
                            font-medium

                            ${
                              customer.isKYCverifed
                                ? `
                                  bg-[#EAFBF2]
                                  text-[#36B37E]
                                `
                                : `
                                  bg-[#FFF4E5]
                                  text-[#F59E0B]
                                `
                            }
                            `}
                          >

                            {customer.isKYCverifed
                              ? "KYC Verified"
                              : "KYC Pending"}

                          </span>

                          <span
                            className={`
                            inline-flex
                            items-center

                            w-fit

                            px-2.5 py-1

                            rounded-full

                            text-[11px]
                            font-medium

                            ${
                              customer.isBlocked
                                ? `
                                  bg-[#FFEAF1]
                                  text-[#E05A74]
                                `
                                : `
                                  bg-[#E8F0FF]
                                  text-[#4F7CFF]
                                `
                            }
                            `}
                          >

                            {customer.isBlocked
                              ? "Blocked"
                              : "Active"}

                          </span>

                        </div>

                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-3.5">

                        <button
                          onClick={() =>
                            handleCustomerClick(customer)
                          }
                          className="
                          inline-flex
                          items-center gap-1

                          text-xs
                          font-semibold

                          text-[#5B3FD6]
                          hover:text-[#4C32C7]
                          hover:underline

                          transition-all duration-200
                          cursor-pointer
                          bg-transparent border-0
                          "
                        >
                          View Profile
                          <ChevronRight className="w-3.5 h-3.5" />

                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>



            {/* PAGINATION */}
            <div
              className="
              bg-[#FAF8FE]

              border-t border-[#E7DFF2]
              "
            >

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />

            </div>

          </>
        )}

      </div>

    </div>
  );
};

export default Customers;
