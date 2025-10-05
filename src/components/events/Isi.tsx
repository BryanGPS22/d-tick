'use client';

import { useState } from 'react';

// Types
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  price: number;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

// Sample Events Data
const eventsData: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: 'Aug 15, 2025',
    location: 'Jakarta Convention Center',
    category: 'MUSIC',
    price: 250,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Tech Conference 2025',
    date: 'Jul 25, 2025',
    location: 'Digital Hub Bandung',
    category: 'TECHNOLOGY',
    price: 150,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Blockchain Workshop',
    date: 'Aug 10, 2025',
    location: 'Blockchain Center Jakarta',
    category: 'WORKSHOP',
    price: 100,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Rock Concert: Thunder Night',
    date: 'Sep 20, 2025',
    location: 'Gelora Bung Karno Stadium',
    category: 'MUSIC',
    price: 350,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500',
    status: 'upcoming'
  }
];

const categories = ['All', 'MUSIC', 'TECHNOLOGY', 'WORKSHOP', 'SPORTS', 'ARTS'];
const locations = ['All Locations', 'Jakarta', 'Bandung', 'Surabaya', 'Bali'];
const statuses = ['All Status', 'upcoming', 'ongoing', 'completed'];
const sortOptions = ['Date (Newest)', 'Date (Oldest)', 'Price (Low to High)', 'Price (High to Low)', 'Name (A-Z)'];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('Date (Newest)');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // Filter and Sort Logic
  const applyFilters = () => {
    let filtered = [...eventsData];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    // Date filter
    if (selectedDate) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        const filterDate = new Date(selectedDate);
        return eventDate.toDateString() === filterDate.toDateString();
      });
    }

    // Sort
    switch (sortBy) {
      case 'Date (Newest)':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'Date (Oldest)':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'Price (Low to High)':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price (High to Low)':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Name (A-Z)':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredEvents(filtered);
  };

  // Apply filters whenever any filter changes
  useState(() => {
    applyFilters();
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All Locations');
    setSelectedDate('');
    setSelectedStatus('All Status');
    setSortBy('Date (Newest)');
    setFilteredEvents(eventsData);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Discover Events</h1>
          <p className="text-gray-400">Find and book blockchain-verified tickets for the best events</p>
        </div>

        {/* Demo Mode Alert */}
        <div className="mb-6 bg-blue-950 border border-blue-800 rounded-lg p-4 flex items-center gap-3">
          <span className="text-blue-400 text-xl">ℹ️</span>
          <div>
            <span className="font-semibold text-blue-300">Demo Mode:</span>
            <span className="text-blue-400 ml-2">No events found on blockchain - showing demo data</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search events, artists, or venues"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                applyFilters();
              }}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 items-center overflow-x-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              applyFilters();
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="All">Category</option>
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              applyFilters();
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              applyFilters();
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              applyFilters();
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All Status' ? 'Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="px-4 py-2 text-purple-400 hover:text-purple-300 font-medium"
          >
            Reset
          </button>
        </div>

        {/* Results Count and Sort */}
        <div className="w-full">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-300 font-medium">Showing {filteredEvents.length} events</p>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              applyFilters();
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div></div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-purple-900/20 transition-shadow cursor-pointer border border-gray-700">
              <div className="relative h-48 bg-gray-900">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">{event.date}</p>
                <h3 className="text-lg font-bold text-gray-100 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{event.location}</p>
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-purple-900 text-purple-300 text-xs font-semibold rounded">
                    {event.category}
                  </span>
                  <span className="text-lg font-bold text-purple-400">
                    IDRX {event.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events found matching your criteria</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}