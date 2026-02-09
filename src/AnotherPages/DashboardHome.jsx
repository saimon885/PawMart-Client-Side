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

const THEME_COLORS = {
  primary: "#4F46E5",
  secondary: "#7C3AED",
  accent: "#EC4899",
  success: "#10B981",
  warning: "#F59E0B",
  neutral: "#64748B",
};

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
            fetch(`https://my-assignment-10-flax.vercel.app/${ep}`).then(
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
        `https://my-assignment-10-flax.vercel.app/users?email=${user?.email}`,
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
      {
        name: "Orders",
        value: stats.pendingCount,
        color: THEME_COLORS.primary,
      },
      {
        name: "Settlements",
        value: stats.paidCount,
        color: THEME_COLORS.secondary,
      },
      {
        name: "Inventory",
        value: stats.listDataCount,
        color: THEME_COLORS.accent,
      },
      {
        name: "Assets",
        value: stats.collectionsCount,
        color: THEME_COLORS.success,
      },
    ],
    [stats],
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 selection:bg-indigo-100/50">
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0 overflow-hidden">
        <svg width="100%" height="100%">
          <pattern
            id="pet-pattern"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path
              d="M20 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-10 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm20 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-10 10c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"
              fill="#4F46E5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pet-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-8 md:px-10">
        {/* Profile Section */}
        {(role === "user" || role === "admin") && (
          <div className="mb-12 bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-indigo-50/50 flex flex-col md:flex-row items-center gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src={
                  user?.photoURL ||
                  "https://img.icons8.com/bubbles/100/user.png"
                }
                alt="Profile"
                className="relative h-32 w-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute bottom-1 right-1 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white"></div>
            </div>
            <div className="text-center md:text-left space-y-3 flex-grow">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
                <MdVerifiedUser /> Verified {role}
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Welcome Back,{" "}
                <span className="text-indigo-600">
                  {user?.displayName || "User"}
                </span>
                ! 👋
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <MdEmail className="text-indigo-400 size-5" /> {user?.email}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Only Sections */}
        <div>
          {role === "admin" && (
            <>
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                      <span className="text-white text-xl">🐾</span>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                      Operational Intelligence
                    </span>
                  </div>
                  <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none pt-2">
                    System<span className="text-indigo-600">Overview</span>
                  </h1>
                </div>
                <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                  <button className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm">
                    Real-time Metrics
                  </button>
                  <button className="px-5 py-2 text-slate-500 hover:text-slate-800 rounded-lg text-xs font-bold transition-all">
                    Audit Logs
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <KPICard
                  title="Total Revenue"
                  value={`$${stats.totalAmount.toLocaleString()}`}
                  trend="+14.2%"
                  detail="vs last month"
                  theme="indigo"
                />
                <KPICard
                  title="Pending Action"
                  value={stats.pendingCount}
                  trend="High"
                  detail="System queue"
                  theme="amber"
                />
                <KPICard
                  title="Success Rate"
                  value={stats.paidCount}
                  trend="98.2%"
                  detail="Payments cleared"
                  theme="emerald"
                />
                <KPICard
                  title="Inventory Level"
                  value={stats.listDataCount}
                  trend="Stable"
                  detail="Warehouse SKU"
                  theme="rose"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-lg font-bold text-slate-800">
                      Operational Velocity
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Trend
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Baseline
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[380px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient
                            id="colorPrimary"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#4F46E5"
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#4F46E5"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#F1F5F9"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94A3B8",
                            fontSize: 10,
                            fontWeight: 700,
                          }}
                          dy={15}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94A3B8",
                            fontSize: 10,
                            fontWeight: 700,
                          }}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                          cursor={{
                            stroke: "#4F46E5",
                            strokeWidth: 1.5,
                            strokeDasharray: "4 4",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#4F46E5"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorPrimary)"
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-8">
                    Resource Split
                  </h3>
                  <div className="flex-grow flex items-center justify-center relative">
                    <div className="absolute text-center">
                      <span className="block text-3xl font-black text-slate-900 leading-none">
                        {chartData.reduce((a, b) => a + b.value, 0)}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Aggregate
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          innerRadius={85}
                          outerRadius={105}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 space-y-2">
                    {chartData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs font-black text-slate-900 tracking-tight">
                          {item.value} units
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, trend, detail, theme }) => {
  const themes = {
    indigo: "text-indigo-600 bg-indigo-50",
    amber: "text-amber-600 bg-amber-50",
    emerald: "text-emerald-600 bg-emerald-50",
    rose: "text-rose-600 bg-rose-50",
  };

  return (
    <div className="bg-white border border-slate-200/60 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all duration-300">
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {title}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-md ${themes[theme]}`}
          >
            {trend}
          </span>
        </div>
        <div>
          <h4 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">
            {value}
          </h4>
          <p className="text-[10px] text-slate-400 font-medium">{detail}</p>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.03] group-hover:rotate-12 transition-transform">
        🐾
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-800">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">
          {payload[0].payload.name}
        </p>
        <p className="text-lg font-black">
          {payload[0].value.toLocaleString()} Units
        </p>
      </div>
    );
  }
  return null;
};

const LoadingScreen = () => (
  <div className="min-h-[80vh] flex flex-col justify-center items-center bg-white">
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-ping h-16 w-16 rounded-full bg-slate-100 opacity-75"></div>
      <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin"></div>
      <div className="absolute text-slate-900 animate-bounce">
        <MdOutlinePets size={24} />
      </div>
    </div>
    <div className="mt-6 flex flex-col items-center gap-1">
      <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-800 animate-pulse">
        Loading
      </h3>
      <p className="text-[10px] text-slate-400 font-medium">
        Fetching your data...
      </p>
    </div>
  </div>
);

export default DashboardHome;
