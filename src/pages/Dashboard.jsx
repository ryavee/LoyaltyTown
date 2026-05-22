import {
  Users,
  Building2,
  QrCode,
  TrendingUp,
  CheckCircle,
  Wallet,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";



/* =========================================================
   DUMMY DATA
========================================================= */

const stats = [
  {
    title: "Total Customers",
    value: "12,540",
    icon: Users,
    color: "#5B3FD6",
    bg: "#EEE8FF",
  },

  {
    title: "Total Dealers",
    value: "1,240",
    icon: Building2,
    color: "#7B61E8",
    bg: "#F4EEFD",
  },

  {
    title: "QR Generated",
    value: "82,400",
    icon: QrCode,
    color: "#2E90C9",
    bg: "#E8F7FF",
  },

  {
    title: "Points Redeemed",
    value: "4.2M",
    icon: Wallet,
    color: "#22A861",
    bg: "#E7F8EE",
  },
];



const pointsTrendData = [
  { month: "Jan", earned: 4000, redeemed: 2400 },
  { month: "Feb", earned: 3000, redeemed: 1398 },
  { month: "Mar", earned: 5000, redeemed: 3800 },
  { month: "Apr", earned: 4780, redeemed: 2908 },
  { month: "May", earned: 5890, redeemed: 3800 },
  { month: "Jun", earned: 6390, redeemed: 4300 },
];



const qrStatusData = [
  {
    name: "Generated",
    value: 65,
    color: "#5B3FD6",
  },

  {
    name: "Scanned",
    value: 25,
    color: "#22A861",
  },

  {
    name: "Pending",
    value: 10,
    color: "#F59E0B",
  },
];



const topProducts = [
  {
    product: "Premium Board",
    category: "Plywood",
    scans: 5420,
  },

  {
    product: "Classic Laminate",
    category: "Laminate",
    scans: 4300,
  },

  {
    product: "Wood Adhesive",
    category: "Chemical",
    scans: 3900,
  },

  {
    product: "Luxury Panel",
    category: "Panel",
    scans: 3100,
  },
];



/* =========================================================
   COMPONENT
========================================================= */

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8F5FC] p-5">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div>

          <h1
            className="
            text-3xl
            font-bold
            text-[#2B2340]
            "
          >
            Dashboard Overview
          </h1>

          <p
            className="
            mt-1
            text-sm
            text-[#8E8AA2]
            "
          >
            Monitor reward activities, QR scans,
            dealers and customer engagement.
          </p>

        </div>



        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
          "
        >

          {stats.map((item, index) => (
            <div
              key={index}
              className="
              bg-white
              rounded-[24px]
              border border-[#E9E2F3]
              p-5
              shadow-sm
              hover:shadow-md
              transition-all
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className="
                    text-sm
                    text-[#8E8AA2]
                    "
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    text-[#2B2340]
                    "
                  >
                    {item.value}
                  </h2>

                </div>

                <div
                  className="
                  w-14 h-14
                  rounded-2xl
                  flex items-center justify-center
                  "
                  style={{
                    background: item.bg,
                  }}
                >
                  <item.icon
                    className="w-7 h-7"
                    style={{
                      color: item.color,
                    }}
                  />
                </div>

              </div>

              {/* MINI TREND */}
              <div className="h-14 mt-4">

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart
                    data={[
                      { value: 20 },
                      { value: 35 },
                      { value: 25 },
                      { value: 40 },
                      { value: 32 },
                      { value: 55 },
                    ]}
                  >

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={item.color}
                      fill={item.color}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>
          ))}

        </div>



        {/* =====================================================
            CHARTS
        ===================================================== */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          "
        >

          {/* POINTS TREND */}
          <div
            className="
            xl:col-span-2
            bg-white
            rounded-[24px]
            border border-[#E9E2F3]
            p-6
            "
          >

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2
                  className="
                  text-lg
                  font-semibold
                  text-[#2B2340]
                  "
                >
                  Points Analytics
                </h2>

                <p
                  className="
                  text-sm
                  text-[#8E8AA2]
                  mt-1
                  "
                >
                  Earned vs redeemed reward points
                </p>

              </div>

              <div
                className="
                flex items-center gap-2
                text-sm
                text-[#22A861]
                "
              >
                <TrendingUp className="w-4 h-4" />
                +18.4%
              </div>

            </div>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={pointsTrendData}>

                  <defs>

                    <linearGradient
                      id="earned"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#5B3FD6"
                        stopOpacity={0.25}
                      />

                      <stop
                        offset="95%"
                        stopColor="#5B3FD6"
                        stopOpacity={0}
                      />

                    </linearGradient>

                    <linearGradient
                      id="redeemed"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#22A861"
                        stopOpacity={0.2}
                      />

                      <stop
                        offset="95%"
                        stopColor="#22A861"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    stroke="#EEE8FF"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="earned"
                    stroke="#5B3FD6"
                    fill="url(#earned)"
                    strokeWidth={3}
                  />

                  <Area
                    type="monotone"
                    dataKey="redeemed"
                    stroke="#22A861"
                    fill="url(#redeemed)"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>



          {/* QR STATUS */}
          <div
            className="
            bg-white
            rounded-[24px]
            border border-[#E9E2F3]
            p-6
            "
          >

            <h2
              className="
              text-lg
              font-semibold
              text-[#2B2340]
              mb-6
              "
            >
              QR Lifecycle
            </h2>

            <div className="h-72">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={qrStatusData}
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >

                    {qrStatusData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* LEGEND */}
            <div className="space-y-3 mt-5">

              {qrStatusData.map((item, i) => (
                <div
                  key={i}
                  className="
                  flex items-center justify-between
                  "
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: item.color,
                      }}
                    />

                    <span
                      className="
                      text-sm
                      text-[#5B5875]
                      "
                    >
                      {item.name}
                    </span>

                  </div>

                  <span
                    className="
                    text-sm
                    font-semibold
                    text-[#2B2340]
                    "
                  >
                    {item.value}%
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>



        {/* =====================================================
            BOTTOM SECTION
        ===================================================== */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          "
        >

          {/* TOP PRODUCTS */}
          <div
            className="
            xl:col-span-2
            bg-white
            rounded-[24px]
            border border-[#E9E2F3]
            p-6
            "
          >

            <h2
              className="
              text-lg
              font-semibold
              text-[#2B2340]
              mb-6
              "
            >
              Top Selling Products
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr
                    className="
                    border-b border-[#EEE8FF]
                    text-left
                    "
                  >

                    <th
                      className="
                      pb-3
                      text-sm
                      text-[#8E8AA2]
                      font-medium
                      "
                    >
                      Product
                    </th>

                    <th
                      className="
                      pb-3
                      text-sm
                      text-[#8E8AA2]
                      font-medium
                      "
                    >
                      Category
                    </th>

                    <th
                      className="
                      pb-3
                      text-sm
                      text-[#8E8AA2]
                      font-medium text-right
                      "
                    >
                      Scans
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {topProducts.map((item, index) => (
                    <tr
                      key={index}
                      className="
                      border-b border-[#F4EEFD]
                      hover:bg-[#FAF7FF]
                      transition-all
                      "
                    >

                      <td
                        className="
                        py-4
                        text-sm
                        font-medium
                        text-[#2B2340]
                        "
                      >
                        {item.product}
                      </td>

                      <td
                        className="
                        py-4
                        text-sm
                        text-[#8E8AA2]
                        "
                      >
                        {item.category}
                      </td>

                      <td className="py-4 text-right">

                        <span
                          className="
                          px-3 py-1
                          rounded-full
                          bg-[#EEE8FF]
                          text-[#5B3FD6]
                          text-xs
                          font-semibold
                          "
                        >
                          {item.scans}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>



          {/* QUICK INSIGHTS */}
          <div
            className="
            bg-white
            rounded-[24px]
            border border-[#E9E2F3]
            p-6
            "
          >

            <h2
              className="
              text-lg
              font-semibold
              text-[#2B2340]
              mb-6
              "
            >
              Quick Insights
            </h2>

            <div className="space-y-5">

              <div
                className="
                p-4
                rounded-2xl
                bg-[#F8F5FC]
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                    w-12 h-12
                    rounded-xl
                    bg-[#EEE8FF]
                    flex items-center justify-center
                    "
                  >
                    <CheckCircle className="w-6 h-6 text-[#5B3FD6]" />
                  </div>

                  <div>

                    <h3
                      className="
                      text-sm
                      font-semibold
                      text-[#2B2340]
                      "
                    >
                      KYC Approval Rate
                    </h3>

                    <p
                      className="
                      text-xs
                      text-[#8E8AA2]
                      mt-1
                      "
                    >
                      92% approval success this month
                    </p>

                  </div>

                </div>

              </div>



              <div
                className="
                p-4
                rounded-2xl
                bg-[#F8F5FC]
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                    w-12 h-12
                    rounded-xl
                    bg-[#E7F8EE]
                    flex items-center justify-center
                    "
                  >
                    <TrendingUp className="w-6 h-6 text-[#22A861]" />
                  </div>

                  <div>

                    <h3
                      className="
                      text-sm
                      font-semibold
                      text-[#2B2340]
                      "
                    >
                      Scan Growth
                    </h3>

                    <p
                      className="
                      text-xs
                      text-[#8E8AA2]
                      mt-1
                      "
                    >
                      QR scans increased by 18.4%
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;