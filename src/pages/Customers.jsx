import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

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
  MapPin,
} from "lucide-react";

import toast from "react-hot-toast";

// import { CustomerContext } from "../Context/CustomerContext";

import CustomerDetails from "../components/CustomerDetails";

import Pagination from "../components/Reusable/Pagination";

import ExportButton from "../components/ExportButton";

import ImportButton from "../components/ImportButton";

import {
  getCurrentUserRole,
  ROLES,
} from "../utils/rbac";

import LoadingSpinner from "../components/Reusable/LoadingSpinner";

const Customers = () => {

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [resetSpinning, setResetSpinning] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState({
      block: null,
      kyc: null,
    });

  const [sortConfig, setSortConfig] =
    useState({
      key: null,
      direction: "asc",
    });

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

  /* =====================================================
      STATS
  ===================================================== */

  const totalCustomers =
    customersList.length;

  const kycVerified =
    customersList.filter(
      (c) => c.isKYCverifed
    ).length;

  const blockedUsers =
    customersList.filter(
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

    return customersList
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .filter((c) => {

        const fullName =
          `${c.firstName || ""} ${c.lastName || ""}`
            .trim()
            .toLowerCase();

        const matchesSearch =
          !q ||
          fullName.includes(q) ||
          c.phone?.toString().includes(q) ||
          c.email?.toLowerCase().includes(q);

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
    customersList,
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

  if (selectedCustomer) {

    return (
      <CustomerDetails
        customer={selectedCustomer}
        onBack={handleBackClick}
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

  return (
    <div
      className="
      min-h-screen
      bg-[#F8F5FC]

      p-5
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">

        <h1
          className="
          text-[28px]
          font-bold

          text-[#2B2340]
          "
        >
          Customers
        </h1>

        <p
          className="
          mt-1

          text-sm

          text-[#8E8AA2]
          "
        >
          Manage customers,
          loyalty activity,
          KYC verification
          and account status.
        </p>

      </div>



      {/* =================================================
          STATS
      ================================================= */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        gap-4

        mb-6
        "
      >

        {stats.map((stat, i) => (

          <button
            key={i}

            onClick={() =>
              setStatusFilter(stat.filter)
            }

            className={`
            bg-white/90
            backdrop-blur-md

            rounded-2xl

            border

            p-5

            flex items-center gap-4

            transition-all duration-200

            hover:-translate-y-1
            hover:shadow-md

            ${
              statusFilter === stat.filter
                ? "border-[#5B3FD6] ring-2 ring-[#E7DDF8]"
                : "border-[#E7DFF2]"
            }
            `}
          >

            <div
              className={`
              w-12 h-12

              rounded-2xl

              flex items-center justify-center

              ${stat.color}
              `}
            >
              <stat.icon className="w-5 h-5" />
            </div>

            <div className="text-left">

              <p
                className="
                text-[13px]

                text-[#8E8AA2]
                "
              >
                {stat.title}
              </p>

              <h3
                className="
                text-2xl
                font-bold

                text-[#2B2340]
                "
              >
                {stat.value}
              </h3>

            </div>

          </button>
        ))}

      </div>



      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div
        className="
        bg-white/90
        backdrop-blur-md

        rounded-2xl

        border border-[#E7DFF2]

        p-4

        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between

        gap-4

        mb-6
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

              onChange={(e) =>
                setSearchTerm(e.target.value)
              }

              className="
              w-full

              pl-10 pr-4 py-2.5

              rounded-xl

              border border-[#E7DFF2]

              bg-[#FAF8FE]

              text-sm

              outline-none

              focus:ring-2
              focus:ring-[#E7DDF8]

              transition-all
              "
            />

          </div>

          {/* FILTER */}
          <select
            value={statusFilter}

            onChange={(e) =>
              setStatusFilter(e.target.value)
            }

            className="
            px-4 py-2.5

            rounded-xl

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
            px-4 py-2.5

            rounded-xl

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
          />

          <ExportButton
            data={filteredCustomers}
            filename="customers"
          />

        </div>

      </div>



      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
        bg-white/90
        backdrop-blur-md

        rounded-2xl

        border border-[#E7DFF2]

        overflow-hidden
        "
      >

        {/* EMPTY */}
        {filteredCustomers.length === 0 ? (

          <div
            className="
            p-16
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
                      px-6 py-4

                      text-left

                      text-[11px]
                      font-semibold

                      uppercase

                      tracking-[0.12em]

                      text-[#8E8AA2]

                      cursor-pointer
                      "
                    >

                      <div className="flex items-center gap-2">

                        <head.icon className="w-4 h-4" />

                        <span>
                          {head.label}
                        </span>

                        {sortConfig.key ===
                          head.key && (

                          sortConfig.direction === "asc"
                            ? (
                              <ChevronUp className="w-4 h-4" />
                            )
                            : (
                              <ChevronDown className="w-4 h-4" />
                            )
                        )}

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
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          {customer.profileImage ? (
                            <img
                              src={customer.profileImage}

                              alt="profile"

                              className="
                              w-11 h-11

                              rounded-2xl

                              object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                              w-11 h-11

                              rounded-2xl

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
                      <td className="px-6 py-4">

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
                      <td className="px-6 py-4">

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
                      <td className="px-6 py-4">

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
                      <td className="px-6 py-4">

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
                      <td className="px-6 py-4">

                        <button
                          onClick={() =>
                            handleCustomerClick(customer)
                          }

                          className="
                          inline-flex
                          items-center gap-2

                          px-4 py-2

                          rounded-xl

                          bg-[#5B3FD6]
                          hover:bg-[#4C32C7]

                          text-white

                          text-xs
                          font-medium

                          transition-all duration-200
                          "
                        >

                          <ExternalLink className="w-3.5 h-3.5" />

                          View

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
