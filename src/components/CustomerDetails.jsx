import React, { useState } from "react";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Shield,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Send,
  FileText,
  Gift,
} from "lucide-react";

const presetReasons = [
  "Invalid PAN details",
  "Unclear Aadhaar image",
  "Incorrect bank details",
  "Invalid UPI ID",
  "Name mismatch between PAN and Bank",
];

const CustomerDetails = ({
  customer: initialCustomer,
  onBack,
  onBlockCustomer = () => {},
  onKYCAction = () => {},
  handleDocumentView = () => {},

  actionLoading = {
    block: null,
    kyc: null,
  },
}) => {

  const customer = initialCustomer;

  const notificationLoading = false;
  const pointsLoading = false;

  const [customMessage, setCustomMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [bonusAmount, setBonusAmount] =
    useState("");

  if (!customer) {
    return null;
  }

  /* =====================================================
      SEND NOTIFICATION
  ===================================================== */

  const handleSendNotification = async () => {

    if (!customMessage.trim()) {
      return;
    }

    setSending(true);

    setTimeout(() => {

      console.log(
        "Notification Sent:",
        customMessage
      );

      setCustomMessage("");

      setSending(false);

    }, 1000);
  };

  /* =====================================================
      BONUS
  ===================================================== */

  const handleGrantBonus = async () => {

    const amount = Number(bonusAmount);

    if (!amount || amount <= 0) {
      return;
    }

    console.log(
      "Granted Bonus:",
      amount
    );

    setBonusAmount("");
  };

  return (
    <div
      className="
      min-h-screen

      bg-[#F8F5FC]

      px-4
      sm:px-6
      lg:px-8

      py-5
      "
    >

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
          sticky top-0
          z-20

          pb-4

          bg-[#F8F5FC]/90
          backdrop-blur-md
          "
        >

          <div
            className="
            rounded-[28px]

            bg-[#5B3FD6]

            p-5

            shadow-sm
            "
          >

            <div
              className="
              flex flex-col
              xl:flex-row

              xl:items-center
              xl:justify-between

              gap-6
              "
            >

              {/* LEFT */}
              <div
                className="
                flex flex-col
                sm:flex-row

                sm:items-center

                gap-5
                "
              >

                {/* BACK */}
                <button
                  onClick={onBack}
                  className="
                  w-11 h-11

                  rounded-2xl

                  bg-white/15

                  flex items-center justify-center

                  hover:bg-white/20

                  transition-all duration-200
                  "
                >

                  <ArrowLeft className="w-5 h-5 text-white" />

                </button>



                {/* PROFILE */}
                <div className="flex items-center gap-4">

                  {/* IMAGE */}
                  {customer.profileImage ? (

                    <img
                      src={customer.profileImage}
                      alt="Profile"

                      className="
                      w-20 h-20

                      rounded-full

                      border-4 border-white

                      object-cover

                      shadow-md
                      "
                    />

                  ) : (

                    <div
                      className="
                      w-20 h-20

                      rounded-full

                      border-4 border-white

                      bg-white/20

                      flex items-center justify-center

                      text-white
                      text-2xl
                      font-bold
                      "
                    >
                      {customer.firstName?.[0]}
                    </div>
                  )}

                  {/* INFO */}
                  <div>

                    <h1
                      className="
                      text-2xl
                      font-bold

                      text-white
                      "
                    >
                      {customer.firstName}
                      {" "}
                      {customer.lastName}
                    </h1>

                    <p
                      className="
                      text-sm

                      text-[#E6DEFF]

                      mt-1
                      "
                    >
                      {customer.email}
                    </p>

                    {/* BADGES */}
                    <div
                      className="
                      flex flex-wrap

                      gap-2

                      mt-3
                      "
                    >

                      <span
                        className="
                        px-3 py-1

                        rounded-full

                        bg-white/20

                        text-white

                        text-xs
                        font-medium
                        "
                      >
                        {customer.loyaltyPoint || 0}
                        {" "}
                        Points
                      </span>

                      <span
                        className={`
                        px-3 py-1

                        rounded-full

                        text-xs
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
                        px-3 py-1

                        rounded-full

                        text-xs
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

                  </div>

                </div>

              </div>



              {/* RIGHT BUTTONS */}
              <div
                className="
                flex flex-wrap

                gap-3
                "
              >

                {/* BLOCK */}
                <button
                  onClick={() =>
                    onBlockCustomer(customer.uid)
                  }

                  disabled={
                    actionLoading.block === customer.uid
                  }

                  className={`
                  flex items-center gap-2

                  px-5 py-3

                  rounded-2xl

                  text-sm
                  font-semibold

                  transition-all duration-200

                  ${
                    customer.isBlocked
                      ? `
                        bg-[#36B37E]
                        hover:bg-[#2CA06F]
                        text-white
                      `
                      : `
                        bg-[#E05A74]
                        hover:bg-[#D84B66]
                        text-white
                      `
                  }
                  `}
                >

                  {actionLoading.block === customer.uid ? (

                    <Loader2
                      className="
                      w-4 h-4
                      animate-spin
                      "
                    />

                  ) : (

                    <Shield className="w-4 h-4" />

                  )}

                  {customer.isBlocked
                    ? "Unblock"
                    : "Block"}

                </button>



                {/* KYC */}
                <button
                  onClick={() =>
                    onKYCAction(customer.uid)
                  }

                  disabled={
                    actionLoading.kyc === customer.uid
                  }

                  className={`
                  flex items-center gap-2

                  px-5 py-3

                  rounded-2xl

                  text-sm
                  font-semibold

                  transition-all duration-200

                  ${
                    customer.isKYCverifed
                      ? `
                        bg-[#4F7CFF]
                        hover:bg-[#3D69E6]
                        text-white
                      `
                      : `
                        bg-white
                        hover:bg-[#F8F5FC]

                        text-[#5B3FD6]
                      `
                  }
                  `}
                >

                  {actionLoading.kyc === customer.uid ? (

                    <Loader2
                      className="
                      w-4 h-4
                      animate-spin
                      "
                    />

                  ) : (

                    <ShieldCheck className="w-4 h-4" />

                  )}

                  {customer.isKYCverifed
                    ? "Revoke KYC"
                    : "Verify KYC"}

                </button>

              </div>

            </div>

          </div>

        </header>



        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="space-y-6">

          {/* =================================================
              INFO SECTION
          ================================================= */}

          <section
            className="
            grid
            grid-cols-1
            xl:grid-cols-2

            gap-6
            "
          >

            {/* PERSONAL */}
            <div
              className="
              bg-white/90
              backdrop-blur-md

              rounded-[28px]

              border border-[#E7DFF2]

              p-6
              "
            >

              <h3
                className="
                flex items-center gap-2

                text-lg
                font-semibold

                text-[#2B2340]

                mb-5
                "
              >

                <User className="w-5 h-5 text-[#5B3FD6]" />

                Personal Information

              </h3>

              <div className="space-y-4">

                <div className="flex items-start gap-3">

                  <Phone className="w-4 h-4 text-[#8E8AA2] mt-1" />

                  <div>

                    <p
                      className="
                      text-xs

                      text-[#8E8AA2]
                      "
                    >
                      Phone
                    </p>

                    <p
                      className="
                      text-sm
                      font-medium

                      text-[#2B2340]
                      "
                    >
                      {customer.phone || "Not Provided"}
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <Mail className="w-4 h-4 text-[#8E8AA2] mt-1" />

                  <div>

                    <p
                      className="
                      text-xs

                      text-[#8E8AA2]
                      "
                    >
                      Email
                    </p>

                    <p
                      className="
                      text-sm
                      font-medium

                      text-[#2B2340]
                      "
                    >
                      {customer.email || "Not Provided"}
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <MapPin className="w-4 h-4 text-[#8E8AA2] mt-1" />

                  <div>

                    <p
                      className="
                      text-xs

                      text-[#8E8AA2]
                      "
                    >
                      Location
                    </p>

                    <p
                      className="
                      text-sm
                      font-medium

                      text-[#2B2340]
                      "
                    >
                      {customer.district || "N/A"},
                      {" "}
                      {customer.state || "N/A"}
                    </p>

                  </div>

                </div>

              </div>

            </div>



            {/* BANK */}
            <div
              className="
              bg-white/90
              backdrop-blur-md

              rounded-[28px]

              border border-[#E7DFF2]

              p-6
              "
            >

              <h3
                className="
                flex items-center gap-2

                text-lg
                font-semibold

                text-[#2B2340]

                mb-5
                "
              >

                <CreditCard className="w-5 h-5 text-[#5B3FD6]" />

                Bank & UPI Information

              </h3>

              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2

                gap-4
                "
              >

                {[
                  {
                    label: "Account Holder",
                    value:
                      customer.bankDetails?.accountHolder,
                  },

                  {
                    label: "Account Type",
                    value:
                      customer.bankDetails?.accountType,
                  },

                  {
                    label: "Account Number",
                    value:
                      customer.bankDetails?.accountNumber,
                  },

                  {
                    label: "Bank Name",
                    value:
                      customer.bankDetails?.bankName,
                  },

                  {
                    label: "IFSC Code",
                    value:
                      customer.bankDetails?.ifscCode,
                  },

                  {
                    label: "UPI ID",
                    value:
                      customer.upiId,
                  },
                ].map((item, i) => (

                  <div key={i}>

                    <p
                      className="
                      text-xs

                      text-[#8E8AA2]

                      mb-1
                      "
                    >
                      {item.label}
                    </p>

                    <p
                      className="
                      text-sm
                      font-medium

                      text-[#2B2340]
                      "
                    >
                      {item.value || "Not Provided"}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </section>



          {/* =================================================
              KYC DOCUMENTS
          ================================================= */}

          <section
            className="
            bg-white/90
            backdrop-blur-md

            rounded-[28px]

            border border-[#E7DFF2]

            p-6
            "
          >

            <h3
              className="
              flex items-center gap-2

              text-lg
              font-semibold

              text-[#2B2340]

              mb-6
              "
            >

              <FileText className="w-5 h-5 text-[#5B3FD6]" />

              KYC Documents

            </h3>



            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3

              gap-5
              "
            >

              {[
                {
                  title: "Aadhaar Front",
                  image:
                    customer.aadhaarCardFrontImage,
                },

                {
                  title: "Aadhaar Back",
                  image:
                    customer.aadhaarCardBackImage,
                },

                {
                  title: "PAN Card",
                  image:
                    customer.panCardImage,
                },
              ].map((doc, i) => (

                <div
                  key={i}

                  className="
                  border border-[#E7DFF2]

                  rounded-2xl

                  overflow-hidden

                  bg-[#FAF8FE]
                  "
                >

                  <div
                    className="
                    h-44

                    flex items-center justify-center

                    bg-[#F3EEFD]
                    "
                  >

                    {doc.image ? (

                      <img
                        src={doc.image}
                        alt={doc.title}

                        className="
                        w-full h-full

                        object-cover
                        "
                      />

                    ) : (

                      <p
                        className="
                        text-sm

                        text-[#AAA2BE]
                        "
                      >
                        No Document
                      </p>

                    )}

                  </div>

                  <div className="p-4">

                    <div
                      className="
                      flex items-center justify-between
                      "
                    >

                      <p
                        className="
                        text-sm
                        font-medium

                        text-[#2B2340]
                        "
                      >
                        {doc.title}
                      </p>

                      {doc.image && (

                        <button
                          onClick={() =>
                            handleDocumentView(doc.image)
                          }

                          className="
                          flex items-center gap-1

                          text-xs

                          text-[#5B3FD6]

                          hover:underline
                          "
                        >

                          <ExternalLink className="w-3 h-3" />

                          View

                        </button>

                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>



          {/* =================================================
              ACTION SECTION
          ================================================= */}

          <section
            className="
            grid
            grid-cols-1
            xl:grid-cols-2

            gap-6
            "
          >

            {/* BONUS */}
            <div
              className="
              bg-white/90
              backdrop-blur-md

              rounded-[28px]

              border border-[#E7DFF2]

              p-6
              "
            >

              <h3
                className="
                flex items-center gap-2

                text-lg
                font-semibold

                text-[#2B2340]

                mb-5
                "
              >

                <Gift className="w-5 h-5 text-[#5B3FD6]" />

                Grant Bonus Points

              </h3>

              <div className="space-y-4">

                <input
                  type="number"

                  min="1"

                  value={bonusAmount}

                  onChange={(e) =>
                    setBonusAmount(e.target.value)
                  }

                  placeholder="Enter points"

                  className="
                  w-full

                  px-4 py-3

                  rounded-2xl

                  border border-[#E7DFF2]

                  bg-[#FAF8FE]

                  outline-none

                  focus:ring-2
                  focus:ring-[#E7DDF8]
                  "
                />

                <button
                  onClick={handleGrantBonus}

                  disabled={
                    pointsLoading === customer.uid
                  }

                  className="
                  w-full

                  flex items-center justify-center gap-2

                  py-3

                  rounded-2xl

                  bg-[#36B37E]
                  hover:bg-[#2CA06F]

                  text-white

                  font-semibold

                  transition-all duration-200
                  "
                >

                  {pointsLoading === customer.uid ? (

                    <Loader2
                      className="
                      w-4 h-4
                      animate-spin
                      "
                    />

                  ) : (

                    <Gift className="w-4 h-4" />

                  )}

                  Grant Bonus

                </button>

              </div>

            </div>



            {/* NOTIFICATION */}
            <div
              className="
              bg-white/90
              backdrop-blur-md

              rounded-[28px]

              border border-[#E7DFF2]

              p-6
              "
            >

              <h3
                className="
                flex items-center gap-2

                text-lg
                font-semibold

                text-[#2B2340]

                mb-5
                "
              >

                <Send className="w-5 h-5 text-[#5B3FD6]" />

                Send Notification

              </h3>

              {/* QUICK REASONS */}
              <div
                className="
                flex flex-wrap

                gap-2

                mb-4
                "
              >

                {presetReasons.map((reason, i) => (

                  <button
                    key={i}

                    onClick={() =>
                      setCustomMessage(reason)
                    }

                    className="
                    px-3 py-1.5

                    rounded-full

                    bg-[#F3EEFD]

                    border border-[#E7DFF2]

                    text-xs

                    text-[#5B3FD6]

                    hover:bg-[#EEE8FF]

                    transition-all duration-200
                    "
                  >
                    {reason}
                  </button>
                ))}

              </div>

              {/* TEXTAREA */}
              <textarea
                rows="5"

                value={customMessage}

                onChange={(e) =>
                  setCustomMessage(e.target.value)
                }

                placeholder="Write your message..."

                className="
                w-full

                px-4 py-3

                rounded-2xl

                border border-[#E7DFF2]

                bg-[#FAF8FE]

                outline-none

                resize-none

                focus:ring-2
                focus:ring-[#E7DDF8]
                "
              />

              {/* BUTTON */}
              <button
                onClick={handleSendNotification}

                disabled={
                  sending ||
                  notificationLoading === customer.uid
                }

                className="
                mt-4

                w-full

                flex items-center justify-center gap-2

                py-3

                rounded-2xl

                bg-[#5B3FD6]
                hover:bg-[#4C32C7]

                text-white

                font-semibold

                transition-all duration-200
                "
              >

                {sending ? (

                  <Loader2
                    className="
                    w-4 h-4
                    animate-spin
                    "
                  />

                ) : (

                  <Send className="w-4 h-4" />

                )}

                {sending
                  ? "Sending..."
                  : "Send Notification"}

              </button>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default CustomerDetails;