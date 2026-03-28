import React, { useEffect, useState, useMemo, use } from "react";
import { MdOutlinePets, MdEmail, MdVerifiedUser } from "react-icons/md";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { AuthContext } from "../AuthProvider/AuthContext";

// ✅ Chart colors (keep vivid like before)
const CHART_COLORS = [
  "#4F46E5", // indigo
  "#7C3AED", // purple
  "#EC4899", // pink
  "#10B981", // green
];

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const [role, setRole] = useState();
  const [stats, setStats] = useState({
    totalAmount: 0,
    pendingCount: 0,
    paidCount: 0,
    listDataCount: 0,
    collectionsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          "allAmount",
          "OrderPending",
          "allPaidOrder",
          "allListData",
          "allOrderCollections",
        ];
        const results = await Promise.all(
          endpoints.map((ep) =>
            fetch(`https://my-assignment-10-lime.vercel.app/${ep}`).then(
              (res) => res.json(),
            ),
          ),
        );

        setStats({
          totalAmount:
            results[0][1]?.allamount || results[0][0]?.totalAmount || 0,
          pendingCount: results[1][0]?.count || 0,
          paidCount: results[2][0]?.count || 0,
          listDataCount: results[3][0]?.count || 0,
          collectionsCount: results[4][0]?.count || 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://my-assignment-10-lime.vercel.app/users?email=${user?.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setRole(data[0].role);
          } else {
            setRole(data.role);
          }
        });
    }
  }, [user?.email]);

  const chartData = useMemo(
    () => [
      { name: "Orders", value: stats.pendingCount },
      { name: "Settlements", value: stats.paidCount },
      { name: "Inventory", value: stats.listDataCount },
      { name: "Assets", value: stats.collectionsCount },
    ],
    [stats],
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-8">
        {(role === "user" || role === "admin") && (
          <div className="mb-12 bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <img
              src={user?.photoURL}
              alt=""
              className="h-32 w-32 rounded-full object-cover border-4 border-base-100"
            />
            <div>
              <h2 className="text-3xl font-black">
                Welcome Back,{" "}
                <span className="text-primary">
                  {user?.displayName || "User"}
                </span>
              </h2>
              <p className="text-base-content/70 flex items-center gap-2">
                <MdEmail /> {user?.email}
              </p>
            </div>
          </div>
        )}

        {role === "admin" && (
          <>
            {/* KPI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <KPICard title="Revenue" value={`$${stats.totalAmount}`} />
              <KPICard title="Pending" value={stats.pendingCount} />
              <KPICard title="Paid" value={stats.paidCount} />
              <KPICard title="Inventory" value={stats.listDataCount} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Area Chart */}
              <div className="lg:col-span-2 bg-base-100 p-6 rounded-2xl border border-base-300">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={CHART_COLORS[0]}
                      fill={CHART_COLORS[0]}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-base-100 p-6 rounded-2xl border border-base-300">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value">
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const KPICard = ({ title, value }) => (
  <div className="bg-base-100 p-6 rounded-xl border border-base-300">
    <h4 className="text-sm text-base-content/60">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-base-100 border border-base-300 p-3 rounded-lg">
        <p>{payload[0].name}</p>
        <p className="font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-base-100">
    <MdOutlinePets className="animate-bounce text-primary" size={40} />
  </div>
);

export default DashboardHome;
