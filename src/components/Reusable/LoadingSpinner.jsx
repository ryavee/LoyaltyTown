import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  centered = false,
  message = "Loading...",
}) => {

  return (
    <div
      className={`
      flex flex-col items-center justify-center gap-3

      ${
        centered
          ? "min-h-[300px]"
          : ""
      }
      `}
    >

      {/* Spinner */}
      <div
        className="
        w-12 h-12

        rounded-2xl

        bg-[#EEE8FF]

        flex items-center justify-center
        "
      >

        <Loader2
          className="
          w-6 h-6

          text-[#5B3FD6]

          animate-spin
          "
        />

      </div>

      {/* Message */}
      <p
        className="
        text-sm

        text-[#8E8AA2]

        font-medium
        "
      >
        {message}
      </p>

    </div>
  );
};

export default LoadingSpinner;