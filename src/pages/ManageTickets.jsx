import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Hash,
  Paperclip,
  Phone,
  RefreshCw,
  Search,
  Ticket,
  User,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../Components/Reusable/LoadingSpinner";

const initialTickets = [
  {
    ticketId: "TKT1001",
    subject: "Points not credited after QR scan",
    message:
      "Customer scanned a cement bag QR code yesterday but loyalty points are still not showing in the wallet.",
    userName: "Amit Sharma",
    userPhone: "+91 98765 43210",
    createdAt: "2026-05-30T10:35:00",
    status: "P",
    attachement: "https://example.com/scan-proof.jpg",
  },
  {
    ticketId: "TKT1002",
    subject: "Unable to redeem gift voucher",
    message:
      "The customer has enough points but the voucher redemption button remains disabled in the app.",
    userName: "Priya Nair",
    userPhone: "+91 91234 56780",
    createdAt: "2026-05-29T16:20:00",
    status: "P",
    attachement: null,
  },
  {
    ticketId: "TKT1003",
    subject: "Dealer entered wrong mobile number",
    message:
      "Dealer created the customer account with an incorrect mobile number and wants it corrected.",
    userName: "Rahul Verma",
    userPhone: "+91 99887 76655",
    createdAt: "2026-05-28T12:10:00",
    status: "C",
    attachement: null,
  },
  {
    ticketId: "TKT1004",
    subject: "Duplicate claim request",
    message:
      "The same QR code was submitted multiple times from different devices and needs verification.",
    userName: "Neha Singh",
    userPhone: "+91 90000 11122",
    createdAt: "2026-05-27T09:45:00",
    status: "R",
    attachement: "https://example.com/duplicate-proof.pdf",
  },
];

const statusConfig = {
  P: {
    label: "Pending",
    icon: Clock,
    badge: "bg-[#FFF4E5] text-[#F59E0B] border-[#F7D79B]",
    card: "bg-[#FFF8EA] text-[#F59E0B]",
    active: "border-[#F59E0B] ring-[#FFF0D0]",
  },
  C: {
    label: "Completed",
    icon: CheckCircle,
    badge: "bg-[#EAFBF2] text-[#36B37E] border-[#BDEBD4]",
    card: "bg-[#EAFBF2] text-[#36B37E]",
    active: "border-[#36B37E] ring-[#D9F6E8]",
  },
  R: {
    label: "Rejected",
    icon: XCircle,
    badge: "bg-[#FFEAF1] text-[#E05A74] border-[#FFD1DD]",
    card: "bg-[#FFEAF1] text-[#E05A74]",
    active: "border-[#E05A74] ring-[#FFE1EA]",
  },
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ManageTickets = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [activeFilter, setActiveFilter] = useState("P");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingTicket, setUpdatingTicket] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const statusCounts = useMemo(
    () => ({
      P: tickets.filter((ticketItem) => ticketItem.status === "P").length,
      C: tickets.filter((ticketItem) => ticketItem.status === "C").length,
      R: tickets.filter((ticketItem) => ticketItem.status === "R").length,
    }),
    [tickets]
  );

  const searchedTickets = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return tickets
      .filter((ticketItem) => ticketItem.status === activeFilter)
      .filter((ticketItem) => {
        if (!q) return true;

        return [
          ticketItem.ticketId,
          ticketItem.subject,
          ticketItem.message,
          ticketItem.userName,
          ticketItem.userPhone,
        ].some((value) => value?.toString().toLowerCase().includes(q));
      });
  }, [tickets, activeFilter, searchTerm]);

  const handleStatusChange = (ticketId, newStatus) => {
    const currentTicket = tickets.find(
      (ticketItem) => ticketItem.ticketId === ticketId
    );

    if (!currentTicket || currentTicket.status === newStatus) return;

    setUpdatingTicket(ticketId);

    setTimeout(() => {
      setTickets((currentTickets) =>
        currentTickets.map((ticketItem) =>
          ticketItem.ticketId === ticketId
            ? { ...ticketItem, status: newStatus }
            : ticketItem
        )
      );
      setUpdatingTicket(null);
      toast.success("Ticket status updated");
    }, 350);
  };

  const handleViewAttachment = (attachment) => {
    if (!attachment) return;

    if (typeof attachment === "string" && attachment.startsWith("http")) {
      window.open(attachment, "_blank", "noopener,noreferrer");
      return;
    }

    toast("Attachment preview will be connected with the backend file API.");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Tickets refreshed");
    }, 450);
  };

  const activeStatus = statusConfig[activeFilter];
  const ActiveIcon = activeStatus.icon;

  if (isRefreshing && tickets.length === 0) {
    return <LoadingSpinner centered message="Loading tickets..." />;
  }

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EEE8FF] px-4 py-2 text-sm font-medium text-[#5B3FD6] transition-all hover:bg-[#E7DDF8] disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {Object.entries(statusConfig).map(([status, config]) => {
          const StatusIcon = config.icon;
          const isActive = activeFilter === status;

          return (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`rounded-xl border bg-white/95 px-4 py-3.5 text-left shadow-[0_1px_2px_rgba(43,35,64,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                isActive
                  ? `${config.active} ring-2`
                  : "border-[#E7DFF2] ring-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] leading-4 text-[#8E8AA2]">
                    {config.label}
                  </p>
                  <h3 className="text-xl font-bold leading-6 text-[#2B2340]">
                    {statusCounts[status]}
                  </h3>
                </div>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.card}`}
                >
                  <StatusIcon className="h-4 w-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E7DFF2] bg-white/95 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="flex flex-col gap-3 border-b border-[#E7DFF2] bg-[#FAF8FE] p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${activeStatus.card}`}
            >
              <ActiveIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-[#2B2340]">
                {activeStatus.label} Tickets
              </h2>
              <p className="text-xs text-[#8E8AA2]">
                {searchedTickets.length} ticket
                {searchedTickets.length === 1 ? "" : "s"} found
              </p>
            </div>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAA2BE]" />
            <input
              type="text"
              placeholder="Search ticket, user, phone or message..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-[#E7DFF2] bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-[#E7DDF8]"
            />
          </div>
        </div>

        {searchedTickets.length > 0 ? (
          <div className="divide-y divide-[#F2ECFA]">
            {searchedTickets.map((ticketItem) => {
              const config = statusConfig[ticketItem.status];
              const StatusIcon = config.icon;
              const isUpdating = updatingTicket === ticketItem.ticketId;
              const hasAttachment = !!ticketItem.attachement;

              return (
                <div
                  key={ticketItem.ticketId}
                  className={`p-4 transition-colors hover:bg-[#FAF8FE] ${
                    isUpdating ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${config.badge}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {config.label}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#EEE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#5B3FD6]">
                          <Hash className="h-3.5 w-3.5" />
                          {ticketItem.ticketId}
                        </span>
                        {hasAttachment && (
                          <button
                            onClick={() =>
                              handleViewAttachment(ticketItem.attachement)
                            }
                            className="inline-flex items-center gap-1 rounded-full bg-[#E8F0FF] px-2.5 py-1 text-[11px] font-semibold text-[#4F7CFF] hover:bg-[#DDE8FF]"
                          >
                            <Paperclip className="h-3.5 w-3.5" />
                            View Attachment
                          </button>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold text-[#2B2340]">
                        {ticketItem.subject}
                      </h3>
                      <p className="mt-1 max-w-4xl text-sm leading-6 text-[#5B5875]">
                        {ticketItem.message}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#8E8AA2]">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          {ticketItem.userName}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-4 w-4" />
                          {ticketItem.userPhone}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {formatDate(ticketItem.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="w-full shrink-0 xl:w-44">
                      <label className="mb-1.5 block text-xs font-semibold text-[#7C7297]">
                        Change Status
                      </label>
                      <div className="relative">
                        <select
                          value={ticketItem.status}
                          onChange={(event) =>
                            handleStatusChange(
                              ticketItem.ticketId,
                              event.target.value
                            )
                          }
                          disabled={isUpdating}
                          className="w-full rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] px-3 py-2 text-sm text-[#2B2340] outline-none focus:ring-2 focus:ring-[#E7DDF8] disabled:opacity-60"
                        >
                          <option value="P">Pending</option>
                          <option value="C">Completed</option>
                          <option value="R">Rejected</option>
                        </select>
                        {isUpdating && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2">
                            <RefreshCw className="h-4 w-4 animate-spin text-[#5B3FD6]" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            {searchTerm ? (
              <Search className="mx-auto mb-3 h-10 w-10 text-[#AAA2BE]" />
            ) : (
              <Ticket className="mx-auto mb-3 h-10 w-10 text-[#AAA2BE]" />
            )}
            <h3 className="text-base font-semibold text-[#2B2340]">
              {searchTerm ? "No results found" : "No tickets found"}
            </h3>
            <p className="mt-1 text-sm text-[#8E8AA2]">
              {searchTerm
                ? "Try another ticket ID, customer name, phone, or message."
                : `There are no ${activeStatus.label.toLowerCase()} tickets right now.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
