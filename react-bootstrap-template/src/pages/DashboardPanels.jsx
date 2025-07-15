import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const metrics = [
  { title: 'Total Users', value: 420, icon: '👥' },
  { title: 'Active Services', value: 12, icon: '⚙️' },
  { title: 'Messages', value: 58, icon: '✉️' },
];

const barData = {
  labels: ['Users', 'Services', 'Messages'],
  datasets: [
    {
      label: 'Count',
      backgroundColor: ['#0d6efd', '#6610f2', '#198754'],
      data: [420, 12, 58],
    },
  ],
};

const pieData = {
  labels: ['Frontend', 'Backend', 'UI/UX'],
  datasets: [
    {
      data: [60, 25, 15],
      backgroundColor: ['#0dcaf0', '#ffc107', '#dc3545'],
    },
  ],
};

const DashboardPanels = () => (
  <>
    <div className="row mb-4">
      {metrics.map((m) => (
        <div className="col-md-4 mb-3" key={m.title}>
          <div className="card text-center shadow-sm animate__animated animate__fadeInUp">
            <div className="card-body">
              <div className="h1">{m.icon}</div>
              <h5 className="card-title">{m.title}</h5>
              <p className="h3">{m.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-header">Overview</div>
          <div className="card-body">
            <p>Your admin overview text goes here.</p>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-header">Recent Activity</div>
          <div className="card-body">
            <ul>
              <li>User John Doe signed up.</li>
              <li>Service SEO Optimization added.</li>
              <li>Message received from Jane.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-header">User Stats</div>
          <div className="card-body">
            <Bar data={barData} />
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-header">Department Split</div>
          <div className="card-body">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default DashboardPanels;
