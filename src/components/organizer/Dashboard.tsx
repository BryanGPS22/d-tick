"use client";

import React, { useState } from 'react';
import { Calendar, Plus, TrendingUp, Ticket, CreditCard, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  tiers: {
    name: string;
    revenue: number;
  }[];
}

export default function OrganizerDashboard() {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');

  const events: Event[] = [
    {
      id: 'summer-festival',
      name: 'Summer Music Festival',
      tiers: [
        { name: 'GENERAL ADMISSION', revenue: 15000 },
        { name: 'VIP PASS', revenue: 12000 },
        { name: 'BACKSTAGE EXPERIENCE', revenue: 4500 }
      ]
    },
    {
      id: 'tech-conference',
      name: 'Tech Conference 2025',
      tiers: [
        { name: 'STANDARD ACCESS', revenue: 30000 },
        { name: 'PREMIUM ACCESS', revenue: 24000 }
      ]
    },
    {
      id: 'blockchain-workshop',
      name: 'Blockchain Workshop',
      tiers: [
        { name: 'WORKSHOP TICKET', revenue: 6500 },
        { name: 'WORKSHOP + CERTIFICATION', revenue: 2000 }
      ]
    }
  ];

  const salesData = [
    { date: '1/3', sales: 20 },
    { date: '2/3', sales: 35 },
    { date: '3/3', sales: 42 },
    { date: '4/3', sales: 28 },
    { date: '5/3', sales: 15 },
    { date: '6/3', sales: 30 },
    { date: '7/3', sales: 25 }
  ];

  const stats = {
    totalRevenue: 72000,
    revenueChange: 12.5,
    ticketsSold: 805,
    ticketsPercentage: 80.5,
    transactions: 610,
    avgTicketPrice: 89.44
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-100 mb-2">
              Organizer Dashboard
            </h1>
            <p className="text-gray-400">
              Manage your events and track performance
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={"/organizer/events"} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Calendar className="w-5 h-5" />
              My Events
            </Link>
            <Link href={"/organizer/events/create"} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>
        </div>

        {/* Sales Overview Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Sales Overview</h2>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          >
            <option value="all">All Events</option>
            <option value="summer-festival">Summer Music Festival</option>
            <option value="tech-conference">Tech Conference 2025</option>
            <option value="blockchain-workshop">Blockchain Workshop</option>
          </select>
        </div>

        {/* Statistics Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-100">
            Sales Statistics - All Events
          </h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <span className="text-gray-400 text-sm font-medium">Total Revenue</span>
              <div className="w-10 h-10 bg-yellow-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-2">
              IDRX {stats.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>{stats.revenueChange}% from previous period</span>
            </div>
          </div>

          {/* Tickets Sold */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <span className="text-gray-400 text-sm font-medium">Tickets Sold</span>
              <div className="w-10 h-10 bg-orange-900 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-2">
              {stats.ticketsSold}
            </div>
            <div className="text-sm text-gray-400">
              {stats.ticketsPercentage}% of total
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <span className="text-gray-400 text-sm font-medium">Transactions</span>
              <div className="w-10 h-10 bg-orange-900 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-2">
              {stats.transactions}
            </div>
            <div className="text-sm text-gray-400">
              Total purchases
            </div>
          </div>

          {/* Avg Ticket Price */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <span className="text-gray-400 text-sm font-medium">Avg. Ticket Price</span>
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-2">
              IDRX {stats.avgTicketPrice}
            </div>
            <div className="text-sm text-gray-400">
              Per ticket
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Overview Chart */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-6">Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
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
                  name="Ticket Sales"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Ticket Tier */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-6">Revenue by Ticket Tier</h3>
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id}>
                  <h4 className="text-purple-400 font-semibold mb-3 border-l-4 border-purple-400 pl-3">
                    {event.name}
                  </h4>
                  <div className="space-y-2 ml-7">
                    {event.tiers.map((tier, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-purple-400 uppercase">
                          {tier.name}
                        </span>
                        <span className="text-sm font-semibold text-gray-200">
                          IDRX {tier.revenue.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}