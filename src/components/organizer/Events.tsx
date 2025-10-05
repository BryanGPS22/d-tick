"use client"

import React, { useState } from 'react';
import { Plus, Search, Calendar, Ticket, Users, Settings, BarChart3, CreditCard, TrendingUp, ArrowLeft, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  status: 'UPCOMING' | 'COMPLETED';
  pattern: 'DIAMOND PATTERN';
  date: string;
  venue: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  avgPrice: number;
  transactions: number;
  revenueChange: number;
  tiers: {
    name: string;
    revenue: number;
  }[];
  tierPerformance: {
    name: string;
    sold: number;
    total: number;
    price: number;
    percentage: number;
  }[];
  salesData: { date: string; sales: number }[];
  daysToGo?: number;
}

const MyEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: 'Summer Music Festival',
      status: 'UPCOMING',
      pattern: 'DIAMOND PATTERN',
      date: '6/15/2025',
      venue: 'Jakarta Convention Center',
      ticketsSold: 450,
      totalTickets: 500,
      revenue: 22500,
      avgPrice: 50,
      transactions: 380,
      revenueChange: 12.5,
      daysToGo: 45,
      tiers: [
        { name: 'GENERAL ADMISSION', revenue: 15000 },
        { name: 'VIP PASS', revenue: 12000 },
        { name: 'BACKSTAGE EXPERIENCE', revenue: 4500 }
      ],
      tierPerformance: [
        { name: 'General Admission', sold: 300, total: 300, price: 50, percentage: 100 },
        { name: 'VIP Pass', sold: 120, total: 150, price: 100, percentage: 80 },
        { name: 'Backstage Experience', sold: 30, total: 50, price: 150, percentage: 60 }
      ],
      salesData: [
        { date: '1/3', sales: 20 },
        { date: '2/3', sales: 35 },
        { date: '3/3', sales: 42 },
        { date: '4/3', sales: 28 },
        { date: '5/3', sales: 15 },
        { date: '6/3', sales: 30 },
        { date: '7/3', sales: 25 }
      ]
    },
    {
      id: 2,
      title: 'Tech Conference 2025',
      status: 'UPCOMING',
      pattern: 'DIAMOND PATTERN',
      date: '7/25/2025',
      venue: 'Digital Hub Bandung',
      ticketsSold: 280,
      totalTickets: 400,
      revenue: 42000,
      avgPrice: 150,
      transactions: 250,
      revenueChange: 8.3,
      daysToGo: 85,
      tiers: [
        { name: 'STANDARD ACCESS', revenue: 30000 },
        { name: 'PREMIUM ACCESS', revenue: 24000 }
      ],
      tierPerformance: [
        { name: 'Standard Access', sold: 180, total: 250, price: 120, percentage: 72 },
        { name: 'Premium Access', sold: 100, total: 150, price: 200, percentage: 67 }
      ],
      salesData: [
        { date: '1/3', sales: 15 },
        { date: '2/3', sales: 25 },
        { date: '3/3', sales: 38 },
        { date: '4/3', sales: 32 },
        { date: '5/3', sales: 20 },
        { date: '6/3', sales: 28 },
        { date: '7/3', sales: 22 }
      ]
    },
    {
      id: 3,
      title: 'Blockchain Workshop',
      status: 'COMPLETED',
      pattern: 'DIAMOND PATTERN',
      date: '8/10/2025',
      venue: 'Blockchain Center Jakarta',
      ticketsSold: 75,
      totalTickets: 100,
      revenue: 7500,
      avgPrice: 100,
      transactions: 70,
      revenueChange: 5.2,
      tiers: [
        { name: 'WORKSHOP TICKET', revenue: 6500 },
        { name: 'WORKSHOP + CERTIFICATION', revenue: 2000 }
      ],
      tierPerformance: [
        { name: 'Workshop Ticket', sold: 50, total: 70, price: 80, percentage: 71 },
        { name: 'Workshop + Certification', sold: 25, total: 30, price: 150, percentage: 83 }
      ],
      salesData: [
        { date: '1/3', sales: 10 },
        { date: '2/3', sales: 18 },
        { date: '3/3', sales: 25 },
        { date: '4/3', sales: 20 },
        { date: '5/3', sales: 12 },
        { date: '6/3', sales: 15 },
        { date: '7/3', sales: 10 }
      ]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter.toUpperCase();
    const matchesCategory = categoryFilter === 'all';
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalRevenue = filteredEvents.reduce((sum, event) => sum + event.revenue, 0);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  if (selectedEventId && selectedEvent) {
    return <ManageEventPage event={selectedEvent} onBack={() => setSelectedEventId(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-100 mb-2">My Events</h1>
            <p className="text-gray-400">Manage and track all your events</p>
          </div>
          <Link href={"/organizer/events/create"}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name or venue..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            >
              <option value="all">All Categories</option>
              <option value="music">Music</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <span>Showing {filteredEvents.length} of {events.length} events</span>
            <span className="font-semibold">Total Revenue: IDRX {totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-100 mb-3">{event.title}</h3>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'UPCOMING' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {event.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                    {event.pattern}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date} • {event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Ticket className="w-4 h-4" />
                  <span>{event.ticketsSold} / {event.totalTickets} sold • <span className="text-green-400 font-semibold">IDRX {event.revenue.toLocaleString()}</span></span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert('Check-in clicked')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-950 transition-colors text-sm font-medium"
                >
                  <Users className="w-4 h-4" />
                  Check-in
                </button>
                <button
                  onClick={() => setSelectedEventId(event.id)}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ManageEventPage = ({ event, onBack }: { event: Event; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [timeRange, setTimeRange] = useState('7days');

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-sm font-medium text-gray-400 mb-2">Manage Event</h2>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">{event.title}</h1>
            <div className="flex items-center gap-3">
              {event.daysToGo && (
                <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium">
                  {event.daysToGo} DAYS TO GO
                </span>
              )}
              <span className="text-gray-400 text-sm">
                Tickets: {event.ticketsSold} / {event.totalTickets} sold
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-800 text-red-400 rounded-lg hover:bg-red-950 transition-colors">
            <Trash2 className="w-4 h-4" />
            Cancel Event
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 mb-6">
          <div className="border-b border-gray-800">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-600 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <>
            {/* Statistics Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-100">
                Sales Statistics - {event.title}
              </h3>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-sm"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-400 text-sm font-medium">Total Revenue</span>
                  <div className="w-10 h-10 bg-yellow-900 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-100 mb-2">
                  IDRX {event.revenue.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-sm text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{event.revenueChange}% from previous period</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-400 text-sm font-medium">Tickets Sold</span>
                  <div className="w-10 h-10 bg-orange-900 rounded-lg flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-100 mb-2">
                  {event.ticketsSold}
                </div>
                <div className="text-sm text-gray-400">
                  {((event.ticketsSold / event.totalTickets) * 100).toFixed(1)}% of total
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-400 text-sm font-medium">Transactions</span>
                  <div className="w-10 h-10 bg-orange-900 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-100 mb-2">
                  {event.transactions}
                </div>
                <div className="text-sm text-gray-400">Total purchases</div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-400 text-sm font-medium">Avg. Ticket Price</span>
                  <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-100 mb-2">
                  IDRX {event.avgPrice}
                </div>
                <div className="text-sm text-gray-400">Per ticket</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-gray-100 mb-6">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={event.salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#f3f4f6'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={{ fill: '#a855f7', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-gray-100 mb-6">Revenue by Ticket Tier</h3>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-4 border-l-4 border-purple-400 pl-3">
                    {event.title}
                  </h4>
                  <div className="space-y-3 ml-7">
                    {event.tiers.map((tier, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-purple-400 uppercase font-medium">
                          {tier.name}
                        </span>
                        <span className="text-sm font-semibold text-gray-200">
                          IDRX {tier.revenue.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Sales Performance */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-gray-100 mb-6">Ticket Sales Performance</h3>
              
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-100">{event.title}</h4>
                    {event.daysToGo && (
                      <span className="inline-block mt-2 px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium">
                        {event.daysToGo} DAYS TO GO
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Tickets Sold</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {event.ticketsSold} / {event.totalTickets}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {((event.ticketsSold / event.totalTickets) * 100).toFixed(1)}% sold
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-1">Revenue</p>
                    <p className="text-2xl font-bold text-gray-100">
                      IDRX {event.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-3">Total sales</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-1">Average Price</p>
                    <p className="text-2xl font-bold text-gray-100">
                      IDRX {event.avgPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400 mt-3">Per ticket</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-gray-100 mb-4">Ticket Tier Performance</h4>
                  <div className="space-y-4">
                    {event.tierPerformance.map((tier, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-200">{tier.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">
                              {tier.sold} / {tier.total}
                            </span>
                            <span className={`text-sm font-semibold px-2 py-1 rounded ${
                              tier.percentage >= 80 ? 'bg-green-900 text-green-300' :
                              tier.percentage >= 60 ? 'bg-orange-900 text-orange-300' :
                              'bg-red-900 text-red-300'
                            }`}>
                              {tier.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${
                              tier.percentage >= 80 ? 'bg-green-600' :
                              tier.percentage >= 60 ? 'bg-orange-500' :
                              'bg-orange-400'
                            }`}
                            style={{ width: `${tier.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          IDRX {tier.price} per ticket
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other Tabs */}
        {activeTab !== 'analytics' && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-12 border border-gray-700 text-center">
            <p className="text-gray-400">
              {tabs.find(t => t.id === activeTab)?.label} content will be displayed here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return <MyEventsPage />;
}