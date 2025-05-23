import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const DashboardPage = ({ darkMode }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/get_todos/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
      })
      .then(setTodos)
      .catch((err) => setError(err.message));
  }, []);

  const today = new Date();

  const metrics = {
    total: todos.length,
    completed: todos.filter((t) => t.iscompleted).length,
    pending: todos.filter((t) => !t.iscompleted).length,
    outdated: todos.filter((t) => !t.iscompleted && t.due_date && new Date(t.due_date) < today).length,
  };
  metrics.notOutdated = metrics.total - metrics.outdated;

  const percentage = (part) => (metrics.total ? Math.round((part / metrics.total) * 100) : 0);

  const chartData = {
    total: [{ name: "Total", value: metrics.total }, { name: "Empty", value: 0 }],
    completed: [{ name: "Completed", value: metrics.completed }, { name: "Remaining", value: metrics.pending }],
    pending: [{ name: "Pending", value: metrics.pending }, { name: "Remaining", value: metrics.completed }],
    completionStatus: [
      { name: "Completed", value: metrics.completed },
      { name: "Pending", value: metrics.pending },
    ],
    outdated: [
      { name: "Outdated", value: metrics.outdated },
      { name: "Not Outdated", value: metrics.notOutdated },
    ],
    dueDates: Object.entries(
      todos.reduce((acc, t) => {
        const date = t.due_date || "No Date";
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value })),
  };

  const theme = darkMode
    ? {
        colors: {
          total: ["#4dabf7", "#495057"],
          completed: ["#51cf66", "#495057"],
          pending: ["#ff922b", "#495057"],
          completion: ["#51cf66", "#ff922b"],
          dueDate: "#4dabf7",
          daily: "#51cf66",
          outdated: ["#ff6b6b", "#868e96"],
        },
        bg: "bg-dark",
        text: "text-light",
        border: "border-secondary",
      }
    : {
        colors: {
          total: ["#007bff", "#e9ecef"],
          completed: ["#28a745", "#e9ecef"],
          pending: ["#fd7e14", "#e9ecef"],
          completion: ["#28a745", "#fd7e14"],
          dueDate: "#007bff",
          daily: "#28a745",
          outdated: ["#dc3545", "#6c757d"],
        },
        bg: "bg-light",
        text: "text-dark",
        border: "border-light",
      };

  // Refined card component with enhanced hover styles
  const Card = ({ title, value, percent, colors }) => (
    <div className="col-md-4 col-sm-6 d-flex">
      <div
        className={`card shadow-lg ${theme.bg} ${theme.text} ${theme.border} w-100 transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer`}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="card-body d-flex align-items-center">
          <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{value} ({percent}%)</p>
          </div>
          <div className="ms-auto d-flex justify-content-center align-items-center">
            <PieChart width={80} height={80}>
              <Pie cx="50%" cy="50%" innerRadius={27} outerRadius={40} data={colors.data} dataKey="value" nameKey="name">
                {colors.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.color[index % colors.color.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );

  // Pie Chart component with smooth hover effects
  const SimplePie = ({ data, colors, title }) => (
    <div className="col-md-6 d-flex">
      <div
        className={`card shadow-lg ${theme.bg} ${theme.text} ${theme.border} w-100 transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer p-3`}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h5 className="text-center mb-3">{title}</h5>
        <div className="d-flex justify-content-center">
          <PieChart width={300} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`pie-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );

  // Bar Chart with smooth hover effects
  const SimpleBar = ({ data, title, color }) => (
    <div className="col-md-6 d-flex">
      <div
        className={`card shadow-lg ${theme.bg} ${theme.text} ${theme.border} w-100 transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer p-3`}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h5 className="text-center mb-3">{title}</h5>
        <div className="d-flex justify-content-center">
          <BarChart width={300} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </div>
      </div>
    </div>
  );

  // Line Chart with smooth hover effects
  const SimpleLine = ({ data, title, color }) => (
    <div className="col-md-6 d-flex">
      <div
        className={`card shadow-lg ${theme.bg} ${theme.text} ${theme.border} w-100 transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer p-3`}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h5 className="text-center mb-3">{title}</h5>
        <div className="d-flex justify-content-center">
          <LineChart width={300} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} />
          </LineChart>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`content-container p-4 rounded ${theme.bg} ${theme.text} ${theme.border} shadow-top`}>
      <h2 className="mb-4">Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Cards */}
      <div className="row g-3 mb-4">
        <Card title="Total Todos" value={metrics.total} percent={100} colors={{ data: chartData.total, color: theme.colors.total }} />
        <Card title="Completed Todos" value={metrics.completed} percent={percentage(metrics.completed)} colors={{ data: chartData.completed, color: theme.colors.completed }} />
        <Card title="Pending Todos" value={metrics.pending} percent={percentage(metrics.pending)} colors={{ data: chartData.pending, color: theme.colors.pending }} />
      </div>

      {/* Graphs */}
      <div className="row g-3">
        <SimplePie title="Completion Status" data={chartData.completionStatus} colors={theme.colors.completion} />
        <SimpleBar title="Due Dates" data={chartData.dueDates} color={theme.colors.dueDate} />
        <SimpleLine title="Daily Todos" data={chartData.dueDates} color={theme.colors.daily} />
        <SimplePie title="Outdated Todos" data={chartData.outdated} colors={theme.colors.outdated} />
      </div>
    </div>
  );
};

export default DashboardPage;
