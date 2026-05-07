import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  TrendingUp,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Super Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">Manage Vendors</button>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard icon={<ShoppingBag color="#3D2C8D" />} label="Total Orders" value="1,284" change="+12%" />
        <StatCard icon={<TrendingUp color="#10b981" />} label="Revenue" value="₹45,200" change="+8%" />
        <StatCard icon={<Users color="#3b82f6" />} label="Active Users" value="842" change="+18%" />
        <StatCard icon={<AlertTriangle color="#ef4444" />} label="Active SOS" value="5" change="Urgent" />
      </div>

      <div className="main-content-grid">
        <div className="chart-section">
          <h2 className="section-title">Revenue Overview</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="sales" fill="#3D2C8D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="orders-section">
          <h2 className="section-title">Live Orders</h2>
          <div className="order-list">
            <LiveOrder user="Rahul S." items="2 items" status="Packed" time="2m ago" />
            <LiveOrder user="Ananya P." items="1 item" status="SOS" time="5m ago" urgent />
            <LiveOrder user="Sneha M." items="3 items" status="Delivering" time="10m ago" />
            <LiveOrder user="Vikram K." items="1 item" status="Confirmed" time="12m ago" />
          </div>
          <button className="view-all-btn">View All Orders</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change }) {
  const isPositive = change.includes('+');
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-icon">{icon}</div>
        <span className={`stat-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
          {change}
        </span>
      </div>
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
}

function LiveOrder({ user, items, status, time, urgent }) {
  return (
    <div className={`order-item ${urgent ? 'urgent' : ''}`}>
      <div className="order-header">
        <span className="order-user">{user}</span>
        <span className="order-time">{time}</span>
      </div>
      <div className="order-footer">
        <span className="order-info">{items}</span>
        <span className={`order-status ${status === 'SOS' ? 'sos' : ''}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
