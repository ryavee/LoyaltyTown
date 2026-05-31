import React from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems = null,
}) => {

  if (totalPages < 1) {

    return (
      <div
        className="
        flex items-center justify-center

        py-6

        text-sm

        text-[#8E8AA2]
        "
      >
        No records to display.
      </div>
    );
  }

  /* =====================================================
      BUILD PAGE ARRAY
  ===================================================== */

  const buildPages = () => {

    const pages = [];

    const maxVisible = 5;

    let start = Math.max(
      1,
      currentPage - 2
    );

    let end = Math.min(
      totalPages,
      start + maxVisible - 1
    );

    if (end - start < maxVisible - 1) {

      start = Math.max(
        1,
        end - maxVisible + 1
      );
    }

    if (start > 1) {

      pages.push(1);

      if (start > 2) {
        pages.push("start-ellipsis");
      }
    }

    for (
      let p = start;
      p <= end;
      p++
    ) {
      pages.push(p);
    }

    if (end < totalPages) {

      if (end < totalPages - 1) {
        pages.push("end-ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = buildPages();

  /* =====================================================
      RANGE
  ===================================================== */

  const firstItemIndex =
    (currentPage - 1) * pageSize + 1;

  const lastItemIndex = Math.min(
    totalItems ??
      currentPage * pageSize,

    (currentPage - 1) * pageSize +
      pageSize
  );

  return (
    <div
      className="
      flex flex-col
      lg:flex-row

      lg:items-center
      lg:justify-between

      gap-4

      px-5 py-4

      bg-[#FAF8FE]

      border-t border-[#E7DFF2]
      "
    >

      {/* =================================================
          LEFT SECTION
      ================================================= */}

      <div
        className="
        flex flex-col
        sm:flex-row

        sm:items-center

        gap-3

        text-sm
        "
      >

        {/* ROWS */}
        <div className="flex items-center gap-2">

          <span className="text-[#8E8AA2]">
            Rows:
          </span>

          <select
            value={pageSize}

            onChange={(e) =>
              onPageSizeChange(
                Number(e.target.value)
              )
            }

            className="
            px-3 py-2

            rounded-xl

            border border-[#E7DFF2]

            bg-white

            text-sm

            text-[#2B2340]

            outline-none

            focus:ring-2
            focus:ring-[#E7DDF8]
            "
          >

            {[5, 10, 20, 30, 50].map(
              (size) => (
                <option
                  key={size}
                  value={size}
                >
                  {size}
                </option>
              )
            )}

          </select>

        </div>

        {/* RANGE */}
        {totalItems != null && (

          <div
            className="
            text-[#8E8AA2]

            text-sm
            "
          >

            Showing
            {" "}

            <span
              className="
              font-semibold
              text-[#2B2340]
              "
            >
              {firstItemIndex}
            </span>

            {" "}–{" "}

            <span
              className="
              font-semibold
              text-[#2B2340]
              "
            >
              {lastItemIndex}
            </span>

            {" "}of{" "}

            <span
              className="
              font-semibold
              text-[#2B2340]
              "
            >
              {totalItems}
            </span>

          </div>
        )}

      </div>



      {/* =================================================
          PAGINATION BUTTONS
      ================================================= */}

      <div
        className="
        flex items-center

        gap-1.5
        "
      >

        {/* FIRST */}
        <button
          onClick={() =>
            onPageChange(1)
          }

          disabled={currentPage === 1}

          className={`
          w-9 h-9

          rounded-xl

          flex items-center justify-center

          transition-all duration-200

          ${
            currentPage === 1
              ? `
                opacity-40
                cursor-not-allowed
                bg-white
              `
              : `
                bg-white
                hover:bg-[#EEE8FF]
              `
          }
          `}
        >

          <ChevronsLeft
            className="
            w-4 h-4

            text-[#5B3FD6]
            "
          />

        </button>



        {/* PREVIOUS */}
        <button
          onClick={() =>
            onPageChange(currentPage - 1)
          }

          disabled={currentPage === 1}

          className={`
          w-9 h-9

          rounded-xl

          flex items-center justify-center

          transition-all duration-200

          ${
            currentPage === 1
              ? `
                opacity-40
                cursor-not-allowed
                bg-white
              `
              : `
                bg-white
                hover:bg-[#EEE8FF]
              `
          }
          `}
        >

          <ChevronLeft
            className="
            w-4 h-4

            text-[#5B3FD6]
            "
          />

        </button>



        {/* PAGE NUMBERS */}
        {pages.map((p, i) =>

          p === "start-ellipsis" ||
          p === "end-ellipsis" ? (

            <span
              key={p + i}

              className="
              px-2

              text-[#AAA2BE]
              "
            >
              …
            </span>

          ) : (

            <button
              key={p}

              onClick={() =>
                onPageChange(p)
              }

              className={`
              min-w-[36px]
              h-9

              px-3

              rounded-xl

              text-sm
              font-semibold

              transition-all duration-200

              ${
                p === currentPage
                  ? `
                    bg-[#5B3FD6]
                    text-white
                    shadow-sm
                  `
                  : `
                    bg-white
                    text-[#2B2340]

                    hover:bg-[#EEE8FF]
                  `
              }
              `}
            >
              {p}
            </button>
          )
        )}



        {/* NEXT */}
        <button
          onClick={() =>
            onPageChange(currentPage + 1)
          }

          disabled={
            currentPage === totalPages
          }

          className={`
          w-9 h-9

          rounded-xl

          flex items-center justify-center

          transition-all duration-200

          ${
            currentPage === totalPages
              ? `
                opacity-40
                cursor-not-allowed
                bg-white
              `
              : `
                bg-white
                hover:bg-[#EEE8FF]
              `
          }
          `}
        >

          <ChevronRight
            className="
            w-4 h-4

            text-[#5B3FD6]
            "
          />

        </button>



        {/* LAST */}
        <button
          onClick={() =>
            onPageChange(totalPages)
          }

          disabled={
            currentPage === totalPages
          }

          className={`
          w-9 h-9

          rounded-xl

          flex items-center justify-center

          transition-all duration-200

          ${
            currentPage === totalPages
              ? `
                opacity-40
                cursor-not-allowed
                bg-white
              `
              : `
                bg-white
                hover:bg-[#EEE8FF]
              `
          }
          `}
        >

          <ChevronsRight
            className="
            w-4 h-4

            text-[#5B3FD6]
            "
          />

        </button>

      </div>



      {/* =================================================
          PAGE INFO
      ================================================= */}

      <div
        className="
        text-sm

        text-[#8E8AA2]
        "
      >

        Page
        {" "}

        <span
          className="
          font-semibold
          text-[#2B2340]
          "
        >
          {currentPage}
        </span>

        {" "}of{" "}

        <span
          className="
          font-semibold
          text-[#2B2340]
          "
        >
          {totalPages}
        </span>

      </div>

    </div>
  );
};

export default Pagination;