"use client"

import React, { useState } from 'react';
import { X, Search} from 'lucide-react';

interface Event {
  id: string;
  name: string;
  categories: string[];
  organizer: {
    name: string;
    id: string;
  };
  date: string;
  venue: {
    name: string;
    address: string;
  };
  tickets: {
    sold: number;
    total: number;
  };
  revenue: number;
  fee: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'CANCELLED';
  created: string;
}

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Summer Music Festival',
      categories: ['MUSIC', 'FESTIVAL'],
      organizer: { name: 'EventMaster Indonesia', id: '@x1234...5678' },
      date: '2025-06-15',
      venue: { name: 'Jakarta Convention Center Main Arena', address: 'Jakarta Convention Center Main Arena' },
      tickets: { sold: 50, total: 500 },
      revenue: 15000000,
      fee: 150000,
      status: 'ACTIVE',
      created: '2025-01-10'
    },
    {
      id: '2',
      name: 'Tech Conference 2025',
      categories: ['TECHNOLOGY', 'CONFERENCE'],
      organizer: { name: 'TechTalks ID', id: '@xabcd...ef9h' },
      date: '2025-07-25',
      venue: { name: 'Digital Hub Conference Center', address: 'Digital Hub Conference Center' },
      tickets: { sold: 250, total: 300 },
      revenue: 42500000,
      fee: 425000,
      status: 'ACTIVE',
      created: '2025-01-12'
    },
    {
      id: '3',
      name: 'Blockchain Workshop',
      categories: ['BLOCKCHAIN', 'WORKSHOP'],
      organizer: { name: 'Blockchain Indonesia', id: '@xfed0...ba09' },
      date: '2025-08-10',
      venue: { name: 'Blockchain Center Jakarta', address: 'Blockchain Center Jakarta' },
      tickets: { sold: 20, total: 100 },
      revenue: 2000000,
      fee: 20000,
      status: 'ACTIVE',
      created: '2025-01-15'
    },
    {
      id: '4',
      name: 'Rock Concert: Thunder Night',
      categories: ['MUSIC', 'CONCERT'],
      organizer: { name: 'RockFest Indonesia', id: '@x9876...5432' },
      date: '2025-09-20',
      venue: { name: 'Gelora Bung Karno Main Stadium', address: 'Gelora Bung Karno Main Stadium' },
      tickets: { sold: 0, total: 800 },
      revenue: 0,
      fee: 0,
      status: 'ACTIVE',
      created: '2025-01-18'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalType, setModalType] = useState<'view' | 'suspend' | 'cancel' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const totalRevenue = events.reduce((sum, e) => sum + e.revenue, 0);
  const totalFees = events.reduce((sum, e) => sum + e.fee, 0);
  const activeEvents = events.filter(e => e.status === 'ACTIVE').length;

  const openModal = (event: Event, type: 'view' | 'suspend' | 'cancel') => {
    setSelectedEvent(event);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalType(null);
  };

  const handleCancelEvent = () => {
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id ? { ...e, status: 'CANCELLED' } : e
      ));
      closeModal();
    }
  };

  const handleSuspendEvent = () => {
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id ? { ...e, status: 'SUSPENDED' } : e
      ));
      closeModal();
    }
  };

  const formatCurrency = (amount: number) => {
    return `IDR ${amount.toLocaleString('id-ID')}`;
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.organizer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-0 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all events on the Lummy platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Total Events</div>
            <div className="text-3xl font-bold">{events.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Active Events</div>
            <div className="text-3xl font-bold text-green-600">{activeEvents}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-blue-600">0</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-xl font-bold">{formatCurrency(totalRevenue)}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Platform Fees</div>
            <div className="text-xl font-bold">{formatCurrency(totalFees)}</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events or organizers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{event.name}</div>
                    <div className="flex gap-2 mt-1">
                      {event.categories.map((cat, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{event.organizer.name}</div>
                    <div className="text-xs text-gray-500">{event.organizer.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                    <div className="text-xs text-gray-500">{event.venue.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.tickets.sold}/{event.tickets.total}</div>
                    <div className="text-xs text-gray-500">{Math.round((event.tickets.sold / event.tickets.total) * 100)}% sold</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(event.revenue)}</div>
                    <div className="text-xs text-gray-500">Fee: {formatCurrency(event.fee)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      event.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      event.status === 'SUSPENDED' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openModal(event, 'view')}
                        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => openModal(event, 'suspend')}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                      >
                        Suspend
                      </button>
                      <button 
                        onClick={() => openModal(event, 'cancel')}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modals */}
      {modalType && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {modalType === 'view' && (
              <>
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-bold">Event Details</h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Event Name</div>
                      <div className="font-medium">{selectedEvent.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Status</div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        selectedEvent.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedEvent.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Organizer</div>
                      <div className="font-medium">{selectedEvent.organizer.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Organizer Address</div>
                      <div className="text-sm">{selectedEvent.organizer.id}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Event Date</div>
                      <div className="font-medium">{selectedEvent.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Venue</div>
                      <div className="text-sm">{selectedEvent.venue.name}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Tickets Sold</div>
                      <div className="font-medium">{selectedEvent.tickets.sold} / {selectedEvent.tickets.total}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Revenue</div>
                      <div className="font-medium">{formatCurrency(selectedEvent.revenue)}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Platform Fee (1%)</div>
                      <div className="font-medium">{formatCurrency(selectedEvent.fee)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Created</div>
                      <div className="font-medium">{selectedEvent.created}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Categories</div>
                    <div className="flex gap-2">
                      {selectedEvent.categories.map((cat, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'cancel' && (
              <>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Cancel Event</h2>
                  <p className="mb-4">Are you sure you want to cancel &apos;{selectedEvent.name}&apos;? This action will:</p>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                    <li>Stop all ticket sales immediately</li>
                    <li>Process automatic refunds to all ticket holders</li>
                    <li>Cannot be undone</li>
                  </ul>
                  <div className="flex gap-3 justify-end">
                    <button 
                      onClick={closeModal}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Keep Event
                    </button>
                    <button 
                      onClick={handleCancelEvent}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Cancel Event
                    </button>
                  </div>
                </div>
              </>
            )}

            {modalType === 'suspend' && (
              <>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Suspend Event</h2>
                  <p className="mb-4">Are you sure you want to suspend &apos;{selectedEvent.name}&apos;? This action will:</p>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                    <li>Temporarily stop all ticket sales</li>
                    <li>Hide the event from public listings</li>
                    <li>Can be reversed by contacting the organizer</li>
                  </ul>
                  <div className="flex gap-3 justify-end">
                    <button 
                      onClick={closeModal}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSuspendEvent}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Suspend Event
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;