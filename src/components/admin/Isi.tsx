"use client"

import React, { useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Eye, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Types
interface Event {
  id: string;
  name: string;
  organizer: string;
  ticketsSold: number;
  revenue: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

interface PendingRequest {
  id: string;
  name: string;
  type: 'INDIVIDUAL' | 'PT' | 'KOMUNITAS';
  email: string;
  submittedDate: string;
}

interface PlatformHealth {
  serverStatus: 'operational' | 'degraded' | 'down';
  storageUsage: number;
  apiResponseTime: number;
}

const AdminDashboard = () => {
  // Stats State
  const [stats] = useState({
    totalOrganizers: 4,
    activeEvents: 4,
    totalRevenue: 59.5,
    ticketsSold: 270
  });

  // Events State
  const [events] = useState<Event[]>([
    {
      id: '1',
      name: 'Tech Conference 2025',
      organizer: 'TechTalks ID',
      ticketsSold: 250,
      revenue: 42500000,
      status: 'ACTIVE'
    },
    {
      id: '2',
      name: 'Summer Music Festival',
      organizer: 'EventMaster Indonesia',
      ticketsSold: 50,
      revenue: 15000000,
      status: 'ACTIVE'
    },
    {
      id: '3',
      name: 'Blockchain Workshop',
      organizer: 'Blockchain Indonesia',
      ticketsSold: 20,
      revenue: 2000000,
      status: 'ACTIVE'
    },
    {
      id: '4',
      name: 'Rock Concert: Thunder Night',
      organizer: 'RockFest Indonesia',
      ticketsSold: 0,
      revenue: 0,
      status: 'ACTIVE'
    }
  ]);

  // Pending Requests State
  const [pendingRequests] = useState<PendingRequest[]>([
    {
      id: '1',
      name: 'Creative Workshop Studio',
      type: 'INDIVIDUAL',
      email: 'info@creativeworkshop.id',
      submittedDate: '2025-01-19'
    },
    {
      id: '2',
      name: 'Bali Event Organizers',
      type: 'PT',
      email: 'contact@balievents.com',
      submittedDate: '2025-01-18'
    },
    {
      id: '3',
      name: 'Youth Community Jakarta',
      type: 'KOMUNITAS',
      email: 'admin@youthjakarta.org',
      submittedDate: '2025-01-17'
    }
  ]);

  // Platform Health State
  const [platformHealth] = useState<PlatformHealth>({
    serverStatus: 'operational',
    storageUsage: 67,
    apiResponseTime: 127
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleReview = (requestId: string) => {
    console.log('Reviewing request:', requestId);
    alert(`Opening review modal for request ${requestId}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'INDIVIDUAL':
        return 'bg-blue-100 text-blue-700';
      case 'PT':
        return 'bg-blue-200 text-blue-800';
      case 'KOMUNITAS':
        return 'bg-blue-300 text-blue-900';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome to Lummy Admin Panel. Here&apos;s what&apos;s happening on your platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Organizers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Organizers</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.totalOrganizers}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-500 mr-1">▲</span>
                  verified organizers
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Active Events</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.activeEvents}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-500 mr-1">▲</span>
                  all events live
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                <h3 className="text-4xl font-bold text-purple-600 mb-2">IDR {stats.totalRevenue}M</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-500 mr-1">▲</span>
                  from current events
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Tickets Sold */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Tickets Sold</p>
                <h3 className="text-4xl font-bold text-orange-600 mb-2">{stats.ticketsSold}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-500 mr-1">▲</span>
                  across all events
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Events</h2>
              <Link href={"/admin/events"}
                className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-sm font-medium"
              >
                Manage Events
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Event</th>
                    <th className="text-right py-3 text-xs font-semibold text-gray-600 uppercase">Tickets Sold</th>
                    <th className="text-right py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.name}</p>
                          <p className="text-xs text-gray-500">by {event.organizer}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{event.ticketsSold}</p>
                          <p className="text-xs text-gray-500">{formatCurrency(event.revenue)}</p>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
              <Link href={"/admin/organizer"}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                Review All
              </Link>
            </div>

            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{request.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(request.type)}`}>
                        {request.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{request.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Submitted {formatDate(request.submittedDate)}</p>
                  </div>
                  <button
                    onClick={() => handleReview(request.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Review</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Health</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Server Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Server Status</h3>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-900">All systems operational</span>
              </div>
            </div>

            {/* Storage Usage */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Storage Usage</h3>
                <span className="text-sm font-bold text-gray-900">{platformHealth.storageUsage}%</span>
              </div>
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${platformHealth.storageUsage}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Database</p>
            </div>

            {/* API Response Time */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">API Response Time</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-green-600">{platformHealth.apiResponseTime}ms</span>
                <span className="text-xs text-gray-500">avg response time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;