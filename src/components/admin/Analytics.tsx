"use client"

import React, { useState } from 'react';
import { DollarSign, Building2, Ticket, Users, TrendingUp } from 'lucide-react';

// interface Event {
//   id: number;
//   name: string;
//   organizer: string;
//   revenue: number;
//   ticketsSold: number;
//   performance: number;
// }

// interface Transaction {
//   id: string;
//   type: 'Purchase' | 'Fee Collection';
//   event: string;
//   amount: number;
//   platformFee: number;
//   time: string;
//   status: 'COMPLETED' | 'PENDING';
// }

const App: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('Last 30 days');

  // Data untuk dashboard
  const stats = {
    totalRevenue: 59500000,
    revenueGrowth: 42,
    platformFees: 595000,
    feesPercentage: 1,
    totalTickets: 270,
    eventsCount: 4,
    activeUsers: 1543,
    newUsers: 287
  };

  // const revenueData = [
  //   { month: 'Oct 2024', revenue: 450000000, fees: 4500000 },
  //   { month: 'Nov 2024', revenue: 320000000, fees: 3200000 },
  //   { month: 'Dec 2024', revenue: 580000000, fees: 5800000 },
  //   { month: 'Jan 2025', revenue: 825000000, fees: 8250000 }
  // ];

  // const userGrowthData = [
  //   { month: 'Oct 2024', total: 1024, new: 234 },
  //   { month: 'Nov 2024', total: 1186, new: 162 },
  //   { month: 'Dec 2024', total: 1398, new: 212 },
  //   { month: 'Jan 2025', total: 1543, new: 287 }
  // ];

  // const events: Event[] = [
  //   { id: 1, name: 'Tech Conference 2025', organizer: 'TechTalks ID', revenue: 42500000, ticketsSold: 250, performance: 83 },
  //   { id: 2, name: 'Summer Music Festival', organizer: 'EventMaster Indonesia', revenue: 15000000, ticketsSold: 50, performance: 10 },
  //   { id: 3, name: 'Blockchain Workshop', organizer: 'Blockchain Indonesia', revenue: 2000000, ticketsSold: 20, performance: 20 },
  //   { id: 4, name: 'Rock Concert: Thunder Night', organizer: 'RockFest Indonesia', revenue: 0, ticketsSold: 0, performance: 0 }
  // ];

  // const transactions: Transaction[] = [
  //   { id: 'tx_001', type: 'Purchase', event: 'Tech Conference 2025', amount: 150000, platformFee: 1500, time: '2025-01-22 14:30', status: 'COMPLETED' },
  //   { id: 'tx_002', type: 'Purchase', event: 'Summer Music Festival', amount: 250000, platformFee: 2500, time: '2025-01-22 13:15', status: 'COMPLETED' },
  //   { id: 'tx_003', type: 'Fee Collection', event: 'Blockchain Workshop', amount: 100000, platformFee: 1000, time: '2025-01-22 12:00', status: 'COMPLETED' },
  //   { id: 'tx_004', type: 'Purchase', event: 'Rock Concert: Thunder Night', amount: 350000, platformFee: 3500, time: '2025-01-22 11:45', status: 'PENDING' }
  // ];

  const formatCurrency = (amount: number): string => {
    return `IDR ${amount.toLocaleString('id-ID')}`;
  };


  // const getMaxRevenue = () => Math.max(...revenueData.map(d => d.revenue));
  // const getMaxUsers = () => Math.max(...userGrowthData.map(d => d.total));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Platform performance and revenue insights</p>
          </div>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Platform Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{stats.revenueGrowth}% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Platform Fees Collected</p>
                <h3 className="text-2xl font-bold text-purple-600">{formatCurrency(stats.platformFees)}</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">{stats.feesPercentage}% of total revenue</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tickets Sold</p>
                <h3 className="text-2xl font-bold text-blue-600">{stats.totalTickets}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Across {stats.eventsCount} events</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <h3 className="text-2xl font-bold text-orange-600">{stats.activeUsers.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{stats.newUsers} new this month</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue Trend</h3>
            <p className="text-sm text-gray-600 mb-6">Monthly revenue and platform fees</p>
            <div className="space-y-4">
              {revenueData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(data.revenue)}</div>
                      <div className="text-xs text-gray-500">Fee: {formatCurrency(data.fees)}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / getMaxRevenue()) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">User Growth</h3>
            <p className="text-sm text-gray-600 mb-6">Platform user acquisition</p>
            <div className="space-y-4">
              {userGrowthData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{data.total.toLocaleString()} total</div>
                      <div className="text-xs text-green-600">+{data.new} new</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.total / getMaxUsers()) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Top Performing Events</h3>
          <p className="text-sm text-gray-600 mb-6">Events ranked by revenue and ticket sales</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Event</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Organizer</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Tickets Sold</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-100 text-blue-600 text-xs font-semibold mr-3">
                          #{event.id}
                        </span>
                        <span className="font-medium text-gray-900">{event.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{event.organizer}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">{formatCurrency(event.revenue)}</td>
                    <td className="py-4 px-4 text-gray-700">{event.ticketsSold}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-100 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${event.performance >= 50 ? 'bg-green-600' : event.performance > 0 ? 'bg-yellow-500' : 'bg-gray-300'}`}
                            style={{ width: `${event.performance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{event.performance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Platform Transactions</h3>
          <p className="text-sm text-gray-600 mb-6">Latest blockchain transactions and fee collections</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Transaction</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Event</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Platform Fee</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Time</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className={`mr-2 ${tx.type === 'Purchase' ? 'text-green-600' : 'text-blue-600'}`}>
                          {tx.type === 'Purchase' ? '🎫' : '$'}
                        </span>
                        <div>
                          <div className="font-medium text-gray-900">{tx.type}</div>
                          <div className="text-xs text-gray-500">{tx.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{tx.event}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">{formatCurrency(tx.amount)}</td>
                    <td className="py-4 px-4 text-purple-600">+{formatCurrency(tx.platformFee)}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{tx.time}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm text-gray-600 mb-2">Average Ticket Price</h3>
            <p className="text-3xl font-bold text-blue-600 mb-1">{formatCurrency(402439)}</p>
            <p className="text-sm text-gray-500">Across all events</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm text-gray-600 mb-2">Platform Fee Rate</h3>
            <p className="text-3xl font-bold text-purple-600 mb-1">1.0%</p>
            <p className="text-sm text-gray-500">Standard rate</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm text-gray-600 mb-2">Events Success Rate</h3>
            <p className="text-3xl font-bold text-green-600 mb-1">92%</p>
            <p className="text-sm text-gray-500">Non-cancelled events</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default App;