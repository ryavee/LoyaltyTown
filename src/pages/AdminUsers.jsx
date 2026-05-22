import React, {
  useState,
  useMemo,
} from "react";

import {
  Plus,
  Search,
  User,
  Phone,
  Shield,
  CheckCircle,
  Calendar,
  MoreVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";



/* =========================================================
   DUMMY USERS
========================================================= */

const dummyUsers = [
  {
    uid: "1",
    firstName: "Ravi",
    lastName: "Raj",
    email: "ravi@cetrak.com",
    phone: "9876543210",
    role: "Super Admin",
    isUserInActive: false,
    createdAt: "12 Jan 2026",
  },

  {
    uid: "2",
    firstName: "Aman",
    lastName: "Kumar",
    email: "aman@cetrak.com",
    phone: "9999999999",
    role: "Admin",
    isUserInActive: false,
    createdAt: "15 Jan 2026",
  },

  {
    uid: "3",
    firstName: "Neha",
    lastName: "Singh",
    email: "neha@cetrak.com",
    phone: "8888888888",
    role: "QR Generate",
    isUserInActive: true,
    createdAt: "20 Jan 2026",
  },
];



/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "Active":
        return "bg-[#E7F8EE] text-[#22A861]";

      case "Inactive":
        return "bg-[#FDEBEC] text-[#E05A74]";

      default:
        return "bg-[#F4EEFD] text-[#8E8AA2]";
    }
  };

  return (
    <span
      className={`
      px-2.5 py-1
      rounded-full
      text-[11px]
      font-medium
      ${getStatusColor()}
      `}
    >
      {status}
    </span>
  );
};



/* =========================================================
   ROLE BADGE
========================================================= */

const RoleBadge = ({ role }) => {
  const getRoleColor = () => {
    switch (role) {
      case "Super Admin":
        return "bg-[#EEE8FF] text-[#5B3FD6]";

      case "Admin":
        return "bg-[#F4EEFD] text-[#7B61E8]";

      case "QR Generate":
        return "bg-[#E8F7FF] text-[#2E90C9]";

      default:
        return "bg-[#F4EEFD] text-[#8E8AA2]";
    }
  };

  return (
    <span
      className={`
      px-2.5 py-1
      rounded-full
      text-[11px]
      font-medium
      ${getRoleColor()}
      `}
    >
      {role}
    </span>
  );
};



/* =========================================================
   COMPONENT
========================================================= */

const AdminUsers = () => {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("All");

  const [sortConfig, setSortConfig] =
    useState({
      key: null,
      direction: "asc",
    });



  /* =========================================================
     FILTER USERS
  ========================================================= */

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      user.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      user.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });



  /* =========================================================
     SORT USERS
  ========================================================= */

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];

    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc"
            ? -1
            : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === "asc"
            ? 1
            : -1;
        }

        return 0;
      });
    }

    return sortableUsers;
  }, [filteredUsers, sortConfig]);



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



  return (
    <div className="min-h-screen bg-[#F8F5FC] p-5">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-7">

          <h1
            className="
            text-[28px]
            font-bold
            text-[#2B2340]
            "
          >
            Admin Users
          </h1>

          <p
            className="
            text-sm
            text-[#8E8AA2]
            mt-1
            "
          >
            Manage admin accounts and permissions.
          </p>

        </div>



        {/* =====================================================
            CONTROLS
        ===================================================== */}

        <div
          className="
          flex flex-col lg:flex-row
          lg:items-center lg:justify-between
          gap-4 mb-6
          "
        >

          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-3">

            {/* SEARCH */}
            <div className="relative w-[300px]">

              <Search
                className="
                absolute left-3 top-2.5
                w-4 h-4
                text-[#8E8AA2]
                "
              />

              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="
                w-full
                pl-10 pr-4 py-2.5
                rounded-xl
                border border-[#E9E2F3]
                bg-white
                text-sm
                outline-none
                focus:ring-2 focus:ring-[#5B3FD6]
                "
              />
            </div>



            {/* FILTER */}
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="
              px-3 py-2.5
              rounded-xl
              border border-[#E9E2F3]
              bg-white
              text-sm
              outline-none
              focus:ring-2 focus:ring-[#5B3FD6]
              "
            >
              <option value="All">
                All Roles
              </option>

              <option value="Super Admin">
                Super Admin
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="QR Generate">
                QR Generate
              </option>

            </select>

          </div>



          {/* RIGHT */}
          <button
            className="
            flex items-center gap-2
            px-4 py-2.5
            rounded-xl
            bg-[#5B3FD6]
            hover:bg-[#4B30C5]
            text-white
            text-sm
            font-medium
            transition-all
            "
          >
            <Plus className="w-4 h-4" />

            Add User
          </button>

        </div>



        {/* =====================================================
            TABLE
        ===================================================== */}

        <div
          className="
          bg-white
          rounded-[24px]
          border border-[#E9E2F3]
          overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table className="min-w-full">

              {/* =================================================
                  TABLE HEAD
              ================================================= */}

              <thead
                className="
                bg-[#F8F5FC]
                border-b border-[#E9E2F3]
                "
              >

                <tr>

                  {[
                    {
                      label: "User",
                      Icon: User,
                      sortKey: "firstName",
                    },

                    {
                      label: "Contact",
                      Icon: Phone,
                      sortKey: "phone",
                    },

                    {
                      label: "Role",
                      Icon: Shield,
                      sortKey: "role",
                    },

                    {
                      label: "Status",
                      Icon: CheckCircle,
                      sortKey: "isUserInActive",
                    },

                    {
                      label: "Joined On",
                      Icon: Calendar,
                      sortKey: "createdAt",
                    },

                    {
                      label: "Action",
                      Icon: MoreVertical,
                      sortKey: null,
                    },

                  ].map(
                    ({
                      label,
                      Icon,
                      sortKey,
                    }) => (
                      <th
                        key={label}
                        onClick={() =>
                          sortKey &&
                          requestSort(sortKey)
                        }
                        className="
                        px-6 py-4
                        text-left
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-[#8E8AA2]
                        "
                      >

                        <div className="flex items-center gap-1.5">

                          <Icon className="w-4 h-4" />

                          <span>{label}</span>

                          {sortKey &&
                            sortConfig.key === sortKey && (
                              <>
                                {sortConfig.direction ===
                                "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </>
                            )}

                        </div>

                      </th>
                    )
                  )}

                </tr>

              </thead>



              {/* =================================================
                  TABLE BODY
              ================================================= */}

              <tbody>

                {sortedUsers.map((user) => (
                  <tr
                    key={user.uid}
                    className="
                    border-b border-[#F3EDF9]
                    hover:bg-[#F4EEFD]
                    transition-all
                    "
                  >

                    {/* USER */}
                    <td className="px-6 py-4">

                      <div
                        className="
                        text-sm
                        font-medium
                        text-[#2B2340]
                        "
                      >
                        {user.firstName} {user.lastName}
                      </div>

                      <div
                        className="
                        text-xs
                        text-[#8E8AA2]
                        mt-1
                        "
                      >
                        {user.email}
                      </div>

                    </td>



                    {/* PHONE */}
                    <td
                      className="
                      px-6 py-4
                      text-sm
                      text-[#5B5875]
                      "
                    >
                      {user.phone}
                    </td>



                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>



                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <StatusBadge
                        status={
                          user.isUserInActive
                            ? "Inactive"
                            : "Active"
                        }
                      />

                    </td>



                    {/* DATE */}
                    <td
                      className="
                      px-6 py-4
                      text-sm
                      text-[#5B5875]
                      "
                    >
                      {user.createdAt}
                    </td>



                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <button
                        className="
                        px-3 py-1.5
                        rounded-lg
                        bg-[#F4EEFD]
                        text-[#5B3FD6]
                        text-xs
                        font-medium
                        hover:bg-[#E9E0F4]
                        transition-all
                        "
                      >
                        View
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;