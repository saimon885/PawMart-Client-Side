import React, { useEffect, useState, useMemo, use } from "react";
import { MdEmail } from "react-icons/md";
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
import Loading from "../Pages/Loading";

const CHART_COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#10B981"];

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const [role, setRole] = useState();
  const [stats, setStats] = useState({
    totalAmount: 0,
    pendingCount: 0,
    paidCount: 0,
    listDataCount: 0,
    collectionsCount: 0,
    totalUserList: 0,
    cashOnDelivery: 0,
    totalAdmin: 0,
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
          "totalUserList",
          "CashOnDelevery",
          "totalAdmin",
          "satisfyedUser",
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
          totalUserList: results[5][0]?.count || 0,
          cashOnDelivery: results[6][0]?.count || 0,
          totalAdmin: results[7][0]?.count || 0,
          satisfyedUser: results[8][0]?.count || 0,
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
      { name: "Pending-Orders", value: stats.pendingCount },
      { name: "Paid", value: stats.paidCount },
      { name: "Cash-on-Delivery", value: stats.cashOnDelivery },
      { name: "Listings", value: stats.listDataCount },
      { name: "Total-Orders", value: stats.collectionsCount },
      { name: "Total-Users", value: stats.totalUserList },
      { name: "Total-Admins", value: stats.totalAdmin },
      { name: "Satisfied-Users", value: stats.satisfyedUser },
    ],
    [stats],
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 text-base-content">
      <title>PetBond - Dashboard</title>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-10 space-y-10">
        {(role === "user" || role === "admin") && (
          <div className="bg-base-100/70 backdrop-blur-xl border border-base-300 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <img
              src={user?.photoURL}
              alt=""
              className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover border-4 border-primary/40 shadow-lg"
            />

            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold">
                Welcome Back,{" "}
                <span className="text-primary">
                  {user?.displayName || "User"}
                </span>
              </h2>

              <p className="mt-2 text-sm md:text-base text-base-content/70 flex items-center justify-center md:justify-start gap-2">
                <MdEmail /> {user?.email}
              </p>
            </div>
          </div>
        )}

        {role === "admin" && (
          <>
            <Section title="Financial Overview">
              <KPICard title="Revenue" value={`$${stats.totalAmount}`} />
            </Section>

            <Section title="Order Analytics">
              <KPICard title="Pending-Orders" value={stats.pendingCount} />
              <KPICard title="Paid" value={stats.paidCount} />
              <KPICard title="Cash-on-Delivery" value={stats.cashOnDelivery} />
              <KPICard title="Total-Orders" value={stats.collectionsCount} />
            </Section>

            <Section title="Platform Data">
              <KPICard title="Listings" value={stats.listDataCount} />
              <KPICard title="Total-Users" value={stats.totalUserList} />
              <KPICard title="Total-Admins" value={stats.totalAdmin} />
              <KPICard title="Satisfied-Users" value={stats.satisfyedUser} />
            </Section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-base-100/80 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-base-300 shadow-xl">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorMain"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4F46E5"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4F46E5"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4F46E5"
                      fill="url(#colorMain)"
                      strokeWidth={3}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-base-100/80 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-base-300 shadow-xl">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % 4]} />
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

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg md:text-xl font-bold text-base-content/80">
      {title}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

const KPICard = ({ title, value }) => (
  <div className="group bg-base-100/80 backdrop-blur-xl border border-base-300 p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <h4 className="text-sm text-base-content/60 mb-1">{title}</h4>
    <p className="text-xl md:text-2xl font-bold text-primary group-hover:scale-105 transition">
      {value}
    </p>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-base-100/90 backdrop-blur-lg border border-base-300 p-3 rounded-xl shadow-lg">
        <p className="text-sm text-base-content/70">{payload[0].name}</p>
        <p className="font-bold text-primary text-lg">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const LoadingScreen = () => (
  <div>
    <Loading></Loading>
  </div>
);

export default DashboardHome;
